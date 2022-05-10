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
      gasUsed: 130598,
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
          gasUsed: 130598,
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
          gasUsed: 130598,
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
        gasUsed: 130598,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 10,
      },
      contract: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
      from: '0x0000006daea1723962647b7e189d311d757fb793',
      to: '0x0000006daea1723962647b7e189d311d757fb793',
      assetOut: '0xba100000625a3754423978a60c9317c58a424e3d',
      amountOut: 3698791690807238453478n,
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountIn: 17608500000000000000n,
    });
  });

  test('parses a swap with different from/to', () => {
    const pool = {
      address: '0xe2469f47ab58cf9cf59f9822e3c5de4950a41c49',
      assets: [
        '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
    };
    const event = {
      address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      transactionHash:
        '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
      gasUsed: 162269,
      logIndex: 14,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0xe2469f47ab58cf9cf59f9822e3c5de4950a41c49000200000000000000000089',
        tokenIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        tokenOut: '0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2',
        amountIn: BigNumber.from('728566000000000000'),
        amountOut: BigNumber.from('6329353631552147493643'),
      },
    };
    const transfers = [
      {
        transaction: {
          hash: '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
          gasUsed: 162269,
        },
        event: {
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          logIndex: 15,
        },
        from: '0x45716d9eddbc332df1d42b9f540fbebed671b20f',
        to: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        value: 728566000000000000n,
      },
      {
        transaction: {
          hash: '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
          gasUsed: 162269,
        },
        event: {
          address: '0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2',
          logIndex: 16,
        },
        from: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        to: '0x0d0d65e7a7db277d3e0f5e1676325e75f3340455',
        value: 6329353631552147493643n,
      },
    ];

    if (swapClassifier.event.type !== 'swap') {
      expect.fail();
    }
    const swap = swapClassifier.event.parse(pool, event, transfers);
    expect(swap).toEqual({
      transaction: {
        hash: '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
        gasUsed: 162269,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 14,
      },
      contract: '0xe2469f47ab58cf9cf59f9822e3c5de4950a41c49',
      from: '0x45716d9eddbc332df1d42b9f540fbebed671b20f',
      to: '0x0d0d65e7a7db277d3e0f5e1676325e75f3340455',
      assetOut: '0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2',
      amountOut: 6329353631552147493643n,
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountIn: 728566000000000000n,
    });
  });
});
