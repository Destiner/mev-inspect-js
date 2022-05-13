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
      // Shibaswap
      '0x115934131916c8b277dd010ee02de363c09d037c',
      // Mooniswap
      '0x71cd6666064c3a1354a3b4dca5fa1e2d3ee7d303',
      // DefiSwap
      '0x9deb29c9a4c7a88a3c0257393b7f3335338d9a9d',
      // SashimiSwap
      '0xf028f723ed1d0fe01cc59973c49298aa95c57472',
      // LuaSwap
      '0x0388c1e0f210abae597b7de712b9510c6c36c857',
      // FraxSwap
      '0x54f454d747e037da288db568d4121117eab34e79',
      // SakeSwap
      '0x75e48c954594d64ef9613aeef97ad85370f13807',
    ],
    UniswapV3: ['0x1f98431c8ad98523631ae4a59f267346ea31f984'],
    BalancerV1: ['0x9424b1412450d0f8fc2255faf6046b98213b76bd'],
    BalancerV2: ['0xba12222222228d8ba445958a75a0704d566bf2c8'],
  },
};

export type { ChainId };

export default directory;
