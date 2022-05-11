import { JsonFragment } from '@ethersproject/abi';
import { Provider } from '@ethersproject/providers';

import { ClassifiedEvent } from './index.js';

interface Pool {
  address: string;
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
  from: string;
  to: string;
  value: bigint;
}

interface Swap extends Base {
  contract: string;
  from: string;
  to: string;
  assetIn: string;
  amountIn: bigint;
  assetOut: string;
  amountOut: bigint;
}

type Protocol = 'BalancerV1' | 'BalancerV2' | 'UniswapV2' | 'UniswapV3';

interface TransferClassifier {
  name: string;
  type: 'transfer';
  parse: (event: ClassifiedEvent) => Transfer;
}

interface SwapClassifier {
  name: string;
  type: 'swap';
  parse: (
    pool: Pool,
    event: ClassifiedEvent,
    transfers: Transfer[],
  ) => Swap | null;
  fetchPool: (provider: Provider, id: string) => Promise<Pool>;
}

interface Classifier {
  protocol?: Protocol;
  event: TransferClassifier | SwapClassifier;
  abi: JsonFragment[];
}

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

export { Classifier, Transaction, Pool, Transfer, Swap, getLatestPoolTransfer };
