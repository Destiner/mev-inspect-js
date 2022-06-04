import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import { ClassifiedEvent } from '../../src/classifier/index.js';
import uniswapV2Classifiers from '../../src/classifier/items/uniswapV2.js';
import getTransfers from '../../src/mev/transfers.js';

describe('MEV: transfers', () => {
  test('skips irrelevant logs', () => {
    const swapLog: ClassifiedEvent = {
      address: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
      blockHash:
        '0x9bec24ad6e5f8a799e0e0c3afd94e51442f2f1f850aeef8e410d779dcc8de6f4',
      blockNumber: 14744037,
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
