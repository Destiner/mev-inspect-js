import { LendingProtocol, Market, Repayment } from '../classifier/base.js';
import { ChainId, ClassifiedEvent, isValidPool } from '../classifier/index.js';

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
      if (!isValidPool(chainId, lendingProtocol, market.pool.address)) {
        return null;
      }
      return log.classifier.parse(market, log);
    })
    .filter(
      (repayment: Repayment | null): repayment is Repayment => !!repayment,
    );
}

export default getRepayments;
