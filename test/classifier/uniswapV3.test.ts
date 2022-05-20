import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import { Pool, Transfer } from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import classifier from '../../src/classifier/items/uniswapV3.js';
import { Swap } from '../../src/index.js';

describe('Classfiers: Uniswap V3', () => {
  test('parses a swap', () => {
    const poolA: Pool = {
      address: '0x19f83460e387f1b01f94b85c2532ebc15b0b712e',
      assets: [
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
        '0xfa14fa6958401314851a17d6c5360ca29f74b57b',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const eventA: ClassifiedEvent = {
      address: '0x19f83460e387F1b01F94b85c2532EBC15B0b712e',
      transactionHash:
        '0x6373b817e41616524dd322ccfb55cf9dc75620f91beaae65c23d028f9036705d',
      gasUsed: 127295,
      logIndex: 35,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        recipient: '0x6c309614D7EFd5633fF34d4C455f0Ca213271048',
        amount0: BigNumber.from('-5164834278'),
        amount1: BigNumber.from('300000000000000000000000'),
        sqrtPriceX96: BigNumber.from('605186618988380239203360521488605796'),
        liquidity: BigNumber.from('5236922016626795541'),
        tick: 316990,
      },
    };
    const transfersA: Transfer[] = [
      {
        asset: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        from: '0x19f83460e387f1b01f94b85c2532ebc15b0b712e',
        to: '0x6c309614d7efd5633ff34d4c455f0ca213271048',
        value: 5164834278n,
        transaction: {
          hash: '0x6373b817e41616524dd322ccfb55cf9dc75620f91beaae65c23d028f9036705d',
          gasUsed: 127295,
        },
        event: {
          logIndex: 32,
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
      },
      {
        asset: '0xfa14fa6958401314851a17d6c5360ca29f74b57b',
        from: '0x6c309614d7efd5633ff34d4c455f0ca213271048',
        to: '0x19f83460e387f1b01f94b85c2532ebc15b0b712e',
        value: 300000000000000000000000n,
        transaction: {
          hash: '0x6373b817e41616524dd322ccfb55cf9dc75620f91beaae65c23d028f9036705d',
          gasUsed: 127295,
        },
        event: {
          logIndex: 33,
          address: '0xfa14fa6958401314851a17d6c5360ca29f74b57b',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = classifier.parse(poolA, eventA, transfersA, []);
    expect(swapA).toEqual<Swap>({
      contract: {
        address: '0x19f83460e387f1b01f94b85c2532ebc15b0b712e',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0x6c309614d7efd5633ff34d4c455f0ca213271048',
      to: '0x6c309614d7efd5633ff34d4c455f0ca213271048',
      assetIn: '0xfa14fa6958401314851a17d6c5360ca29f74b57b',
      amountIn: 300000000000000000000000n,
      assetOut: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      amountOut: 5164834278n,
      transaction: {
        hash: '0x6373b817e41616524dd322ccfb55cf9dc75620f91beaae65c23d028f9036705d',
        gasUsed: 127295,
      },
      event: {
        address: '0x19f83460e387f1b01f94b85c2532ebc15b0b712e',
        logIndex: 35,
      },
    });

    const poolB: Pool = {
      address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
      assets: [
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const eventB: ClassifiedEvent = {
      address: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
      transactionHash:
        '0xce9214895c06a2719e4c1abedbc00038f01bc232d52c7ac61e782d77d9ef77ad',
      gasUsed: 199126,
      logIndex: 40,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        recipient: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        amount0: BigNumber.from('76164663463'),
        amount1: BigNumber.from('-35132165820280149733'),
        sqrtPriceX96: BigNumber.from('1701807279290655656150308810063139'),
        liquidity: BigNumber.from('6657767753184375592'),
        tick: 199507,
      },
    };
    const transfersB: Transfer[] = [
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        to: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        value: 35132165820280149733n,
        transaction: {
          hash: '0xce9214895c06a2719e4c1abedbc00038f01bc232d52c7ac61e782d77d9ef77ad',
          gasUsed: 199126,
        },
        event: {
          logIndex: 36,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        value: 35066967193927040737n,
        transaction: {
          hash: '0xce9214895c06a2719e4c1abedbc00038f01bc232d52c7ac61e782d77d9ef77ad',
          gasUsed: 199126,
        },
        event: {
          logIndex: 38,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        to: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        value: 76164739647n,
        transaction: {
          hash: '0xce9214895c06a2719e4c1abedbc00038f01bc232d52c7ac61e782d77d9ef77ad',
          gasUsed: 199126,
        },
        event: {
          logIndex: 39,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swapB = classifier.parse(poolB, eventB, transfersB, []);
    expect(swapB).toEqual<Swap>({
      contract: {
        address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      to: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
      assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      amountIn: 76164663463n,
      assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountOut: 35132165820280149733n,
      transaction: {
        hash: '0xce9214895c06a2719e4c1abedbc00038f01bc232d52c7ac61e782d77d9ef77ad',
        gasUsed: 199126,
      },
      event: {
        address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        logIndex: 40,
      },
    });
  });

  test('parses split swaps', () => {
    const poolA: Pool = {
      address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
      assets: [
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const poolB: Pool = {
      address: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
      assets: [
        '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const poolC: Pool = {
      address: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
      assets: [
        '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const eventA: ClassifiedEvent = {
      address: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
      transactionHash:
        '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
      gasUsed: 821162,
      logIndex: 20,
      classifier,
      name: 'Swap',
      values: {
        sender: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
        recipient: '0x22F9dCF4647084d6C31b2765F6910cd85C178C18',
        amount0: BigNumber.from('-655542493837'),
        amount1: BigNumber.from('305846153846153863077'),
        sqrtPriceX96: BigNumber.from('1713099674283590876756634035645162'),
        liquidity: BigNumber.from('5236837348312764474'),
        tick: 199639,
      },
    };
    const eventB: ClassifiedEvent = {
      address: '0xCBCdF9626bC03E24f779434178A73a0B4bad62eD',
      transactionHash:
        '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
      gasUsed: 821162,
      logIndex: 24,
      classifier,
      name: 'Swap',
      values: {
        sender: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
        recipient: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
        amount0: BigNumber.from('-555672359'),
        amount1: BigNumber.from('76461538461538460768'),
        sqrtPriceX96: BigNumber.from('29346641572432228498627094012504715'),
        liquidity: BigNumber.from('2336712802363359643'),
        tick: 256459,
      },
    };
    const eventC: ClassifiedEvent = {
      address: '0x99ac8cA7087fA4A2A1FB6357269965A2014ABc35',
      transactionHash:
        '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
      gasUsed: 821162,
      logIndex: 27,
      classifier,
      name: 'Swap',
      values: {
        sender: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
        recipient: '0x22F9dCF4647084d6C31b2765F6910cd85C178C18',
        amount0: BigNumber.from('555672359'),
        amount1: BigNumber.from('-165760006238'),
        sqrtPriceX96: BigNumber.from('1369399345523876183225070477709'),
        liquidity: BigNumber.from('6234329277674'),
        tick: 56998,
      },
    };
    const transfers: Transfer[] = [
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
        to: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
        value: 38230769230769225385n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 4,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
        to: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
        value: 83073071273n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 5,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
        to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        value: 38230769230769225385n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 10,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        to: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
        value: 83316423002n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 11,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
        to: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
        value: 38230769230769225385n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 13,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
        to: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
        value: 82955792237n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 14,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
      {
        asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        to: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
        value: 655542493837n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 18,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
        to: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        value: 305846153846153863077n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 19,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        from: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
        to: '0xe592427a0aece92de3edee1f18e0157c05861564',
        value: 555672359n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 22,
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
        to: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
        value: 76461538461538460768n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 23,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
        to: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
        value: 165760006238n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 25,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
      {
        asset: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        from: '0xe592427a0aece92de3edee1f18e0157c05861564',
        to: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
        value: 555672359n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 26,
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        },
      },
      {
        asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
        to: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
        value: 1070647786587n,
        transaction: {
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          gasUsed: 821162,
        },
        event: {
          logIndex: 29,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = classifier.parse(poolA, eventA, transfers, []);
    const swapB = classifier.parse(poolB, eventB, transfers, []);
    const swapC = classifier.parse(poolC, eventC, transfers, []);
    expect(swapA).toEqual<Swap>({
      contract: {
        address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
      to: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountIn: 305846153846153863077n,
      assetOut: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      amountOut: 655542493837n,
      transaction: {
        hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
        gasUsed: 821162,
      },
      event: {
        address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        logIndex: 20,
      },
    });
    expect(swapB).toEqual<Swap>({
      contract: {
        address: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
      to: '0xe592427a0aece92de3edee1f18e0157c05861564',
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountIn: 76461538461538460768n,
      assetOut: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      amountOut: 555672359n,
      transaction: {
        hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
        gasUsed: 821162,
      },
      event: {
        address: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
        logIndex: 24,
      },
    });
    expect(swapC).toEqual<Swap>({
      contract: {
        address: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0xe592427a0aece92de3edee1f18e0157c05861564',
      to: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
      assetIn: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      amountIn: 555672359n,
      assetOut: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      amountOut: 165760006238n,
      transaction: {
        hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
        gasUsed: 821162,
      },
      event: {
        address: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
        logIndex: 27,
      },
    });
  });

  test('parses multi-hop swaps', () => {
    const poolA: Pool = {
      address: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
      assets: [
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const poolB: Pool = {
      address: '0x69d91b94f0aaf8e8a2586909fa77a5c2c89818d5',
      assets: [
        '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const eventA: ClassifiedEvent = {
      address: '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8',
      transactionHash:
        '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
      gasUsed: 215125,
      logIndex: 270,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        recipient: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        amount0: BigNumber.from('-9740653424'),
        amount1: BigNumber.from('4500000000000000000'),
        sqrtPriceX96: BigNumber.from('1700367240901089360088535069080891'),
        liquidity: BigNumber.from('13529723483113463258'),
        tick: 199490,
      },
    };
    const eventB: ClassifiedEvent = {
      address: '0x69D91B94f0AaF8e8A2586909fA77A5c2c89818d5',
      transactionHash:
        '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
      gasUsed: 215125,
      logIndex: 273,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        recipient: '0xFd3BB774d6460fAD27B8691214Bd628A20783ba5',
        amount0: BigNumber.from('-6523542739377'),
        amount1: BigNumber.from('9740653424'),
        sqrtPriceX96: BigNumber.from('3058062055705573845531102158'),
        liquidity: BigNumber.from('327592062877931'),
        tick: -65095,
      },
    };
    const transfers: Transfer[] = [
      {
        asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
        to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        value: 9740653424n,
        transaction: {
          hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
          gasUsed: 215125,
        },
        event: {
          logIndex: 267,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        to: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
        value: 4500000000000000000n,
        transaction: {
          hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
          gasUsed: 215125,
        },
        event: {
          logIndex: 269,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
        from: '0x69d91b94f0aaf8e8a2586909fa77a5c2c89818d5',
        to: '0xfd3bb774d6460fad27b8691214bd628a20783ba5',
        value: 6523542739377n,
        transaction: {
          hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
          gasUsed: 215125,
        },
        event: {
          logIndex: 271,
          address: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
        },
      },
      {
        asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        to: '0x69d91b94f0aaf8e8a2586909fa77a5c2c89818d5',
        value: 9740653424n,
        transaction: {
          hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
          gasUsed: 215125,
        },
        event: {
          logIndex: 272,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = classifier.parse(poolA, eventA, transfers, []);
    const swapB = classifier.parse(poolB, eventB, transfers, []);
    expect(swapA).toEqual<Swap>({
      contract: {
        address: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountIn: 4500000000000000000n,
      assetOut: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      amountOut: 9740653424n,
      transaction: {
        hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
        gasUsed: 215125,
      },
      event: {
        address: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
        logIndex: 270,
      },
    });
    expect(swapB).toEqual<Swap>({
      contract: {
        address: '0x69d91b94f0aaf8e8a2586909fa77a5c2c89818d5',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      to: '0xfd3bb774d6460fad27b8691214bd628a20783ba5',
      assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      amountIn: 9740653424n,
      assetOut: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
      amountOut: 6523542739377n,
      transaction: {
        hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
        gasUsed: 215125,
      },
      event: {
        address: '0x69d91b94f0aaf8e8a2586909fa77a5c2c89818d5',
        logIndex: 273,
      },
    });
  });

  test('parses arbitrage swaps', () => {
    const poolA: Pool = {
      address: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
      assets: [
        '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const poolB: Pool = {
      address: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
      assets: [
        '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
        '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const poolC: Pool = {
      address: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
      assets: [
        '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
        '0x58b6a8a3302369daec383334672404ee733ab239',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const poolD: Pool = {
      address: '0x2519042aa735edb4688a8376d69d4bb69431206c',
      assets: [
        '0x58b6a8a3302369daec383334672404ee733ab239',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const eventA: ClassifiedEvent = {
      address: '0x41B536722C014a577F06A4Bb0dFa08BF0b8F5E87',
      transactionHash:
        '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
      gasUsed: 277422,
      logIndex: 5,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        recipient: '0x3Ce42eF6b6617b5950C13D1c258eCFDcd30bB4De',
        amount0: BigNumber.from('-6627194964611846570392'),
        amount1: BigNumber.from('760000000000000000'),
        sqrtPriceX96: BigNumber.from('850450570881608614360786996'),
        liquidity: BigNumber.from('4776812432910168750236'),
        tick: -90691,
      },
    };
    const eventB: ClassifiedEvent = {
      address: '0x3Ce42eF6b6617b5950C13D1c258eCFDcd30bB4De',
      transactionHash:
        '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
      gasUsed: 277422,
      logIndex: 6,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        recipient: '0xCC2bd4F3c00c37aDb00864D9a0a8cfEf8B6Ff56a',
        amount0: BigNumber.from('-206953215405128955955015'),
        amount1: BigNumber.from('6627194964611846570392'),
        sqrtPriceX96: BigNumber.from('14174669532177055937058346653'),
        liquidity: BigNumber.from('14416215588472917738542855'),
        tick: -34420,
      },
    };
    const eventC: ClassifiedEvent = {
      address: '0xCC2bd4F3c00c37aDb00864D9a0a8cfEf8B6Ff56a',
      transactionHash:
        '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
      gasUsed: 277422,
      logIndex: 7,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        recipient: '0x2519042aa735eDb4688a8376d69D4BB69431206c',
        amount0: BigNumber.from('206953215405128955955015'),
        amount1: BigNumber.from('-91552167112393573131'),
        sqrtPriceX96: BigNumber.from('1666445914003289698493150263'),
        liquidity: BigNumber.from('1476952441328276419451751'),
        tick: -77237,
      },
    };
    const eventD: ClassifiedEvent = {
      address: '0x2519042aa735eDb4688a8376d69D4BB69431206c',
      transactionHash:
        '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
      gasUsed: 277422,
      logIndex: 8,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        recipient: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        amount0: BigNumber.from('91552167112393573131'),
        amount1: BigNumber.from('-778733861336038399'),
        sqrtPriceX96: BigNumber.from('7328306219751814609666008477'),
        liquidity: BigNumber.from('1985990536649819433647'),
        tick: -47615,
      },
    };
    const transfers: Transfer[] = [
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x2519042aa735edb4688a8376d69d4bb69431206c',
        to: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
        value: 778733861336038399n,
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          gasUsed: 277422,
        },
        event: {
          logIndex: 0,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0x58b6a8a3302369daec383334672404ee733ab239',
        from: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
        to: '0x2519042aa735edb4688a8376d69d4bb69431206c',
        value: 91552167112393573131n,
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          gasUsed: 277422,
        },
        event: {
          logIndex: 1,
          address: '0x58b6a8a3302369daec383334672404ee733ab239',
        },
      },
      {
        asset: '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
        from: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
        to: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
        value: 206953215405128955955015n,
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          gasUsed: 277422,
        },
        event: {
          logIndex: 2,
          address: '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
        },
      },
      {
        asset: '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
        from: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
        to: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
        value: 6627194964611846570392n,
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          gasUsed: 277422,
        },
        event: {
          logIndex: 3,
          address: '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
        to: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
        value: 760000000000000000n,
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          gasUsed: 277422,
        },
        event: {
          logIndex: 4,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = classifier.parse(poolA, eventA, transfers, []);
    const swapB = classifier.parse(poolB, eventB, transfers, []);
    const swapC = classifier.parse(poolC, eventC, transfers, []);
    const swapD = classifier.parse(poolD, eventD, transfers, []);
    expect(swapA).toEqual<Swap>({
      contract: {
        address: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
      to: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountIn: 760000000000000000n,
      assetOut: '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
      amountOut: 6627194964611846570392n,
      transaction: {
        hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        gasUsed: 277422,
      },
      event: {
        address: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
        logIndex: 5,
      },
    });
    expect(swapB).toEqual<Swap>({
      contract: {
        address: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
      to: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
      assetIn: '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
      amountIn: 6627194964611846570392n,
      assetOut: '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
      amountOut: 206953215405128955955015n,
      transaction: {
        hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        gasUsed: 277422,
      },
      event: {
        address: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
        logIndex: 6,
      },
    });
    expect(swapC).toEqual<Swap>({
      contract: {
        address: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
      to: '0x2519042aa735edb4688a8376d69d4bb69431206c',
      assetIn: '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
      amountIn: 206953215405128955955015n,
      assetOut: '0x58b6a8a3302369daec383334672404ee733ab239',
      amountOut: 91552167112393573131n,
      transaction: {
        hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        gasUsed: 277422,
      },
      event: {
        address: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
        logIndex: 7,
      },
    });
    expect(swapD).toEqual<Swap>({
      contract: {
        address: '0x2519042aa735edb4688a8376d69d4bb69431206c',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
      to: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
      assetIn: '0x58b6a8a3302369daec383334672404ee733ab239',
      amountIn: 91552167112393573131n,
      assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountOut: 778733861336038399n,
      transaction: {
        hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        gasUsed: 277422,
      },
      event: {
        address: '0x2519042aa735edb4688a8376d69d4bb69431206c',
        logIndex: 8,
      },
    });
  });

  test('parses cross-protocol arbitrage swaps', () => {
    const pool: Pool = {
      address: '0x9e0905249ceefffb9605e034b534544684a58be6',
      assets: [
        '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
    };
    const event: ClassifiedEvent = {
      address: '0x9e0905249CeEFfFB9605E034b534544684A58BE6',
      transactionHash:
        '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
      gasUsed: 140950,
      logIndex: 7,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x58418d6c83EfAB01ed78b0AC42E55af01eE77DbA',
        recipient: '0x55D5c232D921B9eAA6b37b5845E439aCD04b4DBa',
        amount0: BigNumber.from('-4426537110163'),
        amount1: BigNumber.from('2749128322331574924'),
        sqrtPriceX96: BigNumber.from('62357290094933858923698528073152'),
        liquidity: BigNumber.from('7993771494716273693'),
        tick: 133372,
      },
    };
    const transfers: Transfer[] = [
      {
        asset: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
        from: '0x9e0905249ceefffb9605e034b534544684a58be6',
        to: '0x55d5c232d921b9eaa6b37b5845e439acd04b4dba',
        value: 4426537110163n,
        transaction: {
          hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
          gasUsed: 140950,
        },
        event: {
          logIndex: 5,
          address: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
        to: '0x9e0905249ceefffb9605e034b534544684a58be6',
        value: 2749128322331574924n,
        transaction: {
          hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
          gasUsed: 140950,
        },
        event: {
          logIndex: 6,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x55d5c232d921b9eaa6b37b5845e439acd04b4dba',
        to: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
        value: 2767561675144940562n,
        transaction: {
          hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
          gasUsed: 140950,
        },
        event: {
          logIndex: 8,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swap = classifier.parse(pool, event, transfers, []);
    expect(swap).toEqual<Swap>({
      contract: {
        address: '0x9e0905249ceefffb9605e034b534544684a58be6',
        protocol: {
          abi: 'UniswapV3',
          factory: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        },
      },
      from: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
      to: '0x55d5c232d921b9eaa6b37b5845e439acd04b4dba',
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountIn: 2749128322331574924n,
      assetOut: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
      amountOut: 4426537110163n,
      transaction: {
        hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
        gasUsed: 140950,
      },
      event: {
        address: '0x9e0905249ceefffb9605e034b534544684a58be6',
        logIndex: 7,
      },
    });
  });
});
