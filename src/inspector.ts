import { Provider } from '@ethersproject/providers';

import Chain from './chain.js';
import classify, { ChainId } from './classifier/index.js';
import { fetchPools, fetchMarkets } from './fetch.js';
import {
  TxMev,
  BlockMev,
  getSwaps,
  getArbitrages,
  getTransfers,
  getLiquidations,
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
    const classified = classify(logs);
    const pools = await fetchPools(this.provider, classified);
    const markets = await fetchMarkets(this.chainId, this.provider, classified);
    const transfers = getTransfers(classified);
    const swaps = getSwaps(this.chainId, pools, transfers, classified);
    const arbitrages = getArbitrages(swaps);
    const liquidations = getLiquidations(this.chainId, markets, classified);
    return [...arbitrages, ...liquidations];
  }

  async block(number: number): Promise<BlockMev[]> {
    const logs = await this.chain.getBlockLogs(number);
    const classified = classify(logs);
    const pools = await fetchPools(this.provider, classified);
    const markets = await fetchMarkets(this.chainId, this.provider, classified);
    const transfers = getTransfers(classified);
    const swaps = getSwaps(this.chainId, pools, transfers, classified);
    const arbitrages = getArbitrages(swaps);
    const liquidations = getLiquidations(this.chainId, markets, classified);
    return [...arbitrages, ...liquidations];
  }
}

export default Inspector;
