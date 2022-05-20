import { JsonFragment } from '@ethersproject/abi';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import { ChainId, ClassifiedEvent } from './index.js';

interface Pool {
  address: string;
  factory: string;
  assets: string[];
}

interface Market {
  address: string;
  pool: string;
  asset: string;
}

interface Transaction {
  hash: string;
  gasUsed: number;
}

interface Base {
  transaction: Transaction;
  event: {
    address: string;
    logIndex: number;
  };
}

interface Transfer extends Base {
  asset: string;
  from: string;
  to: string;
  value: bigint;
}

interface Swap extends Base {
  contract: {
    address: string;
    protocol: {
      abi: Protocol;
      factory: string;
    };
  };
  from: string;
  to: string;
  assetIn: string;
  amountIn: bigint;
  assetOut: string;
  amountOut: bigint;
}

interface Liquidation extends Base {
  contract: {
    address: string;
    protocol: {
      abi: Protocol;
      pool: string;
    };
  };
  liquidator: string;
  borrower: string;
  assetDebt: string;
  amountDebt: bigint;
  assetCollateral: string;
  amountCollateral: bigint;
}

type SwapProtocol = 'BalancerV1' | 'BalancerV2' | 'UniswapV2' | 'UniswapV3';

type LendingProtocol = 'CompoundV2' | 'AaveV2' | 'AaveV3';

type Protocol = SwapProtocol | LendingProtocol;

interface BaseClassifier {
  abi: JsonFragment[];
}

interface TransferClassifier extends BaseClassifier {
  type: 'transfer';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (event: ClassifiedEvent) => Transfer;
}

interface SwapClassifier extends BaseClassifier {
  protocol: Protocol;
  type: 'swap';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (
    pool: Pool,
    event: ClassifiedEvent,
    transfers: Transfer[],
    allEvents: ClassifiedEvent[],
  ) => Swap | null;
  fetchPool: (provider: Provider, id: string) => Promise<Pool | null>;
}

interface LiquidationClassifier extends BaseClassifier {
  protocol: Protocol;
  type: 'liquidation';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (market: Market, event: ClassifiedEvent) => Liquidation | null;
  fetchMarket: (
    chainId: ChainId,
    provider: Provider,
    address: string,
  ) => Promise<Market | null>;
}

type Classifier = TransferClassifier | SwapClassifier | LiquidationClassifier;

function getLatestPoolTransfer(
  pool: string,
  logIndex: number,
  transfers: Transfer[],
): Transfer | null {
  const allTransfersToPool = transfers.filter(
    (transfer) => transfer.to === pool,
  );
  const previousTransfers = allTransfersToPool.filter(
    (transfer) => transfer.event.logIndex < logIndex,
  );
  previousTransfers.sort((a, b) => b.event.logIndex - a.event.logIndex);
  return previousTransfers[0];
}

export {
  Classifier,
  LendingProtocol,
  Liquidation,
  Market,
  Pool,
  Protocol,
  Swap,
  SwapProtocol,
  Transaction,
  Transfer,
  getLatestPoolTransfer,
};
