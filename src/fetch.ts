import { Provider } from '@ethersproject/providers';
import { Call, Provider as EthcallProvider } from 'ethcall';

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
  const poolIds = new Set<string>();
  const callMap: Record<number, Call[]> = {};
  for (const log of logs) {
    if (log.classifier.type !== 'swap') {
      continue;
    }
    const id = getPoolId(log);
    if (poolIds.has(id)) {
      continue;
    }
    poolIds.add(id);
    const logCalls = log.classifier.pool.getCalls(id);
    callMap[log.logIndex] = logCalls;
  }
  const ethcallProvider = new EthcallProvider();
  await ethcallProvider.init(provider);
  const calls = Object.values(callMap).flat();
  const results = await ethcallProvider.all(calls);
  let i = 0;
  for (const log of logs) {
    if (log.classifier.type !== 'swap') {
      continue;
    }
    const logCalls = callMap[log.logIndex];
    if (!logCalls) {
      continue;
    }
    const result = [];
    for (let j = 0; j < logCalls.length; j++) {
      result.push(results[i + j]);
    }
    i += logCalls.length;
    const poolData = log.classifier.pool.processCalls(result);
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
  const marketAddresses = new Set<string>();
  const callMap: Record<number, Call[]> = {};
  for (const log of logs) {
    if (log.classifier.type !== 'repayment') {
      continue;
    }
    const address = getMarketAddress(log);
    if (marketAddresses.has(address)) {
      continue;
    }
    marketAddresses.add(address);
    const logCalls = log.classifier.market.getCalls(address);
    callMap[log.logIndex] = logCalls;
  }
  const ethcallProvider = new EthcallProvider();
  await ethcallProvider.init(provider);
  const calls = Object.values(callMap).flat();
  const results = await ethcallProvider.all(calls);
  let i = 0;
  for (const log of logs) {
    if (log.classifier.type !== 'repayment') {
      continue;
    }
    const logCalls = callMap[log.logIndex];
    const result = [];
    for (let j = 0; j < logCalls.length; j++) {
      result.push(results[i + j]);
    }
    i += logCalls.length;
    const address = getMarketAddress(log);
    const marketData = log.classifier.market.processCalls(
      chainId,
      address,
      result,
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
      asset: marketData.asset || address,
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
