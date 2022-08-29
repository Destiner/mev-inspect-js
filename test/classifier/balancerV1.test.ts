import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import {
  LiquidityDeposit,
  LiquidityWithdrawal,
  Pool,
} from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import balancerV1Classifiers from '../../src/classifier/items/balancerV1.js';

const depositClassifier = balancerV1Classifiers[1];
const withdrawalClassifier = balancerV1Classifiers[2];

describe('Classfiers: Balancer V1', () => {
  test.todo('swap');

  test('liquidity deposit', () => {
    if (depositClassifier.type !== 'liquidity_deposit') {
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
        tokenAmountIn: BigNumber.from('18314290307656602532'),
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
    if (withdrawalClassifier.type !== 'liquidity_withdrawal') {
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
        tokenAmountOut: BigNumber.from('82427045215513159373'),
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
