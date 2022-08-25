import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import { ClassifiedEvent, Transfer } from '../../src/classifier/index.js';
import classifier from '../../src/classifier/items/erc20.js';

describe('Classfiers: ERC20', () => {
  test('transfer', () => {
    if (classifier.type !== 'transfer') {
      expect.fail();
    }

    const blockHash =
      '0xfab1c160cddf469711028b6ad95f55c8105a549762e519d3651829a325d9401a';
    const blockNumber = 14743890;
    const transactionFrom = '0xbe6356e4d92ecbd321c83ccdd79b3fd6f2d4f0e7';
    const transactionHash =
      '0xfbf98ea48bb2a1210ac1974b432c4604a9978e766c133f9543da3df9421b7e81';
    const transactionIndex = 41;
    const gasUsed = 51818;
    const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
    const logIndex = 49;
    const from = '0xbe6356E4D92ECBD321C83CCDD79B3fD6F2D4f0e7';
    const to = '0x3B0a40B97a1037A09C2075CA472868D668454a18';
    const value = BigNumber.from('50000000000000000000');

    const log: ClassifiedEvent = {
      address,
      blockHash,
      blockNumber,
      transactionFrom,
      transactionHash,
      transactionIndex,
      gasUsed,
      logIndex,
      classifier,
      name: 'Transfer',
      values: {
        from,
        to,
        value,
      },
    };
    const transfer = classifier.parse(log);

    expect(transfer).toEqual<Transfer>({
      asset: address.toLowerCase(),
      from: from.toLowerCase(),
      to: to.toLowerCase(),
      value: value.toBigInt(),
      block: {
        hash: blockHash,
        number: blockNumber,
      },
      transaction: {
        from: transactionFrom.toLowerCase(),
        hash: transactionHash,
        index: transactionIndex,
        gasUsed,
      },
      event: {
        logIndex,
        address: address.toLowerCase(),
      },
    });
  });

  test('multiple transfers', () => {
    const blockHashes = [
      '0x20e8da414e1e2578cf0486e0fe1f3901446a1c5481bec488be5f37cfa9b81199',
      '0x1071ba06c5f6c8c9c60653a5843e484e90eafe61a6c87ab0827793e7aa6cd79c',
      '0xdbdc405f719fda7d4bed7fcb64d7a0d9cc276c5fc9e484d372926d5a8145c8cd',
    ];
    const blockNumbers = [14744012, 14744024, 14743996];
    const transactionFroms = [
      '0x0d46f66d13c630d3f554e74c3eff711452d2c180',
      '0xcbe300403ec18503bb2b93574fa738dc8f629f63',
      '0x95a9bd206ae52c4ba8eecfc93d18eacdd41c88cc',
    ];
    const transactionHashes = [
      '0xa8f12cec18cb0c66d9ed10e893b68b0d7d789e376a244b2d4ff4e6923ea633cd',
      '0xaf52e7b3b93974a933b23541bc38310cb879398c2da34d077a29df1b170e67d6',
      '0x1aa9e2ecd0efe3acd30d89654fb366ffee66995465cbaacc80bfb16467ce8219',
    ];
    const transactionIndices = [316, 145, 34];
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

    const logs: ClassifiedEvent[] = transactionHashes.map(
      (transactionHash, index) => {
        return {
          address: addresses[index],
          blockHash: blockHashes[index],
          blockNumber: blockNumbers[index],
          transactionFrom: transactionFroms[index],
          transactionHash,
          transactionIndex: transactionIndices[index],
          gasUsed: gasUsedList[index],
          logIndex: logIndices[index],
          classifier,
          name: 'Transfer',
          values: {
            from: fromList[index],
            to: toList[index],
            value: valueList[index],
          },
        };
      },
    );

    const transfers = logs.map((log) => {
      if (classifier.type !== 'transfer') {
        expect.fail();
      }
      return classifier.parse(log);
    });

    const expectedTransfers = transactionHashes.map(
      (transactionHash, index) => {
        return {
          asset: addresses[index].toLowerCase(),
          from: fromList[index].toLowerCase(),
          to: toList[index].toLowerCase(),
          value: valueList[index].toBigInt(),
          block: {
            hash: blockHashes[index],
            number: blockNumbers[index],
          },
          transaction: {
            from: transactionFroms[index],
            hash: transactionHash,
            index: transactionIndices[index],
            gasUsed: gasUsedList[index],
          },
          event: {
            logIndex: logIndices[index],
            address: addresses[index].toLowerCase(),
          },
        };
      },
    );
    expect(transfers).toEqual<Transfer[]>(expectedTransfers);
  });
});
