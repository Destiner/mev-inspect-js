import { Coder } from 'abi-coder';
import type { Call } from 'ethcall';
import { Contract, Provider as EthcallProvider } from 'ethcall';
import type { ErrorCode, Provider } from 'ethers';
import { TransactionReceipt, ZeroAddress } from 'ethers';

import erc1155Abi from '../abi/erc1155.js';
import erc20Abi from '../abi/erc20.js';
import erc721Abi from '../abi/erc721.js';
import wethAbi from '../abi/weth.js';
import type { ChainId } from '../index.js';

import type { TransactionTrace } from './traces.js';

type AssetType = 'erc20' | 'erc721' | 'unknown';

interface Error {
  code: ErrorCode;
}

interface EthTransfer {
  from: string;
  to: string;
  amount: bigint;
}

interface Erc20Transfer {
  asset: string;
  from: string;
  to: string;
  amount: bigint;
}

interface Erc721Transfer {
  collection: string;
  id: bigint;
  from: string;
  to: string;
}

interface Erc1155Transfer {
  collection: string;
  ids: bigint[];
  amounts: bigint[];
  from: string;
  to: string;
}

interface BaseArbitrage {
  transactions: string[];
  receipts: TransactionReceipt[];
  searcher: string;
}

interface EthAsset {
  amount: bigint;
}

interface Erc20Asset {
  address: string;
  amount: bigint;
}

interface Erc721Asset {
  collection: string;
  id: bigint;
}

interface Erc1155Asset {
  collection: string;
  id: bigint;
  amount: bigint;
}

type Asset = EthAsset | Erc20Asset | Erc721Asset | Erc1155Asset;

interface PureArbitrage extends BaseArbitrage {
  beneficiary: string;
  assets: Asset[];
}

type Mev = PureArbitrage;

const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
const TRANSFER_EVENT_TOPIC =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

const THRESHOLD = 1000;

const assetTypes: Record<string, AssetType> = {};

function getAssets(receipts: TransactionReceipt[]): string[] {
  const assets = new Set<string>();
  for (const receipt of receipts) {
    for (const log of receipt.logs) {
      if (log.topics[0] === TRANSFER_EVENT_TOPIC) {
        assets.add(log.address.toLowerCase());
      }
    }
  }
  return [...assets];
}

async function fetchAssetTypes(
  chainId: ChainId,
  provider: Provider,
  assets: string[],
): Promise<void> {
  const newAssets = assets.filter((asset) => !assetTypes[asset]);
  const decimalCalls: Call[] = newAssets.map((asset) => {
    const contract = new Contract(asset, erc20Abi);
    return contract.decimals();
  });
  const INTERFACE_ID_ERC721 = '0x80ac58cd';
  const supportsInterfaceCalls: Call[] = newAssets.map((asset) => {
    const contract = new Contract(asset, erc721Abi);
    return contract.supportsInterface(INTERFACE_ID_ERC721);
  });
  const decimalResults = await getNullableCallResults<number>(
    chainId,
    decimalCalls,
    50,
    provider,
  );
  const supportsInterfaceResults = await getNullableCallResults<boolean>(
    chainId,
    supportsInterfaceCalls,
    5,
    provider,
  );
  // Store new assets
  for (const index in newAssets) {
    const asset = newAssets[index];
    const decimalResult = decimalResults[index];
    const supportsInterfaceResult = supportsInterfaceResults[index];
    const type: AssetType = decimalResult
      ? 'erc20'
      : supportsInterfaceResult
        ? 'erc721'
        : 'unknown';
    assetTypes[asset] = type;
  }
}

function classify(
  traces: Record<string, TransactionTrace>,
  receipts: Record<string, TransactionReceipt>,
): Mev[] {
  const mev: Mev[] = [];
  for (const txHash in traces) {
    const trace = traces[txHash];
    const receipt = receipts[txHash];
    const ethTransfers = getEthTransfers(trace);
    const erc20Transfers = getErc20Transfers(receipt);
    const erc721Transfers = getErc721Transfers(receipt);
    const erc1155Transfers = getErc1155Transfers(receipt);
    if (isContractDeployment(receipt)) {
      continue;
    }
    if (isTransfer(trace)) {
      continue;
    }
    const txMev = getPureArbitrages(
      receipt,
      ethTransfers,
      erc20Transfers,
      erc721Transfers,
      erc1155Transfers,
    );
    for (const mevItem of txMev) {
      mev.push(mevItem);
    }
  }
  return mev;
}

