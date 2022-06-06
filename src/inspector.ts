import { Provider } from '@ethersproject/providers';

import Chain from './chain.js';
import classify, {
  ChainId,
  ClassifiedEvent,
  Swap,
} from './classifier/index.js';
import { fetchPools, fetchMarkets } from './fetch.js';
import {
  BlockMev,
  Liquidation,
  TxMev,
  getArbitrages,
  getSeizures,
  getLiquidations,
  getRepayments,
  getSandwiches,
  getSwaps,
  getTransfers,
} from './mev/index.js';

class Inspector {
  chainId: ChainId;
  provider: Provider;
  chain: Chain;

  constructor(chainId: ChainId, provider: Provider) {
    this.chainId = chainId;
    this.provider = provider;
    this.chain = new Chain(provider);
  }

  async tx(hash: string): Promise<TxMev[]> {
    const logs = await this.chain.getTransactionLogs(hash);
    const events = classify(this.chainId, logs);
    const swaps = await this.#getSwaps(events);
    const arbitrages = getArbitrages(swaps);
    const liquidations = await this.#getLiquidations(events);
    return [...arbitrages, ...liquidations];
  }

  async block(number: number): Promise<BlockMev[]> {
    const logs = await this.chain.getBlockLogs(number);
    const events = classify(this.chainId, logs);
    const swaps = await this.#getSwaps(events);
    const arbitrages = getArbitrages(swaps);
    const liquidations = await this.#getLiquidations(events);
    const sandwiches = getSandwiches(this.chainId, swaps);
    return [...arbitrages, ...liquidations, ...sandwiches];
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
