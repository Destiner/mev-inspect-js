// eslint-disable-next-line import/no-extraneous-dependencies
import { JsonRpcProvider as LegacyJsonRpcProvider } from '@ethersproject/providers';
import { Call, Provider as EthcallProvider } from 'ethcall';
import { Provider, JsonRpcProvider } from 'ethers';

import {
  ChainId,
  ClassifiedEvent,
  Market,
  NftPool,
  Pool,
  getFactoryByAddress,
  getNftFactoryByAddress,
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
  const legacyProvider = new LegacyJsonRpcProvider(
    (provider as JsonRpcProvider)._getConnection().url,
  );
  const ethcallProvider = new EthcallProvider(chainId, legacyProvider);
  const calls = Object.values(callMap).flat();
  const results = await ethcallProvider.tryAll(calls);
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
    const poolData = log.classifier.pool.processCalls(result, log.address);
    if (!poolData) {
      continue;
    }
    const factory = getFactoryByAddress(
      chainId,
      log.classifier.protocol,
      poolData.factoryAddress,
    );
    if (!factory) {
      continue;
    }
    const pool = {
      address: getPoolAddress(log).toLowerCase(),
      assets: poolData.assets,
      factory,
    };
    pools.push(pool);
  }
  return pools;
}

async function fetchNftPools(
  chainId: ChainId,
  provider: Provider,
  logs: ClassifiedEvent[],
  block: number,
): Promise<NftPool[]> {
  const pools: NftPool[] = [];
  const poolAddresses = new Set<string>();
  const callMap: Record<number, Call[]> = {};
  for (const log of logs) {
    if (log.classifier.type !== 'nft_swap') {
      continue;
    }
    const address = log.address;
    if (poolAddresses.has(address)) {
      continue;
    }
    poolAddresses.add(address);
    const logCalls = log.classifier.pool.getCalls(address);
    callMap[log.logIndex] = logCalls;
  }
  const legacyProvider = new LegacyJsonRpcProvider(
    (provider as JsonRpcProvider)._getConnection().url,
  );
  const ethcallProvider = new EthcallProvider(chainId, legacyProvider);
  const calls = Object.values(callMap).flat();
  const results = await ethcallProvider.tryAll(calls, { blockTag: block });
  let i = 0;
  for (const log of logs) {
    if (log.classifier.type !== 'nft_swap') {
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
    const poolData = log.classifier.pool.processCalls(
      result,
      log.address,
      chainId,
    );
    if (!poolData) {
      continue;
    }
    const factory = getNftFactoryByAddress(
      chainId,
      log.classifier.protocol,
      poolData.factoryAddress,
    );
    if (!factory) {
      continue;
    }
    const pool = {
      address: log.address.toLowerCase(),
      factory,
      asset: poolData.asset,
      collection: poolData.collection,
      metadata: poolData.metadata,
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
  const legacyProvider = new LegacyJsonRpcProvider(
    (provider as JsonRpcProvider)._getConnection().url,
  );
  const ethcallProvider = new EthcallProvider(chainId, legacyProvider);
  const calls = Object.values(callMap).flat();
  const results = await ethcallProvider.tryAll(calls);
  let i = 0;
  for (const log of logs) {
    if (log.classifier.type !== 'repayment') {
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
    if (!pool) {
      continue;
    }
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

export { fetchPools, fetchNftPools, fetchMarkets };
