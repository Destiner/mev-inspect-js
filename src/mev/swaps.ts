import type {
  ChainId,
  ClassifiedEvent,
  Pool,
  Swap,
  SwapProtocol,
  Transfer,
} from '../classifier/index.js';
import { isValidFactory } from '../classifier/index.js';

function getPoolAddress(log: ClassifiedEvent): string {
  if (log.classifier.type !== 'swap') {
    return '';
  }
  if (log.classifier.protocol === 'BalancerV2') {
    const poolId = log.values.poolId as string;
    return poolId.substring(0, 42);
  }
  return log.address.toLowerCase();
}

function getSwaps(
  chainId: ChainId,
  pools: Pool[],
  transfers: Transfer[],
  logs: ClassifiedEvent[],
): Swap[] {
  return logs
    .map((log) => {
      if (log.classifier.type !== 'swap') {
        return null;
      }
      const poolAddress = getPoolAddress(log);
      const pool = pools.find((pool) => pool.address === poolAddress);
      if (!pool) {
        return null;
      }
      const protocol = log.classifier.protocol;
      if (!protocol) {
        return null;
      }
      const swapProtocol = protocol as SwapProtocol;
      if (!isValidFactory(chainId, swapProtocol, pool.factory)) {
        return null;
      }
      return log.classifier.parse(pool, log, transfers, logs);
    })
    .filter((swap: Swap | null): swap is Swap => !!swap);
}

export default getSwaps;
