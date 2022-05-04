import { JsonFragment } from '@ethersproject/abi';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import { Swap } from '../mev.js';

interface Pool {
  address: string;
  assets: string[];
}

interface Transfer {
  asset: string;
  from: string;
  to: string;
  value: bigint;
}

type Protocol = 'BalancerV1' | 'BalancerV2' | 'UniswapV2' | 'UniswapV3';

interface TransferEvent {
  name: string;
  type: 'transfer';
  parse: (asset: string, event: Event) => Transfer;
}

interface SwapEvent {
  name: string;
  type: 'swap';
  parse: (pool: Pool, txHash: string, event: Event) => Swap;
  fetchPool: (provider: Provider, id: string) => Promise<Pool>;
}

interface Classifier {
  protocol?: Protocol;
  event: TransferEvent | SwapEvent;
  abi: JsonFragment[];
}

export { Classifier, Pool, Transfer };
