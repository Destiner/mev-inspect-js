import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import {
  LiquidityDeposit,
  LiquidityWithdrawal,
  Pool,
} from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import curveV1Classifiers from '../../src/classifier/items/curveV1.js';

const depositClassifier = curveV1Classifiers[1];
const withdrawalClassifier = curveV1Classifiers[2];

describe('Classfiers: Curve V1', () => {
  test.todo('swap');

  test('liquidity deposit', () => {
    if (depositClassifier.type !== 'liquidity_deposit') {
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
      transactionHash:
        '0xb34ea17eeaca412e3d9c42f9271d0c93e4622b51db63c82789e6d8f366824b7e',
      gasUsed: 862958,
      logIndex: 369,
      classifier: depositClassifier,
      name: 'AddLiquidity',
      values: {
        provider: '0xd632f22692fac7611d2aa1c0d552930d43caed3b',
        token_amounts: [
          BigNumber.from('0'),
          BigNumber.from('0'),
          BigNumber.from('16693478136'),
        ],
        fees: [
          BigNumber.from('241451091954517168'),
          BigNumber.from('223748'),
          BigNumber.from('465102'),
        ],
        invariant: BigNumber.from('983041678849594703189995803'),
        token_supply: BigNumber.from('962020550720010116353691445'),
      },
    };
    const deposit = depositClassifier.parse(pool, event);
    expect(deposit).toEqual<LiquidityDeposit>({
      block: {
        hash: '0x8f355d242b4acfc89ab660543078cf96134c201570b20b7ca5e70e508fdc2ccb',
        number: 15316758,
      },
      transaction: {
        hash: '0xb34ea17eeaca412e3d9c42f9271d0c93e4622b51db63c82789e6d8f366824b7e',
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
        '0x6b175474e89094c44da98b954eedeac495271d0f',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
      ],
      amounts: [0n, 0n, 16693478136n],
      metadata: {},
    });
    // TODO 4 token pool
  });

  test('liquidity withdrawal', () => {
    if (withdrawalClassifier.type !== 'liquidity_withdrawal') {
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
      transactionHash:
        '0xc4e32fde23685d586bef5e48a75dcd34f9b81346386892d9d7735815d4c8ce93',
      gasUsed: 330640,
      logIndex: 410,
      classifier: depositClassifier,
      name: 'RemoveLiquidity',
      values: {
        provider: '0xd632f22692fac7611d2aa1c0d552930d43caed3b',
        token_amounts: [
          BigNumber.from('15522500385952297880271'),
          BigNumber.from('14370661805'),
          BigNumber.from('10352720391'),
        ],
        fees: [BigNumber.from('0'), BigNumber.from('0'), BigNumber.from('0')],
        token_supply: BigNumber.from('962156948317988516166781257'),
      },
    };
    const withdrawal = withdrawalClassifier.parse(pool, event);
    expect(withdrawal).toEqual<LiquidityWithdrawal>({
      block: {
        hash: '0x461a16fa0eb3d0170f26409044498e759a6c3cdcfacc04c5267287536aa464a0',
        number: 15316631,
      },
      transaction: {
        hash: '0xc4e32fde23685d586bef5e48a75dcd34f9b81346386892d9d7735815d4c8ce93',
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
        '0x6b175474e89094c44da98b954eedeac495271d0f',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
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
