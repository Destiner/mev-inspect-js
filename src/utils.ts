import { Transaction } from './classifier/index.js';
import { Arbitrage, BlockMev, Liquidation } from './mev/index.js';

function getTransaction(mev: BlockMev): Transaction | null {
  if (isArbitrage(mev)) {
    const arbitrage = mev as Arbitrage;
    if (arbitrage.swaps.length === 0) {
      return null;
    }
    return arbitrage.swaps[0].transaction;
  }
  if (isLiquidation(mev)) {
    const liquidation = mev as Liquidation;
    return liquidation.repayment.transaction;
  }
  return null;
}

function isArbitrage(mev: BlockMev): boolean {
  return 'swaps' in mev;
}

function isLiquidation(mev: BlockMev): boolean {
  return 'repayment' in mev;
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

export { isArbitrage, isLiquidation, equalWithTolerance, getTransaction };
