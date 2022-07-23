import { Provider, TransactionReceipt } from '@ethersproject/providers';

import Chain, { Log } from './chain.js';
import classify, { ChainId } from './classifier/index.js';
import { fetchPools, fetchMarkets } from './fetch.js';
import {
  Mev,
  getArbitrages,
  getJitLiquiditySandwiches,
  getSeizures,
  getLiquidations,
  getLiquidityAdditions,
  getLiquidityRemovals,
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
    return await this.#getMev(logs);
  }

  async block(number: number): Promise<Mev[]> {
    const logs = await this.chain.getBlockLogs(number);
    return await this.#getMev(logs);
  }

  async receipts(receipts: TransactionReceipt[]): Promise<Mev[]> {
    const logs = this.chain.parseReceipts(receipts);
    const logsByBlock = groupBy(logs, (log) => log.blockNumber.toString());
    const mev: Mev[] = [];
    for (const block in logsByBlock) {
      const blockLogs = logsByBlock[block];
      const blockMev = await this.#getMev(blockLogs);
      for (const mevItem of blockMev) {
        mev.push(mevItem);
      }
    }
    return mev;
  }

  async #getMev(logs: Log[]): Promise<Mev[]> {
    const events = classify(this.chainId, logs);
    const pools = await fetchPools(this.chainId, this.provider, events);
    const transfers = getTransfers(events);
    const swaps = getSwaps(this.chainId, pools, transfers, events);
    const arbitrages = getArbitrages(swaps);
    const markets = await fetchMarkets(this.chainId, this.provider, events);
    const repayments = getRepayments(this.chainId, markets, events);
    const seizures = getSeizures(this.chainId, markets, events);
    const liquidations = getLiquidations(repayments, seizures);
    const sandwiches = getSandwiches(this.chainId, swaps);
    const liquidityAdditions = getLiquidityAdditions(
      this.chainId,
      pools,
      transfers,
      events,
    );
    const liquidityRemovals = getLiquidityRemovals(
      this.chainId,
      pools,
      transfers,
      events,
    );
    const jitLiquiditySandwiches = getJitLiquiditySandwiches(
      swaps,
      liquidityAdditions,
      liquidityRemovals,
    );
    return [
      ...arbitrages,
      ...liquidations,
      ...sandwiches,
      ...jitLiquiditySandwiches,
    ];
  }
}

export default Inspector;
