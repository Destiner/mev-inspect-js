import { describe, test, expect } from 'vitest';

import {
  LiquidityDeposit,
  LiquidityWithdrawal,
  Pool,
  Swap,
} from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import balancerV1Classifiers from '../../src/classifier/items/balancerV1.js';

const swapClassifier = balancerV1Classifiers.swap;
const depositClassifier = balancerV1Classifiers.liquidityDeposit;
const withdrawalClassifier = balancerV1Classifiers.liquidityWithdrawal;

describe('Classfiers: Balancer V1', () => {
  test('swap', () => {
    if (!swapClassifier) {
      expect.fail();
    }

    const pool: Pool = {
      address: '0x69d460e01070a7ba1bc363885bc8f4f0daa19bf5',
      assets: [
        '0x6b175474e89094c44da98b954eedeac495271d0f',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0x8f8221afbb33998d8584a2b05749ba73c37a938a',
      ],
      factory: {
        address: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
        label: 'Balancer V1',
      },
    };
    const event: ClassifiedEvent = {
      address: '0x69d460e01070A7BA1bc363885bC8F4F0daa19Bf5',
      blockHash:
        '0x534226d32b31306725da9bf78f10d713ece4d6c42281ada55fb6b0fe8b30706e',
      blockNumber: 15635657,
      transactionFrom: '0x003FD5F6030b8C1a4D2503339b14466b9bA6C6cf',
      transactionHash:
        '0xb226da500e281b8b528941247bb90dada3a9c5f4690e59085baf720852e45a9c',
      transactionIndex: 2,
      gasUsed: 283687,
      logIndex: 10,
      classifier: swapClassifier,
      name: 'LOG_SWAP',
      values: {
        caller: '0x0000000000007F150Bd6f54c40A34d7C3d5e9f56',
        tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        tokenOut: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        tokenAmountIn: 1419913847n,
        tokenAmountOut: 1438429917528496631819n,
      },
    };

    const swap = swapClassifier.parse(pool, event, [], []);
    expect(swap).toEqual<Swap>({
      contract: {
        address: '0x69d460e01070a7ba1bc363885bc8f4f0daa19bf5',
        protocol: {
          abi: 'BalancerV1',
          factory: {
            address: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
            label: 'Balancer V1',
          },
        },
      },
      block: {
        hash: '0x534226d32b31306725da9bf78f10d713ece4d6c42281ada55fb6b0fe8b30706e',
        number: 15635657,
      },
      transaction: {
        from: '0x003fd5f6030b8c1a4d2503339b14466b9ba6c6cf',
        hash: '0xb226da500e281b8b528941247bb90dada3a9c5f4690e59085baf720852e45a9c',
        index: 2,
        gasUsed: 283687,
      },
      event: {
        logIndex: 10,
        address: '0x69d460e01070a7ba1bc363885bc8f4f0daa19bf5',
      },
      from: '0x0000000000007f150bd6f54c40a34d7c3d5e9f56',
      to: '0x0000000000007f150bd6f54c40a34d7c3d5e9f56',
      assetIn: {
        type: 'erc20',
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      },
      amountIn: 1419913847n,
      assetOut: {
        type: 'erc20',
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      },
      amountOut: 1438429917528496631819n,
      metadata: {},
    });
  });

  test('liquidity deposit', () => {
    if (!depositClassifier) {
      expect.fail();
    }

    const pool: Pool = {
      address: '0xe5d1fab0c5596ef846dcc0958d6d0b20e1ec4498',
      assets: [
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        '0x6b175474e89094c44da98b954eedeac495271d0f',
      ],
      factory: {
        address: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
        label: 'Balancer V1',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xe5d1fab0c5596ef846dcc0958d6d0b20e1ec4498',
      blockHash:
        '0x6defb498480d1584f1aad238f69bb4badb2d2dc0f3fed3ce3e36d413eec8ad85',
      blockNumber: 11629352,
      transactionFrom: '0xf704d32ba4851907540ad060ffacab3ba6cb2793',
      transactionHash:
        '0x553057d36511dd5973ca18897acd1a2649ebde5685ec4d7634f77f7a98ffcce3',
      transactionIndex: 27,
      gasUsed: 359084,
      logIndex: 60,
      classifier: depositClassifier,
      name: 'LOG_JOIN',
      values: {
        caller: '0xa8a8a82bbcdf1f682398ac3ef8490f34927ebf93',
        tokenIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        tokenAmountIn: 18314290307656602532n,
      },
    };
    const deposit = depositClassifier.parse(pool, event, []);
    expect(deposit).toEqual<LiquidityDeposit>({
      block: {
        hash: '0x6defb498480d1584f1aad238f69bb4badb2d2dc0f3fed3ce3e36d413eec8ad85',
        number: 11629352,
      },
      transaction: {
        from: '0xf704d32ba4851907540ad060ffacab3ba6cb2793',
        hash: '0x553057d36511dd5973ca18897acd1a2649ebde5685ec4d7634f77f7a98ffcce3',
        index: 27,
        gasUsed: 359084,
      },
      event: {
        address: '0xe5d1fab0c5596ef846dcc0958d6d0b20e1ec4498',
        logIndex: 60,
      },
      contract: {
        address: '0xe5d1fab0c5596ef846dcc0958d6d0b20e1ec4498',
        protocol: {
          abi: 'BalancerV1',
          factory: {
            address: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
            label: 'Balancer V1',
          },
        },
      },
      depositor: '0xa8a8a82bbcdf1f682398ac3ef8490f34927ebf93',
      assets: [
        {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      ],
      amounts: [18314290307656602532n],
      metadata: {},
    });
  });

  test('liquidity withdrawal', () => {
    if (!withdrawalClassifier) {
      expect.fail();
    }

    const pool: Pool = {
      address: '0xe5d1fab0c5596ef846dcc0958d6d0b20e1ec4498',
      assets: [
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        '0x6b175474e89094c44da98b954eedeac495271d0f',
      ],
      factory: {
        address: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
        label: 'Balancer V1',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xe5d1fab0c5596ef846dcc0958d6d0b20e1ec4498',
      blockHash:
        '0x2e5b5a0f9782ffd40d0d8ef22ed38e7d334e31577c2a34fa9a3eb7127ac04b81',
      blockNumber: 12545754,
      transactionFrom: '0x1f08863f246fe456f94579d1a2009108b574f509',
      transactionHash:
        '0xce840596e5f76ed514a39676b7d824ea6686231dd4bb335ce8f346fac8abda90',
      transactionIndex: 27,
      gasUsed: 139935,
      logIndex: 286,
      classifier: withdrawalClassifier,
      name: 'RemoveLiquidity',
      values: {
        caller: '0x1f08863f246fe456f94579d1a2009108b574f509',
        tokenOut: '0x6b175474e89094c44da98b954eedeac495271d0f',
        tokenAmountOut: 82427045215513159373n,
      },
    };
    const withdrawal = withdrawalClassifier.parse(pool, event, []);
    expect(withdrawal).toEqual<LiquidityWithdrawal>({
      block: {
        hash: '0x2e5b5a0f9782ffd40d0d8ef22ed38e7d334e31577c2a34fa9a3eb7127ac04b81',
        number: 12545754,
      },
      transaction: {
        from: '0x1f08863f246fe456f94579d1a2009108b574f509',
        hash: '0xce840596e5f76ed514a39676b7d824ea6686231dd4bb335ce8f346fac8abda90',
        index: 27,
        gasUsed: 139935,
      },
      event: {
        address: '0xe5d1fab0c5596ef846dcc0958d6d0b20e1ec4498',
        logIndex: 286,
      },
      contract: {
        address: '0xe5d1fab0c5596ef846dcc0958d6d0b20e1ec4498',
        protocol: {
          abi: 'BalancerV1',
          factory: {
            address: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
            label: 'Balancer V1',
          },
        },
      },
      withdrawer: '0x1f08863f246fe456f94579d1a2009108b574f509',
      assets: [
        {
          type: 'erc20',
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        },
      ],
      amounts: [82427045215513159373n],
      metadata: {},
    });
  });
});