function getEthTransfers(trace: TransactionTrace): EthTransfer[] {
  const transfers: EthTransfer[] = [];
  for (const call of trace.calls) {
    const { from, to, value } = call;
    if (value > 0n) {
      transfers.push({
        from,
        to,
        amount: value,
      });
    }
  }
  return transfers;
}

function getErc20Transfers(receipt: TransactionReceipt): Erc20Transfer[] {
  const transfers: Erc20Transfer[] = [];
  const wethCoder = new Coder(wethAbi);
  const coder = new Coder(erc20Abi);
  for (const log of receipt.logs) {
    const asset = log.address.toLowerCase();
    const type = assetTypes[asset];
    if (type !== 'erc20') {
      continue;
    }
    if (asset === WETH) {
      const event = wethCoder.decodeEvent(log.topics as string[], log.data);
      if (event.name === 'Transfer') {
        transfers.push({
          asset,
          from: (event.values.src as string).toLowerCase(),
          to: (event.values.dst as string).toLowerCase(),
          amount: event.values.wad as bigint,
        });
      }
      if (event.name === 'Deposit') {
        transfers.push({
          asset,
          from: '0x0000000000000000000000000000000000000000',
          to: (event.values.dst as string).toLowerCase(),
          amount: event.values.wad as bigint,
        });
      }
      if (event.name === 'Withdrawal') {
        transfers.push({
          asset,
          from: (event.values.src as string).toLowerCase(),
          to: '0x0000000000000000000000000000000000000000',
          amount: event.values.wad as bigint,
        });
      }
    } else {
      try {
        const event = coder.decodeEvent(log.topics as string[], log.data);
        if (event.name !== 'Transfer') {
          continue;
        }
        transfers.push({
          asset,
          from: (event.values.from as string).toLowerCase(),
          to: (event.values.to as string).toLowerCase(),
          amount: event.values.value as bigint,
        });
      } catch (e) {
        continue;
      }
    }
  }
  return transfers;
}

function getErc721Transfers(receipt: TransactionReceipt): Erc721Transfer[] {
  const transfers: Erc721Transfer[] = [];
  const coder = new Coder(erc721Abi);
  for (const log of receipt.logs) {
    const collection = log.address.toLowerCase();
    const type = assetTypes[collection];
    if (type !== 'erc721') {
      continue;
    }
    try {
      const event = coder.decodeEvent(log.topics as string[], log.data);
      if (event.name !== 'Transfer') {
        continue;
      }
      transfers.push({
        collection,
        id: event.values.tokenId as bigint,
        from: (event.values.from as string).toLowerCase(),
        to: (event.values.to as string).toLowerCase(),
      });
    } catch (e) {
      continue;
    }
  }
  return transfers;
}

function getErc1155Transfers(receipt: TransactionReceipt): Erc1155Transfer[] {
  const transfers: Erc1155Transfer[] = [];
  const coder = new Coder(erc1155Abi);
  for (const log of receipt.logs) {
    try {
      const collection = log.address.toLowerCase();
      const event = coder.decodeEvent(log.topics as string[], log.data);
      if (event.name === 'TransferSingle') {
        transfers.push({
          collection,
          ids: [event.values.id as bigint],
          amounts: [event.values.value as bigint],
          from: (event.values.from as string).toLowerCase(),
          to: (event.values.to as string).toLowerCase(),
        });
      }
      if (event.name === 'TransferBatch') {
        transfers.push({
          collection,
          ids: event.values.ids as bigint[],
          amounts: event.values.values as bigint[],
          from: (event.values.from as string).toLowerCase(),
          to: (event.values.to as string).toLowerCase(),
        });
      }
    } catch (e) {
      continue;
    }
  }
  return transfers;
}

function isContractDeployment(receipt: TransactionReceipt): boolean {
  return !receipt.to;
}

