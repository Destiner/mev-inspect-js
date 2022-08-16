import { SwapProtocol, LendingProtocol, NftSwapProtocol } from './base.js';

const ETHEREUM = 1;
const OPTIMISM = 10;
const POLYGON = 137;
const ARBITRUM = 42161;
const AVALANCHE = 43114;

type ChainId =
  | typeof ETHEREUM
  | typeof OPTIMISM
  | typeof POLYGON
  | typeof ARBITRUM
  | typeof AVALANCHE;

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
  [OPTIMISM]: '0x4200000000000000000000000000000000000006',
  [POLYGON]: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  [ARBITRUM]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  [AVALANCHE]: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
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
    ZeroExV3: [
      {
        address: '0x61935cbdd02287b511119ddb11aeb42f1593b7ef',
        label: '0x V3',
      },
    ],
    ZeroExV4: [
      {
        address: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
        label: '0x V4',
      },
    ],
    CurveV1: [
      {
        address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
        label: 'Curve V1',
      },
    ],
    CurveV2: [
      {
        address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
        label: 'Curve V2',
      },
    ],
    BancorV2: [
      {
        address: '0x2f9ec37d6ccfff1cab21733bdadede11c823ccb0',
        label: 'Bancor V2',
      },
    ],
    BancorV3: [
      {
        address: '0xeef417e1d5cc832e619ae18d2f140de2999dd4fb',
        label: 'Bancor V3',
      },
    ],
  },
  [OPTIMISM]: {
    UniswapV2: [
      {
        address: '0x8bcedd62dd46f1a76f8a1633d4f5b76e0cda521e',
        label: 'ZipSwap',
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
        label: 'Beethoven',
      },
    ],
    ZeroExV3: [],
    ZeroExV4: [
      {
        address: '0xdef1abe32c034e558cdd535791643c58a13acc10',
        label: '0x V4',
      },
    ],
    CurveV1: [
      {
        address: '0x2db0e83599a91b508ac268a6197b8b14f5e72840',
        label: 'Curve V1',
      },
    ],
    CurveV2: [
      {
        address: '0x2db0e83599a91b508ac268a6197b8b14f5e72840',
        label: 'Curve V2',
      },
    ],
    BancorV2: [],
    BancorV3: [],
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
    ZeroExV3: [],
    ZeroExV4: [
      {
        address: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
        label: '0x V4',
      },
    ],
    CurveV1: [
      {
        address: '0x722272d36ef0da72ff51c5a65db7b870e2e8d4ee',
        label: 'Curve V1',
      },
    ],
    CurveV2: [
      {
        address: '0x722272d36ef0da72ff51c5a65db7b870e2e8d4ee',
        label: 'Curve V2',
      },
    ],
    BancorV2: [],
    BancorV3: [],
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
    ZeroExV3: [],
    ZeroExV4: [],
    CurveV1: [
      {
        address: '0xb17b674d9c5cb2e441f8e196a2f048a81355d031',
        label: 'Curve V1',
      },
    ],
    CurveV2: [
      {
        address: '0xb17b674d9c5cb2e441f8e196a2f048a81355d031',
        label: 'Curve V2',
      },
    ],
    BancorV2: [],
    BancorV3: [],
  },
  [AVALANCHE]: {
    UniswapV2: [
      {
        address: '0x9ad6c38be94206ca50bb0d90783181662f0cfa10',
        label: 'Trader Joe',
      },
      {
        address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
        label: 'Sushiswap',
      },
    ],
    UniswapV3: [],
    BalancerV1: [],
    BalancerV2: [],
    ZeroExV3: [],
    ZeroExV4: [
      {
        address: '0xdef1abe32c034e558cdd535791643c58a13acc10',
        label: '0x V4',
      },
    ],
    CurveV1: [
      {
        address: '0xb17b674d9c5cb2e441f8e196a2f048a81355d031',
        label: 'Curve V1',
      },
    ],
    CurveV2: [
      {
        address: '0xb17b674d9c5cb2e441f8e196a2f048a81355d031',
        label: 'Curve V2',
      },
    ],
    BancorV2: [],
    BancorV3: [],
  },
};

const nftSwapFactories: Record<ChainId, Record<NftSwapProtocol, Factory[]>> = {
  [ETHEREUM]: {
    LooksRareV1: [
      {
        address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
        label: 'LooksRare V1',
      },
    ],
    X2Y2V1: [
      {
        address: '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3',
        label: 'X2Y2 V1',
      },
    ],
    OpenseaSeaport: [
      {
        address: '0x00000000006c3852cbef3e08e8df289169ede581',
        label: 'OpenSea: Seaport V1.1',
      },
    ],
    SudoswapV1: [
      {
        address: '0xb16c1342e617a5b6e4b631eb114483fdb289c0a4',
        label: 'Sudoswap V1',
      },
    ],
  },
  [OPTIMISM]: {
    LooksRareV1: [], // TODO
    X2Y2V1: [], // TODO
    OpenseaSeaport: [], // TODO
    SudoswapV1: [], // TODO
  },
  [POLYGON]: {
    LooksRareV1: [], // TODO
    X2Y2V1: [], // TODO
    OpenseaSeaport: [], // TODO
    SudoswapV1: [], // TODO
  },
  [ARBITRUM]: {
    LooksRareV1: [], // TODO
    X2Y2V1: [], // TODO
    OpenseaSeaport: [], // TODO
    SudoswapV1: [], // TODO
  },
  [AVALANCHE]: {
    LooksRareV1: [], // TODO
    X2Y2V1: [], // TODO
    OpenseaSeaport: [], // TODO
    SudoswapV1: [], // TODO
  },
};

