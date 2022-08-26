import {
  ChainId,
  ClassifiedEvent,
  LiquidityDeposit,
  Pool,
  SwapProtocol,
  Transfer,
  isValidFactory,
} from '../classifier/index.js';

function getPoolAddress(log: ClassifiedEvent): string {
  if (log.classifier.type !== 'liquidity_deposit') {
    return '';
  }
  if (log.classifier.protocol === 'BalancerV2') {
    const poolId = log.values.poolId as string;
    return poolId.substring(0, 42);
  }
  return log.address.toLowerCase();
}

function getLiquidityDeposits(
  chainId: ChainId,
  pools: Pool[],
  transfers: Transfer[],
  logs: ClassifiedEvent[],
): LiquidityDeposit[] {
  return logs
    .map((log) => {
      if (log.classifier.type !== 'liquidity_deposit') {
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
      return log.classifier.parse(pool, log, transfers);
    })
    .filter(
      (deposit: LiquidityDeposit | null): deposit is LiquidityDeposit =>
        !!deposit,
    );
}

export default getLiquidityDeposits;
