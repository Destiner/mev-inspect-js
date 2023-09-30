import type { Provider } from 'ethers';
import { TransactionReceipt } from 'ethers';

import type { Log } from './chain.js';
import Chain from './chain.js';
import type { ChainId } from './classifier/index.js';
import classify from './classifier/index.js';
import { fetchPools, fetchNftPools, fetchMarkets } from './fetch.js';
import type { Mev } from './mev/index.js';
import {
  getArbitrages,
  getJitSandwiches,
  getSeizures,
  getLiquidations,
  getLiquidityDeposits,
  getLiquidityWithdrawals,
  getRepayments,
  getSandwiches,
  getSwaps,
  getNftSwaps,
  getNftArbitrages,
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
    if (logs.length === 0) {
      return [];
    }
    const block = logs[0].blockNumber;
    const events = classify(this.chainId, logs);
    const pools = await fetchPools(this.chainId, this.provider, events);
    const transfers = getTransfers(events);
    const swaps = getSwaps(this.chainId, pools, transfers, events);
    const arbitrages = getArbitrages(swaps);
    const markets = await fetchMarkets(this.chainId, this.provider, events);
    const repayments = getRepayments(this.chainId, markets, events);
    const seizures = getSeizures(this.chainId, markets, events);
    const liquidations = getLiquidations(repayments, seizures);
    const liquidityDeposits = getLiquidityDeposits(
      this.chainId,
      pools,
      transfers,
      events,
    );
    const liquidityWithdrawals = getLiquidityWithdrawals(
      this.chainId,
      pools,
      transfers,
      events,
    );
    const sandwiches = getSandwiches(
      this.chainId,
      swaps,
      liquidityDeposits,
      liquidityWithdrawals,
    );
    const jitSandwiches = getJitSandwiches(
      swaps,
      liquidityDeposits,
      liquidityWithdrawals,
    );
    const nftPools = await fetchNftPools(
      this.chainId,
      this.provider,
      events,
      block,
    );
    const nftSwaps = getNftSwaps(this.chainId, nftPools, events, logs);
    const nftArbitrages = getNftArbitrages(nftSwaps);
    return [
      ...arbitrages,
      ...liquidations,
      ...sandwiches,
      ...jitSandwiches,
      ...nftArbitrages,
    ];
  }
}

export default Inspector;
