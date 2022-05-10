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

function equalWithPercent(
  firstValue: bigint,
  secondValue: bigint,
  thresholdPercent: number,
): boolean {
  const diff =
    (100n * 2n * (firstValue - secondValue)) / (firstValue + secondValue);
  return diff >= 0 ? diff < thresholdPercent : diff > -thresholdPercent;
}

export { equalWithPercent, getTransaction };
