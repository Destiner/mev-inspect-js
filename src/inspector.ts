import { Provider, TransactionReceipt } from '@ethersproject/providers';

import Chain from './chain.js';
import classify, {
  ChainId,
  ClassifiedEvent,
  Swap,
} from './classifier/index.js';
import { fetchPools, fetchMarkets } from './fetch.js';
import {
  Liquidation,
  Mev,
  getArbitrages,
  getSeizures,
  getLiquidations,
  getRepayments,
  getSandwiches,
  getSwaps,
  getTransfers,
} from './mev/index.js';
import { groupBy } from './utils.js';

class Inspector {
  chainId: ChainId;
  provider: Provider;
  chain: Chain;

  constructor(chainId: ChainId, provider: Provider) {
    this.chainId = chainId;
    this.provider = provider;
    this.chain = new Chain(provider);
  }

  async tx(hash: string): Promise<Mev[]> {
    const logs = await this.chain.getTransactionLogs(hash);
    const events = classify(this.chainId, logs);
    const swaps = await this.#getSwaps(events);
    const arbitrages = getArbitrages(swaps);
    const liquidations = await this.#getLiquidations(events);
    return [...arbitrages, ...liquidations];
  }

  async block(number: number): Promise<Mev[]> {
    const logs = await this.chain.getBlockLogs(number);
    const events = classify(this.chainId, logs);
    const swaps = await this.#getSwaps(events);
    const arbitrages = getArbitrages(swaps);
    const liquidations = await this.#getLiquidations(events);
    const sandwiches = getSandwiches(this.chainId, swaps);
    return [...arbitrages, ...liquidations, ...sandwiches];
  }

  async receipts(receipts: TransactionReceipt[]): Promise<Mev[]> {
    const logs = this.chain.parseReceipts(receipts);
    const logsByBlock = groupBy(logs, (log) => log.blockNumber.toString());
    const mev: Mev[] = [];
    for (const block in logsByBlock) {
      const blockLogs = logsByBlock[block];
      const events = classify(this.chainId, blockLogs);
      const swaps = await this.#getSwaps(events);
      const arbitrages = getArbitrages(swaps);
      const liquidations = await this.#getLiquidations(events);
      const sandwiches = getSandwiches(this.chainId, swaps);
      const blockMev = [...arbitrages, ...liquidations, ...sandwiches];
      for (const mevItem of blockMev) {
        mev.push(mevItem);
      }
    }
    return mev;
  }

  async #getSwaps(events: ClassifiedEvent[]): Promise<Swap[]> {
    const pools = await fetchPools(this.chainId, this.provider, events);
    const transfers = getTransfers(events);
    return getSwaps(this.chainId, pools, transfers, events);
  }

  async #getLiquidations(events: ClassifiedEvent[]): Promise<Liquidation[]> {
    const markets = await fetchMarkets(this.chainId, this.provider, events);
    const repayments = getRepayments(this.chainId, markets, events);
    const seizures = getSeizures(this.chainId, markets, events);
    return getLiquidations(repayments, seizures);
  }
}

export default Inspector;
