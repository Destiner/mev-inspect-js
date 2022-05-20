import { Liquidation } from '../classifier/index.js';

import { Arbitrage, getArbitrages } from './arbitrage.js';
import getLiquidations from './liquidation.js';
import getSwaps from './swaps.js';
import getTransfers from './transfers.js';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Sandwich {}

type TxMev = Arbitrage | Liquidation;

type BlockMev = TxMev | Sandwich;

export {
  Arbitrage,
  BlockMev,
  Liquidation,
  Sandwich,
  TxMev,
  getArbitrages,
  getLiquidations,
  getSwaps,
  getTransfers,
};
