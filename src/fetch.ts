import { Provider } from '@ethersproject/providers';

import { ClassifiedEvent, Pool } from './classifier/index.js';

async function fetchPools(
  provider: Provider,
  logs: ClassifiedEvent[],
): Promise<Pool[]> {
  const pools: Pool[] = [];
  for (const log of logs) {
    if (log.classifier.event.type !== 'swap') {
      continue;
    }
    const id = getPoolId(log);
    const pool = await log.classifier.event.fetchPool(provider, id);
    pools.push(pool);
  }
  return pools;
}

function getPoolId(log: ClassifiedEvent): string {
  if (log.classifier.protocol === 'BalancerV2') {
    return log.values[0];
  }
  return log.address;
}

export default fetchPools;
