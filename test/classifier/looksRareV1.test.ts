import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import { NftPool, NftSwap } from '../../src/classifier/base.js';
import { ClassifiedEvent } from '../../src/classifier/index.js';
import classifier from '../../src/classifier/items/looksRareV1.js';

describe('Classfiers: LooksRare V1', () => {
  test('nft sell', () => {
    if (classifier.type !== 'nft_swap') {
      expect.fail();
    }

    const pool: NftPool = {
      address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
      factory: {
        label: 'LooksRare V1',
        address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
      },
      asset: '',
      collection: '',
      metadata: {},
    };
    const event: ClassifiedEvent = {
      address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
      blockHash:
        '0x446e9672bc1c9331205ad7e3ac3cf01fd8a6cfca25a240fc8df02565eb264667',
      blockNumber: 15338596,
      transactionHash:
        '0xee9615157b2c3da9607ce811f16c57256a3b487816ba46ea4c78c68ac48d7269',
      gasUsed: 208730,
      logIndex: 90,
      classifier,
      name: 'TakerAsk',
      values: {
        orderHash:
          '0x2ef7bf76b6b12f77fd31e0e3c4137d46d5f731bc97c2aef0aa59dcd3ef1f85ff',
        orderNonce: BigNumber.from('648'),
        taker: '0x30d4B8b42a2EfE78c9536Faa88f0AFbbede2864F',
        maker: '0xb00154e628C7880cEdDF01c36888Fa9e6FD3ecb9',
        strategy: '0x86F909F70813CdB1Bc733f4D97Dc6b03B8e7E8F3',
        currency: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        collection: '0x19cB5b009BdAD0Dad0404DD860b0beA75465E678',
        tokenId: BigNumber.from('4036'),
        amount: BigNumber.from('1'),
        price: BigNumber.from('25000000000000000'),
      },
    };
    const swap = classifier.parse(pool, event, 1, []);

    expect(swap).toEqual<NftSwap>({
      block: {
        number: 15338596,
        hash: '0x446e9672bc1c9331205ad7e3ac3cf01fd8a6cfca25a240fc8df02565eb264667',
      },
      transaction: {
        hash: '0xee9615157b2c3da9607ce811f16c57256a3b487816ba46ea4c78c68ac48d7269',
        gasUsed: 208730,
      },
      event: {
        address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
        logIndex: 90,
      },
      contract: {
        address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
        protocol: {
          abi: 'LooksRareV1',
          factory: {
            address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
            label: 'LooksRare V1',
          },
        },
      },
      from: '0x30d4b8b42a2efe78c9536faa88f0afbbede2864f',
      to: '0x30d4b8b42a2efe78c9536faa88f0afbbede2864f',
      assetIn: {
        type: 'erc721',
        collection: '0x19cb5b009bdad0dad0404dd860b0bea75465e678',
        id: 4036n,
      },
      amountIn: 1n,
      assetOut: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountOut: 25000000000000000n,
    });
  });

  test.todo('nft buy', () => {
    if (classifier.type !== 'nft_swap') {
      expect.fail();
    }

    const pool: NftPool = {
      address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
      factory: {
        label: 'LooksRare V1',
        address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
      },
      asset: '',
      collection: '',
      metadata: {},
    };
    const event: ClassifiedEvent = {
      address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
      blockHash:
        '0x0c55b7b0a356c976c4cb6b65c9b42ad0cd268975eb4260f4053ad54eff8cde33',
      blockNumber: 15338550,
      transactionHash:
        '0x85ee55e365efeb8c64d4ccecb0d07cdae0779b27bd854d78f5fdf33104f56bee',
      gasUsed: 261116,
      logIndex: 323,
      classifier,
      name: 'TakerBid',
      values: {
        orderHash:
          '0xe4338a641c4feaa72e77933081bb21ac9539272328881d9243e7a190ec1a0f09',
        orderNonce: BigNumber.from('78'),
        taker: '0x69Cf8871F61FB03f540bC519dd1f1D4682Ea0bF6',
        maker: '0xD67360166BAF50bd81Bf7972ae5a4bC105E79f2A',
        strategy: '0x56244Bb70CbD3EA9Dc8007399F61dFC065190031',
        currency: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        collection: '0xEC0a7A26456B8451aefc4b00393ce1BefF5eB3e9',
        tokenId: BigNumber.from('9903'),
        amount: BigNumber.from('1'),
        price: BigNumber.from('31000000000000000'),
      },
    };
    const swap = classifier.parse(pool, event, 1, []);

    expect(swap).toEqual<NftSwap>({
      block: {
        number: 15338550,
        hash: '0x0c55b7b0a356c976c4cb6b65c9b42ad0cd268975eb4260f4053ad54eff8cde33',
      },
      transaction: {
        hash: '0x85ee55e365efeb8c64d4ccecb0d07cdae0779b27bd854d78f5fdf33104f56bee',
        gasUsed: 261116,
      },
      event: {
        address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
        logIndex: 323,
      },
      contract: {
        address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
        protocol: {
          abi: 'LooksRareV1',
          factory: {
            address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
            label: 'LooksRare V1',
          },
        },
      },
      from: '0x69cf8871f61fb03f540bc519dd1f1d4682ea0bf6',
      to: '0x69cf8871f61fb03f540bc519dd1f1d4682ea0bf6',
      assetIn: {
        type: 'erc20',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      amountIn: 250000000000000000n,
      assetOut: {
        type: 'erc721',
        collection: '0xec0a7a26456b8451aefc4b00393ce1beff5eb3e9',
        id: 9903n,
      },
      amountOut: 1n,
    });
  });
});
