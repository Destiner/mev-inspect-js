import { BigNumber } from '@ethersproject/bignumber';
import { describe, test, expect } from 'vitest';

import classifier from '../../src/classifier/items/uniswapV2.js';

describe('Classfiers: Uniswap V2', () => {
  test('parses a swap', () => {
    const poolA = {
      address: '0x9928e4046d7c6513326ccea028cd3e7a91c7590a',
      assets: [
        '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
        '0xc7283b66eb1eb5fb86327f08e1b5816b0720212b',
      ],
      factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    };
    const eventA = {
      address: '0x9928e4046d7c6513326cCeA028cD3e7a91c7590A',
      transactionHash:
        '0xad39a3e5109e2c146f85f5db53a72da9af886b861d4965aacafdb165c1aec35e',
      gasUsed: 106802,
      logIndex: 15,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        amount0In: BigNumber.from('0'),
        amount1In: BigNumber.from('76382000000000000000000'),
        amount0Out: BigNumber.from('29934139188201577438792'),
        amount1Out: BigNumber.from('0'),
        to: '0xEf3375B491CFf653eAf7C9955a5466f7EA06F37B',
      },
    };
    const transfersA = [
      {
        asset: '0xc7283b66eb1eb5fb86327f08e1b5816b0720212b',
        from: '0xef3375b491cff653eaf7c9955a5466f7ea06f37b',
        to: '0x9928e4046d7c6513326ccea028cd3e7a91c7590a',
        value: 76382000000000000000000n,
        transaction: {
          hash: '0xad39a3e5109e2c146f85f5db53a72da9af886b861d4965aacafdb165c1aec35e',
          gasUsed: 106802,
        },
        event: {
          logIndex: 12,
          address: '0xc7283b66eb1eb5fb86327f08e1b5816b0720212b',
        },
      },
      {
        asset: '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
        from: '0x9928e4046d7c6513326ccea028cd3e7a91c7590a',
        to: '0xef3375b491cff653eaf7c9955a5466f7ea06f37b',
        value: 29934139188201577438792n,
        transaction: {
          hash: '0xad39a3e5109e2c146f85f5db53a72da9af886b861d4965aacafdb165c1aec35e',
          gasUsed: 106802,
        },
        event: {
          logIndex: 13,
          address: '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = classifier.parse(poolA, eventA, transfersA, []);
    expect(swapA).toEqual({
      contract: {
        address: '0x9928e4046d7c6513326ccea028cd3e7a91c7590a',
        protocol: {
          abi: 'UniswapV2',
          factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
        },
      },
      from: '0xef3375b491cff653eaf7c9955a5466f7ea06f37b',
      to: '0xef3375b491cff653eaf7c9955a5466f7ea06f37b',
      assetIn: '0xc7283b66eb1eb5fb86327f08e1b5816b0720212b',
      amountIn: 76382000000000000000000n,
      assetOut: '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
      amountOut: 29934139188201577438792n,
      transaction: {
        hash: '0xad39a3e5109e2c146f85f5db53a72da9af886b861d4965aacafdb165c1aec35e',
        gasUsed: 106802,
      },
      event: {
        address: '0x9928e4046d7c6513326ccea028cd3e7a91c7590a',
        logIndex: 15,
      },
    });

    const poolB = {
      address: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
      assets: [
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
      ],
      factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    };
    const eventB = {
      address: '0xc5be99A02C6857f9Eac67BbCE58DF5572498F40c',
      transactionHash:
        '0x7e40615217492be1a58a41c73780475d415e920f4cd34d1bca8a2c246c0b51fa',
      gasUsed: 126307,
      logIndex: 90,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        amount0In: BigNumber.from('0'),
        amount1In: BigNumber.from('793000000000'),
        amount0Out: BigNumber.from('361056661812569468'),
        amount1Out: BigNumber.from('0'),
        to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      },
    };
    const transfersB = [
      {
        asset: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
        from: '0x6ba6c53c8757c99adc983e84ce7e87f240bf7531',
        to: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
        value: 793000000000n,
        transaction: {
          hash: '0x7e40615217492be1a58a41c73780475d415e920f4cd34d1bca8a2c246c0b51fa',
          gasUsed: 126307,
        },
        event: {
          logIndex: 87,
          address: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
        to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
        value: 361056661812569468n,
        transaction: {
          hash: '0x7e40615217492be1a58a41c73780475d415e920f4cd34d1bca8a2c246c0b51fa',
          gasUsed: 126307,
        },
        event: {
          logIndex: 88,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swapB = classifier.parse(poolB, eventB, transfersB, []);
    expect(swapB).toEqual({
      contract: {
        address: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
        protocol: {
          abi: 'UniswapV2',
          factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
        },
      },
      from: '0x6ba6c53c8757c99adc983e84ce7e87f240bf7531',
      to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      assetIn: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
      amountIn: 793000000000n,
      assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountOut: 361056661812569468n,
      transaction: {
        hash: '0x7e40615217492be1a58a41c73780475d415e920f4cd34d1bca8a2c246c0b51fa',
        gasUsed: 126307,
      },
      event: {
        address: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
        logIndex: 90,
      },
    });
  });

  test('parses split swaps', () => {
    const pool = {
      address: '0x937e882083a0aaf58d7fcf566de8e5d990e882a9',
      assets: [
        '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    };
    const eventA = {
      address: '0x937e882083A0AAF58D7fcf566De8e5d990E882A9',
      transactionHash:
        '0x998259826863242dea35d228e2426747b04fbfc63522d6894a7cef29fd31b85a',
      gasUsed: 360303,
      logIndex: 293,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        amount0In: BigNumber.from('100000000000000000'),
        amount1In: BigNumber.from('0'),
        amount0Out: BigNumber.from('0'),
        amount1Out: BigNumber.from('364189303982833736'),
        to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      },
    };

    const eventB = {
      address: '0x937e882083A0AAF58D7fcf566De8e5d990E882A9',
      transactionHash:
        '0x998259826863242dea35d228e2426747b04fbfc63522d6894a7cef29fd31b85a',
      gasUsed: 360303,
      logIndex: 301,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        amount0In: BigNumber.from('45114259892886817'),
        amount1In: BigNumber.from('0'),
        amount0Out: BigNumber.from('0'),
        amount1Out: BigNumber.from('163735299645864923'),
        to: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
      },
    };
    const transfers = [
      {
        asset: '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
        from: '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
        to: '0x937e882083a0aaf58d7fcf566de8e5d990e882a9',
        value: 100000000000000000n,
        transaction: {
          hash: '0x998259826863242dea35d228e2426747b04fbfc63522d6894a7cef29fd31b85a',
          gasUsed: 360303,
        },
        event: {
          logIndex: 289,
          address: '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x937e882083a0aaf58d7fcf566de8e5d990e882a9',
        to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
        value: 364189303982833736n,
        transaction: {
          hash: '0x998259826863242dea35d228e2426747b04fbfc63522d6894a7cef29fd31b85a',
          gasUsed: 360303,
        },
        event: {
          logIndex: 291,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
        from: '0x328ee1e1cb2af17ae0f8c05ceeb06ba8548dcb5a',
        to: '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
        value: 3922979121120592n,
        transaction: {
          hash: '0x998259826863242dea35d228e2426747b04fbfc63522d6894a7cef29fd31b85a',
          gasUsed: 360303,
        },
        event: {
          logIndex: 296,
          address: '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
        },
      },
      {
        asset: '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
        from: '0x328ee1e1cb2af17ae0f8c05ceeb06ba8548dcb5a',
        to: '0x937e882083a0aaf58d7fcf566de8e5d990e882a9',
        value: 45114259892886817n,
        transaction: {
          hash: '0x998259826863242dea35d228e2426747b04fbfc63522d6894a7cef29fd31b85a',
          gasUsed: 360303,
        },
        event: {
          logIndex: 297,
          address: '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x937e882083a0aaf58d7fcf566de8e5d990e882a9',
        to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        value: 163735299645864923n,
        transaction: {
          hash: '0x998259826863242dea35d228e2426747b04fbfc63522d6894a7cef29fd31b85a',
          gasUsed: 360303,
        },
        event: {
          logIndex: 299,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = classifier.parse(pool, eventA, transfers, []);
    const swapB = classifier.parse(pool, eventB, transfers, []);
    expect(swapA).toEqual({
      contract: {
        address: '0x937e882083a0aaf58d7fcf566de8e5d990e882a9',
        protocol: {
          abi: 'UniswapV2',
          factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
        },
      },
      from: '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
      to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      assetIn: '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
      amountIn: 100000000000000000n,
      assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountOut: 364189303982833736n,
      transaction: {
        hash: '0x998259826863242dea35d228e2426747b04fbfc63522d6894a7cef29fd31b85a',
        gasUsed: 360303,
      },
      event: {
        address: '0x937e882083a0aaf58d7fcf566de8e5d990e882a9',
        logIndex: 293,
      },
    });

    expect(swapB).toEqual({
      contract: {
        address: '0x937e882083a0aaf58d7fcf566de8e5d990e882a9',
        protocol: {
          abi: 'UniswapV2',
          factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
        },
      },
      from: '0x328ee1e1cb2af17ae0f8c05ceeb06ba8548dcb5a',
      to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      assetIn: '0x044727e50ff30db57fad06ff4f5846eab5ea52a2',
      amountIn: 45114259892886817n,
      assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountOut: 163735299645864923n,
      transaction: {
        hash: '0x998259826863242dea35d228e2426747b04fbfc63522d6894a7cef29fd31b85a',
        gasUsed: 360303,
      },
      event: {
        address: '0x937e882083a0aaf58d7fcf566de8e5d990e882a9',
        logIndex: 301,
      },
    });
  });

  test('parses multi-hop swaps', () => {
    const poolA = {
      address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
      assets: [
        '0x514910771af9ca656af840dff83e8264ecf986ca',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    };
    const poolB = {
      address: '0xce84867c3c02b05dc570d0135103d3fb9cc19433',
      assets: [
        '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    };
    const eventA = {
      address: '0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974',
      transactionHash:
        '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
      gasUsed: 159041,
      logIndex: 448,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x11111112542D85B3EF69AE05771c2dCCff4fAa26',
        amount0In: BigNumber.from('2918704295536500000'),
        amount1In: BigNumber.from('0'),
        amount0Out: BigNumber.from('0'),
        amount1Out: BigNumber.from('11499148166696888'),
        to: '0xCE84867c3c02B05dc570d0135103d3fB9CC19433',
      },
    };
    const eventB = {
      address: '0xCE84867c3c02B05dc570d0135103d3fB9CC19433',
      transactionHash:
        '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
      gasUsed: 159041,
      logIndex: 451,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x11111112542D85B3EF69AE05771c2dCCff4fAa26',
        amount0In: BigNumber.from('0'),
        amount1In: BigNumber.from('11499148166696888'),
        amount0Out: BigNumber.from('13787057162799104322'),
        amount1Out: BigNumber.from('0'),
        to: '0x416d1a4F718a8C3dda7FC3645435580E743D9249',
      },
    };
    const transfers = [
      {
        asset: '0x514910771af9ca656af840dff83e8264ecf986ca',
        from: '0x416d1a4f718a8c3dda7fc3645435580e743d9249',
        to: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
        value: 2918704295536500000n,
        transaction: {
          hash: '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
          gasUsed: 159041,
        },
        event: {
          logIndex: 445,
          address: '0x514910771af9ca656af840dff83e8264ecf986ca',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
        to: '0xce84867c3c02b05dc570d0135103d3fb9cc19433',
        value: 11499148166696888n,
        transaction: {
          hash: '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
          gasUsed: 159041,
        },
        event: {
          logIndex: 446,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
        from: '0xce84867c3c02b05dc570d0135103d3fb9cc19433',
        to: '0x416d1a4f718a8c3dda7fc3645435580e743d9249',
        value: 13787057162799104322n,
        transaction: {
          hash: '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
          gasUsed: 159041,
        },
        event: {
          logIndex: 449,
          address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = classifier.parse(poolA, eventA, transfers, []);
    const swapB = classifier.parse(poolB, eventB, transfers, []);
    expect(swapA).toEqual({
      contract: {
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
        protocol: {
          abi: 'UniswapV2',
          factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
        },
      },
      from: '0x416d1a4f718a8c3dda7fc3645435580e743d9249',
      to: '0xce84867c3c02b05dc570d0135103d3fb9cc19433',
      assetIn: '0x514910771af9ca656af840dff83e8264ecf986ca',
      amountIn: 2918704295536500000n,
      assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountOut: 11499148166696888n,
      transaction: {
        hash: '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
        gasUsed: 159041,
      },
      event: {
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
        logIndex: 448,
      },
    });
    expect(swapB).toEqual({
      contract: {
        address: '0xce84867c3c02b05dc570d0135103d3fb9cc19433',
        protocol: {
          abi: 'UniswapV2',
          factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
        },
      },
      from: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
      to: '0x416d1a4f718a8c3dda7fc3645435580e743d9249',
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountIn: 11499148166696888n,
      assetOut: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
      amountOut: 13787057162799104322n,
      transaction: {
        hash: '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
        gasUsed: 159041,
      },
      event: {
        address: '0xce84867c3c02b05dc570d0135103d3fb9cc19433',
        logIndex: 451,
      },
    });
  });

  test('parses arbitrage swaps', () => {
    const poolA = {
      address: '0xe2e998f6f498cf9acdeda38de77ca95d1d8288f6',
      assets: [
        '0xb31ef9e52d94d4120eb44fe1ddfde5b4654a6515',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    };
    const poolB = {
      address: '0x6137a55b535b98e26c5ca5c9cb329022bf1b9318',
      assets: [
        '0x46e98ffe40e408ba6412beb670507e083c8b95ff',
        '0xb31ef9e52d94d4120eb44fe1ddfde5b4654a6515',
      ],
      factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    };
    const poolC = {
      address: '0x0d80f8a039cc61b659ff299bb132de271c757325',
      assets: [
        '0x46e98ffe40e408ba6412beb670507e083c8b95ff',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    };
    const eventA = {
      address: '0xE2E998f6f498cf9ACdeDa38de77Ca95d1d8288f6',
      transactionHash:
        '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc',
      gasUsed: 187271,
      logIndex: 3,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x731Ea79A1B2B90683507Da2aaB498bd8fF8f7ff1',
        amount0In: BigNumber.from('0'),
        amount1In: BigNumber.from('396025622087811072'),
        amount0Out: BigNumber.from('9203736012517381854992'),
        amount1Out: BigNumber.from('0'),
        to: '0x6137A55b535B98e26C5cA5C9Cb329022bF1B9318',
      },
    };
    const eventB = {
      address: '0x6137A55b535B98e26C5cA5C9Cb329022bF1B9318',
      transactionHash:
        '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc',
      gasUsed: 187271,
      logIndex: 6,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x731Ea79A1B2B90683507Da2aaB498bd8fF8f7ff1',
        amount0In: BigNumber.from('0'),
        amount1In: BigNumber.from('9203736012517381854992'),
        amount0Out: BigNumber.from('9810940048285013383131'),
        amount1Out: BigNumber.from('0'),
        to: '0x0D80F8A039cc61b659ff299bB132dE271c757325',
      },
    };
    const eventC = {
      address: '0x0D80F8A039cc61b659ff299bB132dE271c757325',
      transactionHash:
        '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc',
      gasUsed: 187271,
      logIndex: 9,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x731Ea79A1B2B90683507Da2aaB498bd8fF8f7ff1',
        amount0In: BigNumber.from('9810940048285013383131'),
        amount1In: BigNumber.from('0'),
        amount0Out: BigNumber.from('0'),
        amount1Out: BigNumber.from('402011216481376330'),
        to: '0x731Ea79A1B2B90683507Da2aaB498bd8fF8f7ff1',
      },
    };
    const transfers = [
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x731ea79a1b2b90683507da2aab498bd8ff8f7ff1',
        to: '0xe2e998f6f498cf9acdeda38de77ca95d1d8288f6',
        value: 396025622087811072n,
        transaction: {
          hash: '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc',
          gasUsed: 187271,
        },
        event: {
          logIndex: 0,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0xb31ef9e52d94d4120eb44fe1ddfde5b4654a6515',
        from: '0xe2e998f6f498cf9acdeda38de77ca95d1d8288f6',
        to: '0x6137a55b535b98e26c5ca5c9cb329022bf1b9318',
        value: 9203736012517381854992n,
        transaction: {
          hash: '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc',
          gasUsed: 187271,
        },
        event: {
          logIndex: 1,
          address: '0xb31ef9e52d94d4120eb44fe1ddfde5b4654a6515',
        },
      },
      {
        asset: '0x46e98ffe40e408ba6412beb670507e083c8b95ff',
        from: '0x6137a55b535b98e26c5ca5c9cb329022bf1b9318',
        to: '0x0d80f8a039cc61b659ff299bb132de271c757325',
        value: 9810940048285013383131n,
        transaction: {
          hash: '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc',
          gasUsed: 187271,
        },
        event: {
          logIndex: 4,
          address: '0x46e98ffe40e408ba6412beb670507e083c8b95ff',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x0d80f8a039cc61b659ff299bb132de271c757325',
        to: '0x731ea79a1b2b90683507da2aab498bd8ff8f7ff1',
        value: 402011216481376330n,
        transaction: {
          hash: '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc',
          gasUsed: 187271,
        },
        event: {
          logIndex: 7,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swapA = classifier.parse(poolA, eventA, transfers, []);
    const swapB = classifier.parse(poolB, eventB, transfers, []);
    const swapC = classifier.parse(poolC, eventC, transfers, []);
    expect(swapA).toEqual({
      contract: {
        address: '0xe2e998f6f498cf9acdeda38de77ca95d1d8288f6',
        protocol: {
          abi: 'UniswapV2',
          factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
        },
      },
      from: '0x731ea79a1b2b90683507da2aab498bd8ff8f7ff1',
      to: '0x6137a55b535b98e26c5ca5c9cb329022bf1b9318',
      assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountIn: 396025622087811072n,
      assetOut: '0xb31ef9e52d94d4120eb44fe1ddfde5b4654a6515',
      amountOut: 9203736012517381854992n,
      transaction: {
        hash: '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc',
        gasUsed: 187271,
      },
      event: {
        address: '0xe2e998f6f498cf9acdeda38de77ca95d1d8288f6',
        logIndex: 3,
      },
    });
    expect(swapB).toEqual({
      contract: {
        address: '0x6137a55b535b98e26c5ca5c9cb329022bf1b9318',
        protocol: {
          abi: 'UniswapV2',
          factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
        },
      },
      from: '0xe2e998f6f498cf9acdeda38de77ca95d1d8288f6',
      to: '0x0d80f8a039cc61b659ff299bb132de271c757325',
      assetIn: '0xb31ef9e52d94d4120eb44fe1ddfde5b4654a6515',
      amountIn: 9203736012517381854992n,
      assetOut: '0x46e98ffe40e408ba6412beb670507e083c8b95ff',
      amountOut: 9810940048285013383131n,
      transaction: {
        hash: '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc',
        gasUsed: 187271,
      },
      event: {
        address: '0x6137a55b535b98e26c5ca5c9cb329022bf1b9318',
        logIndex: 6,
      },
    });
    expect(swapC).toEqual({
      contract: {
        address: '0x0d80f8a039cc61b659ff299bb132de271c757325',
        protocol: {
          abi: 'UniswapV2',
          factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
        },
      },
      from: '0x6137a55b535b98e26c5ca5c9cb329022bf1b9318',
      to: '0x731ea79a1b2b90683507da2aab498bd8ff8f7ff1',
      assetIn: '0x46e98ffe40e408ba6412beb670507e083c8b95ff',
      amountIn: 9810940048285013383131n,
      assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountOut: 402011216481376330n,
      transaction: {
        hash: '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc',
        gasUsed: 187271,
      },
      event: {
        address: '0x0d80f8a039cc61b659ff299bb132de271c757325',
        logIndex: 9,
      },
    });
  });

  test('parses cross-protocol arbitrage swaps', () => {
    const pool = {
      address: '0x55d5c232d921b9eaa6b37b5845e439acd04b4dba',
      assets: [
        '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    };
    const event = {
      address: '0x55D5c232D921B9eAA6b37b5845E439aCD04b4DBa',
      transactionHash:
        '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
      gasUsed: 140950,
      logIndex: 10,
      classifier,
      name: 'Swap',
      values: {
        sender: '0x58418d6c83EfAB01ed78b0AC42E55af01eE77DbA',
        amount0In: BigNumber.from('4426537110163'),
        amount1In: BigNumber.from('0'),
        amount0Out: BigNumber.from('0'),
        amount1Out: BigNumber.from('2767561675144940562'),
        to: '0x5AA3393e361C2EB342408559309b3e873CD876d6',
      },
    };
    const transfers = [
      {
        asset: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
        from: '0x9e0905249ceefffb9605e034b534544684a58be6',
        to: '0x55d5c232d921b9eaa6b37b5845e439acd04b4dba',
        value: 4426537110163n,
        transaction: {
          hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
          gasUsed: 140950,
        },
        event: {
          logIndex: 5,
          address: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
        to: '0x9e0905249ceefffb9605e034b534544684a58be6',
        value: 2749128322331574924n,
        transaction: {
          hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
          gasUsed: 140950,
        },
        event: {
          logIndex: 6,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      {
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        from: '0x55d5c232d921b9eaa6b37b5845e439acd04b4dba',
        to: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
        value: 2767561675144940562n,
        transaction: {
          hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
          gasUsed: 140950,
        },
        event: {
          logIndex: 8,
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
    ];

    if (classifier.type !== 'swap') {
      expect.fail();
    }
    const swap = classifier.parse(pool, event, transfers, []);
    expect(swap).toEqual({
      contract: {
        address: '0x55d5c232d921b9eaa6b37b5845e439acd04b4dba',
        protocol: {
          abi: 'UniswapV2',
          factory: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
        },
      },
      from: '0x9e0905249ceefffb9605e034b534544684a58be6',
      to: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
      assetIn: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
      amountIn: 4426537110163n,
      assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      amountOut: 2767561675144940562n,
      transaction: {
        hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
        gasUsed: 140950,
      },
      event: {
        address: '0x55d5c232d921b9eaa6b37b5845e439acd04b4dba',
        logIndex: 10,
      },
    });
  });
});
