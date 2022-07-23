import {
  ChainId,
  ClassifiedEvent,
  LiquidityRemoval,
  Pool,
  SwapProtocol,
  Transfer,
  isValidFactory,
} from '../classifier/index.js';

function getPoolAddress(log: ClassifiedEvent): string {
  if (log.classifier.type !== 'liquidity_removal') {
    return '';
  }
  if (log.classifier.protocol === 'BalancerV2') {
    const poolId = log.values.poolId as string;
    return poolId.substring(0, 42);
  }
  return log.address.toLowerCase();
}

function getLiquidityRemovals(
  chainId: ChainId,
  pools: Pool[],
  transfers: Transfer[],
  logs: ClassifiedEvent[],
): LiquidityRemoval[] {
  return logs
    .map((log) => {
      if (log.classifier.type !== 'liquidity_removal') {
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
      return log.classifier.parse(pool, log);
    })
    .filter(
      (removal: LiquidityRemoval | null): removal is LiquidityRemoval =>
        !!removal,
    );
}

export default getLiquidityRemovals;
