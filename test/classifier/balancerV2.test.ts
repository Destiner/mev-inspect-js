import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import { CLASSIFIERS as balancerV2Classifiers } from '../../src/classifier/balancerV2.js';

const swapClassifier = balancerV2Classifiers[0];

describe('Classfiers: Balancer V2', () => {
  test('parses a swap', () => {
    const pool = {
      address: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
      assets: [
        '0xba100000625a3754423978a60c9317c58a424e3D',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
    };
    const event = {
      address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      transactionHash:
        '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
      logIndex: 10,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014',
        tokenIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        tokenOut: '0xba100000625a3754423978a60c9317c58a424e3d',
        amountIn: BigNumber.from('17608500000000000000'),
        amountOut: BigNumber.from('3698791690807238453478'),
      },
    };
    const transfers = [
      {
        transaction: {
          hash: '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
        },
        event: {
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          logIndex: 11,
        },
        from: '0x0000006daea1723962647b7e189d311d757fb793',
        to: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        value: 17608500000000000000n,
      },
      {
        transaction: {
          hash: '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
        },
        event: {
          address: '0xba100000625a3754423978a60c9317c58a424e3d',
          logIndex: 12,
        },
        from: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        to: '0x0000006daea1723962647b7e189d311d757fb793',
        value: 3698791690807238453478n,
      },
    ];

    if (swapClassifier.event.type !== 'swap') {
      expect.fail();
    }
    const swap = swapClassifier.event.parse(pool, event, transfers);
    expect(swap).toEqual({
      transaction: {
        hash: '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 10,
      },
      maker: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
      makerAsset: '0xba100000625a3754423978a60c9317c58a424e3d',
      makerAmount: 3698791690807238453478n,
      taker: '0x0000006daea1723962647b7e189d311d757fb793',
      takerAsset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      takerAmount: 17608500000000000000n,
    });
  });
});
