import {
  ChainId,
  ClassifiedEvent,
  LendingProtocol,
  Liquidation as LiquidationEvent,
  Market,
  lendingPools,
} from '../classifier/index.js';

interface Liquidation {
  liquidator: string;
  borrower: string;
  assetDebt: string;
  amountDebt: bigint;
  assetCollateral: string;
  amountCollateral: bigint;
}

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
      (liquidation: LiquidationEvent | null): liquidation is LiquidationEvent =>
        !!liquidation,
    )
    .map((liquidation: LiquidationEvent) => {
      return {
        liquidator: liquidation.liquidator,
        borrower: liquidation.borrower,
        assetDebt: liquidation.assetDebt,
        amountDebt: liquidation.amountDebt,
        assetCollateral: liquidation.assetCollateral,
        amountCollateral: liquidation.amountCollateral,
      };
    });
}

export { Liquidation, getLiquidations };
