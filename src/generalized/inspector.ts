import { JsonRpcProvider, TransactionReceipt } from 'ethers';

import Chain from '../chain.js';
import { groupBy } from '../utils.js';

import { Mev, getAssets, fetchAssetTypes, classify } from './mev.js';
import { getBlockTraces, getTransactionTrace } from './traces.js';

type ChainId = 1;

class Inspector {
  chainId: ChainId;
  provider: JsonRpcProvider;
  chain: Chain;

  constructor(chainId: ChainId, provider: JsonRpcProvider) {
    this.chainId = chainId;
    this.provider = provider;
    this.chain = new Chain(provider);
  }

  async tx(hash: string): Promise<Mev[]> {
    const receipt = await this.chain.getReceipt(hash);
    if (!receipt) {
      return [];
    }
    return await this.#getTxMev(this.chainId, this.provider, receipt, hash);
  }

  async block(number: number): Promise<Mev[]> {
    const logs = await this.chain.getBlockReceipts(number);
    return await this.#getMev(this.chainId, this.provider, logs, number);
  }

  async receipts(receipts: TransactionReceipt[]): Promise<Mev[]> {
    const receiptsByBlock = groupBy(receipts, (receipt) =>
      receipt.blockNumber.toString(),
    );
    const mev: Mev[] = [];
    for (const block in receiptsByBlock) {
      const number = parseInt(block);
      const blockReceipts = receiptsByBlock[block];
      const blockMev = await this.#getMev(
        this.chainId,
        this.provider,
        blockReceipts,
        number,
      );
      for (const mevItem of blockMev) {
        mev.push(mevItem);
      }
    }
    return mev;
  }

  async #getTxMev(
    chainId: ChainId,
    provider: JsonRpcProvider,
    receipt: TransactionReceipt,
    hash: string,
  ): Promise<Mev[]> {
    const receiptMap = {
      [hash]: receipt,
    };
    const trace = await getTransactionTrace(provider, hash);
    if (!trace) {
      return [];
    }
    const traceMap = {
      [hash]: trace,
    };
    const assets = getAssets([receipt]);
    await fetchAssetTypes(chainId, provider, assets);
    return classify(traceMap, receiptMap);
  }

  async #getMev(
    chainId: ChainId,
    provider: JsonRpcProvider,
    receipts: TransactionReceipt[],
    block: number,
  ): Promise<Mev[]> {
    if (receipts.length === 0) {
      return [];
    }
    const receiptMap = groupReceiptsByTransaction(receipts);
    const traces = await getBlockTraces(provider, block);
    if (!traces) {
      return [];
    }
    const assets = getAssets(receipts);
    await fetchAssetTypes(chainId, provider, assets);
    return classify(traces, receiptMap);
  }
}

function groupReceiptsByTransaction(
  receipts: TransactionReceipt[],
): Record<string, TransactionReceipt> {
  const group: Record<string, TransactionReceipt> = {};
  for (const receipt of receipts) {
    const hash = receipt.hash;
    group[hash] = receipt;
  }
  return group;
}

export default Inspector;
