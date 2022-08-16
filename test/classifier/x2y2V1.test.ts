import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import { NftPool, NftSwap } from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import classifier from '../../src/classifier/items/x2y2V1.js';

describe('Classfiers: X2Y2 V1', () => {
  test('nft swap', () => {
    if (classifier.type !== 'nft_swap') {
      expect.fail();
    }

    const pool: NftPool = {
      address: '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3',
      factory: {
        label: 'X2Y2 V1',
        address: '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3',
      },
      asset: '',
      collection: '',
      metadata: {},
    };
    const event: ClassifiedEvent = {
      address: '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3',
      blockHash:
        '0x80d42c532fc7e676efd40c5017790d12a78fb8e9efd3ac3d293e5a1003d01b38',
      blockNumber: 15339028,
      transactionHash:
        '0x21ef9c1011b96a94a2a76ce03697d1db1d2d718d72c58107cd69df5a91732811',
      gasUsed: 190476,
      logIndex: 201,
      classifier,
      name: 'EvInventory',
      values: {
        itemHash:
          '0x9ec0c5280b8ebf88ea15e5cfc053fd12da875b46628504fef38665419ec83268',
        maker: '0x313B34C5A86a8309B07E9bF6F432f8A50Ae4B5Cc',
        taker: '0x9bc79BF9EC3DfF0Fd812f442eC9575F82c6832e6',
        orderSalt: BigNumber.from('0xb2c94d02ed56278ce85e8e96092efe03'),
        settleSalt: BigNumber.from('0x015a06b3b74945'),
        intent: BigNumber.from('0x01'),
        delegateType: BigNumber.from('0x01'),
        deadline: BigNumber.from('0x6318222f'),
        currency: '0x0000000000000000000000000000000000000000',
        dataMask: '0x',
        item: {
          price: BigNumber.from('0x0aa87bee538000'),
          data: '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000d2cebaebb6e3f3a39ff2bdeeadd5413421c8e38400000000000000000000000000000000000000000000000000000000000006e5',
        },
        detail: {
          op: 1,
          orderIdx: BigNumber.from('0x00'),
          itemIdx: BigNumber.from('0x03'),
          price: BigNumber.from('0x0aa87bee538000'),
          itemHash:
            '0x9ec0c5280b8ebf88ea15e5cfc053fd12da875b46628504fef38665419ec83268',
          executionDelegate: '0xF849de01B080aDC3A814FaBE1E2087475cF2E354',
          dataReplacement: '0x',
          bidIncentivePct: BigNumber.from('0x00'),
          aucMinIncrementPct: BigNumber.from('0x00'),
          aucIncDurationSecs: BigNumber.from('0x00'),
          fees: [[Array]],
        },
      },
    };
    const swap = classifier.parse(pool, event, 1, []);

    expect(swap).toEqual<NftSwap>({
      block: {
        number: 15339028,
        hash: '0x80d42c532fc7e676efd40c5017790d12a78fb8e9efd3ac3d293e5a1003d01b38',
      },
      transaction: {
        hash: '0x21ef9c1011b96a94a2a76ce03697d1db1d2d718d72c58107cd69df5a91732811',
        gasUsed: 190476,
      },
      event: {
        address: '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3',
        logIndex: 201,
      },
      contract: {
        address: '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3',
        protocol: {
          abi: 'X2Y2V1',
          factory: {
            address: '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3',
            label: 'X2Y2 V1',
          },
        },
      },
      from: '0x9bc79bf9ec3dff0fd812f442ec9575f82c6832e6',
      to: '0x9bc79bf9ec3dff0fd812f442ec9575f82c6832e6',
      assetIn: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountIn: 3000000000000000n,
      assetOut: {
        type: 'erc721',
        collection: '0xd2cebaebb6e3f3a39ff2bdeeadd5413421c8e384',
        id: 1765n,
      },
      amountOut: 1n,
    });
  });
});
