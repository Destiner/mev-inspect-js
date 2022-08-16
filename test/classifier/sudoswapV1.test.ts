import { describe, test, expect } from 'vitest';

import { Log } from '../../src/chain.js';
import { NftPool, NftSwap } from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import classifier, {
  getEffectivePrice,
} from '../../src/classifier/items/sudoswapV1.js';

describe('Classfiers: Sudoswap V1', () => {
  test('buy nft', () => {
    if (classifier.type !== 'nft_swap') {
      expect.fail();
    }

    // eth pool
    const poolA: NftPool = {
      address: '0xabe510775ac71bbfb4308a9bdf54c9e8dbd6ce50',
      factory: {
        address: '0xb16c1342e617a5b6e4b631eb114483fdb289c0a4',
        label: 'Sudoswap V1',
      },
      asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      collection: '0x42069abfe407c60cf4ae4112bedead391dba1cdb',
      metadata: {
        fee: 25_000_000_000_000_000n,
        delta: 80_000_000_000_000_000n,
        type: 'exponential',
      },
    };
    const eventA: ClassifiedEvent = {
      address: '0xabe510775ac71bbfb4308a9bdf54c9e8dbd6ce50',
      blockHash:
        '0xac533604be05e12eb5c0927b96eb37dfb8c73b23967c57ba65e5d0e5fa60f347',
      blockNumber: 15329509,
      transactionHash:
        '0xc9788be0bde38c9cfdda3530fc3c113273a73ddcf5be05b380190c3de70259d0',
      gasUsed: 170731,
      logIndex: 292,
      classifier,
      name: 'SwapNFTOutPair',
      values: {},
    };
    const logsA: Log[] = [
      {
        blockNumber: 15329509,
        transactionHash:
          '0xc9788be0bde38c9cfdda3530fc3c113273a73ddcf5be05b380190c3de70259d0',
        address: '0xaBe510775aC71bBfB4308A9Bdf54C9e8DbD6cE50',
        topics: [
          '0xf06180fdbe95e5193df4dcd1352726b1f04cb58599ce58552cc952447af2ffbb',
        ],
        data: '0x0000000000000000000000000000000000000000000000002c01515f8ab739f7',
        logIndex: 289,
        blockHash:
          '0xac533604be05e12eb5c0927b96eb37dfb8c73b23967c57ba65e5d0e5fa60f347',
        gasUsed: 170731,
      },
      {
        blockNumber: 15329509,
        transactionHash:
          '0xc9788be0bde38c9cfdda3530fc3c113273a73ddcf5be05b380190c3de70259d0',
        address: '0x42069ABFE407C60cf4ae4112bEDEaD391dBa1cdB',
        topics: [
          '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
          '0x000000000000000000000000abe510775ac71bbfb4308a9bdf54c9e8dbd6ce50',
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x0000000000000000000000000000000000000000000000000000000000000635',
        ],
        data: '0x',
        logIndex: 290,
        blockHash:
          '0xac533604be05e12eb5c0927b96eb37dfb8c73b23967c57ba65e5d0e5fa60f347',
        gasUsed: 170731,
      },
      {
        blockNumber: 15329509,
        transactionHash:
          '0xc9788be0bde38c9cfdda3530fc3c113273a73ddcf5be05b380190c3de70259d0',
        address: '0x42069ABFE407C60cf4ae4112bEDEaD391dBa1cdB',
        topics: [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          '0x000000000000000000000000abe510775ac71bbfb4308a9bdf54c9e8dbd6ce50',
          '0x000000000000000000000000147ef3a8a05ef25ff4d8d605b43e9322c3d43a7a',
          '0x0000000000000000000000000000000000000000000000000000000000000635',
        ],
        data: '0x',
        logIndex: 291,
        blockHash:
          '0xac533604be05e12eb5c0927b96eb37dfb8c73b23967c57ba65e5d0e5fa60f347',
        gasUsed: 170731,
      },
      {
        blockNumber: 15329509,
        transactionHash:
          '0xc9788be0bde38c9cfdda3530fc3c113273a73ddcf5be05b380190c3de70259d0',
        address: '0xaBe510775aC71bBfB4308A9Bdf54C9e8DbD6cE50',
        topics: [
          '0xbc479dfc6cb9c1a9d880f987ee4b30fa43dd7f06aec121db685b67d587c93c93',
        ],
        data: '0x',
        logIndex: 292,
        blockHash:
          '0xac533604be05e12eb5c0927b96eb37dfb8c73b23967c57ba65e5d0e5fa60f347',
        gasUsed: 170731,
      },
    ];

    const swapA = classifier.parse(poolA, eventA, 1, logsA);
    expect(swapA).toEqual<NftSwap>({
      block: {
        number: 15329509,
        hash: '0xac533604be05e12eb5c0927b96eb37dfb8c73b23967c57ba65e5d0e5fa60f347',
      },
      transaction: {
        hash: '0xc9788be0bde38c9cfdda3530fc3c113273a73ddcf5be05b380190c3de70259d0',
        gasUsed: 170731,
      },
      event: {
        address: '0xabe510775ac71bbfb4308a9bdf54c9e8dbd6ce50',
        logIndex: 292,
      },
      contract: {
        address: '0xabe510775ac71bbfb4308a9bdf54c9e8dbd6ce50',
        protocol: {
          abi: 'SudoswapV1',
          factory: {
            address: '0xb16c1342e617a5b6e4b631eb114483fdb289c0a4',
            label: 'Sudoswap V1',
          },
        },
      },
      from: '0x147ef3a8a05ef25ff4d8d605b43e9322c3d43a7a',
      to: '0x147ef3a8a05ef25ff4d8d605b43e9322c3d43a7a',
      assetIn: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountIn: 3266032235939642947n,
      assetOut: {
        type: 'erc721',
        collection: '0x42069abfe407c60cf4ae4112bedead391dba1cdb',
        id: 1589n,
      },
      amountOut: 1n,
    });

    // erc20 pool
  });

  test('sell nft', () => {
    if (classifier.type !== 'nft_swap') {
      expect.fail();
    }

    // eth pool
    const poolA: NftPool = {
      address: '0xabe510775ac71bbfb4308a9bdf54c9e8dbd6ce50',
      factory: {
        address: '0xb16c1342e617a5b6e4b631eb114483fdb289c0a4',
        label: 'Sudoswap V1',
      },
      asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      collection: '0x42069abfe407c60cf4ae4112bedead391dba1cdb',
      metadata: {
        fee: 25_000_000_000_000_000n,
        delta: 80_000_000_000_000_000n,
        type: 'exponential',
      },
    };
    const eventA: ClassifiedEvent = {
      address: '0xabe510775ac71bbfb4308a9bdf54c9e8dbd6ce50',
      blockHash:
        '0xfa338cadbfd2d2158bc1d6f08cd9e513c4c5d4ba2ca65c29c897f600b8e4eb16',
      blockNumber: 15334408,
      transactionHash:
        '0x047addccc95ea21b623a042e255d90216fa6de28e6ccd336e657f310babc2411',
      gasUsed: 156230,
      logIndex: 62,
      classifier,
      name: 'SwapNFTInPair',
      values: {},
    };
    const logsA: Log[] = [
      {
        blockNumber: 15334408,
        transactionHash:
          '0x047addccc95ea21b623a042e255d90216fa6de28e6ccd336e657f310babc2411',
        address: '0xaBe510775aC71bBfB4308A9Bdf54C9e8DbD6cE50',
        topics: [
          '0xf06180fdbe95e5193df4dcd1352726b1f04cb58599ce58552cc952447af2ffbb',
        ],
        data: '0x00000000000000000000000000000000000000000000000028bed9915a83ba66',
        logIndex: 59,
        blockHash:
          '0xfa338cadbfd2d2158bc1d6f08cd9e513c4c5d4ba2ca65c29c897f600b8e4eb16',
        gasUsed: 156230,
      },
      {
        blockNumber: 15334408,
        transactionHash:
          '0x047addccc95ea21b623a042e255d90216fa6de28e6ccd336e657f310babc2411',
        address: '0x42069ABFE407C60cf4ae4112bEDEaD391dBa1cdB',
        topics: [
          '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
          '0x0000000000000000000000007fa247daa39dc2389ef4c3cd39f6f71ac415d911',
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x0000000000000000000000000000000000000000000000000000000000000692',
        ],
        data: '0x',
        logIndex: 60,
        blockHash:
          '0xfa338cadbfd2d2158bc1d6f08cd9e513c4c5d4ba2ca65c29c897f600b8e4eb16',
        gasUsed: 156230,
      },
      {
        blockNumber: 15334408,
        transactionHash:
          '0x047addccc95ea21b623a042e255d90216fa6de28e6ccd336e657f310babc2411',
        address: '0x42069ABFE407C60cf4ae4112bEDEaD391dBa1cdB',
        topics: [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          '0x0000000000000000000000007fa247daa39dc2389ef4c3cd39f6f71ac415d911',
          '0x000000000000000000000000abe510775ac71bbfb4308a9bdf54c9e8dbd6ce50',
          '0x0000000000000000000000000000000000000000000000000000000000000692',
        ],
        data: '0x',
        logIndex: 61,
        blockHash:
          '0xfa338cadbfd2d2158bc1d6f08cd9e513c4c5d4ba2ca65c29c897f600b8e4eb16',
        gasUsed: 156230,
      },
      {
        blockNumber: 15334408,
        transactionHash:
          '0x047addccc95ea21b623a042e255d90216fa6de28e6ccd336e657f310babc2411',
        address: '0xaBe510775aC71bBfB4308A9Bdf54C9e8DbD6cE50',
        topics: [
          '0x3614eb567740a0ee3897c0e2b11ad6a5720d2e4438f9c8accf6c95c24af3a470',
        ],
        data: '0x',
        logIndex: 62,
        blockHash:
          '0xfa338cadbfd2d2158bc1d6f08cd9e513c4c5d4ba2ca65c29c897f600b8e4eb16',
        gasUsed: 156230,
      },
    ];

    const swapA = classifier.parse(poolA, eventA, 1, logsA);
    expect(swapA).toEqual<NftSwap>({
      block: {
        number: 15334408,
        hash: '0xfa338cadbfd2d2158bc1d6f08cd9e513c4c5d4ba2ca65c29c897f600b8e4eb16',
      },
      transaction: {
        hash: '0x047addccc95ea21b623a042e255d90216fa6de28e6ccd336e657f310babc2411',
        gasUsed: 156230,
      },
      event: {
        address: '0xabe510775ac71bbfb4308a9bdf54c9e8dbd6ce50',
        logIndex: 62,
      },
      contract: {
        address: '0xabe510775ac71bbfb4308a9bdf54c9e8dbd6ce50',
        protocol: {
          abi: 'SudoswapV1',
          factory: {
            address: '0xb16c1342e617a5b6e4b631eb114483fdb289c0a4',
            label: 'Sudoswap V1',
          },
        },
      },
      from: '0x7fa247daa39dc2389ef4c3cd39f6f71ac415d911',
      to: '0x7fa247daa39dc2389ef4c3cd39f6f71ac415d911',
      assetIn: {
        type: 'erc721',
        collection: '0x42069abfe407c60cf4ae4112bedead391dba1cdb',
        id: 1682n,
      },
      amountIn: 1n,
      assetOut: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountOut: 3075777930933450150n,
    });

    // erc20 pool
  });

  test('getEffectivePrice', () => {
    const FEE_A = 25_000_000_000_000_000n;
    const DELTA_A = 7_500_000_000_000_000n;
    expect(
      getEffectivePrice(
        'exponential',
        FEE_A,
        DELTA_A,
        328431178488150610n,
        true,
      ),
    ).toEqual<bigint>(320967579957007386n);
    expect(
      getEffectivePrice(
        'exponential',
        FEE_A,
        DELTA_A,
        330894412326811739n,
        false,
      ),
    ).toEqual<bigint>(340821244696616090n);

    const FEE_B = 25_000_000_000_000_000n;
    const DELTA_B = 80_000_000_000_000_000n;
    expect(
      getEffectivePrice(
        'exponential',
        FEE_B,
        DELTA_B,
        2936023225404209766n,
        true,
      ),
    ).toEqual<bigint>(3075777930933450150n);
    expect(
      getEffectivePrice(
        'exponential',
        FEE_B,
        DELTA_B,
        3170905083436546551n,
        false,
      ),
    ).toEqual<bigint>(3266032235939642947n);

    const FEE_C = 200_000_000_000_000_000n;
    const DELTA_C = 100_000_000_000_000_000n;
    expect(
      getEffectivePrice(
        'exponential',
        FEE_C,
        DELTA_C,
        301772915880799688n,
        true,
      ),
    ).toEqual<bigint>(263900414937759326n);
    expect(
      getEffectivePrice(
        'exponential',
        FEE_C,
        DELTA_C,
        588070041493775929n,
        false,
      ),
    ).toEqual<bigint>(708624399999999994n);

    const FEE_D = 20_000_000_000_000_000n;
    const DELTA_D = 1_000_000_000_000_000n;
    expect(
      getEffectivePrice('linear', FEE_D, DELTA_D, 37024390243902445n, true),
    ).toEqual<bigint>(37073780487804883n);
    expect(
      getEffectivePrice('linear', FEE_D, DELTA_D, 38024390243902445n, false),
    ).toEqual<bigint>(38975000000000006n);
  });
});
