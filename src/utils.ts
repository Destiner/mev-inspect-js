import { Transaction } from './classifier/index.js';
import { BlockMev } from './mev.js';

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

export default getTransaction;
