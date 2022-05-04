import { Provider } from '@ethersproject/providers';

import { Pool } from './classifier/base.js';
import { ClassifiedLog } from './classifier/index.js';

async function fetchPools(
  provider: Provider,
  logs: ClassifiedLog[],
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

function getPoolId(log: ClassifiedLog): string {
  if (log.classifier.protocol === 'BalancerV2') {
    return log.event.values[0];
  }
  return log.address;
}

export default fetchPools;
