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
    const address = log.address;
    const pool = await log.classifier.event.fetchPool(provider, address);
    pools.push(pool);
  }
  return pools;
}

export default fetchPools;
