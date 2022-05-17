import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import { ClassifiedEvent } from '../../src/classifier/index.js';
import erc20Classifiers from '../../src/classifier/items/erc20.js';
import { CLASSIFIER as uniswapV2Classifiers } from '../../src/classifier/items/uniswapV2.js';
import getTransfers from '../../src/mev/transfers.js';

describe('MEV: transfers', () => {
  test('parses a transfer from a log', () => {
    const hash =
      '0xfbf98ea48bb2a1210ac1974b432c4604a9978e766c133f9543da3df9421b7e81';
    const gasUsed = 51818;
    const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
    const logIndex = 49;
    const from = '0xbe6356E4D92ECBD321C83CCDD79B3fD6F2D4f0e7';
    const to = '0x3B0a40B97a1037A09C2075CA472868D668454a18';
    const value = BigNumber.from('50000000000000000000');

    const logs: ClassifiedEvent[] = [
      {
        address,
        transactionHash: hash,
        gasUsed,
        logIndex,
        classifier: erc20Classifiers,
        name: 'Transfer',
        values: {
          from,
          to,
          value,
        },
      },
    ];
    const transfers = getTransfers(logs);

    expect(transfers).toEqual([
      {
        asset: address.toLowerCase(),
        from: from.toLowerCase(),
        to: to.toLowerCase(),
        value: value.toBigInt(),
        transaction: {
          hash,
          gasUsed,
        },
        event: {
          logIndex,
          address: address.toLowerCase(),
        },
      },
    ]);
  });

  test('parses multiple transfers from logs', () => {
    const hashes = [
      '0xa8f12cec18cb0c66d9ed10e893b68b0d7d789e376a244b2d4ff4e6923ea633cd',
      '0xaf52e7b3b93974a933b23541bc38310cb879398c2da34d077a29df1b170e67d6',
      '0x1aa9e2ecd0efe3acd30d89654fb366ffee66995465cbaacc80bfb16467ce8219',
    ];
    const addresses = [
      '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
    ];
    const gasUsedList = [46458, 65625, 54338];
    const logIndices = [415, 346, 45];
    const fromList = [
      '0x0D46F66D13C630D3F554e74c3eFF711452D2C180',
      '0xCbE300403Ec18503Bb2b93574FA738dc8f629F63',
      '0x95A9bd206aE52C4BA8EecFc93d18EACDd41C88CC',
    ];
    const toList = [
      '0x0A3e1c20B5384eB97D2CCfF9a96bc91f0c77e7dB',
      '0x01B950718eB78cB2f3D2E26605fF7121170864df',
      '0x3Aff86656A65F3d81B3E0B4C4F8d4199f3B3Fbde',
    ];
    const valueList = [
      BigNumber.from(
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      ),
      BigNumber.from('50000000000'),
      BigNumber.from('7180000000000000000'),
    ];

    const logs: ClassifiedEvent[] = hashes.map((hash, index) => {
      return {
        address: addresses[index],
        transactionHash: hash,
        gasUsed: gasUsedList[index],
        logIndex: logIndices[index],
        classifier: erc20Classifiers,
        name: 'Transfer',
        values: {
          from: fromList[index],
          to: toList[index],
          value: valueList[index],
        },
      };
    });
    const transfers = getTransfers(logs);

    const expectedTransfers = hashes.map((hash, index) => {
      return {
        asset: addresses[index].toLowerCase(),
        from: fromList[index].toLowerCase(),
        to: toList[index].toLowerCase(),
        value: valueList[index].toBigInt(),
        transaction: {
          hash,
          gasUsed: gasUsedList[index],
        },
        event: {
          logIndex: logIndices[index],
          address: addresses[index].toLowerCase(),
        },
      };
    });
    expect(transfers).toEqual(expectedTransfers);
  });

  test('skips irrelevant logs', () => {
    const swapLog: ClassifiedEvent = {
      address: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
      transactionHash:
        '0xa04871a6008a2a97b73abbcfc1297a4a921dfdc17583b4bb66097d4b4b7c8a81',
      gasUsed: 98948,
      logIndex: 141,
      classifier: uniswapV2Classifiers,
      name: 'Swap',
      values: {
        sender: '0x8aff5ca996f77487a4f04f1ce905bf3d27455580',
        to: '0x8aff5ca996f77487a4f04f1ce905bf3d27455580',
        amount0In: BigNumber.from('29169800000000004980736'),
        amount1In: 0,
        amount0Out: 0,
        amount1Out: BigNumber.from('12715167144261793792'),
      },
    };

    const logs = [swapLog];

    const transfers = getTransfers(logs);
    expect(transfers).toEqual([]);
  });
});
