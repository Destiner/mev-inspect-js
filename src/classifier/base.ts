import { JsonFragment } from '@ethersproject/abi';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

interface Pool {
  address: string;
  assets: string[];
}

interface Metadata {
  transactionHash: string;
  eventAddress: string;
  logIndex: number;
}

interface Transfer {
  from: string;
  to: string;
  value: bigint;
  metadata: Metadata;
}

interface Swap {
  maker: string;
  makerAsset: string;
  makerAmount: bigint;
  taker: string;
  takerAsset: string;
  takerAmount: bigint;
  metadata: Metadata;
}

type Protocol = 'BalancerV1' | 'BalancerV2' | 'UniswapV2' | 'UniswapV3';

interface TransferEvent {
  name: string;
  type: 'transfer';
  parse: (asset: string, txHash: string, logIndex: number, event: Event) => Transfer;
}

interface SwapEvent {
  name: string;
  type: 'swap';
  parse: (pool: Pool, txHash: string, logIndex: number, event: Event) => Swap;
  fetchPool: (provider: Provider, id: string) => Promise<Pool>;
}

interface Classifier {
  protocol?: Protocol;
  event: TransferEvent | SwapEvent;
  abi: JsonFragment[];
}

export { Classifier, Pool, Transfer, Swap };
