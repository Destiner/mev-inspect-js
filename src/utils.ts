import { Transaction } from './classifier/index.js';
import { BlockMev } from './mev/index.js';

function getTransaction(mev: BlockMev): Transaction | null {
  if ('swaps' in mev) {
    const swaps = mev.swaps;
    if (swaps.length === 0) {
      return null;
    }
    return swaps[0].transaction;
  }
  return null;
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
  const rate = divisionMultiplier * secondValue / firstValue;
  const isWithinLowerBound = threshold * thresholdMultiplier >= rate - divisionMultiplier;
  const isWithinHigherBound = threshold * thresholdMultiplier >= divisionMultiplier - rate;
  return isWithinLowerBound && isWithinHigherBound;
}

export { equalWithTolerance, getTransaction };
