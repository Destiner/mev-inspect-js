import type {
  Base as BaseEvent,
  Block,
  Transaction,
} from './classifier/index.js';
import type {
  Arbitrage,
  JitSandwich,
  Liquidation,
  Mev,
  NftArbitrage,
  Sandwich,
} from './mev/index.js';

function getBlock(mev: Mev): Block | null {
  return getEvent(mev)?.block || null;
}

function getTransaction(mev: Mev): Transaction | null {
  return getEvent(mev)?.transaction || null;
}

function getEvent(mev: Mev): BaseEvent | null {
  if (isArbitrage(mev)) {
    const arbitrage = mev as Arbitrage;
    if (arbitrage.swaps.length === 0) {
      return null;
    }
    return arbitrage.swaps[0];
  }
  if (isLiquidation(mev)) {
    const liquidation = mev as Liquidation;
    return liquidation.repayment;
  }
  if (isSandwich(mev)) {
    const sandwich = mev as Sandwich;
    return sandwich.frontSwap;
  }
  return null;
}

function isArbitrage(mev: Mev): boolean {
  return (
    'arbitrager' in mev &&
    mev.swaps.every(
      (swap) => swap.assetIn.type === 'erc20' && swap.assetOut.type === 'erc20',
    )
  );
}

function isLiquidation(mev: Mev): boolean {
  return 'liquidator' in mev;
}

function isSandwich(mev: Mev): boolean {
  return 'frontSwap' in mev;
}

function isJitSandwich(mev: Mev): boolean {
  return 'deposit' in mev;
}

function isNftArbitrage(mev: Mev): boolean {
  return (
    'arbitrager' in mev &&
    mev.swaps.some(
      (swap) =>
        swap.assetIn.type === 'erc721' || swap.assetOut.type === 'erc721',
    )
  );
}

function getArbitrages(mevList: Mev[]): Arbitrage[] {
  return mevList.filter((mev): mev is Arbitrage => isArbitrage(mev));
}

function getLiquidations(mevList: Mev[]): Liquidation[] {
  return mevList.filter((mev): mev is Liquidation => isLiquidation(mev));
}

function getSandwiches(mevList: Mev[]): Sandwich[] {
  return mevList.filter((mev): mev is Sandwich => isSandwich(mev));
}

function getJitSandwiches(mevList: Mev[]): JitSandwich[] {
  return mevList.filter((mev): mev is JitSandwich => isJitSandwich(mev));
}

function getNftArbitrages(mevList: Mev[]): NftArbitrage[] {
  return mevList.filter((mev): mev is NftArbitrage => isNftArbitrage(mev));
}

function equalWithTolerance(
  firstValue: bigint,
  secondValue: bigint,
  threshold: number,
): boolean {
  // Special case: either of values is zero
  if (firstValue === 0n || secondValue === 0n) {
    if (firstValue === 0n && secondValue === 0n) {
      return true;
    }
    if (firstValue === 0n) {
      return false;
    }
    return threshold >= 1;
  }
  // Should be of the same sign
  if (firstValue > 0 !== secondValue > 0) {
    return false;
  }
  // Compare in absolute values
  if (firstValue < 0n) {
    firstValue = -firstValue;
    secondValue = -secondValue;
  }
  // a * (1 + threshold) >= b >= a * (1 - threshold)
  const divisionMultiplier = 1_000_000_000n;
  const thresholdMultiplier = Number(divisionMultiplier);
  const rate = (divisionMultiplier * secondValue) / firstValue;
  const isWithinLowerBound =
    threshold * thresholdMultiplier >= rate - divisionMultiplier;
  const isWithinHigherBound =
    threshold * thresholdMultiplier >= divisionMultiplier - rate;
  return isWithinLowerBound && isWithinHigherBound;
}

function minByAbs(a: bigint, b: bigint): bigint {
  const absA = a > 0 ? a : -a;
  const absB = b > 0 ? b : -b;
  return absA < absB ? a : b;
}

function groupBy<T>(
  arr: T[],
  filter: (item: T) => string,
): Record<string, T[]> {
  const grouped: Record<string, T[]> = {};
  for (const item of arr) {
    const key = filter(item);
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  }
  return grouped;
}

export {
  equalWithTolerance,
  getArbitrages,
  getBlock,
  getJitSandwiches,
  getLiquidations,
  getNftArbitrages,
  getSandwiches,
  getTransaction,
  groupBy,
  isArbitrage,
  isLiquidation,
  isSandwich,
  isJitSandwich,
  isNftArbitrage,
  minByAbs,
};