const lendingPools: Record<ChainId, Record<LendingProtocol, LendingPool[]>> = {
  [ETHEREUM]: {
    CompoundV2: [
      {
        addresses: ['0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b'],
        label: 'Compound V2',
      },
      {
        addresses: ['0x3d5bc3c8d13dcb8bf317092d84783c2697ae9258'],
        label: 'Cream',
      },
    ],
    AaveV1: [
      {
        addresses: ['0x398ec7346dcd622edc5ae82352f02be94c62d119'],
        label: 'Aave V1',
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
  [OPTIMISM]: {
    CompoundV2: [],
    AaveV1: [],
    AaveV2: [],
    AaveV3: [
      {
        addresses: ['0x794a61358d6845594f94dc1db02a252b5b4814ad'],
        label: 'Aave V3',
      },
    ],
  },
  [POLYGON]: {
    CompoundV2: [
      {
        addresses: ['0x20ca53e2395fa571798623f1cfbd11fe2c114c24'],
        label: 'Cream',
      },
    ],
    AaveV1: [],
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
    CompoundV2: [
      {
        addresses: ['0xbadac56c9aca307079e8b8fc699987aac89813ee'],
        label: 'Cream',
      },
    ],
    AaveV1: [],
    AaveV2: [],
    AaveV3: [
      {
        addresses: ['0x794a61358d6845594f94dc1db02a252b5b4814ad'],
        label: 'Aave V3',
      },
    ],
  },
  [AVALANCHE]: {
    CompoundV2: [],
    AaveV1: [],
    AaveV2: [
      {
        addresses: ['0x4f01aed16d97e3ab5ab2b501154dc9bb0f1a5a2c'],
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
    ZeroExV3: [],
    ZeroExV4: [],
    CurveV1: [],
    CurveV2: [],
    BancorV2: [],
    BancorV3: [],
  },
  [OPTIMISM]: {
    UniswapV2: [],
    UniswapV3: [
      '0xe592427a0aece92de3edee1f18e0157c05861564',
      '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
    ],
    BalancerV1: [],
    BalancerV2: ['0xba12222222228d8ba445958a75a0704d566bf2c8'],
    ZeroExV3: [],
    ZeroExV4: [],
    CurveV1: [],
    CurveV2: [],
    BancorV2: [],
    BancorV3: [],
  },
  [POLYGON]: {
    UniswapV2: ['0x1b02da8cb0d097eb8d57a175b88c7d8b47997506'],
    UniswapV3: [
      '0xe592427a0aece92de3edee1f18e0157c05861564',
      '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
    ],
    BalancerV1: [],
    BalancerV2: ['0xba12222222228d8ba445958a75a0704d566bf2c8'],
    ZeroExV3: [],
    ZeroExV4: [],
    CurveV1: [],
    CurveV2: [],
    BancorV2: [],
    BancorV3: [],
  },
  [ARBITRUM]: {
    UniswapV2: ['0x1b02da8cb0d097eb8d57a175b88c7d8b47997506'],
    UniswapV3: [
      '0xe592427a0aece92de3edee1f18e0157c05861564',
      '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
    ],
    BalancerV1: [],
    BalancerV2: ['0xba12222222228d8ba445958a75a0704d566bf2c8'],
    ZeroExV3: [],
    ZeroExV4: [],
    CurveV1: [],
    CurveV2: [],
    BancorV2: [],
    BancorV3: [],
  },
  [AVALANCHE]: {
    UniswapV2: [
      '0x60ae616a2155ee3d9a68541ba4544862310933d4',
      '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
    ],
    UniswapV3: [],
    BalancerV1: [],
    BalancerV2: [],
    ZeroExV3: [],
    ZeroExV4: [],
    CurveV1: [],
    CurveV2: [],
    BancorV2: [],
    BancorV3: [],
  },
};

function getFactories(chainId: ChainId, protocol: SwapProtocol): Factory[] {
  return swapFactories[chainId][protocol];
}

function getFactoryByAddress(
  chainId: ChainId,
  protocol: SwapProtocol,
  address: string,
): Factory | undefined {
  const protocolFactories = swapFactories[chainId][protocol];
  return protocolFactories.find((factory) => factory.address === address);
}

function getNftFactoryByAddress(
  chainId: ChainId,
  protocol: NftSwapProtocol,
  address: string,
): Factory | undefined {
  const protocolFactories = nftSwapFactories[chainId][protocol];
  return protocolFactories.find((factory) => factory.address === address);
}

function getPoolByAddress(
  chainId: ChainId,
  protocol: LendingProtocol,
  address: string,
): LendingPool | undefined {
  const protocolPools = lendingPools[chainId][protocol];
  return protocolPools.find((pool) => pool.addresses.includes(address));
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

function isValidNftFactory(
  chainId: ChainId,
  protocol: NftSwapProtocol,
  factory: Factory,
): boolean {
  const allowedFactories = nftSwapFactories[chainId][protocol];
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
  getFactories,
  getFactoryByAddress,
  getNftFactoryByAddress,
  getPoolByAddress,
  isValidFactory,
  isValidNftFactory,
  isValidPool,
  isKnownRouter,
};
