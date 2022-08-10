import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import { Pool, Transfer } from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import balancerV2Classifiers from '../../src/classifier/items/balancerV2.js';
import uniswapClassifier from '../../src/classifier/items/uniswapV2.js';
import { Swap } from '../../src/index.js';

const swapClassifier = balancerV2Classifiers[0];
const transferClassifier = balancerV2Classifiers[3];

describe('Classfiers: Balancer V2', () => {
  test('swap', () => {
    const pool: Pool = {
      address: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
      assets: [
        '0xba100000625a3754423978a60c9317c58a424e3D',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x23e0f302bfb2154c8dec3dafc7d87633bd1ee12d57e8046508934196c1efd677',
      blockNumber: 14710009,
      transactionHash:
        '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
      gasUsed: 130598,
      logIndex: 10,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014',
        tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        tokenOut: '0xba100000625a3754423978a60c9317c58a424e3D',
        amountIn: BigNumber.from('17608500000000000000'),
        amountOut: BigNumber.from('3698791690807238453478'),
      },
    };
    const transfers: Transfer[] = [
      {
        block: {
          hash: '0x23e0f302bfb2154c8dec3dafc7d87633bd1ee12d57e8046508934196c1efd677',
          number: 14710009,
        },
        transaction: {
          hash: '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
          gasUsed: 130598,
        },
        event: {
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          logIndex: 11,
        },
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x0000006daea1723962647b7e189d311d757fb793',
        to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        value: 17608500000000000000n,
      },
      {
        block: {
          hash: '0x23e0f302bfb2154c8dec3dafc7d87633bd1ee12d57e8046508934196c1efd677',
          number: 14710009,
        },
        transaction: {
          hash: '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
          gasUsed: 130598,
        },
        event: {
          address: '0xba100000625a3754423978a60c9317c58a424e3d',
          logIndex: 12,
        },
        asset: '0xba100000625a3754423978a60c9317c58a424e3d',
        from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        to: '0x0000006daea1723962647b7e189d311d757fb793',
        value: 3698791690807238453478n,
      },
    ];
    const allEvents = [
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x23e0f302bfb2154c8dec3dafc7d87633bd1ee12d57e8046508934196c1efd677',
        blockNumber: 14710009,
        transactionHash:
          '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
        gasUsed: 130598,
        logIndex: 10,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014',
          tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          tokenOut: '0xba100000625a3754423978a60c9317c58a424e3D',
          amountIn: BigNumber.from('17608500000000000000'),
          amountOut: BigNumber.from('3698791690807238453478'),
        },
      },
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        blockHash:
          '0x23e0f302bfb2154c8dec3dafc7d87633bd1ee12d57e8046508934196c1efd677',
        blockNumber: 14710009,
        transactionHash:
          '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
        gasUsed: 130598,
        logIndex: 11,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0x0000006daea1723962647b7e189d311d757Fb793',
          to: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          value: BigNumber.from('17608500000000000000'),
        },
      },
      {
        address: '0xba100000625a3754423978a60c9317c58a424e3D',
        blockHash:
          '0x23e0f302bfb2154c8dec3dafc7d87633bd1ee12d57e8046508934196c1efd677',
        blockNumber: 14710009,
        transactionHash:
          '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
        gasUsed: 130598,
        logIndex: 12,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          to: '0x0000006daea1723962647b7e189d311d757Fb793',
          value: BigNumber.from('3698791690807238453478'),
        },
      },
    ];

    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }
    const swap = swapClassifier.parse(pool, event, transfers, allEvents);
    expect(swap).toEqual<Swap>({
      block: {
        hash: '0x23e0f302bfb2154c8dec3dafc7d87633bd1ee12d57e8046508934196c1efd677',
        number: 14710009,
      },
      transaction: {
        hash: '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
        gasUsed: 130598,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 10,
      },
      contract: {
        address: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      from: '0x0000006daea1723962647b7e189d311d757fb793',
      to: '0x0000006daea1723962647b7e189d311d757fb793',
      assetOut: '0xba100000625a3754423978a60c9317c58a424e3d',
      amountOut: 3698791690807238453478n,
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountIn: 17608500000000000000n,
      metadata: {},
    });
  });

  test('swap with different from/to', () => {
    const pool: Pool = {
      address: '0xe2469f47ab58cf9cf59f9822e3c5de4950a41c49',
      assets: [
        '0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0xce03f52cc6b0d0d8134f8d2951cbcca650b4fe7bb68547ffa26416d168a407ad',
      blockNumber: 14708581,
      transactionHash:
        '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
      gasUsed: 162269,
      logIndex: 14,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0xe2469f47ab58cf9cf59f9822e3c5de4950a41c49000200000000000000000089',
        tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        tokenOut: '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2',
        amountIn: BigNumber.from('728566000000000000'),
        amountOut: BigNumber.from('6329353631552147493643'),
      },
    };
    const transfers: Transfer[] = [
      {
        block: {
          hash: '0xce03f52cc6b0d0d8134f8d2951cbcca650b4fe7bb68547ffa26416d168a407ad',
          number: 14708581,
        },
        transaction: {
          hash: '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
          gasUsed: 162269,
        },
        event: {
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          logIndex: 15,
        },
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x45716d9eddbc332df1d42b9f540fbebed671b20f',
        to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        value: 728566000000000000n,
      },
      {
        block: {
          hash: '0xce03f52cc6b0d0d8134f8d2951cbcca650b4fe7bb68547ffa26416d168a407ad',
          number: 14708581,
        },
        transaction: {
          hash: '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
          gasUsed: 162269,
        },
        event: {
          address: '0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2',
          logIndex: 16,
        },
        asset: '0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2',
        from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        to: '0x0d0d65e7a7db277d3e0f5e1676325e75f3340455',
        value: 6329353631552147493643n,
      },
    ];
    const allEvents = [
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0xce03f52cc6b0d0d8134f8d2951cbcca650b4fe7bb68547ffa26416d168a407ad',
        blockNumber: 14708581,
        transactionHash:
          '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
        gasUsed: 162269,
        logIndex: 14,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0xe2469f47ab58cf9cf59f9822e3c5de4950a41c49000200000000000000000089',
          tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          tokenOut: '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2',
          amountIn: BigNumber.from('728566000000000000'),
          amountOut: BigNumber.from('6329353631552147493643'),
        },
      },
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        blockHash:
          '0xce03f52cc6b0d0d8134f8d2951cbcca650b4fe7bb68547ffa26416d168a407ad',
        blockNumber: 14708581,
        transactionHash:
          '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
        gasUsed: 162269,
        logIndex: 15,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0x45716d9EDdbc332df1D42b9F540FBEBeD671B20F',
          to: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          value: BigNumber.from('728566000000000000'),
        },
      },
      {
        address: '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2',
        blockHash:
          '0xce03f52cc6b0d0d8134f8d2951cbcca650b4fe7bb68547ffa26416d168a407ad',
        blockNumber: 14708581,
        transactionHash:
          '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
        gasUsed: 162269,
        logIndex: 16,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          to: '0x0d0d65E7A7dB277d3E0F5E1676325E75f3340455',
          value: BigNumber.from('6329353631552147493643'),
        },
      },
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        blockHash:
          '0xce03f52cc6b0d0d8134f8d2951cbcca650b4fe7bb68547ffa26416d168a407ad',
        blockNumber: 14708581,
        transactionHash:
          '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
        gasUsed: 162269,
        logIndex: 17,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0x0d0d65E7A7dB277d3E0F5E1676325E75f3340455',
          to: '0x45716d9EDdbc332df1D42b9F540FBEBeD671B20F',
          value: BigNumber.from('736414889979992618'),
        },
      },
      {
        address: '0x0d0d65E7A7dB277d3E0F5E1676325E75f3340455',
        blockHash:
          '0xce03f52cc6b0d0d8134f8d2951cbcca650b4fe7bb68547ffa26416d168a407ad',
        blockNumber: 14708581,
        transactionHash:
          '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
        gasUsed: 162269,
        logIndex: 19,
        classifier: uniswapClassifier,
        name: 'Swap',
        values: {
          sender: '0x45716d9EDdbc332df1D42b9F540FBEBeD671B20F',
          amount0In: BigNumber.from('6329353631552147493643'),
          amount1In: BigNumber.from('0'),
          amount0Out: BigNumber.from('0'),
          amount1Out: BigNumber.from('736414889979992618'),
          to: '0x45716d9EDdbc332df1D42b9F540FBEBeD671B20F',
        },
      },
    ];

    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }
    const swap = swapClassifier.parse(pool, event, transfers, allEvents);
    expect(swap).toEqual<Swap>({
      block: {
        hash: '0xce03f52cc6b0d0d8134f8d2951cbcca650b4fe7bb68547ffa26416d168a407ad',
        number: 14708581,
      },
      transaction: {
        hash: '0x49fb0fb07827b3e6fa425fbb7ef1f1fbe3dfedbf656519bfe6d4bf9391aea1d2',
        gasUsed: 162269,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 14,
      },
      contract: {
        address: '0xe2469f47ab58cf9cf59f9822e3c5de4950a41c49',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      from: '0x45716d9eddbc332df1d42b9f540fbebed671b20f',
      to: '0x0d0d65e7a7db277d3e0f5e1676325e75f3340455',
      assetOut: '0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2',
      amountOut: 6329353631552147493643n,
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountIn: 728566000000000000n,
      metadata: {},
    });
  });

  test('eth -> token swap', () => {
    const pool: Pool = {
      address: '0x0bf37157d30dfe6f56757dcadff01aed83b08cd6',
      assets: [
        '0x333a4823466879eef910a04d473505da62142069',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0xc906a05c5da95f82839e0f96bed96481be93b6613e9a57af46ecc8f24389cc79',
      blockNumber: 14708553,
      transactionHash:
        '0xc785c5713ef1d2e527559746004276f15aaedf62503b670bdf16e156b82aa39b',
      gasUsed: 97449,
      logIndex: 686,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x0bf37157d30dfe6f56757dcadff01aed83b08cd600020000000000000000019a',
        tokenIn: '0x333A4823466879eeF910A04D473505da62142069',
        tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: BigNumber.from('0x29a2047c65342d17'),
        amountOut: BigNumber.from('0x260c600b5dd64e21'),
      },
    };
    const transfers: Transfer[] = [
      {
        asset: '0x333a4823466879eef910a04d473505da62142069',
        from: '0xed308a08b051da28d59606d9dd9a3dced7ad188c',
        to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        value: 2999965234102545687n,
        block: {
          hash: '0xc906a05c5da95f82839e0f96bed96481be93b6613e9a57af46ecc8f24389cc79',
          number: 14708553,
        },
        transaction: {
          hash: '0xc785c5713ef1d2e527559746004276f15aaedf62503b670bdf16e156b82aa39b',
          gasUsed: 97449,
        },
        event: {
          logIndex: 687,
          address: '0x333a4823466879eef910a04d473505da62142069',
        },
      },
    ];
    const allEvents = [
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0xc906a05c5da95f82839e0f96bed96481be93b6613e9a57af46ecc8f24389cc79',
        blockNumber: 14708553,
        transactionHash:
          '0xc785c5713ef1d2e527559746004276f15aaedf62503b670bdf16e156b82aa39b',
        gasUsed: 97449,
        logIndex: 686,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x0bf37157d30dfe6f56757dcadff01aed83b08cd600020000000000000000019a',
          tokenIn: '0x333A4823466879eeF910A04D473505da62142069',
          tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          amountIn: BigNumber.from('0x29a2047c65342d17'),
          amountOut: BigNumber.from('0x260c600b5dd64e21'),
        },
      },
      {
        address: '0x333A4823466879eeF910A04D473505da62142069',
        blockHash:
          '0xc906a05c5da95f82839e0f96bed96481be93b6613e9a57af46ecc8f24389cc79',
        blockNumber: 14708553,
        transactionHash:
          '0xc785c5713ef1d2e527559746004276f15aaedf62503b670bdf16e156b82aa39b',
        gasUsed: 97449,
        logIndex: 687,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0xEd308A08B051dA28D59606D9Dd9a3dced7Ad188c',
          to: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          value: BigNumber.from('0x29a2047c65342d17'),
        },
      },
    ];

    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }
    const swap = swapClassifier.parse(pool, event, transfers, allEvents);
    expect(swap).toEqual<Swap>({
      amountIn: 2999965234102545687n,
      amountOut: 2741671875097021985n,
      assetIn: '0x333a4823466879eef910a04d473505da62142069',
      assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      from: '0xed308a08b051da28d59606d9dd9a3dced7ad188c',
      to: '0xed308a08b051da28d59606d9dd9a3dced7ad188c',
      contract: {
        address: '0x0bf37157d30dfe6f56757dcadff01aed83b08cd6',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0xc906a05c5da95f82839e0f96bed96481be93b6613e9a57af46ecc8f24389cc79',
        number: 14708553,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 686,
      },
      transaction: {
        gasUsed: 97449,
        hash: '0xc785c5713ef1d2e527559746004276f15aaedf62503b670bdf16e156b82aa39b',
      },
      metadata: {},
    });
  });

  test('token -> eth swap', () => {
    const pool: Pool = {
      address: '0x3ebf48cd7586d7a4521ce59e53d9a907ebf1480f',
      assets: [
        '0xba100000625a3754423978a60c9317c58a424e3d',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0xfbf8550fcccf4c6cbed11597c1b445c3d65e9ee7436717f021cecb1088273a7b',
      blockNumber: 14708460,
      transactionHash:
        '0xa87d22940d3b93b491683de99d48cab79c171fe1535586862e0c0ace381928f0',
      gasUsed: 132494,
      logIndex: 298,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x3ebf48cd7586d7a4521ce59e53d9a907ebf1480f000200000000000000000028',
        tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        tokenOut: '0xba100000625a3754423978a60c9317c58a424e3D',
        amountIn: BigNumber.from('0x0853a0d2313c0000'),
        amountOut: BigNumber.from('0x070b5240281ba628ab'),
      },
    };
    const transfers: Transfer[] = [
      {
        asset: '0xba100000625a3754423978a60c9317c58a424e3d',
        from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        to: '0x98bed949d4e5607a753185cfb7153b53e0c3c80a',
        value: 129942993539481086123n,
        block: {
          hash: '0xfbf8550fcccf4c6cbed11597c1b445c3d65e9ee7436717f021cecb1088273a7b',
          number: 14708460,
        },
        transaction: {
          hash: '0xa87d22940d3b93b491683de99d48cab79c171fe1535586862e0c0ace381928f0',
          gasUsed: 132494,
        },
        event: {
          logIndex: 300,
          address: '0xba100000625a3754423978a60c9317c58a424e3d',
        },
      },
    ];
    const allEvents = [
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0xfbf8550fcccf4c6cbed11597c1b445c3d65e9ee7436717f021cecb1088273a7b',
        blockNumber: 14708460,
        transactionHash:
          '0xa87d22940d3b93b491683de99d48cab79c171fe1535586862e0c0ace381928f0',
        gasUsed: 132494,
        logIndex: 298,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x3ebf48cd7586d7a4521ce59e53d9a907ebf1480f000200000000000000000028',
          tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          tokenOut: '0xba100000625a3754423978a60c9317c58a424e3D',
          amountIn: BigNumber.from('0x0853a0d2313c0000'),
          amountOut: BigNumber.from('0x070b5240281ba628ab'),
        },
      },
      {
        address: '0xba100000625a3754423978a60c9317c58a424e3D',
        blockHash:
          '0xfbf8550fcccf4c6cbed11597c1b445c3d65e9ee7436717f021cecb1088273a7b',
        blockNumber: 14708460,
        transactionHash:
          '0xa87d22940d3b93b491683de99d48cab79c171fe1535586862e0c0ace381928f0',
        gasUsed: 132494,
        logIndex: 300,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          to: '0x98bED949D4e5607A753185cfb7153B53e0c3c80a',
          value: BigNumber.from('0x070b5240281ba628ab'),
        },
      },
    ];

    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }
    const swap = swapClassifier.parse(pool, event, transfers, allEvents);
    expect(swap).toEqual<Swap>({
      amountIn: 600000000000000000n,
      amountOut: 129942993539481086123n,
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      assetOut: '0xba100000625a3754423978a60c9317c58a424e3d',
      from: '0x98bed949d4e5607a753185cfb7153b53e0c3c80a',
      to: '0x98bed949d4e5607a753185cfb7153b53e0c3c80a',
      contract: {
        address: '0x3ebf48cd7586d7a4521ce59e53d9a907ebf1480f',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0xfbf8550fcccf4c6cbed11597c1b445c3d65e9ee7436717f021cecb1088273a7b',
        number: 14708460,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 298,
      },
      transaction: {
        gasUsed: 132494,
        hash: '0xa87d22940d3b93b491683de99d48cab79c171fe1535586862e0c0ace381928f0',
      },
      metadata: {},
    });
  });

  test('swap with an approval', () => {
    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }

    const transfers: Transfer[] = [
      {
        asset: '0xba100000625a3754423978a60c9317c58a424e3d',
        from: '0x20eadfcaf91bd98674ff8fc341d148e1731576a4',
        to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        value: 707320915873140540667n,
        block: {
          hash: '0x0e676f25f9552bc4eb1cbef8085a91d149097d803764227956a8973ae8f26831',
          number: 14705283,
        },
        transaction: {
          hash: '0x01cba79049f6506d01210608351d414ad11a800451b1d34b828531f454f041c3',
          gasUsed: 168611,
        },
        event: {
          logIndex: 195,
          address: '0xba100000625a3754423978a60c9317c58a424e3d',
        },
      },
      {
        asset: '0x6b175474e89094c44da98b954eedeac495271d0f',
        from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        to: '0x20eadfcaf91bd98674ff8fc341d148e1731576a4',
        value: 8969838903747320318121n,
        block: {
          hash: '0x0e676f25f9552bc4eb1cbef8085a91d149097d803764227956a8973ae8f26831',
          number: 14705283,
        },
        transaction: {
          hash: '0x01cba79049f6506d01210608351d414ad11a800451b1d34b828531f454f041c3',
          gasUsed: 168611,
        },
        event: {
          logIndex: 197,
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        },
      },
    ];
    const allEvents = [
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x0e676f25f9552bc4eb1cbef8085a91d149097d803764227956a8973ae8f26831',
        blockNumber: 14705283,
        transactionHash:
          '0x01cba79049f6506d01210608351d414ad11a800451b1d34b828531f454f041c3',
        gasUsed: 168611,
        logIndex: 193,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014',
          tokenIn: '0xba100000625a3754423978a60c9317c58a424e3D',
          tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          amountIn: BigNumber.from('0x26580cb170967f84fb'),
          amountOut: BigNumber.from('0x2c2b087daf9f259c'),
        },
      },
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x0e676f25f9552bc4eb1cbef8085a91d149097d803764227956a8973ae8f26831',
        blockNumber: 14705283,
        transactionHash:
          '0x01cba79049f6506d01210608351d414ad11a800451b1d34b828531f454f041c3',
        gasUsed: 168611,
        logIndex: 194,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x0b09dea16768f0799065c475be02919503cb2a3500020000000000000000001a',
          tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          tokenOut: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          amountIn: BigNumber.from('0x2c2b087daf9f259c'),
          amountOut: BigNumber.from('0x01e641855eb7024988a9'),
        },
      },
      {
        address: '0xba100000625a3754423978a60c9317c58a424e3D',
        blockHash:
          '0x0e676f25f9552bc4eb1cbef8085a91d149097d803764227956a8973ae8f26831',
        blockNumber: 14705283,
        transactionHash:
          '0x01cba79049f6506d01210608351d414ad11a800451b1d34b828531f454f041c3',
        gasUsed: 168611,
        logIndex: 195,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0x20EADfcaf91BD98674FF8fc341D148E1731576A4',
          to: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          value: BigNumber.from('0x26580cb170967f84fb'),
        },
      },
      {
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        blockHash:
          '0x0e676f25f9552bc4eb1cbef8085a91d149097d803764227956a8973ae8f26831',
        blockNumber: 14705283,
        transactionHash:
          '0x01cba79049f6506d01210608351d414ad11a800451b1d34b828531f454f041c3',
        gasUsed: 168611,
        logIndex: 197,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          to: '0x20EADfcaf91BD98674FF8fc341D148E1731576A4',
          value: BigNumber.from('0x01e641855eb7024988a9'),
        },
      },
    ];

    const poolA: Pool = {
      address: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
      assets: [
        '0xba100000625a3754423978a60c9317c58a424e3d',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const eventA: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x0e676f25f9552bc4eb1cbef8085a91d149097d803764227956a8973ae8f26831',
      blockNumber: 14705283,
      transactionHash:
        '0x01cba79049f6506d01210608351d414ad11a800451b1d34b828531f454f041c3',
      gasUsed: 168611,
      logIndex: 193,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014',
        tokenIn: '0xba100000625a3754423978a60c9317c58a424e3D',
        tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: BigNumber.from('0x26580cb170967f84fb'),
        amountOut: BigNumber.from('0x2c2b087daf9f259c'),
      },
    };
    const swapA = swapClassifier.parse(poolA, eventA, transfers, allEvents);

    const poolB: Pool = {
      address: '0x0b09dea16768f0799065c475be02919503cb2a35',
      assets: [
        '0x6b175474e89094c44da98b954eedeac495271d0f',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const eventB: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x0e676f25f9552bc4eb1cbef8085a91d149097d803764227956a8973ae8f26831',
      blockNumber: 14705283,
      transactionHash:
        '0x01cba79049f6506d01210608351d414ad11a800451b1d34b828531f454f041c3',
      gasUsed: 168611,
      logIndex: 194,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x0b09dea16768f0799065c475be02919503cb2a3500020000000000000000001a',
        tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        tokenOut: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        amountIn: BigNumber.from('0x2c2b087daf9f259c'),
        amountOut: BigNumber.from('0x01e641855eb7024988a9'),
      },
    };

    const swapB = swapClassifier.parse(poolB, eventB, transfers, allEvents);

    expect(swapA).toEqual<Swap>({
      amountIn: 707320915873140540667n,
      amountOut: 3182646897577764252n,
      assetIn: '0xba100000625a3754423978a60c9317c58a424e3d',
      assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      from: '0x20eadfcaf91bd98674ff8fc341d148e1731576a4',
      to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      contract: {
        address: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0x0e676f25f9552bc4eb1cbef8085a91d149097d803764227956a8973ae8f26831',
        number: 14705283,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 193,
      },
      transaction: {
        gasUsed: 168611,
        hash: '0x01cba79049f6506d01210608351d414ad11a800451b1d34b828531f454f041c3',
      },
      metadata: {},
    });
    expect(swapB).toEqual<Swap>({
      amountIn: 3182646897577764252n,
      amountOut: 8969838903747320318121n,
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      assetOut: '0x6b175474e89094c44da98b954eedeac495271d0f',
      from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      to: '0x20eadfcaf91bd98674ff8fc341d148e1731576a4',
      contract: {
        address: '0x0b09dea16768f0799065c475be02919503cb2a35',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0x0e676f25f9552bc4eb1cbef8085a91d149097d803764227956a8973ae8f26831',
        number: 14705283,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 194,
      },
      transaction: {
        gasUsed: 168611,
        hash: '0x01cba79049f6506d01210608351d414ad11a800451b1d34b828531f454f041c3',
      },
      metadata: {},
    });
  });

  test('multi-path swap', () => {
    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }

    const transfers: Transfer[] = [
      {
        asset: '0x90b831fa3bebf58e9744a14d638e25b4ee06f9bc',
        from: '0x0b8f77dcedbb7d6cee0905b0ebc4af6d50b4a07d',
        to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        value: 5555555555555556000000n,
        block: {
          hash: '0x47823a8deb93a3c3093216b9971b665c966b51066a7ea3b893ea7674ff887a68',
          number: 14708547,
        },
        transaction: {
          hash: '0x336151dd41fe447f05d6ef0bde9b0fdf6d4455b39e08c93c4a7c94ba89ef4a3c',
          gasUsed: 173471,
        },
        event: {
          logIndex: 245,
          address: '0x90b831fa3bebf58e9744a14d638e25b4ee06f9bc',
        },
      },
    ];
    const allEvents = [
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x47823a8deb93a3c3093216b9971b665c966b51066a7ea3b893ea7674ff887a68',
        blockNumber: 14708547,
        transactionHash:
          '0x336151dd41fe447f05d6ef0bde9b0fdf6d4455b39e08c93c4a7c94ba89ef4a3c',
        gasUsed: 173471,
        logIndex: 243,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x5b1c06c4923dbba4b27cfa270ffb2e60aa28615900020000000000000000004a',
          tokenIn: '0x90B831fa3Bebf58E9744A14D638E25B4eE06f9Bc',
          tokenOut: '0x68037790A0229e9Ce6EaA8A99ea92964106C4703',
          amountIn: BigNumber.from('0x012d2ad2372ed4d50100'),
          amountOut: BigNumber.from('0x103b144fb7853812fa'),
        },
      },
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x47823a8deb93a3c3093216b9971b665c966b51066a7ea3b893ea7674ff887a68',
        blockNumber: 14708547,
        transactionHash:
          '0x336151dd41fe447f05d6ef0bde9b0fdf6d4455b39e08c93c4a7c94ba89ef4a3c',
        gasUsed: 173471,
        logIndex: 244,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x29d7a7e0d781c957696697b94d4bc18c651e358e000200000000000000000049',
          tokenIn: '0x68037790A0229e9Ce6EaA8A99ea92964106C4703',
          tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          amountIn: BigNumber.from('0x103b144fb7853812fa'),
          amountOut: BigNumber.from('0x018988518f9e65b9'),
        },
      },
      {
        address: '0x90B831fa3Bebf58E9744A14D638E25B4eE06f9Bc',
        blockHash:
          '0x47823a8deb93a3c3093216b9971b665c966b51066a7ea3b893ea7674ff887a68',
        blockNumber: 14708547,
        transactionHash:
          '0x336151dd41fe447f05d6ef0bde9b0fdf6d4455b39e08c93c4a7c94ba89ef4a3c',
        gasUsed: 173471,
        logIndex: 245,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0x0B8F77DCeDbb7D6cEE0905b0EBc4AF6D50b4a07d',
          to: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          value: BigNumber.from('0x012d2ad2372ed4d50100'),
        },
      },
    ];

    const poolA: Pool = {
      address: '0x5b1c06c4923dbba4b27cfa270ffb2e60aa286159',
      assets: [
        '0x68037790a0229e9ce6eaa8a99ea92964106c4703',
        '0x90b831fa3bebf58e9744a14d638e25b4ee06f9bc',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const eventA: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x47823a8deb93a3c3093216b9971b665c966b51066a7ea3b893ea7674ff887a68',
      blockNumber: 14708547,
      transactionHash:
        '0x336151dd41fe447f05d6ef0bde9b0fdf6d4455b39e08c93c4a7c94ba89ef4a3c',
      gasUsed: 173471,
      logIndex: 243,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x5b1c06c4923dbba4b27cfa270ffb2e60aa28615900020000000000000000004a',
        tokenIn: '0x90B831fa3Bebf58E9744A14D638E25B4eE06f9Bc',
        tokenOut: '0x68037790A0229e9Ce6EaA8A99ea92964106C4703',
        amountIn: BigNumber.from('0x012d2ad2372ed4d50100'),
        amountOut: BigNumber.from('0x103b144fb7853812fa'),
      },
    };

    const poolB: Pool = {
      address: '0x29d7a7e0d781c957696697b94d4bc18c651e358e',
      assets: [
        '0x68037790a0229e9ce6eaa8a99ea92964106c4703',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const eventB: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x47823a8deb93a3c3093216b9971b665c966b51066a7ea3b893ea7674ff887a68',
      blockNumber: 14708547,
      transactionHash:
        '0x336151dd41fe447f05d6ef0bde9b0fdf6d4455b39e08c93c4a7c94ba89ef4a3c',
      gasUsed: 173471,
      logIndex: 244,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x29d7a7e0d781c957696697b94d4bc18c651e358e000200000000000000000049',
        tokenIn: '0x68037790A0229e9Ce6EaA8A99ea92964106C4703',
        tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: BigNumber.from('0x103b144fb7853812fa'),
        amountOut: BigNumber.from('0x018988518f9e65b9'),
      },
    };

    const swapA = swapClassifier.parse(poolA, eventA, transfers, allEvents);
    const swapB = swapClassifier.parse(poolB, eventB, transfers, allEvents);

    expect(swapA).toEqual<Swap>({
      amountIn: 5555555555555556000000n,
      amountOut: 299405020376757441274n,
      assetIn: '0x90b831fa3bebf58e9744a14d638e25b4ee06f9bc',
      assetOut: '0x68037790a0229e9ce6eaa8a99ea92964106c4703',
      from: '0x0b8f77dcedbb7d6cee0905b0ebc4af6d50b4a07d',
      to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      contract: {
        address: '0x5b1c06c4923dbba4b27cfa270ffb2e60aa286159',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0x47823a8deb93a3c3093216b9971b665c966b51066a7ea3b893ea7674ff887a68',
        number: 14708547,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 243,
      },
      transaction: {
        gasUsed: 173471,
        hash: '0x336151dd41fe447f05d6ef0bde9b0fdf6d4455b39e08c93c4a7c94ba89ef4a3c',
      },
      metadata: {},
    });
    expect(swapB).toEqual<Swap>({
      amountIn: 299405020376757441274n,
      amountOut: 110769549730538937n,
      assetIn: '0x68037790a0229e9ce6eaa8a99ea92964106c4703',
      assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      to: '0x0b8f77dcedbb7d6cee0905b0ebc4af6d50b4a07d',
      contract: {
        address: '0x29d7a7e0d781c957696697b94d4bc18c651e358e',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0x47823a8deb93a3c3093216b9971b665c966b51066a7ea3b893ea7674ff887a68',
        number: 14708547,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 244,
      },
      transaction: {
        gasUsed: 173471,
        hash: '0x336151dd41fe447f05d6ef0bde9b0fdf6d4455b39e08c93c4a7c94ba89ef4a3c',
      },
      metadata: {},
    });
  });

  test('swap with internal "from" transfer', () => {
    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }

    const pool: Pool = {
      address: '0x0b09dea16768f0799065c475be02919503cb2a35',
      assets: [
        '0x6b175474e89094c44da98b954eedeac495271d0f',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
      blockNumber: 14764238,
      transactionHash:
        '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
      gasUsed: 157031,
      logIndex: 32,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x0b09dea16768f0799065c475be02919503cb2a3500020000000000000000001a',
        tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        tokenOut: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        amountIn: BigNumber.from('0x661388794183a175'),
        amountOut: BigNumber.from('0x030a1105d5ea33bdaddd'),
      },
    };
    const transfers: Transfer[] = [
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x0000e0ca771e21bd00057f54a68c30d400000000',
        to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        value: 7355372670797717877n,
        block: {
          hash: '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
          number: 14764238,
        },
        transaction: {
          hash: '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
          gasUsed: 157031,
        },
        event: {
          logIndex: 33,
          address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        },
      },
      {
        asset: '0x6b175474e89094c44da98b954eedeac495271d0f',
        from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        to: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
        value: 14352793511021426617821n,
        block: {
          hash: '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
          number: 14764238,
        },
        transaction: {
          hash: '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
          gasUsed: 157031,
        },
        event: {
          logIndex: 34,
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
        to: '0x0000e0ca771e21bd00057f54a68c30d400000000',
        value: 7373981984700594919n,
        block: {
          hash: '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
          number: 14764238,
        },
        transaction: {
          hash: '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
          gasUsed: 157031,
        },
        event: {
          logIndex: 35,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
    ];
    const allEvents = [
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
        blockNumber: 14764238,
        transactionHash:
          '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
        gasUsed: 157031,
        logIndex: 32,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x0b09dea16768f0799065c475be02919503cb2a3500020000000000000000001a',
          tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          tokenOut: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          amountIn: BigNumber.from('0x661388794183a175'),
          amountOut: BigNumber.from('0x030a1105d5ea33bdaddd'),
        },
      },
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
        blockNumber: 14764238,
        transactionHash:
          '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
        gasUsed: 157031,
        logIndex: 33,
        classifier: transferClassifier,
        name: 'InternalBalanceChanged',
        values: {
          user: '0x0000E0Ca771e21bD00057F54A68C30D400000000',
          token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          delta: BigNumber.from('-0x661388794183a175'),
        },
      },
      {
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        blockHash:
          '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
        blockNumber: 14764238,
        transactionHash:
          '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
        gasUsed: 157031,
        logIndex: 34,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          to: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11',
          value: BigNumber.from('0x030a1105d5ea33bdaddd'),
        },
      },
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        blockHash:
          '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
        blockNumber: 14764238,
        transactionHash:
          '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
        gasUsed: 157031,
        logIndex: 35,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11',
          to: '0x0000E0Ca771e21bD00057F54A68C30D400000000',
          value: BigNumber.from('0x6655a58bca357ae7'),
        },
      },
      {
        address: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11',
        blockHash:
          '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
        blockNumber: 14764238,
        transactionHash:
          '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
        gasUsed: 157031,
        logIndex: 37,
        classifier: uniswapClassifier,
        name: 'Swap',
        values: {
          sender: '0x0000E0Ca771e21bD00057F54A68C30D400000000',
          amount0In: BigNumber.from('0x030a1105d5ea33bdaddd'),
          amount1In: BigNumber.from('0x00'),
          amount0Out: BigNumber.from('0x00'),
          amount1Out: BigNumber.from('0x6655a58bca357ae7'),
          to: '0x0000E0Ca771e21bD00057F54A68C30D400000000',
        },
      },
    ];

    const swap = swapClassifier.parse(pool, event, transfers, allEvents);

    expect(swap).toEqual<Swap>({
      amountIn: 7355372670797717877n,
      amountOut: 14352793511021426617821n,
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      assetOut: '0x6b175474e89094c44da98b954eedeac495271d0f',
      from: '0x0000e0ca771e21bd00057f54a68c30d400000000',
      to: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
      contract: {
        address: '0x0b09dea16768f0799065c475be02919503cb2a35',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
        number: 14764238,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 32,
      },
      transaction: {
        gasUsed: 157031,
        hash: '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
      },
      metadata: {},
    });
  });

  test('swap with internal "to" transfer', () => {
    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }

    const pool: Pool = {
      address: '0x0b09dea16768f0799065c475be02919503cb2a35',
      assets: [
        '0x6b175474e89094c44da98b954eedeac495271d0f',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const event: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
      blockNumber: 14764014,
      transactionHash:
        '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
      gasUsed: 129388,
      logIndex: 63,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x0b09dea16768f0799065c475be02919503cb2a3500020000000000000000001a',
        tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        tokenOut: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        amountIn: BigNumber.from('0x3dbf3801863365f6'),
        amountOut: BigNumber.from('0x01dafcabd86875e6579a'),
      },
    };
    const transfers: Transfer[] = [
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        value: 4449336536062977526n,
        block: {
          hash: '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
          number: 14764014,
        },
        transaction: {
          hash: '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
          gasUsed: 129388,
        },
        event: {
          logIndex: 64,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0x6b175474e89094c44da98b954eedeac495271d0f',
        from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        to: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        value: 8761963574800069056410n,
        block: {
          hash: '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
          number: 14764014,
        },
        transaction: {
          hash: '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
          gasUsed: 129388,
        },
        event: {
          logIndex: 65,
          address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        },
      },
      {
        asset: '0x6b175474e89094c44da98b954eedeac495271d0f',
        from: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        value: 8761954770088929600025n,
        block: {
          hash: '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
          number: 14764014,
        },
        transaction: {
          hash: '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
          gasUsed: 129388,
        },
        event: {
          logIndex: 67,
          address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        to: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        value: 4473474941147401506n,
        block: {
          hash: '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
          number: 14764014,
        },
        transaction: {
          hash: '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
          gasUsed: 129388,
        },
        event: {
          logIndex: 68,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
    ];
    const allEvents = [
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
        blockNumber: 14764014,
        transactionHash:
          '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
        gasUsed: 129388,
        logIndex: 63,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x0b09dea16768f0799065c475be02919503cb2a3500020000000000000000001a',
          tokenIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          tokenOut: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          amountIn: BigNumber.from('0x3dbf3801863365f6'),
          amountOut: BigNumber.from('0x01dafcabd86875e6579a'),
        },
      },
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        blockHash:
          '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
        blockNumber: 14764014,
        transactionHash:
          '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
        gasUsed: 129388,
        logIndex: 64,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
          to: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          value: BigNumber.from('0x3dbf3801863365f6'),
        },
      },
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
        blockNumber: 14764014,
        transactionHash:
          '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
        gasUsed: 129388,
        logIndex: 65,
        classifier: transferClassifier,
        name: 'InternalBalanceChanged',
        values: {
          user: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
          token: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          delta: BigNumber.from('0x01dafcabd86875e6579a'),
        },
      },
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
        blockNumber: 14764014,
        transactionHash:
          '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
        gasUsed: 129388,
        logIndex: 66,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0xc45d42f801105e861e86658648e3678ad7aa70f900010000000000000000011e',
          tokenIn: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          amountIn: BigNumber.from('0x01dafc8c9091e6152219'),
          amountOut: BigNumber.from('0x3e14f9c1eab3cd22'),
        },
      },
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
        blockNumber: 14764014,
        transactionHash:
          '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
        gasUsed: 129388,
        logIndex: 67,
        classifier: transferClassifier,
        name: 'InternalBalanceChanged',
        values: {
          user: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
          token: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          delta: BigNumber.from('-0x01dafc8c9091e6152219'),
        },
      },
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        blockHash:
          '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
        blockNumber: 14764014,
        transactionHash:
          '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
        gasUsed: 129388,
        logIndex: 68,
        classifier: transferClassifier,
        name: 'Transfer',
        values: {
          from: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
          to: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
          value: BigNumber.from('0x3e14f9c1eab3cd22'),
        },
      },
    ];

    const swap = swapClassifier.parse(pool, event, transfers, allEvents);

    expect(swap).toEqual<Swap>({
      amountIn: 4449336536062977526n,
      amountOut: 8761963574800069056410n,
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      assetOut: '0x6b175474e89094c44da98b954eedeac495271d0f',
      from: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
      to: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
      contract: {
        address: '0x0b09dea16768f0799065c475be02919503cb2a35',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0x289b9fd875e5e9dfff87c08e1f930fc4fdc33ee9cbdb411ed2f53255937b9d53',
        number: 14764014,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 63,
      },
      transaction: {
        gasUsed: 129388,
        hash: '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
      },
      metadata: {},
    });
  });

  test('batch swap', () => {
    if (swapClassifier.type !== 'swap') {
      expect.fail();
    }

    const transfers: Transfer[] = [
      {
        asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        to: '0xb0057edcd99b344a3b3738690e0792f8723a879a',
        value: 210527750n,
        block: {
          hash: '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
          number: 14764099,
        },
        transaction: {
          hash: '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
          gasUsed: 335297,
        },
        event: {
          logIndex: 22,
          address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        },
      },
    ];
    const allEvents = [
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
        blockNumber: 14764099,
        transactionHash:
          '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
        gasUsed: 335297,
        logIndex: 17,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x06df3b2bbb68adc8b0e302443692037ed9f91b42000000000000000000000063',
          tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          tokenOut: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          amountIn: BigNumber.from('0x84b6a5c400'),
          amountOut: BigNumber.from('0x852dfd1a83'),
        },
      },
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
        blockNumber: 14764099,
        transactionHash:
          '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
        gasUsed: 335297,
        logIndex: 18,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x2bbf681cc4eb09218bee85ea2a5d3d13fa40fc0c0000000000000000000000fd',
          tokenIn: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          tokenOut: '0x2BBf681cC4eb09218BEe85EA2a5d3D13Fa40fC0C',
          amountIn: BigNumber.from('0x852dfd1a83'),
          amountOut: BigNumber.from('0x77f15faa70a5e5607ba2'),
        },
      },
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
        blockNumber: 14764099,
        transactionHash:
          '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
        gasUsed: 335297,
        logIndex: 20,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb20000000000000000000000fe',
          tokenIn: '0x2BBf681cC4eb09218BEe85EA2a5d3D13Fa40fC0C',
          tokenOut: '0x9210F1204b5a24742Eba12f710636D76240dF3d0',
          amountIn: BigNumber.from('0x77f15faa70a5e5607ba2'),
          amountOut: BigNumber.from('0x77bd95aa1a8fb342ec60'),
        },
      },
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
        blockNumber: 14764099,
        transactionHash:
          '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
        gasUsed: 335297,
        logIndex: 21,
        classifier: swapClassifier,
        name: 'Swap',
        values: {
          poolId:
            '0x9210f1204b5a24742eba12f710636d76240df3d00000000000000000000000fc',
          tokenIn: '0x9210F1204b5a24742Eba12f710636D76240dF3d0',
          tokenOut: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          amountIn: BigNumber.from('0x77bd95aa1a8fb342ec60'),
          amountOut: BigNumber.from('0x84c3322a06'),
        },
      },
      {
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        blockHash:
          '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
        blockNumber: 14764099,
        transactionHash:
          '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
        gasUsed: 335297,
        logIndex: 22,
        classifier: transferClassifier,
        name: 'InternalBalanceChanged',
        values: {
          user: '0xb0057edcd99B344a3B3738690e0792F8723a879A',
          token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          delta: BigNumber.from('0x0c8c6606'),
        },
      },
    ];

    const poolA: Pool = {
      address: '0x06df3b2bbb68adc8b0e302443692037ed9f91b42',
      assets: [
        '0x6b175474e89094c44da98b954eedeac495271d0f',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const eventA: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
      blockNumber: 14764099,
      transactionHash:
        '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
      gasUsed: 335297,
      logIndex: 17,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x06df3b2bbb68adc8b0e302443692037ed9f91b42000000000000000000000063',
        tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        tokenOut: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        amountIn: BigNumber.from('0x84b6a5c400'),
        amountOut: BigNumber.from('0x852dfd1a83'),
      },
    };
    const poolB: Pool = {
      address: '0x2bbf681cc4eb09218bee85ea2a5d3d13fa40fc0c',
      assets: [
        '0x2bbf681cc4eb09218bee85ea2a5d3d13fa40fc0c',
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
        '0xf8fd466f12e236f4c96f7cce6c79eadb819abf58',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const eventB: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
      blockNumber: 14764099,
      transactionHash:
        '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
      gasUsed: 335297,
      logIndex: 18,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x2bbf681cc4eb09218bee85ea2a5d3d13fa40fc0c0000000000000000000000fd',
        tokenIn: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        tokenOut: '0x2BBf681cC4eb09218BEe85EA2a5d3D13Fa40fC0C',
        amountIn: BigNumber.from('0x852dfd1a83'),
        amountOut: BigNumber.from('0x77f15faa70a5e5607ba2'),
      },
    };
    const poolC: Pool = {
      address: '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb2',
      assets: [
        '0x2bbf681cc4eb09218bee85ea2a5d3d13fa40fc0c',
        '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb2',
        '0x804cdb9116a10bb78768d3252355a1b18067bf8f',
        '0x9210f1204b5a24742eba12f710636d76240df3d0',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const eventC: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
      blockNumber: 14764099,
      transactionHash:
        '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
      gasUsed: 335297,
      logIndex: 20,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb20000000000000000000000fe',
        tokenIn: '0x2BBf681cC4eb09218BEe85EA2a5d3D13Fa40fC0C',
        tokenOut: '0x9210F1204b5a24742Eba12f710636D76240dF3d0',
        amountIn: BigNumber.from('0x77f15faa70a5e5607ba2'),
        amountOut: BigNumber.from('0x77bd95aa1a8fb342ec60'),
      },
    };
    const poolD: Pool = {
      address: '0x9210f1204b5a24742eba12f710636d76240df3d0',
      assets: [
        '0x9210f1204b5a24742eba12f710636d76240df3d0',
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0xd093fa4fb80d09bb30817fdcd442d4d02ed3e5de',
      ],
      factory: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        label: 'Balancer V2',
      },
    };
    const eventD: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
      blockNumber: 14764099,
      transactionHash:
        '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
      gasUsed: 335297,
      logIndex: 21,
      classifier: swapClassifier,
      name: 'Swap',
      values: {
        poolId:
          '0x9210f1204b5a24742eba12f710636d76240df3d00000000000000000000000fc',
        tokenIn: '0x9210F1204b5a24742Eba12f710636D76240dF3d0',
        tokenOut: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        amountIn: BigNumber.from('0x77bd95aa1a8fb342ec60'),
        amountOut: BigNumber.from('0x84c3322a06'),
      },
    };

    const swapA = swapClassifier.parse(poolA, eventA, transfers, allEvents);
    const swapB = swapClassifier.parse(poolB, eventB, transfers, allEvents);
    const swapC = swapClassifier.parse(poolC, eventC, transfers, allEvents);
    const swapD = swapClassifier.parse(poolD, eventD, transfers, allEvents);

    expect(swapA).toEqual<Swap>({
      amountIn: 570000000000n,
      amountOut: 572002212483n,
      assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      assetOut: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      from: '0xb0057edcd99b344a3b3738690e0792f8723a879a',
      to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      contract: {
        address: '0x06df3b2bbb68adc8b0e302443692037ed9f91b42',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
        number: 14764099,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 17,
      },
      transaction: {
        gasUsed: 335297,
        hash: '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
      },
      metadata: {},
    });
    expect(swapB).toEqual<Swap>({
      amountIn: 572002212483n,
      amountOut: 566414170229289246555042n,
      assetIn: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      assetOut: '0x2bbf681cc4eb09218bee85ea2a5d3d13fa40fc0c',
      from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      contract: {
        address: '0x2bbf681cc4eb09218bee85ea2a5d3d13fa40fc0c',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
        number: 14764099,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 18,
      },
      transaction: {
        gasUsed: 335297,
        hash: '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
      },
      metadata: {},
    });
    expect(swapC).toEqual<Swap>({
      amountIn: 566414170229289246555042n,
      amountOut: 565458830552881067912288n,
      assetIn: '0x2bbf681cc4eb09218bee85ea2a5d3d13fa40fc0c',
      assetOut: '0x9210f1204b5a24742eba12f710636d76240df3d0',
      from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      contract: {
        address: '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb2',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
        number: 14764099,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 20,
      },
      transaction: {
        gasUsed: 335297,
        hash: '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
      },
      metadata: {},
    });
    expect(swapD).toEqual<Swap>({
      amountIn: 565458830552881067912288n,
      amountOut: 570210527750n,
      assetIn: '0x9210f1204b5a24742eba12f710636d76240df3d0',
      assetOut: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      to: '0xb0057edcd99b344a3b3738690e0792f8723a879a',
      contract: {
        address: '0x9210f1204b5a24742eba12f710636d76240df3d0',
        protocol: {
          abi: 'BalancerV2',
          factory: {
            address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
            label: 'Balancer V2',
          },
        },
      },
      block: {
        hash: '0x99625ed3ef9a7dbebe5797691ce58f525237280d65cbb0e87a3dc094393b2d6b',
        number: 14764099,
      },
      event: {
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        logIndex: 21,
      },
      transaction: {
        gasUsed: 335297,
        hash: '0xc8df7215fcaabde383620a1e73a96aabeef7465822f9cea9db4dfc4e60d9d77b',
      },
      metadata: {},
    });
  });

  test('internal transfer', () => {
    if (transferClassifier.type !== 'transfer') {
      expect.fail();
    }

    const eventA: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
      blockNumber: 14764238,
      transactionHash:
        '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
      gasUsed: 157031,
      logIndex: 33,
      classifier: transferClassifier,
      name: 'Transfer',
      values: {
        user: '0x0000E0Ca771e21bD00057F54A68C30D400000000',
        token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        delta: BigNumber.from('-7355372670797717877'),
      },
    };
    const transferA = transferClassifier.parse(eventA);

    const eventB: ClassifiedEvent = {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      blockHash:
        '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
      blockNumber: 14764238,
      transactionHash:
        '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
      gasUsed: 129388,
      logIndex: 65,
      classifier: transferClassifier,
      name: 'Transfer',
      values: {
        user: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        token: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        delta: BigNumber.from('8761963574800069056410'),
      },
    };
    const transferB = transferClassifier.parse(eventB);

    expect(transferA).toEqual<Transfer>({
      asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      from: '0x0000e0ca771e21bd00057f54a68c30d400000000',
      to: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      value: 7355372670797717877n,
      block: {
        hash: '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
        number: 14764238,
      },
      transaction: {
        hash: '0x42e27e3bed9a2ab343880e8ab4c4de121fc337a7334170a9dc632a36fe757fb9',
        gasUsed: 157031,
      },
      event: {
        logIndex: 33,
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      },
    });
    expect(transferB).toEqual<Transfer>({
      asset: '0x6b175474e89094c44da98b954eedeac495271d0f',
      from: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      to: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
      value: 8761963574800069056410n,
      block: {
        hash: '0x2674a4bb3bb6e6c81720f888cf965cf043b22f1d2df3077dc412c75243341f10',
        number: 14764238,
      },
      transaction: {
        hash: '0x11bdb8d6d7e0fdd9933ce9673db55524fe7d13f4e6401a40c03c04d1ba06055f',
        gasUsed: 129388,
      },
      event: {
        logIndex: 65,
        address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      },
    });
  });
});
