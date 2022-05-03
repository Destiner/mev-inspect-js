import { JsonFragment } from '@ethersproject/abi';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import { Swap } from '../mev.js';

interface Pool {
  address: string;
  assets: string[];
}

interface SwapEvent {
  name: string;
  type: 'swap';
  parse: (pool: Pool, txHash: string, event: Event) => Swap;
  fetchPool: (provider: Provider, address: string) => Promise<Pool>;
}

interface Classifier {
  event: SwapEvent;
  abi: JsonFragment[];
}

export { Classifier, Pool };
