import { Base as BaseEvent, Block, Transaction } from './classifier/index.js';
import { Arbitrage, BlockMev, Liquidation, Sandwich } from './mev/index.js';

function getBlock(mev: BlockMev): Block | null {
  return getEvent(mev)?.block || null;
}

function getTransaction(mev: BlockMev): Transaction | null {
  return getEvent(mev)?.transaction || null;
}

function getEvent(mev: BlockMev): BaseEvent | null {
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

function isArbitrage(mev: BlockMev): boolean {
  return 'arbitrager' in mev;
}

function isLiquidation(mev: BlockMev): boolean {
  return 'liquidator' in mev;
}

function isSandwich(mev: BlockMev): boolean {
  return 'sandwicher' in mev;
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
  isArbitrage,
  isLiquidation,
  isSandwich,
  equalWithTolerance,
  getBlock,
  getTransaction,
  minByAbs,
  groupBy,
};
