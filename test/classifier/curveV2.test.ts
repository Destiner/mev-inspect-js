import { describe, test, expect } from 'vitest';

import {
  LiquidityDeposit,
  LiquidityWithdrawal,
  Pool,
  Swap,
} from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import curveV2Classifiers from '../../src/classifier/items/curveV2.js';

const swapClassifier = curveV2Classifiers.swap;
const depositClassifier = curveV2Classifiers.liquidityDeposit;
const withdrawalClassifier = curveV2Classifiers.liquidityWithdrawal;

describe('Classfiers: Curve V2', () => {
  test('swap', () => {
    if (!swapClassifier) {
      expect.fail();
    }

    const pool: Pool = {
      address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
      assets: [
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
        '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
        label: 'Curve V2',
      },
    };

    const event: ClassifiedEvent = {
      address: '0xD51a44d3FaE010294C616388b506AcdA1bfAAE46',
      blockHash:
        '0x30a5f34247fe2ea33f6c7b35ec9a0c4a3b905eb2f538b6c64ae635f5c77c22ee',
      blockNumber: 15591593,
      transactionFrom: '0x5093852B185c1BDF2a87Cb76824ca43611400a02',
      transactionHash:
        '0x726d1833568844c15e482d8fcb0a2f250d2acb5add7a5f648115e21e5fdc3617',
      transactionIndex: 157,
      gasUsed: 410029,
      logIndex: 258,
      classifier: swapClassifier,
      name: 'TokenExchange',
      values: {
        buyer: '0x00000000C2Cf7648c169b25ef1C217864bFa38cC',
        sold_id: 1n,
        tokens_sold: 1492384890n,
        bought_id: 2n,
        tokens_bought: 218812804721126460228n,
      },
    };

    const swap = swapClassifier.parse(pool, event, [], []);
    expect(swap).toEqual<Swap>({
      contract: {
        address: '0xD51a44d3FaE010294C616388b506AcdA1bfAAE46',
        protocol: {
          abi: 'CurveV2',
          factory: {
            address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
            label: 'Curve V2',
          },
        },
      },
      block: {
        hash: '0x30a5f34247fe2ea33f6c7b35ec9a0c4a3b905eb2f538b6c64ae635f5c77c22ee',
        number: 15591593,
      },
      transaction: {
        from: '0x5093852b185c1bdf2a87cb76824ca43611400a02',
        hash: '0x726d1833568844c15e482d8fcb0a2f250d2acb5add7a5f648115e21e5fdc3617',
        index: 157,
        gasUsed: 410029,
      },
      event: {
        address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
        logIndex: 258,
      },
      from: '0x00000000c2cf7648c169b25ef1c217864bfa38cc',
      to: '0x00000000c2cf7648c169b25ef1c217864bfa38cc',
      assetIn: {
        type: 'erc20',
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      },
      amountIn: 1492384890n,
      assetOut: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountOut: 218812804721126460228n,
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
      address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
      assets: [
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
        '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
        label: 'Curve V2',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
      blockHash:
        '0x008ae3b3592025bdaadaed34e95ae5d74b8a107409d730a03cab1a4ff5f017e5',
      blockNumber: 15316854,
      transactionFrom: '0x260b46708eccb4cfe3c27584dcae6b5ec6115e7d',
      transactionHash:
        '0x9a311fb6494f08e50fd503234022dd3c2838d1a3360f1b4eff30bf6893a9a4f8',
      transactionIndex: 121,
      gasUsed: 289690,
      logIndex: 250,
      classifier: depositClassifier,
      name: 'AddLiquidity',
      values: {
        provider: '0x3993d34e7e99abf6b6f367309975d1360222d446',
        token_amounts: [18022107731n, 0n, 0n],
        fee: 8302836161510171n,
        token_supply: 260176026314976780821455n,
      },
    };
    const deposit = depositClassifier.parse(pool, event, []);
    expect(deposit).toEqual<LiquidityDeposit>({
      block: {
        hash: '0x008ae3b3592025bdaadaed34e95ae5d74b8a107409d730a03cab1a4ff5f017e5',
        number: 15316854,
      },
      transaction: {
        from: '0x260b46708eccb4cfe3c27584dcae6b5ec6115e7d',
        hash: '0x9a311fb6494f08e50fd503234022dd3c2838d1a3360f1b4eff30bf6893a9a4f8',
        index: 121,
        gasUsed: 289690,
      },
      event: {
        address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
        logIndex: 250,
      },
      contract: {
        address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
        protocol: {
          abi: 'CurveV2',
          factory: {
            address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
            label: 'Curve V2',
          },
        },
      },
      depositor: '0x3993d34e7e99abf6b6f367309975d1360222d446',
      assets: [
        {
          type: 'erc20',
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
        {
          type: 'erc20',
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        },
        {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      ],
      amounts: [18022107731n, 0n, 0n],
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
    const poolA: Pool = {
      address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
      assets: [
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
        '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
        label: 'Curve V2',
      },
    };
    const eventA: ClassifiedEvent = {
      address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
      blockHash:
        '0x18a5a6867177867f6ea2e6ef4b5e68af85f81bf88618186259fd702dc3f92607',
      blockNumber: 15314284,
      transactionFrom: '0x8c73d39b2da2dd1a10cc16502bc7c8d768ec74c9',
      transactionHash:
        '0x5e33623c748205175515ff3377d38b018859c535bdb481cdaffab9289a806259',
      transactionIndex: 203,
      gasUsed: 3641563,
      logIndex: 410,
      classifier: withdrawalClassifier,
      name: 'RemoveLiquidity',
      values: {
        provider: '0x871fbd4e01012e2e8457346059e8c189d664dba4',
        token_amounts: [23457526136n, 100937498n, 13594163931071854968n],
        token_supply: 259343735761388914741131n,
      },
    };
    const withdrawalA = withdrawalClassifier.parse(poolA, eventA, []);
    expect(withdrawalA).toEqual<LiquidityWithdrawal>({
      block: {
        hash: '0x18a5a6867177867f6ea2e6ef4b5e68af85f81bf88618186259fd702dc3f92607',
        number: 15314284,
      },
      transaction: {
        from: '0x8c73d39b2da2dd1a10cc16502bc7c8d768ec74c9',
        hash: '0x5e33623c748205175515ff3377d38b018859c535bdb481cdaffab9289a806259',
        index: 203,
        gasUsed: 3641563,
      },
      event: {
        address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
        logIndex: 410,
      },
      contract: {
        address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
        protocol: {
          abi: 'CurveV2',
          factory: {
            address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
            label: 'Curve V2',
          },
        },
      },
      withdrawer: '0x871fbd4e01012e2e8457346059e8c189d664dba4',
      assets: [
        {
          type: 'erc20',
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
        {
          type: 'erc20',
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        },
        {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      ],
      amounts: [23457526136n, 100937498n, 13594163931071854968n],
      metadata: {},
    });
    // TODO 4 token pool

    // TODO 2 token pool, imbalanced
    // TODO 3 token pool, imbalanced
    // TODO 4 token pool, imbalanced

    // single token
    const poolB: Pool = {
      address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
      assets: [
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
        '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
        label: 'Curve V2',
      },
    };
    const eventB: ClassifiedEvent = {
      address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
      blockHash:
        '0x6d14a027ac20e50a065867a14d1828983c7fe730c94bcf750da1ea0c42eea487',
      blockNumber: 15314636,
      transactionFrom: '0x3e03e274eb8c770d95b849230cb8087e192ee311',
      transactionHash:
        '0xa4b5e4e54bd3aaeeb893a931dbb6b77ad9a6fd5f87845ce9fb28c714cd7e92cb',
      transactionIndex: 231,
      gasUsed: 318727,
      logIndex: 545,
      classifier: withdrawalClassifier,
      name: 'RemoveLiquidityOne',
      values: {
        provider: '0x3e03e274eb8c770d95b849230cb8087e192ee311',
        token_amount: 11756942807822947515n,
        coin_index: 0n,
        coin_amount: 12726234498n,
      },
    };
    const withdrawalB = withdrawalClassifier.parse(poolB, eventB, []);
    expect(withdrawalB).toEqual<LiquidityWithdrawal>({
      block: {
        hash: '0x6d14a027ac20e50a065867a14d1828983c7fe730c94bcf750da1ea0c42eea487',
        number: 15314636,
      },
      transaction: {
        from: '0x3e03e274eb8c770d95b849230cb8087e192ee311',
        hash: '0xa4b5e4e54bd3aaeeb893a931dbb6b77ad9a6fd5f87845ce9fb28c714cd7e92cb',
        index: 231,
        gasUsed: 318727,
      },
      event: {
        address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
        logIndex: 545,
      },
      contract: {
        address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
        protocol: {
          abi: 'CurveV2',
          factory: {
            address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
            label: 'Curve V2',
          },
        },
      },
      withdrawer: '0x3e03e274eb8c770d95b849230cb8087e192ee311',
      assets: [
        {
          type: 'erc20',
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
      ],
      amounts: [12726234498n],
      metadata: {},
    });
  });
});
