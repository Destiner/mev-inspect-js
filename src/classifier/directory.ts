import { Protocol } from './base.js';

const ETHEREUM = 1;

type ChainId = typeof ETHEREUM;

const directory: Record<ChainId, Record<Protocol, string[]>> = {
  [ETHEREUM]: {
    UniswapV2: [
      // Uniswap
      '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
      // Sushiswap
      '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
    ],
    UniswapV3: ['0x1f98431c8ad98523631ae4a59f267346ea31f984'],
    BalancerV1: ['0x9424b1412450d0f8fc2255faf6046b98213b76bd'],
    BalancerV2: ['0xba12222222228d8ba445958a75a0704d566bf2c8'],
  },
};

export type { ChainId };

export default directory;
