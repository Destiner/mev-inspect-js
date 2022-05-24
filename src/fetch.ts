import { Provider } from '@ethersproject/providers';

import { ChainId, ClassifiedEvent, Market, Pool } from './classifier/index.js';

async function fetchPools(
  provider: Provider,
  logs: ClassifiedEvent[],
): Promise<Pool[]> {
  const pools: Pool[] = [];
  for (const log of logs) {
    if (log.classifier.type !== 'swap') {
      continue;
    }
    const id = getPoolId(log);
    const pool = await log.classifier.fetchPool(provider, id);
    if (!pool) {
      continue;
    }
    pools.push(pool);
  }
  return pools;
}

async function fetchMarkets(
  chainId: ChainId,
  provider: Provider,
  logs: ClassifiedEvent[],
): Promise<Market[]> {
  const markets: Market[] = [];
  for (const log of logs) {
    if (log.classifier.type !== 'repayment') {
      continue;
    }
    const address = getMarketAddress(log);
    const market = await log.classifier.fetchMarket(chainId, provider, address);
    if (!market) {
      continue;
    }
    markets.push(market);
  }
  return markets;
}

function getPoolId(log: ClassifiedEvent): string {
  if (log.classifier.type !== 'swap') {
    return '';
  }
  if (log.classifier.protocol === 'BalancerV2') {
    return log.values.poolId as string;
  }
  return log.address;
}

function getMarketAddress(log: ClassifiedEvent): string {
  return log.address;
}

export { fetchPools, fetchMarkets };
