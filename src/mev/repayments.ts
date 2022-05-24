import { LendingProtocol, Market, Repayment } from '../classifier/base.js';
import { ChainId, ClassifiedEvent, lendingPools } from '../classifier/index.js';

function getMarketAddress(log: ClassifiedEvent): string {
  return log.address.toLowerCase();
}

function getRepayments(
  chainId: ChainId,
  markets: Market[],
  logs: ClassifiedEvent[],
): Repayment[] {
  return logs
    .map((log) => {
      if (log.classifier.type !== 'repayment') {
        return null;
      }
      const marketAddress = getMarketAddress(log);
      const market = markets.find((pool) => pool.address === marketAddress);
      if (!market) {
        return null;
      }
      const protocol = log.classifier.protocol;
      if (!protocol) {
        return null;
      }
      const lendingProtocol = protocol as LendingProtocol;
      const allowedPools = lendingPools[chainId][lendingProtocol];
      if (!allowedPools) {
        return null;
      }
      const allowed = allowedPools.some((pools) => pools.includes(market.pool));
      if (!allowed) {
        return null;
      }
      return log.classifier.parse(market, log);
    })
    .filter(
      (repayment: Repayment | null): repayment is Repayment => !!repayment,
    );
}

export default getRepayments;
