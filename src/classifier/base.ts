import { JsonFragment } from '@ethersproject/abi';
import { Provider } from '@ethersproject/providers';

import { ClassifiedEvent } from './index.js';

interface Pool {
  address: string;
  factory: string;
  assets: string[];
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

type Protocol = 'BalancerV1' | 'BalancerV2' | 'UniswapV2' | 'UniswapV3';

interface BaseClassifier {
  name: string;
  abi: JsonFragment[];
}

interface TransferClassifier extends BaseClassifier {
  type: 'transfer';
  parse: (event: ClassifiedEvent) => Transfer;
}

interface SwapClassifier extends BaseClassifier {
  protocol: Protocol;
  type: 'swap';
  parse: (
    pool: Pool,
    event: ClassifiedEvent,
    transfers: Transfer[],
    allEvents: ClassifiedEvent[],
  ) => Swap | null;
  fetchPool: (provider: Provider, id: string) => Promise<Pool | null>;
}

type Classifier = TransferClassifier | SwapClassifier;

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
  Transaction,
  Pool,
  Protocol,
  Transfer,
  Swap,
  getLatestPoolTransfer,
};
