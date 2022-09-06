import { BigNumber } from '@ethersproject/bignumber';
import { ErrorCode } from '@ethersproject/logger';
import { Provider, TransactionReceipt } from '@ethersproject/providers';
import { Coder } from 'abi-coder';
import { Call, Contract, Provider as EthcallProvider } from 'ethcall';

import erc1155Abi from '../abi/erc1155.js';
import erc20Abi from '../abi/erc20.js';
import erc721Abi from '../abi/erc721.js';
import wethAbi from '../abi/weth.js';

import { TransactionTrace } from './traces.js';

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

interface BareArbitrage extends BaseArbitrage {
  beneficiary: string;
  assets: Asset[];
}

type Mev = BareArbitrage;

const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const TRANSFER_EVENT_TOPIC =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

const assetTypes: Record<string, AssetType> = {};

function getAssets(receipts: TransactionReceipt[]): string[] {
  const assets = new Set<string>();
  for (const receipt of receipts) {
    for (const log of receipt.logs) {
      if (log.topics[0] === TRANSFER_EVENT_TOPIC) {
        assets.add(log.address);
      }
    }
  }
  return [...assets];
}

async function fetchAssetTypes(
  provider: Provider,
  assets: string[],
): Promise<void> {
  const ethcallProvider = new EthcallProvider();
  await ethcallProvider.init(provider);
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
    decimalCalls,
    50,
    provider,
  );
  const supportsInterfaceResults = await getNullableCallResults<boolean>(
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
    const actors = getActors(ethTransfers, erc20Transfers, erc721Transfers);
    if (isTransfer(trace)) {
      continue;
    }
    const txMev = getBareArbitrages(
      receipt,
      ethTransfers,
      erc20Transfers,
      erc721Transfers,
      erc1155Transfers,
      actors,
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
    const type = assetTypes[log.address];
    if (type !== 'erc20') {
      continue;
    }
    if (log.address === WETH) {
      const event = wethCoder.decodeEvent(log.topics, log.data);
      if (event.name === 'Transfer') {
        transfers.push({
          asset: log.address,
          from: (event.values.src as string).toLowerCase(),
          to: (event.values.dst as string).toLowerCase(),
          amount: (event.values.wad as BigNumber).toBigInt(),
        });
      }
      if (event.name === 'Deposit') {
        transfers.push({
          asset: log.address,
          from: '0x0000000000000000000000000000000000000000',
          to: (event.values.dst as string).toLowerCase(),
          amount: (event.values.wad as BigNumber).toBigInt(),
        });
      }
      if (event.name === 'Withdrawal') {
        transfers.push({
          asset: log.address,
          from: (event.values.src as string).toLowerCase(),
          to: '0x0000000000000000000000000000000000000000',
          amount: (event.values.wad as BigNumber).toBigInt(),
        });
      }
    } else {
      try {
        const event = coder.decodeEvent(log.topics, log.data);
        if (event.name !== 'Transfer') {
          continue;
        }
        transfers.push({
          asset: log.address,
          from: (event.values.from as string).toLowerCase(),
          to: (event.values.to as string).toLowerCase(),
          amount: (event.values.value as BigNumber).toBigInt(),
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
    const type = assetTypes[log.address];
    if (type !== 'erc721') {
      continue;
    }
    try {
      const event = coder.decodeEvent(log.topics, log.data);
      if (event.name !== 'Transfer') {
        continue;
      }
      transfers.push({
        collection: log.address,
        id: (event.values.tokenId as BigNumber).toBigInt(),
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
      const event = coder.decodeEvent(log.topics, log.data);
      if (event.name === 'TransferSingle') {
        transfers.push({
          collection: log.address,
          ids: [(event.values.id as BigNumber).toBigInt()],
          amounts: [(event.values.value as BigNumber).toBigInt()],
          from: (event.values.from as string).toLowerCase(),
          to: (event.values.to as string).toLowerCase(),
        });
      }
      if (event.name === 'TransferBatch') {
        transfers.push({
          collection: log.address,
          ids: (event.values.ids as BigNumber[]).map((n) => n.toBigInt()),
          amounts: (event.values.values as BigNumber[]).map((n) =>
            n.toBigInt(),
          ),
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

function isTransfer(trace: TransactionTrace): boolean {
  if (trace.calls.length === 0) {
    return false;
  }
  const topLevelCall = trace.calls[0];
  const { value, input } = topLevelCall;
  // ETH transfer
  if (value > 0n) {
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

// Actor = address that sends anything (and maybe receives something in return).
// Conversely, passive addresses get something (e.g. via claim or rent),
// but don't send anything in return.
function getActors(
  ethTransfers: EthTransfer[],
  erc20Transfers: Erc20Transfer[],
  erc721Transfers: Erc721Transfer[],
): Set<string> {
  const actors = new Set<string>();
  for (const transfer of ethTransfers) {
    actors.add(transfer.from);
  }
  for (const transfer of erc20Transfers) {
    actors.add(transfer.from);
  }
  for (const transfer of erc721Transfers) {
    actors.add(transfer.from);
  }
  return actors;
}

function getBareArbitrages(
  receipt: TransactionReceipt,
  ethTransfers: EthTransfer[],
  erc20Transfers: Erc20Transfer[],
  erc721Transfers: Erc721Transfer[],
  erc1155Transfers: Erc1155Transfer[],
  actors: Set<string>,
): BareArbitrage[] {
  const arbitrages: BareArbitrage[] = [];
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
    }
  }
  for (const actor of actors) {
    let hasNegativeDelta = false;
    const actorEthDelta = ethDelta[actor];
    if (actorEthDelta < 0n) {
      hasNegativeDelta = true;
    }
    const actorErc20Delta = erc20Delta[actor];
    for (const asset in actorErc20Delta) {
      const amount = actorErc20Delta[asset];
      if (amount < 0n) {
        hasNegativeDelta = true;
      }
    }
    const actorErc721Delta = erc721Delta[actor];
    for (const collection in actorErc721Delta) {
      const actorCollectionDelta = actorErc721Delta[collection];
      for (const id in actorCollectionDelta) {
        const amount = actorCollectionDelta[id];
        if (amount < 0n) {
          hasNegativeDelta = true;
        }
      }
    }
    const actorErc1155Delta = erc1155Delta[actor];
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
      continue;
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
    if (assets.length > 0) {
      arbitrages.push({
        transactions: [receipt.transactionHash],
        receipts: [receipt],
        searcher: receipt.from,
        beneficiary: actor,
        assets,
      });
    }
  }
  return arbitrages;
}

async function getNullableCallResults<T>(
  allCalls: Call[],
  limit: number,
  provider: Provider,
  block?: number,
): Promise<(T | null)[]> {
  const ethcallProvider = new EthcallProvider();
  await ethcallProvider.init(provider);

  const allResults: (T | null)[] = [];
  for (let i = 0; i < allCalls.length / limit; i++) {
    const startIndex = i * limit;
    const endIndex = Math.min((i + 1) * limit, allCalls.length);
    const calls = allCalls.slice(startIndex, endIndex);
    let results = null;
    while (!results) {
      try {
        results = await ethcallProvider.tryAll<T>(calls, block);
      } catch (e: unknown) {
        const errorCode = (e as Error).code as ErrorCode;
        if (errorCode === ErrorCode.TIMEOUT) {
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

export { Mev, getAssets, fetchAssetTypes, classify };
