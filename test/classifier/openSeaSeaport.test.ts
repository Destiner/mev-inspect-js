import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import { NftPool, NftSwap } from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import classifier from '../../src/classifier/items/openseaSeaport.js';

describe('Classfiers: Opensea Seaport', () => {
  test('nft swap', () => {
    if (classifier.type !== 'nft_swap') {
      expect.fail();
    }

    const pool: NftPool = {
      address: '0x00000000006c3852cbef3e08e8df289169ede581',
      factory: {
        label: 'OpenSea: Seaport V1.1',
        address: '0x00000000006c3852cbef3e08e8df289169ede581',
      },
      asset: '',
      collection: '',
      metadata: {},
    };
    const event: ClassifiedEvent = {
      address: '0x00000000006c3852cbef3e08e8df289169ede581',
      blockHash:
        '0x84ac28aa33ee37a517a28af4781e70a992c62646066c763b029b611916f66fec',
      blockNumber: 15321851,
      transactionHash:
        '0xce93e804cdaa9e2d1c781c5eeba4cf47a898987ce4dc20752dfb5d9980f3f6ad',
      transactionIndex: 82,
      gasUsed: 339555,
      logIndex: 161,
      classifier,
      name: 'OrderFulfilled',
      values: {
        orderHash:
          '0xa4adf47d61eb700cb4d55ae14f5c9b162cf720ab352648a64690e2e43bccbce7',
        offerer: '0xE46dF87D3fc3c68C71B9adfcecB6479e285021d9',
        zone: '0x004C00500000aD104D7DBd00e3ae0A5C00560C00',
        recipient: '0x6d660980b00c3405C2DEc173cf2259B15572B9B5',
        offer: [
          {
            itemType: 2,
            token: '0x06911466341299D79E9E1368A016C73d009691cc',
            identifier: BigNumber.from('0x1871'),
            amount: BigNumber.from('0x01'),
          },
        ],
        consideration: [
          {
            itemType: 0,
            token: '0x0000000000000000000000000000000000000000',
            identifier: BigNumber.from('0x00'),
            amount: BigNumber.from('0x030927f74c9de000'),
            recipient: '0xE46dF87D3fc3c68C71B9adfcecB6479e285021d9',
          },
          {
            itemType: 0,
            token: '0x0000000000000000000000000000000000000000',
            identifier: BigNumber.from('0x00'),
            amount: BigNumber.from('0x16345785d8a000'),
            recipient: '0x8De9C5A032463C561423387a9648c5C7BCC5BC90',
          },
          {
            itemType: 0,
            token: '0x0000000000000000000000000000000000000000',
            identifier: BigNumber.from('0x00'),
            amount: BigNumber.from('0x58d15e17628000'),
            recipient: '0x295990aC057a3a4b786102A3B61C84eFF764c033',
          },
        ],
      },
    };
    const swap = classifier.parse(pool, event, 1, []);

    expect(swap).toEqual<NftSwap>({
      block: {
        number: 15321851,
        hash: '0x84ac28aa33ee37a517a28af4781e70a992c62646066c763b029b611916f66fec',
      },
      transaction: {
        hash: '0xce93e804cdaa9e2d1c781c5eeba4cf47a898987ce4dc20752dfb5d9980f3f6ad',
        index: 82,
        gasUsed: 339555,
      },
      event: {
        address: '0x00000000006c3852cbef3e08e8df289169ede581',
        logIndex: 161,
      },
      contract: {
        address: '0x00000000006c3852cbef3e08e8df289169ede581',
        protocol: {
          abi: 'OpenseaSeaport',
          factory: {
            address: '0x00000000006c3852cbef3e08e8df289169ede581',
            label: 'OpenSea: Seaport V1.1',
          },
        },
      },
      from: '0x6d660980b00c3405c2dec173cf2259b15572b9b5',
      to: '0x6d660980b00c3405c2dec173cf2259b15572b9b5',
      assetIn: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountIn: 250000000000000000n,
      assetOut: {
        type: 'erc721',
        collection: '0x06911466341299d79e9e1368a016c73d009691cc',
        id: 6257n,
      },
      amountOut: 1n,
    });
  });
});
