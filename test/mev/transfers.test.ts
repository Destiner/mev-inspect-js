import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import erc20Classifiers from '../../src/classifier/erc20.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import { CLASSIFIERS as uniswapV2Classifiers } from '../../src/classifier/uniswapV2.js';
import getTransfers from '../../src/mev/transfers.js';

describe('MEV: transfers', () => {
  test('parses a transfer from a log', () => {
    const hash =
      '0xfbf98ea48bb2a1210ac1974b432c4604a9978e766c133f9543da3df9421b7e81';
    const address = '0x6b175474e89094c44da98b954eedeac495271d0f';
    const logIndex = 49;
    const from = '0xbe6356e4d92ecbd321c83ccdd79b3fd6f2d4f0e7';
    const to = '0x3b0a40b97a1037a09c2075ca472868d668454a18';
    const value = BigNumber.from('50000000000000000000');

    const logs: ClassifiedEvent[] = [
      {
        address,
        transactionHash: hash,
        logIndex,
        classifier: erc20Classifiers[0],
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
        from,
        to,
        value: value.toBigInt(),
        transaction: {
          hash,
        },
        event: {
          logIndex,
          address,
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
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    ];
    const logIndices = [415, 346, 45];
    const fromList = [
      '0x0d46f66d13c630d3f554e74c3eff711452d2c180',
      '0xcbe300403ec18503bb2b93574fa738dc8f629f63',
      '0x95a9bd206ae52c4ba8eecfc93d18eacdd41c88cc',
    ];
    const toList = [
      '0x0a3e1c20b5384eb97d2ccff9a96bc91f0c77e7db',
      '0x01b950718eb78cb2f3d2e26605ff7121170864df',
      '0x3aff86656a65f3d81b3e0b4c4f8d4199f3b3fbde',
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
        logIndex: logIndices[index],
        classifier: erc20Classifiers[0],
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
        from: fromList[index],
        to: toList[index],
        value: valueList[index].toBigInt(),
        transaction: {
          hash,
        },
        event: {
          logIndex: logIndices[index],
          address: addresses[index],
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
      logIndex: 141,
      classifier: uniswapV2Classifiers[0],
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
