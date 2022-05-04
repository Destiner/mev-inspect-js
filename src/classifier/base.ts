import { JsonFragment } from '@ethersproject/abi';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import { Swap } from '../mev.js';

interface Pool {
  address: string;
  assets: string[];
}

type Protocol = 'BalancerV1' | 'BalancerV2' | 'UniswapV2' | 'UniswapV3';

interface SwapEvent {
  name: string;
  type: 'swap';
  parse: (pool: Pool, txHash: string, event: Event) => Swap;
  fetchPool: (provider: Provider, id: string) => Promise<Pool>;
}

interface Classifier {
  protocol: Protocol;
  event: SwapEvent;
  abi: JsonFragment[];
}

export { Classifier, Pool };
