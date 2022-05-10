import { Swap, Pool, Transfer, ClassifiedEvent } from '../classifier/index.js';

function getPoolAddress(log: ClassifiedEvent): string {
  if (log.classifier.protocol === 'BalancerV2') {
    const poolId = log.values.poolId as string;
    return poolId.substring(0, 42);
  }
  return log.address.toLowerCase();
}

function getSwaps(
  pools: Pool[],
  transfers: Transfer[],
  logs: ClassifiedEvent[],
): Swap[] {
  return logs
    .map((log) => {
      if (log.classifier.event.type !== 'swap') {
        return null;
      }
      const poolAddress = getPoolAddress(log);
      const pool = pools.find((pool) => pool.address === poolAddress);
      if (!pool) {
        return null;
      }
      return log.classifier.event.parse(pool, log, transfers);
    })
    .filter((swap: Swap | null): swap is Swap => !!swap);
}

export default getSwaps;
