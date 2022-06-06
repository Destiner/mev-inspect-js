import { Arbitrage, getArbitrages } from './arbitrage.js';
import { Liquidation, getLiquidations } from './liquidations.js';
import getRepayments from './repayments.js';
import { Sandwich, getSandwiches } from './sandwiches.js';
import getSeizures from './seizures.js';
import getSwaps from './swaps.js';
import getTransfers from './transfers.js';

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
  getRepayments,
  getSandwiches,
  getSeizures,
  getSwaps,
  getTransfers,
};
