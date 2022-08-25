import { describe, test, expect } from 'vitest';

import { NftSwap } from '../../src/index.js';
import { NftArbitrage, getNftArbitrages } from '../../src/mev/nftArbitrages.js';

describe('MEV: arbitrage', () => {
  test('skip simple swaps', () => {
    const swaps: NftSwap[] = [
      {
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
        block: {
          hash: '0x82bfab0ce2ff519691c2925fa83b1b04937f11c2b99bac50ab5d39a31b68a342',
          number: 15351984,
        },
        transaction: {
          from: '0x61c4a9107de33e75ed6fe29550ae2cc29ced2264',
          hash: '0xc1f2b19cc4e11f6588e98379da11971a0966067239d2772c40857e92210a762d',
          index: 77,
          gasUsed: 168082,
        },
        event: {
          address: '0x00000000006c3852cbef3e08e8df289169ede581',
          logIndex: 155,
        },
        from: '0x61c4a9107de33e75ed6fe29550ae2cc29ced2264',
        to: '0x61c4a9107de33e75ed6fe29550ae2cc29ced2264',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 21777777770000000n,
        assetOut: {
          type: 'erc721',
          collection: '0x111508edbeb2e906a40fd92e8b4cfaffc606c6dd',
          id: 1804n,
        },
        amountOut: 1n,
      },
    ];
    const arbitrages = getNftArbitrages(swaps);

    expect(arbitrages).toEqual<NftArbitrage[]>([]);
  });

  test('internal arbitrage', () => {
    const swaps: NftSwap[] = [
      {
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
        block: {
          hash: '0x15ea99b7f9111db6a098be6f4f209c42a010b9706c25b0990991d3d60032c196',
          number: 15323441,
        },
        transaction: {
          from: '0x00000009761a2585aa49edf3d93ed39febab9f59',
          hash: '0xe82e8db26891d4fab3b5f46f0326e1f374de0ca7b171ef69a4e98ad209f37834',
          index: 3,
          gasUsed: 310948,
        },
        event: {
          address: '0x00000000006c3852cbef3e08e8df289169ede581',
          logIndex: 0,
        },
        from: '0x00000007d259e6b322766529ac387b53a1584724',
        to: '0x00000007d259e6b322766529ac387b53a1584724',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 90000000000000000n,
        assetOut: {
          type: 'erc721',
          collection: '0xf794f9e028d168a59341aaf77fc8f57f33ddc6cf',
          id: 1728n,
        },
        amountOut: 1n,
      },
      {
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
        block: {
          hash: '0x15ea99b7f9111db6a098be6f4f209c42a010b9706c25b0990991d3d60032c196',
          number: 15323441,
        },
        transaction: {
          from: '0x00000009761a2585aa49edf3d93ed39febab9f59',
          hash: '0xe82e8db26891d4fab3b5f46f0326e1f374de0ca7b171ef69a4e98ad209f37834',
          index: 3,
          gasUsed: 310948,
        },
        event: {
          address: '0x00000000006c3852cbef3e08e8df289169ede581',
          logIndex: 4,
        },
        from: '0x00000007d259e6b322766529ac387b53a1584724',
        to: '0x00000007d259e6b322766529ac387b53a1584724',
        assetIn: {
          type: 'erc721',
          collection: '0xf794f9e028d168a59341aaf77fc8f57f33ddc6cf',
          id: 1728n,
        },
        amountIn: 1n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 453250000000000000n,
      },
    ];
    const arbitrages = getNftArbitrages(swaps);

    expect(arbitrages).toEqual<NftArbitrage[]>([
      {
        swaps,
        profit: {
          amount: 363250000000000000n,
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        },
        arbitrager: {
          sender: '0x00000009761a2585aa49edf3d93ed39febab9f59',
          beneficiary: '0x00000007d259e6b322766529ac387b53a1584724',
        },
      },
    ]);
  });

  test('cross-protocol arbitrage', () => {
    const swapsA: NftSwap[] = [
      {
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
        block: {
          hash: '0xa99c4df0ada753863b777750893ea14526452b81e2f0b1477b4e43a89858a66d',
          number: 15321852,
        },
        transaction: {
          from: '0x52f0a3371065e3eb50b48c4f8ce62e00ff8acf6c',
          hash: '0xe4ab98644cf93f3c5112b64eb1986f3cef88f58a52301b90f878df7438a8192d',
          index: 11,
          gasUsed: 402413,
        },
        event: {
          address: '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3',
          logIndex: 86,
        },
        from: '0x8f44e22ac221cc25a46289d1c307d4f34a4dd6c2',
        to: '0x8f44e22ac221cc25a46289d1c307d4f34a4dd6c2',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 100000000000000000n,
        assetOut: {
          type: 'erc721',
          collection: '0x7e3ef31186d1bec0d3f35ad701d065743b84c790',
          id: 4929n,
        },
        amountOut: 1n,
      },
      {
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
        block: {
          hash: '0xa99c4df0ada753863b777750893ea14526452b81e2f0b1477b4e43a89858a66d',
          number: 15321852,
        },
        transaction: {
          from: '0x52f0a3371065e3eb50b48c4f8ce62e00ff8acf6c',
          hash: '0xe4ab98644cf93f3c5112b64eb1986f3cef88f58a52301b90f878df7438a8192d',
          index: 11,
          gasUsed: 402413,
        },
        event: {
          address: '0x00000000006c3852cbef3e08e8df289169ede581',
          logIndex: 88,
        },
        from: '0x8f44e22ac221cc25a46289d1c307d4f34a4dd6c2',
        to: '0x8f44e22ac221cc25a46289d1c307d4f34a4dd6c2',
        assetIn: {
          type: 'erc721',
          collection: '0x7e3ef31186d1bec0d3f35ad701d065743b84c790',
          id: 4929n,
        },
        amountIn: 1n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 116220000000000000n,
      },
    ];
    const arbitragesA = getNftArbitrages(swapsA);

    expect(arbitragesA).toEqual<NftArbitrage[]>([
      {
        swaps: swapsA,
        profit: {
          amount: 16220000000000000n,
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        },
        arbitrager: {
          sender: '0x52f0a3371065e3eb50b48c4f8ce62e00ff8acf6c',
          beneficiary: '0x8f44e22ac221cc25a46289d1c307d4f34a4dd6c2',
        },
      },
    ]);

    const swapsB: NftSwap[] = [
      {
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
        block: {
          hash: '0x564eb71d5c9d53139730479c97e1592838100d6d2cb43d7beefcaebe2fa3e5b2',
          number: 15351314,
        },
        transaction: {
          from: '0x0676d673a2a0a13fe37a3ec7812a8ccc571ca07b',
          hash: '0xfb99e6f2e9161f2ecf57ff3d17f1c309e6123f3757ca406509f57ae68f7b832e',
          index: 1,
          gasUsed: 360589,
        },
        event: {
          address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
          logIndex: 11,
        },
        from: '0x0000007370af0000ad00be0efd2f1eb6e6e9d700',
        to: '0x0000007370af0000ad00be0efd2f1eb6e6e9d700',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 99000000000000000n,
        assetOut: {
          type: 'erc721',
          collection: '0x35e1402fa69c60851ea8b86f04d823ff41796a51',
          id: 8685n,
        },
        amountOut: 1n,
      },
      {
        contract: {
          address: '0x3b33cac8c376a81741de424026e6f7758a12239f',
          protocol: {
            abi: 'SudoswapV1',
            factory: {
              address: '0xb16c1342e617a5b6e4b631eb114483fdb289c0a4',
              label: 'Sudoswap V1',
            },
          },
        },
        block: {
          hash: '0x564eb71d5c9d53139730479c97e1592838100d6d2cb43d7beefcaebe2fa3e5b2',
          number: 15351314,
        },
        transaction: {
          from: '0x0676d673a2a0a13fe37a3ec7812a8ccc571ca07b',
          hash: '0xfb99e6f2e9161f2ecf57ff3d17f1c309e6123f3757ca406509f57ae68f7b832e',
          index: 1,
          gasUsed: 360589,
        },
        event: {
          address: '0x3b33cac8c376a81741de424026e6f7758a12239f',
          logIndex: 16,
        },
        from: '0x0000007370af0000ad00be0efd2f1eb6e6e9d700',
        to: '0x0000007370af0000ad00be0efd2f1eb6e6e9d700',
        assetIn: {
          type: 'erc721',
          collection: '0x35e1402fa69c60851ea8b86f04d823ff41796a51',
          id: 8685n,
        },
        amountIn: 1n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 143810189573459708n,
      },
    ];
    const arbitragesB = getNftArbitrages(swapsB);

    expect(arbitragesB).toEqual<NftArbitrage[]>([
      {
        swaps: swapsB,
        profit: {
          amount: 44810189573459708n,
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        },
        arbitrager: {
          sender: '0x0676d673a2a0a13fe37a3ec7812a8ccc571ca07b',
          beneficiary: '0x0000007370af0000ad00be0efd2f1eb6e6e9d700',
        },
      },
    ]);
  });
});