function isTransfer(trace: TransactionTrace): boolean {
  if (trace.calls.length === 0) {
    return false;
  }
  const topLevelCall = trace.calls[0];
  const { value, input } = topLevelCall;
  // ETH transfer
  if (value > 0n && input === '0x') {
    return true;
  }
  // ERC20 transfer
  const erc20Coder = new Coder(erc20Abi);
  try {
    const decodedCall = erc20Coder.decodeFunction(input);
    if (decodedCall.name === 'transfer') {
      return true;
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  // ERC721 transfer
  const erc721Coder = new Coder(erc721Abi);
  try {
    const decodedCall = erc721Coder.decodeFunction(input);
    if (decodedCall.name === 'safeTransferFrom') {
      return true;
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return false;
}

function getPureArbitrages(
  receipt: TransactionReceipt,
  ethTransfers: EthTransfer[],
  erc20Transfers: Erc20Transfer[],
  erc721Transfers: Erc721Transfer[],
  erc1155Transfers: Erc1155Transfer[],
): PureArbitrage[] {
  const arbitrages: PureArbitrage[] = [];
  // account => amount
  const ethDelta: Record<string, bigint> = {};
  // account => asset => amount
  const erc20Delta: Record<string, Record<string, bigint>> = {};
  // account => collection => id => amount
  const erc721Delta: Record<
    string,
    Record<string, Record<string, bigint>>
  > = {};
  // account => collection => id => amount
  const erc1155Delta: Record<
    string,
    Record<string, Record<string, bigint>>
  > = {};
  // related accounts
  const accounts: Set<string> = new Set<string>();
  for (const transfer of ethTransfers) {
    const { from, to, amount } = transfer;
    if (!ethDelta[from]) {
      ethDelta[from] = 0n;
    }
    if (!ethDelta[to]) {
      ethDelta[to] = 0n;
    }
    ethDelta[from] -= amount;
    ethDelta[to] += amount;
  }
  for (const transfer of erc20Transfers) {
    const { asset, from, to, amount } = transfer;
    if (!erc20Delta[from]) {
      erc20Delta[from] = {};
    }
    if (!erc20Delta[from][asset]) {
      erc20Delta[from][asset] = 0n;
    }
    if (!erc20Delta[to]) {
      erc20Delta[to] = {};
    }
    if (!erc20Delta[to][asset]) {
      erc20Delta[to][asset] = 0n;
    }
    erc20Delta[from][asset] -= amount;
    erc20Delta[to][asset] += amount;
    accounts.add(from);
    accounts.add(to);
  }
  for (const transfer of erc721Transfers) {
    const { collection, id, from, to } = transfer;
    if (!erc721Delta[from]) {
      erc721Delta[from] = {};
    }
    if (!erc721Delta[from][collection]) {
      erc721Delta[from][collection] = {};
    }
    if (!erc721Delta[from][collection][id.toString()]) {
      erc721Delta[from][collection][id.toString()] = 0n;
    }
    if (!erc721Delta[to]) {
      erc721Delta[to] = {};
    }
    if (!erc721Delta[to][collection]) {
      erc721Delta[to][collection] = {};
    }
    if (!erc721Delta[to][collection][id.toString()]) {
      erc721Delta[to][collection][id.toString()] = 0n;
    }
    erc721Delta[from][collection][id.toString()] -= 1n;
    erc721Delta[to][collection][id.toString()] += 1n;
    accounts.add(from);
    accounts.add(to);
  }
  for (const transfer of erc1155Transfers) {
    const { collection, ids, from, to, amounts } = transfer;
    for (const index in ids) {
      const id = ids[index];
      const amount = amounts[index];
      if (!erc1155Delta[from]) {
        erc1155Delta[from] = {};
      }
      if (!erc1155Delta[from][collection]) {
        erc1155Delta[from][collection] = {};
      }
      if (!erc1155Delta[from][collection][id.toString()]) {
        erc1155Delta[from][collection][id.toString()] = 0n;
      }
      if (!erc1155Delta[to]) {
        erc1155Delta[to] = {};
      }
      if (!erc1155Delta[to][collection]) {
        erc1155Delta[to][collection] = {};
      }
      if (!erc1155Delta[to][collection][id.toString()]) {
        erc1155Delta[to][collection][id.toString()] = 0n;
      }
      erc1155Delta[from][collection][id.toString()] -= amount;
      erc1155Delta[to][collection][id.toString()] += amount;
      accounts.add(from);
      accounts.add(to);
    }
  }
  const senderBalances = getAccountAssetBalances(
    receipt.from.toLowerCase(),
    ethDelta,
    erc20Delta,
    erc721Delta,
    erc1155Delta,
  );
  for (const account of accounts) {
    let score = 1;
    if (
      hasOutgoingTransfers(
        account,
        ethTransfers,
        erc20Transfers,
        erc721Transfers,
        erc1155Transfers,
      )
    ) {
      score *= 8;
    }
    if (account !== ZeroAddress) {
      score *= 10;
    }
    if (account === receipt.from.toLowerCase()) {
      score *= 10;
    }
    if (account === receipt.to?.toLowerCase()) {
      score *= 5;
    }
    if (senderBalances) {
      score *= 4;
    }
    if (score < THRESHOLD) {
      continue;
    }
    const balances = getAccountAssetBalances(
      account,
      ethDelta,
      erc20Delta,
      erc721Delta,
      erc1155Delta,
    );
    if (!!balances && balances.length > 0) {
      arbitrages.push({
        transactions: [receipt.hash],
        receipts: [receipt],
        searcher: receipt.from.toLowerCase(),
        beneficiary: account,
        assets: balances,
      });
    }
  }
  return arbitrages;
}

async function getNullableCallResults<T>(
  chainId: ChainId,
  allCalls: Call[],
  limit: number,
  provider: Provider,
  block?: number,
): Promise<(T | null)[]> {
  const ethcallProvider = new EthcallProvider(chainId, provider);

  const allResults: (T | null)[] = [];
  for (let i = 0; i < allCalls.length / limit; i++) {
    const startIndex = i * limit;
    const endIndex = Math.min((i + 1) * limit, allCalls.length);
    const calls = allCalls.slice(startIndex, endIndex);
    let results = null;
    while (!results) {
      try {
        results = await ethcallProvider.tryAll<T>(calls, { blockTag: block });
      } catch (e: unknown) {
        const errorCode = (e as Error).code as ErrorCode;
        if (errorCode === 'TIMEOUT') {
          console.log(`Failed to fetch state, reason: ${errorCode}, retrying`);
        } else {
          throw e;
        }
      }
    }
    for (const result of results) {
      allResults.push(result);
    }
  }
  return allResults;
}

function getAccountAssetBalances(
  account: string,
  ethDelta: Record<string, bigint>,
  erc20Delta: Record<string, Record<string, bigint>>,
  erc721Delta: Record<string, Record<string, Record<string, bigint>>>,
  erc1155Delta: Record<string, Record<string, Record<string, bigint>>>,
): Asset[] | null {
  let hasNegativeDelta = false;
  const actorEthDelta = ethDelta[account];
  if (actorEthDelta < 0n) {
    hasNegativeDelta = true;
  }
  const actorErc20Delta = erc20Delta[account];
  for (const asset in actorErc20Delta) {
    const amount = actorErc20Delta[asset];
    if (amount < 0n) {
      hasNegativeDelta = true;
    }
  }
  const actorErc721Delta = erc721Delta[account];
  for (const collection in actorErc721Delta) {
    const actorCollectionDelta = actorErc721Delta[collection];
    for (const id in actorCollectionDelta) {
      const amount = actorCollectionDelta[id];
      if (amount < 0n) {
        hasNegativeDelta = true;
      }
    }
  }
  const actorErc1155Delta = erc1155Delta[account];
  for (const collection in actorErc1155Delta) {
    const actorCollectionDelta = actorErc1155Delta[collection];
    for (const id in actorCollectionDelta) {
      const amount = actorCollectionDelta[id];
      if (amount < 0n) {
        hasNegativeDelta = true;
      }
    }
  }
  if (hasNegativeDelta) {
    return null;
  }
  const assets: Asset[] = [];
  if (actorEthDelta > 0n) {
    assets.push({
      amount: actorEthDelta,
    });
  }
  for (const asset in actorErc20Delta) {
    const amount = actorErc20Delta[asset];
    if (amount > 0n) {
      assets.push({
        address: asset,
        amount,
      });
    }
  }
  for (const collection in actorErc721Delta) {
    for (const id in actorErc721Delta[collection]) {
      const amount = actorErc721Delta[collection][id];
      if (amount > 0n) {
        assets.push({
          collection,
          id: BigInt(id),
        });
      }
    }
  }
  for (const collection in actorErc1155Delta) {
    for (const id in actorErc1155Delta[collection]) {
      const amount = actorErc1155Delta[collection][id];
      if (amount > 0n) {
        assets.push({
          collection,
          id: BigInt(id),
          amount,
        });
      }
    }
  }
  return assets;
}

function hasOutgoingTransfers(
  account: string,
  ethTransfers: EthTransfer[],
  erc20Transfers: Erc20Transfer[],
  erc721Transfers: Erc721Transfer[],
  erc1155Transfers: Erc1155Transfer[],
): boolean {
  for (const transfer of ethTransfers) {
    if (transfer.from === account) {
      return true;
    }
  }
  for (const transfer of erc20Transfers) {
    if (transfer.from === account) {
      return true;
    }
  }
  for (const transfer of erc721Transfers) {
    if (transfer.from === account) {
      return true;
    }
  }
  for (const transfer of erc1155Transfers) {
    if (transfer.from === account) {
      return true;
    }
  }
  return false;
}

export { getAssets, fetchAssetTypes, classify };
export type { Mev };
