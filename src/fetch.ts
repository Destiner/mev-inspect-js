import { Provider } from '@ethersproject/providers';

import {
  ChainId,
  ClassifiedEvent,
  Market,
  Pool,
  getFactoryByAddress,
  getPoolByAddress,
} from './classifier/index.js';

async function fetchPools(
  chainId: ChainId,
  provider: Provider,
  logs: ClassifiedEvent[],
): Promise<Pool[]> {
  const pools: Pool[] = [];
  for (const log of logs) {
    if (log.classifier.type !== 'swap') {
      continue;
    }
    const id = getPoolId(log);
    const poolData = await log.classifier.fetchPool(provider, id);
    if (!poolData) {
      continue;
    }
    const factory = getFactoryByAddress(
      chainId,
      log.classifier.protocol,
      poolData.factoryAddress,
    );
    const pool = {
      address: getPoolAddress(log).toLowerCase(),
      assets: poolData.assets,
      factory,
    };
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
    const marketData = await log.classifier.fetchMarket(
      chainId,
      provider,
      address,
    );
    if (!marketData) {
      continue;
    }
    const pool = getPoolByAddress(
      chainId,
      log.classifier.protocol,
      marketData.poolAddress,
    );
    const market = {
      address: address.toLowerCase(),
      asset: marketData.asset,
      pool: {
        label: pool.label,
        address: marketData.poolAddress,
      },
    };
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

function getPoolAddress(log: ClassifiedEvent): string {
  if (log.classifier.type !== 'swap') {
    return '';
  }
  if (log.classifier.protocol === 'BalancerV2') {
    return getPoolId(log).substring(0, 42);
  }
  return log.address;
}

function getMarketAddress(log: ClassifiedEvent): string {
  return log.address;
}

export { fetchPools, fetchMarkets };
