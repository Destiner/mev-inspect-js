import { SwapProtocol, LendingProtocol } from './base.js';

const ETHEREUM = 1;
const POLYGON = 137;
const ARBITRUM = 42161;

type ChainId = typeof ETHEREUM | typeof POLYGON | typeof ARBITRUM;

interface Factory {
  label: string;
  address: string;
}

interface LendingPool {
  label: string;
  addresses: string[];
}

const nativeAsset: Record<ChainId, string> = {
  [ETHEREUM]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  [POLYGON]: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  [ARBITRUM]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
};

const swapFactories: Record<ChainId, Record<SwapProtocol, Factory[]>> = {
  [ETHEREUM]: {
    UniswapV2: [
      {
        address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
        label: 'Uniswap V2',
      },
      {
        address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
        label: 'Sushiswap',
      },
      {
        address: '0x115934131916c8b277dd010ee02de363c09d037c',
        label: 'Shibaswap',
      },
      {
        address: '0x71cd6666064c3a1354a3b4dca5fa1e2d3ee7d303',
        label: 'Mooniswap',
      },
      {
        address: '0x9deb29c9a4c7a88a3c0257393b7f3335338d9a9d',
        label: 'DefiSwap',
      },
      {
        address: '0xf028f723ed1d0fe01cc59973c49298aa95c57472',
        label: 'SashimiSwap',
      },
      {
        address: '0x0388c1e0f210abae597b7de712b9510c6c36c857',
        label: 'LuaSwap',
      },
      {
        address: '0x54f454d747e037da288db568d4121117eab34e79',
        label: 'FraxSwap',
      },
      {
        address: '0x75e48c954594d64ef9613aeef97ad85370f13807',
        label: 'SakeSwap',
      },
    ],
    UniswapV3: [
      {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    ],
    BalancerV1: [
      {
        address: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
        label: 'Balancer V1',
      },
    ],
    BalancerV2: [
      {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    ],
  },
  [POLYGON]: {
    UniswapV2: [
      {
        address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
        label: 'Sushiswap',
      },
      {
        address: '0x5757371414417b8c6caad45baef941abc7d3ab32',
        label: 'Quickswap',
      },
    ],
    UniswapV3: [
      {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    ],
    BalancerV1: [],
    BalancerV2: [
      {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    ],
  },
  [ARBITRUM]: {
    UniswapV2: [
      {
        address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
        label: 'Sushiswap',
      },
    ],
    UniswapV3: [
      {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    ],
    BalancerV1: [],
    BalancerV2: [
      {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    ],
  },
};

const lendingPools: Record<ChainId, Record<LendingProtocol, LendingPool[]>> = {
  [ETHEREUM]: {
    CompoundV2: [
      {
        addresses: ['0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b'],
        label: 'Compound V2',
      },
    ],
    AaveV2: [
      {
        addresses: [
          '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
          '0x7937d4799803fbbe595ed57278bc4ca21f3bffcb',
        ],
        label: 'Aave V2',
      },
    ],
    AaveV3: [],
  },
  [POLYGON]: {
    CompoundV2: [],
    AaveV2: [
      {
        addresses: ['0x8dff5e27ea6b7ac08ebfdf9eb090f32ee9a30fcf'],
        label: 'Aave V2',
      },
    ],
    AaveV3: [
      {
        addresses: ['0x794a61358d6845594f94dc1db02a252b5b4814ad'],
        label: 'Aave V3',
      },
    ],
  },
  [ARBITRUM]: {
    CompoundV2: [],
    AaveV2: [],
    AaveV3: [
      {
        addresses: ['0x794a61358d6845594f94dc1db02a252b5b4814ad'],
        label: 'Aave V3',
      },
    ],
  },
};

const routers: Record<ChainId, Record<SwapProtocol, string[]>> = {
  [ETHEREUM]: {
    UniswapV2: [
      '0xf164fc0ec4e93095b804a4795bbe1e041497b92a',
      '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
    ],
    UniswapV3: [
      '0xe592427a0aece92de3edee1f18e0157c05861564',
      '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
    ],
    BalancerV1: [],
    BalancerV2: ['0xba12222222228d8ba445958a75a0704d566bf2c8'],
  },
  [POLYGON]: {
    UniswapV2: ['0x1b02da8cb0d097eb8d57a175b88c7d8b47997506'],
    UniswapV3: [
      '0xe592427a0aece92de3edee1f18e0157c05861564',
      '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
    ],
    BalancerV1: [],
    BalancerV2: ['0xba12222222228d8ba445958a75a0704d566bf2c8'],
  },
  [ARBITRUM]: {
    UniswapV2: ['0x1b02da8cb0d097eb8d57a175b88c7d8b47997506'],
    UniswapV3: [
      '0xe592427a0aece92de3edee1f18e0157c05861564',
      '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
    ],
    BalancerV1: [],
    BalancerV2: ['0xba12222222228d8ba445958a75a0704d566bf2c8'],
  },
};

function getFactoryByAddress(
  chainId: ChainId,
  protocol: SwapProtocol,
  address: string,
): Factory {
  const protocolFactories = swapFactories[chainId][protocol];
  return protocolFactories.find(
    (factory) => factory.address === address,
  ) as Factory;
}

function getPoolByAddress(
  chainId: ChainId,
  protocol: LendingProtocol,
  address: string,
): LendingPool {
  const protocolPools = lendingPools[chainId][protocol];
  return protocolPools.find((pool) =>
    pool.addresses.includes(address),
  ) as LendingPool;
}

function isValidFactory(
  chainId: ChainId,
  protocol: SwapProtocol,
  factory: Factory,
): boolean {
  const allowedFactories = swapFactories[chainId][protocol];
  if (!allowedFactories) {
    return false;
  }
  if (!allowedFactories.includes(factory)) {
    return false;
  }
  return true;
}

function isValidPool(
  chainId: ChainId,
  protocol: LendingProtocol,
  pool: string,
): boolean {
  const allowedPools = lendingPools[chainId][protocol];
  if (!allowedPools) {
    return false;
  }
  return allowedPools.some((list) => list.addresses.includes(pool));
}

function isKnownRouter(chainId: ChainId, address: string): boolean {
  return Object.values(routers[chainId]).some((protocolRouters) =>
    protocolRouters.includes(address),
  );
}

export {
  ChainId,
  Factory,
  LendingPool,
  nativeAsset,
  getFactoryByAddress,
  getPoolByAddress,
  isValidFactory,
  isValidPool,
  isKnownRouter,
};
