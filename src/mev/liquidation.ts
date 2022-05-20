import {
  ChainId,
  ClassifiedEvent,
  LendingProtocol,
  Liquidation,
  Market,
  lendingPools,
} from '../classifier/index.js';

function getMarketAddress(log: ClassifiedEvent): string {
  return log.address.toLowerCase();
}

function getLiquidations(
  chainId: ChainId,
  markets: Market[],
  logs: ClassifiedEvent[],
): Liquidation[] {
  return logs
    .map((log) => {
      if (log.classifier.type !== 'liquidation') {
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
      (liquidation: Liquidation | null): liquidation is Liquidation =>
        !!liquidation,
    );
}

export default getLiquidations;
