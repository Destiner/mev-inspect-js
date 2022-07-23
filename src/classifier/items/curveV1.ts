import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import poolAbi from '../../abi/curveV1.js';
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
        abi: 'CurveV1',
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
    address: '0x2e60cf74d81ac34eb21eeff58db4d385920ef419',
    assets: [
      '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
      '0x39aa39c021dfbae8fac545936693ac917d5e7563',
    ],
    underlyingAssets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    ],
  },
  {
    chainId: 1,
    address: '0x52ea46506b9cc5ef470c5bf89f17dc28bb35d85c',
    assets: [
      '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
      '0x39aa39c021dfbae8fac545936693ac917d5e7563',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
    underlyingAssets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x45f783cce6b7ff23b2ab2d70e416cdb7d6055f51',
    assets: [
      '0x16de59092dae5ccf4a1e6439d611fd0653f0bd01',
      '0xd6ad7a6750a7593e092a9b218d66c0a814a3436e',
      '0x83f798e925bcd4017eb265844fddabb448f1707d',
      '0x73a052500105205d34daf004eab301916da8190f',
    ],
    underlyingAssets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      '0x0000000000085d4780b73119b644ae5ecd22b376',
    ],
  },
  {
    chainId: 1,
    address: '0xa2b47e3d5c44877cca798226b7b8118f9bfb7a56',
    assets: [
      '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
      '0x39aa39c021dfbae8fac545936693ac917d5e7563',
    ],
    underlyingAssets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    ],
  },
  {
    chainId: 1,
    address: '0x79a8c46dea5ada233abaffd40f3a0a2b1e5a4f27',
    assets: [
      '0xc2cb1040220768554cf699b0d863a3cd4324ce32',
      '0x26ea744e5b887e5205727f55dfbe8685e3b21951',
      '0xe6354ed5bc4b393a5aad09f21c46e101e692d447',
      '0x04bc0ab673d88ae9dbc9da2380cb6b79c4bca9ae',
    ],
    underlyingAssets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    ],
  },
  {
    chainId: 1,
    address: '0xa5407eae9ba41422680e2e00537571bcc53efbfd',
    assets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
    ],
    underlyingAssets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
    ],
  },
  {
    chainId: 1,
    address: '0x06364f10b501e868329afbc005b3492902d6c763',
    assets: [
      '0x99d1fa417f94dcd62bfe781a1213c092a47041bc',
      '0x9777d7e2b60bb01759d0e2f8be2095df444cb07e',
      '0x1be5d71f2da660bfdee8012ddc58d024448a0a59',
      '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
    ],
    underlyingAssets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
    ],
  },
  {
    chainId: 1,
    address: '0x93054188d876f558f4a66b2ef1d97d16edf0895b',
    assets: [
      '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
      '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    ],
  },
  {
    chainId: 1,
    address: '0x7fc77b5c7614e1533320ea6ddc2eb61fa00a9714',
    assets: [
      '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
      '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6',
    ],
  },
  {
    chainId: 1,
    address: '0x4ca9b3063ec5866a4b82e437059d2c43d1be596f',
    assets: [
      '0x0316eb71485b0ab14103307bf65a021042c6d380',
      '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    ],
  },
  {
    chainId: 1,
    address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
    assets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x4f062658eaaf2c1ccf8c8e36d6824cdf41167956',
    assets: [
      '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x3ef6a01a0f81d6046290f3e2a8c5b843e738e604',
    assets: [
      '0xdf574c24545e5ffecb9a659c229253d4111d87e1',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0xdf574c24545e5ffecb9a659c229253d4111d87e1',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x3e01dd8a5e1fb3481f0f589056b428fc308af0fb',
    assets: [
      '0x1c48f86ae57291f7686349f12601910bd8d470bb',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x1c48f86ae57291f7686349f12601910bd8d470bb',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x0f9cb53ebe405d49a0bbdbd291a65ff571bc83e1',
    assets: [
      '0x674c6ad92fd080e4004b2312b45f796a192d27a0',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x674c6ad92fd080e4004b2312b45f796a192d27a0',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0xe7a24ef0c5e95ffb0f6684b813a78f2a3ad7d171',
    assets: [
      '0x0e2ec54fc0b509f445631bf4b91ab8168230c752',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x0e2ec54fc0b509f445631bf4b91ab8168230c752',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x8474ddbe98f5aa3179b3b3f5942d724afcdec9f6',
    assets: [
      '0xe2f2a5c287993345a840db3b0845fbc70f5935a5',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0xe2f2a5c287993345a840db3b0845fbc70f5935a5',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0xc18cc39da8b11da8c3541c598ee022258f9744da',
    assets: [
      '0x196f4727526ea7fb1e17b2071b3d8eaa38486988',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x196f4727526ea7fb1e17b2071b3d8eaa38486988',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0xc25099792e9349c7dd09759744ea681c7de2cb66',
    assets: [
      '0x8daebade922df735c38c80c7ebd708af50815faa',
      '0x075b1bb99792c9e1041ba13afef80c91a1e70fb3',
    ],
    metapoolAssets: [
      '0x8daebade922df735c38c80c7ebd708af50815faa',
      '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
      '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6',
    ],
  },
  {
    chainId: 1,
    address: '0x8038c01a0390a8c547446a0b2c18fc9aefecc10c',
    assets: [
      '0x5bc25f649fc4e26069ddf4cf4010f9f706c23831',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x5bc25f649fc4e26069ddf4cf4010f9f706c23831',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x7f55dde206dbad629c080068923b36fe9d6bdbef',
    assets: [
      '0x5228a22e72ccc52d415ecfd199f99d0665e7733b',
      '0x075b1bb99792c9e1041ba13afef80c91a1e70fb3',
    ],
    metapoolAssets: [
      '0x5228a22e72ccc52d415ecfd199f99d0665e7733b',
      '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
      '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6',
    ],
  },
  {
    chainId: 1,
    address: '0x071c661b4deefb59e2a3ddb20db036821eee8f4b',
    assets: [
      '0x9be89d2a4cd102d8fecc6bf9da793be995c22541',
      '0x075b1bb99792c9e1041ba13afef80c91a1e70fb3',
    ],
    metapoolAssets: [
      '0x9be89d2a4cd102d8fecc6bf9da793be995c22541',
      '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
      '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6',
    ],
  },
  {
    chainId: 1,
    address: '0xd81da8d904b52208541bade1bd6595d8a251f8dd',
    assets: [
      '0x8064d9ae6cdf087b1bcd5bdf3531bd5d8c537a68',
      '0x075b1bb99792c9e1041ba13afef80c91a1e70fb3',
    ],
    metapoolAssets: [
      '0x8064d9ae6cdf087b1bcd5bdf3531bd5d8c537a68',
      '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
      '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6',
    ],
  },
  {
    chainId: 1,
    address: '0x890f4e345b1daed0367a877a1612f86a1f86985f',
    assets: [
      '0xa47c8bf37f92abed4a126bda807a7b7498661acd',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0xa47c8bf37f92abed4a126bda807a7b7498661acd',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x0ce6a5ff5217e38315f87032cf90686c96627caa',
    assets: [
      '0xdb25f211ab05b1c97d595516f45794528a807ad8',
      '0xd71ecff9342a5ced620049e616c5035f1db98620',
    ],
  },
  {
    chainId: 1,
    address: '0xc5424b857f758e906013f3555dad202e4bdb4567',
    assets: [
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb',
    ],
  },
  {
    chainId: 1,
    address: '0xdebf20617708857ebe4f679508e7b7863a8a8eee',
    assets: [
      '0x028171bca77440897b824ca71d1c56cac55b68a3',
      '0xbcca60bb61934080951369a648fb03df4f96263c',
      '0x3ed3b47dd13ec9a98b44e6204a523e766b225811',
    ],
    underlyingAssets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0xdc24316b9ae028f1497c275eb9192a3ea0f67022',
    assets: [
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    ],
  },
  {
    chainId: 1,
    address: '0xeb16ae0052ed37f479f7fe63849198df1765a733',
    assets: [
      '0x028171bca77440897b824ca71d1c56cac55b68a3',
      '0x6c5024cd4f8a59110119c56f8933403a539555eb',
    ],
    underlyingAssets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
    ],
  },
  {
    chainId: 1,
    address: '0xa96a65c051bf88b4095ee1f2451c2a9d43f53ae2',
    assets: [
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      '0xe95a203b1a91a908f9b9ce46459d101078c2c3cb',
    ],
  },
  {
    chainId: 1,
    address: '0x2dded6da1bf5dbdf597c45fcfaa3194e53ecfeaf',
    assets: [
      '0x8e595470ed749b85c6f7669de83eae304c2ec68f',
      '0x76eb2fe28b36b3ee97f3adae0c69606eedb2a37c',
      '0x48759f220ed983db51fa7a8c0d2aab8f3ce4166a',
    ],
    underlyingAssets: [
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0xf178c0b5bb7e7abf4e12a4838c7b7c5ba2c623c0',
    assets: [
      '0x514910771af9ca656af840dff83e8264ecf986ca',
      '0xbbc455cb4f1b9e4bfc4b73970d360c8f032efee6',
    ],
  },
  {
    chainId: 1,
    address: '0x42d7025938bec20b69cbae5a77421082407f053a',
    assets: [
      '0x1456688345527be1f37e9e627da0837d6f08c925',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x1456688345527be1f37e9e627da0837d6f08c925',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x43b4fdfd4ff969587185cdb6f0bd875c5fc83f8c',
    assets: [
      '0xbc6da0fe9ad5f3b0d58160288917aa56653660e9',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0xbc6da0fe9ad5f3b0d58160288917aa56653660e9',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0xd632f22692fac7611d2aa1c0d552930d43caed3b',
    assets: [
      '0x853d955acef822db058eb8505911ed77f175b99e',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x853d955acef822db058eb8505911ed77f175b99e',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0xecd5e75afb02efa118af914515d6521aabd189f1',
    assets: [
      '0x0000000000085d4780b73119b644ae5ecd22b376',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x0000000000085d4780b73119b644ae5ecd22b376',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca',
    assets: [
      '0x5f98805a4e8be255a32880fdec7f6728c6568ba0',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x5f98805a4e8be255a32880fdec7f6728c6568ba0',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x4807862aa8b2bf68830e4c8dc86d0e9a998e085a',
    assets: [
      '0x4fabb145d64652a948d72533023f6e7a623c7c53',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x4fabb145d64652a948d72533023f6e7a623c7c53',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0xf9440930043eb3997fc70e1339dbb11f341de7a8',
    assets: [
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      '0x9559aaa82d9649c7a7b220e7c461d2e74c9a3593',
    ],
  },
  {
    chainId: 1,
    address: '0x5a6a4d54456819380173272a5e8e9b9904bdf41b',
    assets: [
      '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0xfd5db7463a3ab53fd211b4af195c5bccc1a03890',
    assets: [
      '0xc581b735a1688071a1746c968e0798d642ede491',
      '0xd71ecff9342a5ced620049e616c5035f1db98620',
    ],
  },
  {
    chainId: 1,
    address: '0x618788357d0ebd8a37e763adab3bc575d54c2c7d',
    assets: [
      '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919',
      '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    ],
    metapoolAssets: [
      '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x1005f7406f32a61bd760cfa14accd2737913d546',
    assets: [
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
  },
  {
    chainId: 1,
    address: '0x4e0915c88bc70750d68c481540f081fefaf22273',
    assets: [
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      '0xa693b19d2931d498c5b318df961919bb4aee87a5',
      '0x853d955acef822db058eb8505911ed77f175b99e',
    ],
  },
  {
    chainId: 1,
    address: '0xdcef968d416a41cdac0ed8702fac8128a64241a2',
    assets: [
      '0x853d955acef822db058eb8505911ed77f175b99e',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    ],
  },
  // Optimism
  {
    chainId: 10,
    address: '0x1337bedc9d22ecbe766df105c9623922a27963ec',
    assets: [
      '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
      '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
      '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    ],
  },
  // Polygon
  {
    chainId: 137,
    address: '0x445fe580ef8d70ff569ab36e80c647af338db351',
    assets: [
      '0x27f8d03b3a2196956ed754badc28d73be8830a6e',
      '0x1a13f4ca1d028320a707d99520abfefca3998b7f',
      '0x60d55f02a771d515e077c9c2403a1ef324885cec',
    ],
    underlyingAssets: [
      '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
      '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    ],
  },
  {
    chainId: 137,
    address: '0xc2d95eef97ec6c17551d45e77b590dc1f9117c67',
    assets: [
      '0x5c2ed810328349100a66b82b78a1791b101c9d61',
      '0xdbf31df14b66535af65aac99c32e9ea844e14501',
    ],
    underlyingAssets: [
      '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
      '0xdbf31df14b66535af65aac99c32e9ea844e14501',
    ],
  },
  // Arbitrum
  {
    chainId: 42161,
    address: '0x7f90122bf0700f9e7e1f688fe926940e8839f353',
    assets: [
      '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    ],
  },
  {
    chainId: 42161,
    address: '0x3e01dd8a5e1fb3481f0f589056b428fc308af0fb',
    assets: [
      '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      '0xdbf31df14b66535af65aac99c32e9ea844e14501',
    ],
  },
  // Avalanche
  {
    chainId: 43114,
    address: '0x7f90122bf0700f9e7e1f688fe926940e8839f353',
    assets: [
      '0x47afa96cdc9fab46904a55a6ad4bf6660b53c38a',
      '0x46a51127c3ce23fb7ab1de06226147f446e4a857',
      '0x532e6537fea298397212f09a61e03311686f548e',
    ],
    underlyingAssets: [
      '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
      '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
      '0xc7198437980c041c805a1edcba50c1ce5db95118',
    ],
  },
  {
    chainId: 43114,
    address: '0x16a7da911a4dd1d83f3ff066fe28f3c792c50d90',
    assets: [
      '0x686bef2417b6dc32c50a3cbfbcc3bb60e1e9a15d',
      '0xdbf31df14b66535af65aac99c32e9ea844e14501',
    ],
    underlyingAssets: [
      '0x50b7545627a5162f82a992c33b87adc75187b218',
      '0xdbf31df14b66535af65aac99c32e9ea844e14501',
    ],
  },
  {
    chainId: 43114,
    address: '0xd2acae14ae2ee0f6557ac6c6d0e407a92c36214b',
    assets: [
      '0x82e64f49ed5ec1bc6e43dad4fc8af9bb3a2312ee',
      '0x625e7708f30ca75bfd92586e17077590c60eb4cd',
      '0x6ab707aca953edaefbc4fd23ba73294241490620',
    ],
    underlyingAssets: [
      '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
      '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
      '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
    ],
  },
];

const CLASSIFIER: Classifier = {
  type: 'swap',
  protocol: 'CurveV1',
  abi: poolAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};

export default CLASSIFIER;
