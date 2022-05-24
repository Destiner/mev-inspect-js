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

interface Repayment extends Base {
  contract: {
    address: string;
    protocol: {
      abi: Protocol;
      pool: string;
    };
  };
  payer: string;
  borrower: string;
  amount: bigint;
  asset: string;
}

interface Seizure extends Base {
  contract: {
    address: string;
    protocol: {
      abi: Protocol;
      pool: string;
    };
  };
  seizor: string;
  borrower: string;
  asset: string;
  amount: bigint;
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
  protocol: SwapProtocol;
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

interface RepaymentClassifier extends BaseClassifier {
  protocol: LendingProtocol;
  type: 'repayment';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (market: Market, event: ClassifiedEvent) => Repayment | null;
  fetchMarket: (
    chainId: ChainId,
    provider: Provider,
    address: string,
  ) => Promise<Market | null>;
}

interface SeizureClassifier extends BaseClassifier {
  protocol: LendingProtocol;
  type: 'seizure';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (market: Market, event: ClassifiedEvent) => Seizure | null;
  fetchMarket: (
    chainId: ChainId,
    provider: Provider,
    address: string,
  ) => Promise<Market | null>;
}

type Classifier =
  | TransferClassifier
  | SwapClassifier
  | RepaymentClassifier
  | SeizureClassifier;

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
  Market,
  Pool,
  Protocol,
  Repayment,
  Seizure,
  Swap,
  SwapProtocol,
  Transaction,
  Transfer,
  getLatestPoolTransfer,
};
