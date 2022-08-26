import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import {
  LiquidityDeposit,
  LiquidityWithdrawal,
  Pool,
  Transfer,
} from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import classifiers from '../../src/classifier/items/uniswapV3.js';
import { Swap } from '../../src/index.js';

const swapClassifier = classifiers[0];
const liquidityDepositClassifier = classifiers[1];
const liquidityWithdrawalClassifier = classifiers[2];

describe('Classfiers: Uniswap V3', () => {
  test('swap', () => {
    const poolA: Pool = {
      address: '0x19f83460e387f1b01f94b85c2532ebc15b0b712e',
      assets: [
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
        '0xfa14fa6958401314851a17d6c5360ca29f74b57b',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const eventA: ClassifiedEvent = {
      address: '0x19f83460e387F1b01F94b85c2532EBC15B0b712e',
      blockHash:
        '0xe2c08e8d3879d955056d54278c3316e15f2d96ab93de605ea209ce674d31a8e4',
      blockNumber: 14756211,
      transactionFrom: '0x6c309614d7efd5633ff34d4c455f0ca213271048',
      transactionHash:
        '0x6373b817e41616524dd322ccfb55cf9dc75620f91beaae65c23d028f9036705d',
      transactionIndex: 31,
      gasUsed: 127295,
      logIndex: 35,
      classifier: swapClassifier,
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
        block: {
          hash: '0xe2c08e8d3879d955056d54278c3316e15f2d96ab93de605ea209ce674d31a8e4',
          number: 14756211,
        },
        transaction: {
          from: '0x6c309614d7efd5633ff34d4c455f0ca213271048',
          hash: '0x6373b817e41616524dd322ccfb55cf9dc75620f91beaae65c23d028f9036705d',
          index: 31,
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
        block: {
          hash: '0xe2c08e8d3879d955056d54278c3316e15f2d96ab93de605ea209ce674d31a8e4',
          number: 14756211,
        },
        transaction: {
          from: '0x6c309614d7efd5633ff34d4c455f0ca213271048',
          hash: '0x6373b817e41616524dd322ccfb55cf9dc75620f91beaae65c23d028f9036705d',
          index: 31,
          gasUsed: 127295,
        },
        event: {
          logIndex: 33,
          address: '0xfa14fa6958401314851a17d6c5360ca29f74b57b',
        },
      },
    ];

    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = swapClassifier.parse(poolA, eventA, transfersA, []);
    expect(swapA).toEqual<Swap>({
      contract: {
        address: '0x19f83460e387f1b01f94b85c2532ebc15b0b712e',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0x6c309614d7efd5633ff34d4c455f0ca213271048',
      to: '0x6c309614d7efd5633ff34d4c455f0ca213271048',
      assetIn: {
        type: 'erc20',
        address: '0xfa14fa6958401314851a17d6c5360ca29f74b57b',
      },
      amountIn: 300000000000000000000000n,
      assetOut: {
        type: 'erc20',
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      },
      amountOut: 5164834278n,
      block: {
        hash: '0xe2c08e8d3879d955056d54278c3316e15f2d96ab93de605ea209ce674d31a8e4',
        number: 14756211,
      },
      transaction: {
        from: '0x6c309614d7efd5633ff34d4c455f0ca213271048',
        hash: '0x6373b817e41616524dd322ccfb55cf9dc75620f91beaae65c23d028f9036705d',
        index: 31,
        gasUsed: 127295,
      },
      event: {
        address: '0x19f83460e387f1b01f94b85c2532ebc15b0b712e',
        logIndex: 35,
      },
      metadata: {
        tick: 316990,
      },
    });

    const poolB: Pool = {
      address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
      assets: [
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const eventB: ClassifiedEvent = {
      address: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
      blockHash:
        '0xe2c08e8d3879d955056d54278c3316e15f2d96ab93de605ea209ce674d31a8e4',
      blockNumber: 14756211,
      transactionFrom: '0x74067744295a1b9d440e900e1af660c90150d510',
      transactionHash:
        '0xce9214895c06a2719e4c1abedbc00038f01bc232d52c7ac61e782d77d9ef77ad',
      transactionIndex: 6,
      gasUsed: 199126,
      logIndex: 40,
      classifier: swapClassifier,
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
        block: {
          hash: '0xe2c08e8d3879d955056d54278c3316e15f2d96ab93de605ea209ce674d31a8e4',
          number: 14756211,
        },
        transaction: {
          from: '0x74067744295a1b9d440e900e1af660c90150d510',
          hash: '0xce9214895c06a2719e4c1abedbc00038f01bc232d52c7ac61e782d77d9ef77ad',
          index: 6,
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
        block: {
          hash: '0xe2c08e8d3879d955056d54278c3316e15f2d96ab93de605ea209ce674d31a8e4',
          number: 14756211,
        },
        transaction: {
          from: '0x74067744295a1b9d440e900e1af660c90150d510',
          hash: '0xce9214895c06a2719e4c1abedbc00038f01bc232d52c7ac61e782d77d9ef77ad',
          index: 6,
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
        block: {
          hash: '0xe2c08e8d3879d955056d54278c3316e15f2d96ab93de605ea209ce674d31a8e4',
          number: 14756211,
        },
        transaction: {
          from: '0x74067744295a1b9d440e900e1af660c90150d510',
          hash: '0xce9214895c06a2719e4c1abedbc00038f01bc232d52c7ac61e782d77d9ef77ad',
          index: 6,
          gasUsed: 199126,
        },
        event: {
          logIndex: 39,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
    ];

    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }
    const swapB = swapClassifier.parse(poolB, eventB, transfersB, []);
    expect(swapB).toEqual<Swap>({
      contract: {
        address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      to: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
      assetIn: {
        type: 'erc20',
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      },
      amountIn: 76164663463n,
      assetOut: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountOut: 35132165820280149733n,
      block: {
        hash: '0xe2c08e8d3879d955056d54278c3316e15f2d96ab93de605ea209ce674d31a8e4',
        number: 14756211,
      },
      transaction: {
        from: '0x74067744295a1b9d440e900e1af660c90150d510',
        hash: '0xce9214895c06a2719e4c1abedbc00038f01bc232d52c7ac61e782d77d9ef77ad',
        index: 6,
        gasUsed: 199126,
      },
      event: {
        address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        logIndex: 40,
      },
      metadata: {
        tick: 199507,
      },
    });
  });

  test('split swaps', () => {
    const poolA: Pool = {
      address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
      assets: [
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const poolB: Pool = {
      address: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
      assets: [
        '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const poolC: Pool = {
      address: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
      assets: [
        '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const eventA: ClassifiedEvent = {
      address: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
      blockHash:
        '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
      blockNumber: 14756200,
      transactionFrom: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
      transactionHash:
        '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
      transactionIndex: 1,
      gasUsed: 821162,
      logIndex: 20,
      classifier: swapClassifier,
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
      blockHash:
        '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
      blockNumber: 14756200,
      transactionFrom: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
      transactionHash:
        '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
      transactionIndex: 1,
      gasUsed: 821162,
      logIndex: 24,
      classifier: swapClassifier,
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
      blockHash:
        '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
      blockNumber: 14756200,
      transactionFrom: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
      transactionHash:
        '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
      transactionIndex: 1,
      gasUsed: 821162,
      logIndex: 27,
      classifier: swapClassifier,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
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
        block: {
          hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
          number: 14756200,
        },
        transaction: {
          from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
          hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
          index: 1,
          gasUsed: 821162,
        },
        event: {
          logIndex: 29,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
    ];

    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = swapClassifier.parse(poolA, eventA, transfers, []);
    const swapB = swapClassifier.parse(poolB, eventB, transfers, []);
    const swapC = swapClassifier.parse(poolC, eventC, transfers, []);
    expect(swapA).toEqual<Swap>({
      contract: {
        address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
      to: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
      assetIn: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountIn: 305846153846153863077n,
      assetOut: {
        type: 'erc20',
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      },
      amountOut: 655542493837n,
      block: {
        hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
        number: 14756200,
      },
      transaction: {
        from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
        hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
        index: 1,
        gasUsed: 821162,
      },
      event: {
        address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        logIndex: 20,
      },
      metadata: {
        tick: 199639,
      },
    });
    expect(swapB).toEqual<Swap>({
      contract: {
        address: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
      to: '0xe592427a0aece92de3edee1f18e0157c05861564',
      assetIn: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountIn: 76461538461538460768n,
      assetOut: {
        type: 'erc20',
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      },
      amountOut: 555672359n,
      block: {
        hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
        number: 14756200,
      },
      transaction: {
        from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
        hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
        index: 1,
        gasUsed: 821162,
      },
      event: {
        address: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
        logIndex: 24,
      },
      metadata: {
        tick: 256459,
      },
    });
    expect(swapC).toEqual<Swap>({
      contract: {
        address: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0xe592427a0aece92de3edee1f18e0157c05861564',
      to: '0x22f9dcf4647084d6c31b2765f6910cd85c178c18',
      assetIn: {
        type: 'erc20',
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      },
      amountIn: 555672359n,
      assetOut: {
        type: 'erc20',
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      },
      amountOut: 165760006238n,
      block: {
        hash: '0x0eb5eb138a3a7dca6a024a1c780d334f46be19590fe8727baad9c90f35d68764',
        number: 14756200,
      },
      transaction: {
        from: '0xb1dde4d00b21c62eda810773b44151e0afe49c1c',
        hash: '0x2a1aa4f1e6814065e1bfe7a3a4e11aee20c52b6af440f4f8fc38557b11efb5c1',
        index: 1,
        gasUsed: 821162,
      },
      event: {
        address: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
        logIndex: 27,
      },
      metadata: {
        tick: 56998,
      },
    });
  });

  test('multi-hop swaps', () => {
    const poolA: Pool = {
      address: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
      assets: [
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const poolB: Pool = {
      address: '0x69d91b94f0aaf8e8a2586909fa77a5c2c89818d5',
      assets: [
        '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const eventA: ClassifiedEvent = {
      address: '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8',
      blockHash:
        '0x0574dddbb550ca6cf4a322557fd0cbb66470a0419b21312757bff0bdd0804289',
      blockNumber: 14756209,
      transactionFrom: '0xfd3bb774d6460fad27b8691214bd628a20783ba5',
      transactionHash:
        '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
      transactionIndex: 137,
      gasUsed: 215125,
      logIndex: 270,
      classifier: swapClassifier,
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
      blockHash:
        '0x0574dddbb550ca6cf4a322557fd0cbb66470a0419b21312757bff0bdd0804289',
      blockNumber: 14756209,
      transactionFrom: '0xfd3bb774d6460fad27b8691214bd628a20783ba5',
      transactionHash:
        '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
      transactionIndex: 137,
      gasUsed: 215125,
      logIndex: 273,
      classifier: swapClassifier,
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
        block: {
          hash: '0x0574dddbb550ca6cf4a322557fd0cbb66470a0419b21312757bff0bdd0804289',
          number: 14756209,
        },
        transaction: {
          from: '0xfd3bb774d6460fad27b8691214bd628a20783ba5',
          hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
          index: 137,
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
        block: {
          hash: '0x0574dddbb550ca6cf4a322557fd0cbb66470a0419b21312757bff0bdd0804289',
          number: 14756209,
        },
        transaction: {
          from: '0xfd3bb774d6460fad27b8691214bd628a20783ba5',
          hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
          index: 137,
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
        block: {
          hash: '0x0574dddbb550ca6cf4a322557fd0cbb66470a0419b21312757bff0bdd0804289',
          number: 14756209,
        },
        transaction: {
          from: '0xfd3bb774d6460fad27b8691214bd628a20783ba5',
          hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
          index: 137,
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
        block: {
          hash: '0x0574dddbb550ca6cf4a322557fd0cbb66470a0419b21312757bff0bdd0804289',
          number: 14756209,
        },
        transaction: {
          from: '0xfd3bb774d6460fad27b8691214bd628a20783ba5',
          hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
          index: 137,
          gasUsed: 215125,
        },
        event: {
          logIndex: 272,
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      },
    ];

    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = swapClassifier.parse(poolA, eventA, transfers, []);
    const swapB = swapClassifier.parse(poolB, eventB, transfers, []);
    expect(swapA).toEqual<Swap>({
      contract: {
        address: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      assetIn: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountIn: 4500000000000000000n,
      assetOut: {
        type: 'erc20',
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      },
      amountOut: 9740653424n,
      block: {
        hash: '0x0574dddbb550ca6cf4a322557fd0cbb66470a0419b21312757bff0bdd0804289',
        number: 14756209,
      },
      transaction: {
        from: '0xfd3bb774d6460fad27b8691214bd628a20783ba5',
        hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
        index: 137,
        gasUsed: 215125,
      },
      event: {
        address: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
        logIndex: 270,
      },
      metadata: {
        tick: 199490,
      },
    });
    expect(swapB).toEqual<Swap>({
      contract: {
        address: '0x69d91b94f0aaf8e8a2586909fa77a5c2c89818d5',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      to: '0xfd3bb774d6460fad27b8691214bd628a20783ba5',
      assetIn: {
        type: 'erc20',
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      },
      amountIn: 9740653424n,
      assetOut: {
        type: 'erc20',
        address: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
      },
      amountOut: 6523542739377n,
      block: {
        hash: '0x0574dddbb550ca6cf4a322557fd0cbb66470a0419b21312757bff0bdd0804289',
        number: 14756209,
      },
      transaction: {
        from: '0xfd3bb774d6460fad27b8691214bd628a20783ba5',
        hash: '0xb41d3a73f06654944813cf4df813a56b68474bae292a91121e3c42797a9bc2d7',
        index: 137,
        gasUsed: 215125,
      },
      event: {
        address: '0x69d91b94f0aaf8e8a2586909fa77a5c2c89818d5',
        logIndex: 273,
      },
      metadata: {
        tick: -65095,
      },
    });
  });

  test('arbitrage swaps', () => {
    const poolA: Pool = {
      address: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
      assets: [
        '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const poolB: Pool = {
      address: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
      assets: [
        '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
        '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const poolC: Pool = {
      address: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
      assets: [
        '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
        '0x58b6a8a3302369daec383334672404ee733ab239',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const poolD: Pool = {
      address: '0x2519042aa735edb4688a8376d69d4bb69431206c',
      assets: [
        '0x58b6a8a3302369daec383334672404ee733ab239',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const eventA: ClassifiedEvent = {
      address: '0x41B536722C014a577F06A4Bb0dFa08BF0b8F5E87',
      blockHash:
        '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
      blockNumber: 14703765,
      transactionFrom: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
      transactionHash:
        '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
      transactionIndex: 0,
      gasUsed: 277422,
      logIndex: 5,
      classifier: swapClassifier,
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
      blockHash:
        '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
      blockNumber: 14703765,
      transactionFrom: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
      transactionHash:
        '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
      transactionIndex: 0,
      gasUsed: 277422,
      logIndex: 6,
      classifier: swapClassifier,
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
      blockHash:
        '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
      blockNumber: 14703765,
      transactionFrom: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
      transactionHash:
        '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
      transactionIndex: 0,
      gasUsed: 277422,
      logIndex: 7,
      classifier: swapClassifier,
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
      blockHash:
        '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
      blockNumber: 14703765,
      transactionFrom: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
      transactionHash:
        '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
      transactionIndex: 0,
      gasUsed: 277422,
      logIndex: 8,
      classifier: swapClassifier,
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
        block: {
          hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
          number: 14703765,
        },
        transaction: {
          from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          index: 0,
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
        block: {
          hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
          number: 14703765,
        },
        transaction: {
          from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          index: 0,
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
        block: {
          hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
          number: 14703765,
        },
        transaction: {
          from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          index: 0,
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
        block: {
          hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
          number: 14703765,
        },
        transaction: {
          from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          index: 0,
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
        block: {
          hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
          number: 14703765,
        },
        transaction: {
          from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          index: 0,
          gasUsed: 277422,
        },
        event: {
          logIndex: 4,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
    ];

    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = swapClassifier.parse(poolA, eventA, transfers, []);
    const swapB = swapClassifier.parse(poolB, eventB, transfers, []);
    const swapC = swapClassifier.parse(poolC, eventC, transfers, []);
    const swapD = swapClassifier.parse(poolD, eventD, transfers, []);
    expect(swapA).toEqual<Swap>({
      contract: {
        address: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
      to: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
      assetIn: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountIn: 760000000000000000n,
      assetOut: {
        type: 'erc20',
        address: '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
      },
      amountOut: 6627194964611846570392n,
      block: {
        hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
        number: 14703765,
      },
      transaction: {
        from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
        hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        index: 0,
        gasUsed: 277422,
      },
      event: {
        address: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
        logIndex: 5,
      },
      metadata: {
        tick: -90691,
      },
    });
    expect(swapB).toEqual<Swap>({
      contract: {
        address: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
      to: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
      assetIn: {
        type: 'erc20',
        address: '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
      },
      amountIn: 6627194964611846570392n,
      assetOut: {
        type: 'erc20',
        address: '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
      },
      amountOut: 206953215405128955955015n,
      block: {
        hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
        number: 14703765,
      },
      transaction: {
        from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
        hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        index: 0,
        gasUsed: 277422,
      },
      event: {
        address: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
        logIndex: 6,
      },
      metadata: {
        tick: -34420,
      },
    });
    expect(swapC).toEqual<Swap>({
      contract: {
        address: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
      to: '0x2519042aa735edb4688a8376d69d4bb69431206c',
      assetIn: {
        type: 'erc20',
        address: '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
      },
      amountIn: 206953215405128955955015n,
      assetOut: {
        type: 'erc20',
        address: '0x58b6a8a3302369daec383334672404ee733ab239',
      },
      amountOut: 91552167112393573131n,
      block: {
        hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
        number: 14703765,
      },
      transaction: {
        from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
        hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        index: 0,
        gasUsed: 277422,
      },
      event: {
        address: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
        logIndex: 7,
      },
      metadata: {
        tick: -77237,
      },
    });
    expect(swapD).toEqual<Swap>({
      contract: {
        address: '0x2519042aa735edb4688a8376d69d4bb69431206c',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
      to: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
      assetIn: {
        type: 'erc20',
        address: '0x58b6a8a3302369daec383334672404ee733ab239',
      },
      amountIn: 91552167112393573131n,
      assetOut: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountOut: 778733861336038399n,
      block: {
        hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
        number: 14703765,
      },
      transaction: {
        from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
        hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        index: 0,
        gasUsed: 277422,
      },
      event: {
        address: '0x2519042aa735edb4688a8376d69d4bb69431206c',
        logIndex: 8,
      },
      metadata: {
        tick: -47615,
      },
    });
  });

  test('cross-protocol arbitrage swaps', () => {
    const pool: Pool = {
      address: '0x9e0905249ceefffb9605e034b534544684a58be6',
      assets: [
        '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const event: ClassifiedEvent = {
      address: '0x9e0905249CeEFfFB9605E034b534544684A58BE6',
      blockHash:
        '0x699c148c52b18879a1bd5cf0e64e8e1c2dfad478a6bce1f576a75144b48b30e7',
      blockNumber: 14703788,
      transactionFrom: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
      transactionHash:
        '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
      transactionIndex: 2,
      gasUsed: 140950,
      logIndex: 7,
      classifier: swapClassifier,
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
        block: {
          hash: '0x699c148c52b18879a1bd5cf0e64e8e1c2dfad478a6bce1f576a75144b48b30e7',
          number: 14703788,
        },
        transaction: {
          from: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
          hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
          index: 2,
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
        block: {
          hash: '0x699c148c52b18879a1bd5cf0e64e8e1c2dfad478a6bce1f576a75144b48b30e7',
          number: 14703788,
        },
        transaction: {
          from: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
          hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
          index: 2,
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
        block: {
          hash: '0x699c148c52b18879a1bd5cf0e64e8e1c2dfad478a6bce1f576a75144b48b30e7',
          number: 14703788,
        },
        transaction: {
          from: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
          hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
          index: 2,
          gasUsed: 140950,
        },
        event: {
          logIndex: 8,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
    ];

    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }
    const swap = swapClassifier.parse(pool, event, transfers, []);
    expect(swap).toEqual<Swap>({
      contract: {
        address: '0x9e0905249ceefffb9605e034b534544684a58be6',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      from: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
      to: '0x55d5c232d921b9eaa6b37b5845e439acd04b4dba',
      assetIn: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountIn: 2749128322331574924n,
      assetOut: {
        type: 'erc20',
        address: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
      },
      amountOut: 4426537110163n,
      block: {
        hash: '0x699c148c52b18879a1bd5cf0e64e8e1c2dfad478a6bce1f576a75144b48b30e7',
        number: 14703788,
      },
      transaction: {
        from: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
        hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
        index: 2,
        gasUsed: 140950,
      },
      event: {
        address: '0x9e0905249ceefffb9605e034b534544684a58be6',
        logIndex: 7,
      },
      metadata: {
        tick: 133372,
      },
    });
  });

  test('liquidity deposit', () => {
    const transfers: Transfer[] = [
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        block: {
          hash: '0x6a1f7b9df7c4f75f802b6ae9c7ba29a55184e135c7ddfb1229ff844e22e6f094',
          number: 15196081,
        },
        transaction: {
          from: '0xfb9779477e5b4834bf2bc02dd29b97b344d0f700',
          hash: '0xf618862404eaa9a2d6e1d95b8a4ec74627e4e44fb0dd520e743359b7721a7778',
          index: 2,
          gasUsed: 500595,
        },
        event: {
          logIndex: 6,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        from: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
        to: '0xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf',
        value: 21096147899993320166063n,
      },
      {
        asset: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        block: {
          hash: '0x6a1f7b9df7c4f75f802b6ae9c7ba29a55184e135c7ddfb1229ff844e22e6f094',
          number: 15196081,
        },
        transaction: {
          from: '0xfb9779477e5b4834bf2bc02dd29b97b344d0f700',
          hash: '0xf618862404eaa9a2d6e1d95b8a4ec74627e4e44fb0dd520e743359b7721a7778',
          index: 2,
          gasUsed: 500595,
        },
        event: {
          logIndex: 7,
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
        from: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
        to: '0xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf',
        value: 8159878373566n,
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        block: {
          hash: '0x6a1f7b9df7c4f75f802b6ae9c7ba29a55184e135c7ddfb1229ff844e22e6f094',
          number: 15196081,
        },
        transaction: {
          from: '0xfb9779477e5b4834bf2bc02dd29b97b344d0f700',
          hash: '0xf618862404eaa9a2d6e1d95b8a4ec74627e4e44fb0dd520e743359b7721a7778',
          index: 2,
          gasUsed: 500595,
        },
        event: {
          logIndex: 8,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        from: '0xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf',
        to: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36',
        value: 21096147899993320165870n,
      },
      {
        asset: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        block: {
          hash: '0x6a1f7b9df7c4f75f802b6ae9c7ba29a55184e135c7ddfb1229ff844e22e6f094',
          number: 15196081,
        },
        transaction: {
          from: '0xfb9779477e5b4834bf2bc02dd29b97b344d0f700',
          hash: '0xf618862404eaa9a2d6e1d95b8a4ec74627e4e44fb0dd520e743359b7721a7778',
          index: 2,
          gasUsed: 500595,
        },
        event: {
          logIndex: 9,
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
        from: '0xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf',
        to: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36',
        value: 7486084510631n,
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        block: {
          hash: '0x6a1f7b9df7c4f75f802b6ae9c7ba29a55184e135c7ddfb1229ff844e22e6f094',
          number: 15196081,
        },
        transaction: {
          from: '0xfb9779477e5b4834bf2bc02dd29b97b344d0f700',
          hash: '0xf618862404eaa9a2d6e1d95b8a4ec74627e4e44fb0dd520e743359b7721a7778',
          index: 2,
          gasUsed: 500595,
        },
        event: {
          logIndex: 13,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        from: '0xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf',
        to: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
        value: 193n,
      },
      {
        asset: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        block: {
          hash: '0x6a1f7b9df7c4f75f802b6ae9c7ba29a55184e135c7ddfb1229ff844e22e6f094',
          number: 15196081,
        },
        transaction: {
          from: '0xfb9779477e5b4834bf2bc02dd29b97b344d0f700',
          hash: '0xf618862404eaa9a2d6e1d95b8a4ec74627e4e44fb0dd520e743359b7721a7778',
          index: 2,
          gasUsed: 500595,
        },
        event: {
          logIndex: 14,
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
        from: '0xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf',
        to: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
        value: 673793862935n,
      },
    ];
    const pool: Pool = {
      address: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36',
      assets: [
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const event: ClassifiedEvent = {
      address: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36',
      blockHash:
        '0x6a1f7b9df7c4f75f802b6ae9c7ba29a55184e135c7ddfb1229ff844e22e6f094',
      blockNumber: 15196081,
      transactionFrom: '0xfb9779477e5b4834bf2bc02dd29b97b344d0f700',
      transactionHash:
        '0xf618862404eaa9a2d6e1d95b8a4ec74627e4e44fb0dd520e743359b7721a7778',
      transactionIndex: 2,
      gasUsed: 500595,
      logIndex: 10,
      classifier: liquidityDepositClassifier,
      name: 'Mint',
      values: {
        sender: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
        owner: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
        tickLower: -202860,
        tickUpper: -202800,
        amount: BigNumber.from('340729203560686282072'),
        amount0: BigNumber.from('21096147899993320165870'),
        amount1: BigNumber.from('7486084510631'),
      },
    };

    if (liquidityDepositClassifier.type !== 'liquidity_deposit') {
      expect.fail();
    }
    const deposit = liquidityDepositClassifier.parse(pool, event, transfers);
    expect(deposit).toEqual<LiquidityDeposit>({
      contract: {
        address: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      depositor: '0xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf',
      assets: [
        {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        {
          type: 'erc20',
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
      ],
      amounts: [21096147899993320165870n, 7486084510631n],
      block: {
        hash: '0x6a1f7b9df7c4f75f802b6ae9c7ba29a55184e135c7ddfb1229ff844e22e6f094',
        number: 15196081,
      },
      transaction: {
        from: '0xfb9779477e5b4834bf2bc02dd29b97b344d0f700',
        hash: '0xf618862404eaa9a2d6e1d95b8a4ec74627e4e44fb0dd520e743359b7721a7778',
        index: 2,
        gasUsed: 500595,
      },
      event: {
        address: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36',
        logIndex: 10,
      },
      metadata: {
        tickLower: -202860,
        tickUpper: -202800,
      },
    });
  });

  test('liquidity withdrawal', () => {
    const transfers: Transfer[] = [
      {
        asset: '0x4d224452801aced8b2f0aebe155379bb5d594381',
        block: {
          hash: '0x46242a1e6f84eadb3cb4d6a1074115b2e2c63a647d999985ea71078fbab2f6ec',
          number: 15194488,
        },
        transaction: {
          from: '0x4603180bbb8221157880afaa84638e0fc467738d',
          hash: '0x0e93b0006f66e5efd9e5b26c090f7dab202bea6151bb6f942e636601034567eb',
          index: 6,
          gasUsed: 253098,
        },
        event: {
          logIndex: 37,
          address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
        },
        from: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
        to: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
        value: 138225488394017186701914n,
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        block: {
          hash: '0x46242a1e6f84eadb3cb4d6a1074115b2e2c63a647d999985ea71078fbab2f6ec',
          number: 15194488,
        },
        transaction: {
          from: '0x4603180bbb8221157880afaa84638e0fc467738d',
          hash: '0x0e93b0006f66e5efd9e5b26c090f7dab202bea6151bb6f942e636601034567eb',
          index: 6,
          gasUsed: 253098,
        },
        event: {
          logIndex: 38,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        from: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
        to: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
        value: 423637645189105331266n,
      },
    ];
    const pool: Pool = {
      address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
      assets: [
        '0x4d224452801aced8b2f0aebe155379bb5d594381',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
        label: 'Uniswap V3',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
      blockHash:
        '0x46242a1e6f84eadb3cb4d6a1074115b2e2c63a647d999985ea71078fbab2f6ec',
      blockNumber: 15194488,
      transactionFrom: '0x4603180bbb8221157880afaa84638e0fc467738d',
      transactionHash:
        '0x0e93b0006f66e5efd9e5b26c090f7dab202bea6151bb6f942e636601034567eb',
      transactionIndex: 6,
      gasUsed: 253098,
      logIndex: 39,
      classifier: liquidityWithdrawalClassifier,
      name: 'Collect',
      values: {
        owner: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
        recipient: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
        tickLower: -202860,
        tickUpper: -202800,
        amount0: BigNumber.from('138225488394017186701914'),
        amount1: BigNumber.from('423637645189105331266'),
      },
    };

    if (liquidityWithdrawalClassifier.type !== 'liquidity_withdrawal') {
      expect.fail();
    }
    const withdrawal = liquidityWithdrawalClassifier.parse(
      pool,
      event,
      transfers,
    );
    expect(withdrawal).toEqual<LiquidityWithdrawal>({
      contract: {
        address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
        protocol: {
          abi: 'UniswapV3',
          factory: {
            address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
            label: 'Uniswap V3',
          },
        },
      },
      withdrawer: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
      assets: [
        {
          type: 'erc20',
          address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
        },
        {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      ],
      amounts: [138225488394017186701914n, 423637645189105331266n],
      block: {
        hash: '0x46242a1e6f84eadb3cb4d6a1074115b2e2c63a647d999985ea71078fbab2f6ec',
        number: 15194488,
      },
      transaction: {
        from: '0x4603180bbb8221157880afaa84638e0fc467738d',
        hash: '0x0e93b0006f66e5efd9e5b26c090f7dab202bea6151bb6f942e636601034567eb',
        index: 6,
        gasUsed: 253098,
      },
      event: {
        address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
        logIndex: 39,
      },
      metadata: {
        tickLower: -202860,
        tickUpper: -202800,
      },
    });
  });
});
