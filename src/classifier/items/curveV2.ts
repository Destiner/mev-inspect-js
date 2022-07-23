import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import poolAbi from '../../abi/curveV2.js';
import { Classifier, Pool, PoolData, Swap } from '../base.js';
import { ChainId, getFactories } from '../directory.js';
import { ClassifiedEvent } from '../index.js';

interface CurvePool {
  address: string;
  assets: string[];
  underlyingAssets?: string[];
  metapoolAssets?: string[];
  chainId: ChainId;
}

function isValid(event: Event): boolean {
  return (
    event.name === 'TokenExchange' || event.name === 'TokenExchangeUnderlying'
  );
}

function getPoolCalls(): Call[] {
  return [];
}

function processPoolCalls(
  _results: unknown[],
  address: string,
): PoolData | null {
  const pool = pools.find((pool) => pool.address === address.toLowerCase());
  if (!pool) {
    return null;
  }
  const factory = getFactories(pool.chainId, 'CurveV1')[0];
  if (!factory) {
    return null;
  }
  return {
    factoryAddress: factory.address,
    assets: pool.assets,
  };
}

function parse(pool: Pool, event: ClassifiedEvent): Swap | null {
  const {
    values,
    transactionHash: hash,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;

  const buyer = (values.buyer as string).toLowerCase();
  const sold_id = values.sold_id as number;
  const tokens_sold = (values.tokens_sold as BigNumber).toBigInt();
  const bought_id = values.bought_id as number;
  const tokens_bought = (values.tokens_bought as BigNumber).toBigInt();

  const curvePool = pools.find(
    (curvePool) => curvePool.address === pool.address,
  );
  if (!curvePool) {
    return null;
  }

  const assets =
    event.name === 'TokenExchange'
      ? pool.assets
      : curvePool.metapoolAssets ||
        curvePool.underlyingAssets ||
        curvePool.assets;

  const from = buyer;
  const to = buyer;
  const assetOut = assets[bought_id];
  const amountOut = tokens_bought;
  const assetIn = assets[sold_id];
  const amountIn = tokens_sold;

  return {
    contract: {
      address,
      protocol: {
        abi: 'CurveV2',
        factory: pool.factory,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      hash,
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
    from,
    to,
    assetIn,
    amountIn,
    assetOut,
    amountOut,
    metadata: {},
  };
}

const pools: CurvePool[] = [
  // Ethereum
  {
    chainId: 1,
    address: '0x80466c64868e1ab14a1ddf27a676c3fcbe638fe5',
    assets: [
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    ],
  },
  {
    chainId: 1,
    address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
    assets: [
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    ],
  },
  {
    chainId: 1,
    address: '0x9838eccc42659fa8aa7daf2ad134b53984c9427b',
    assets: [
      '0xc581b735a1688071a1746c968e0798d642ede491',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
  },
  {
    chainId: 1,
    address: '0x98a7f18d4e56cfe84e3d081b40001b3d5bd3eb8b',
    assets: [
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdb25f211ab05b1c97d595516f45794528a807ad8',
    ],
  },
  {
    chainId: 1,
    address: '0x8301ae4fc9c624d1d396cbdaa1ed877821d7c511',
    assets: [
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      '0xd533a949740bb3306d119cc777fa900ba034cd52',
    ],
  },
  {
    chainId: 1,
    address: '0xb576491f1e6e5e62f1d8f26062ee822b40b0e0d4',
    assets: [
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
    ],
  },
  {
    chainId: 1,
    address: '0xadcfcf9894335dc340f6cd182afa45999f45fc44',
    assets: [
      '0x68749665ff8d2d112fa859aa293f07a622782f38',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
  },
  {
    chainId: 1,
    address: '0x98638facf9a3865cd033f36548713183f6996122',
    assets: [
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      '0x090185f2135308bad17527004364ebcc2d37e5f6',
    ],
  },
  {
    chainId: 1,
    address: '0x752ebeb79963cf0732e9c0fec72a49fd1defaeac',
    assets: [
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      '0xcdf7028ceab81fa0c6971208e83fa7872994bee5',
    ],
  },
  // Polygon
  {
    chainId: 137,
    address: '0x751b1e21756bdbc307cbcc5085c042a0e9aaef36',
    assets: [
      '0xe7a24ef0c5e95ffb0f6684b813a78f2a3ad7d171',
      '0x5c2ed810328349100a66b82b78a1791b101c9d61',
      '0x28424507fefb6f7f8e9d3860f56504e4e5f5f390',
    ],
  },
  {
    chainId: 137,
    address: '0x92577943c7ac4accb35288ab2cc84d75fec330af',
    assets: [
      '0xe7a24ef0c5e95ffb0f6684b813a78f2a3ad7d171',
      '0x5c2ed810328349100a66b82b78a1791b101c9d61',
      '0x28424507fefb6f7f8e9d3860f56504e4e5f5f390',
    ],
  },
  {
    chainId: 137,
    address: '0x92215849c439e1f8612b6646060b4e3e5ef822cc',
    assets: [
      '0xe7a24ef0c5e95ffb0f6684b813a78f2a3ad7d171',
      '0x5c2ed810328349100a66b82b78a1791b101c9d61',
      '0x28424507fefb6f7f8e9d3860f56504e4e5f5f390',
    ],
  },
  {
    chainId: 137,
    address: '0xb446bf7b8d6d4276d0c75ec0e3ee8dd7fe15783a',
    assets: [
      '0x7bdf330f423ea880ff95fc41a280fd5ecfd3d09f',
      '0xe7a24ef0c5e95ffb0f6684b813a78f2a3ad7d171',
    ],
  },
  {
    chainId: 137,
    address: '0x9b3d675fdbe6a0935e8b7d1941bc6f78253549b7',
    assets: [
      '0xe111178a87a3bff0c8d18decba5798827539ae99',
      '0xe7a24ef0c5e95ffb0f6684b813a78f2a3ad7d171',
    ],
  },
  // Arbitrum
  {
    chainId: 42161,
    address: '0x960ea3e3c7fb317332d990873d354e18d7645590',
    assets: [
      '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
      '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    ],
  },
  {
    chainId: 42161,
    address: '0xa827a652ead76c6b0b3d19dba05452e06e25c27e',
    assets: [
      '0xd22a58f79e9481d1a88e00c343885a588b34b68b',
      '0x7f90122bf0700f9e7e1f688fe926940e8839f353',
    ],
  },
  // Avalanche
  {
    chainId: 43114,
    address: '0xb755b949c126c04e0348dd881a5cf55d424742b2',
    assets: [
      '0x1337bedc9d22ecbe766df105c9623922a27963ec',
      '0x686bef2417b6dc32c50a3cbfbcc3bb60e1e9a15d',
      '0x53f7c5869a859f0aec3d334ee8b4cf01e3492f21',
    ],
  },
];

const CLASSIFIER: Classifier = {
  type: 'swap',
  protocol: 'CurveV2',
  abi: poolAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};

export default CLASSIFIER;
