import type { Seizure } from '../classifier/base.js';
import type {
  ChainId,
  ClassifiedEvent,
  LendingProtocol,
  Market,
} from '../classifier/index.js';
import { isValidPool } from '../classifier/index.js';

function getMarketAddress(log: ClassifiedEvent): string {
  return log.address.toLowerCase();
}

function getSeizures(
  chainId: ChainId,
  markets: Market[],
  logs: ClassifiedEvent[],
): Seizure[] {
  return logs
    .map((log) => {
      if (log.classifier.type !== 'seizure') {
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
    .filter((seizure: Seizure | null): seizure is Seizure => !!seizure);
}

export default getSeizures;
