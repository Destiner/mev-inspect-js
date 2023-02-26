import { describe, test, expect } from 'vitest';

import {
  LiquidityDeposit,
  LiquidityWithdrawal,
  Pool,
  Swap,
} from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import curveV1Classifiers from '../../src/classifier/items/curveV1.js';

const swapClassifier = curveV1Classifiers.swap;
const depositClassifier = curveV1Classifiers.liquidityDeposit;
const withdrawalClassifier = curveV1Classifiers.liquidityWithdrawal;

describe('Classfiers: Curve V1', () => {
  test('swap', () => {
    if (!swapClassifier) {
      expect.fail();
    }

    const pool: Pool = {
      address: '0xdc24316b9ae028f1497c275eb9192a3ea0f67022',
      assets: [
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
      ],
      factory: {
        address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
        label: 'Curve V1',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xDC24316b9AE028F1497c275EB9192a3Ea0f67022',
      blockHash:
        '0x0d57220b505cdb6e9cd927184751897d8350d2cb11194e1ce8df8497c5db8a68',
      blockNumber: 15518716,
      transactionFrom: '0x2Ee36E41387f87B7e6f678A86D1e575b23b996F5',
      transactionHash:
        '0x6e4542b86689df8406a5e5d5329a7e8a09ba71045f2588dc55dc99afc3e7171a',
      transactionIndex: 1,
      gasUsed: 209121,
      logIndex: 15,
      classifier: swapClassifier,
      name: 'TokenExchange',
      values: {
        buyer: '0x0000000000a84D1a9B0063A910315C7fFA9Cd248',
        sold_id: 1n,
        tokens_sold: 20671444528711966725n,
        bought_id: 0n,
        tokens_bought: 20116003577312598078n,
      },
    };

    const swap = swapClassifier.parse(pool, event, [], []);
    expect(swap).toEqual<Swap>({
      contract: {
        address: '0xDC24316b9AE028F1497c275EB9192a3Ea0f67022',
        protocol: {
          abi: 'CurveV1',
          factory: {
            address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
            label: 'Curve V1',
          },
        },
      },
      block: {
        hash: '0x0d57220b505cdb6e9cd927184751897d8350d2cb11194e1ce8df8497c5db8a68',
        number: 15518716,
      },
      transaction: {
        from: '0x2ee36e41387f87b7e6f678a86d1e575b23b996f5',
        hash: '0x6e4542b86689df8406a5e5d5329a7e8a09ba71045f2588dc55dc99afc3e7171a',
        index: 1,
        gasUsed: 209121,
      },
      event: {
        address: '0xdc24316b9ae028f1497c275eb9192a3ea0f67022',
        logIndex: 15,
      },
      from: '0x0000000000a84d1a9b0063a910315c7ffa9cd248',
      to: '0x0000000000a84d1a9b0063a910315c7ffa9cd248',
      assetIn: {
        type: 'erc20',
        address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
      },
      amountIn: 20671444528711966725n,
      assetOut: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountOut: 20116003577312598078n,
      metadata: {},
    });
  });

  test('liquidity deposit', () => {
    if (!depositClassifier) {
      expect.fail();
    }

    // TODO 2 token pool
    // 3 token pool
    const pool: Pool = {
      address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
      assets: [
        '0x6b175474e89094c44da98b954eedeac495271d0f',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
      ],
      factory: {
        address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
        label: 'Curve V1',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
      blockHash:
        '0x8f355d242b4acfc89ab660543078cf96134c201570b20b7ca5e70e508fdc2ccb',
      blockNumber: 15316758,
      transactionFrom: '0x0cb406933cf62172f9bd564a8346fd2ce5e32775',
      transactionHash:
        '0xb34ea17eeaca412e3d9c42f9271d0c93e4622b51db63c82789e6d8f366824b7e',
      transactionIndex: 150,
      gasUsed: 862958,
      logIndex: 369,
      classifier: depositClassifier,
      name: 'AddLiquidity',
      values: {
        provider: '0xd632f22692fac7611d2aa1c0d552930d43caed3b',
        token_amounts: [0n, 0n, 16693478136n],
        fees: [241451091954517168n, 223748n, 465102n],
        invariant: 983041678849594703189995803n,
        token_supply: 962020550720010116353691445n,
      },
    };
    const deposit = depositClassifier.parse(pool, event, []);
    expect(deposit).toEqual<LiquidityDeposit>({
      block: {
        hash: '0x8f355d242b4acfc89ab660543078cf96134c201570b20b7ca5e70e508fdc2ccb',
        number: 15316758,
      },
      transaction: {
        from: '0x0cb406933cf62172f9bd564a8346fd2ce5e32775',
        hash: '0xb34ea17eeaca412e3d9c42f9271d0c93e4622b51db63c82789e6d8f366824b7e',
        index: 150,
        gasUsed: 862958,
      },
      event: {
        address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
        logIndex: 369,
      },
      contract: {
        address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
        protocol: {
          abi: 'CurveV1',
          factory: {
            address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
            label: 'Curve V1',
          },
        },
      },
      depositor: '0xd632f22692fac7611d2aa1c0d552930d43caed3b',
      assets: [
        {
          type: 'erc20',
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        },
        {
          type: 'erc20',
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
        {
          type: 'erc20',
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
      ],
      amounts: [0n, 0n, 16693478136n],
      metadata: {},
    });
    // TODO 4 token pool
  });

  test('liquidity withdrawal', () => {
    if (!withdrawalClassifier) {
      expect.fail();
    }

    // TODO 2 token pool
    // 3 token pool
    const pool: Pool = {
      address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
      assets: [
        '0x6b175474e89094c44da98b954eedeac495271d0f',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
      ],
      factory: {
        address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
        label: 'Curve V1',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
      blockHash:
        '0x461a16fa0eb3d0170f26409044498e759a6c3cdcfacc04c5267287536aa464a0',
      blockNumber: 15316631,
      transactionFrom: '0xa2026e62bfd1f1a2d8b89a19f3fa0ba42b52f0bf',
      transactionHash:
        '0xc4e32fde23685d586bef5e48a75dcd34f9b81346386892d9d7735815d4c8ce93',
      transactionIndex: 262,
      gasUsed: 330640,
      logIndex: 410,
      classifier: withdrawalClassifier,
      name: 'RemoveLiquidity',
      values: {
        provider: '0xd632f22692fac7611d2aa1c0d552930d43caed3b',
        token_amounts: [15522500385952297880271n, 14370661805n, 10352720391n],
        fees: [0n, 0n, 0n],
        token_supply: 962156948317988516166781257n,
      },
    };
    const withdrawal = withdrawalClassifier.parse(pool, event, []);
    expect(withdrawal).toEqual<LiquidityWithdrawal>({
      block: {
        hash: '0x461a16fa0eb3d0170f26409044498e759a6c3cdcfacc04c5267287536aa464a0',
        number: 15316631,
      },
      transaction: {
        from: '0xa2026e62bfd1f1a2d8b89a19f3fa0ba42b52f0bf',
        hash: '0xc4e32fde23685d586bef5e48a75dcd34f9b81346386892d9d7735815d4c8ce93',
        index: 262,
        gasUsed: 330640,
      },
      event: {
        address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
        logIndex: 410,
      },
      contract: {
        address: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
        protocol: {
          abi: 'CurveV1',
          factory: {
            address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
            label: 'Curve V1',
          },
        },
      },
      withdrawer: '0xd632f22692fac7611d2aa1c0d552930d43caed3b',
      assets: [
        {
          type: 'erc20',
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        },
        {
          type: 'erc20',
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
        {
          type: 'erc20',
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
      ],
      amounts: [15522500385952297880271n, 14370661805n, 10352720391n],
      metadata: {},
    });
    // TODO 4 token pool

    // TODO 2 token pool, imbalanced
    // TODO 3 token pool, imbalanced
    // TODO 4 token pool, imbalanced
  });
});
