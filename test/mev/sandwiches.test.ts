import { describe, test, expect } from 'vitest';

import { LiquidityDeposit, Swap } from '../../src/index.js';
import { Sandwich, getSandwiches } from '../../src/mev/sandwiches.js';

const ETHEREUM = 1;

describe('MEV: sandwiches', () => {
  test('simple swap', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x9928e4046d7c6513326ccea028cd3e7a91c7590a',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
        to: '0xef3375b491cff653eaf7c9955a5466f7ea06f37b',
        assetIn: '0xc7283b66eb1eb5fb86327f08e1b5816b0720212b',
        amountIn: 76382000000000000000000n,
        assetOut: '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
        amountOut: 29934139188201577438792n,
        block: {
          hash: '0xed0883b6e3f80ff2f8263bbeb17717805ae54297dabc998da8384384f9f29fc5',
          number: 14698911,
        },
        transaction: {
          hash: '0xad39a3e5109e2c146f85f5db53a72da9af886b861d4965aacafdb165c1aec35e',
          index: 9,
          gasUsed: 106802,
        },
        event: {
          address: '0x9928e4046d7c6513326ccea028cd3e7a91c7590a',
          logIndex: 15,
        },
        metadata: {},
      },
    ];

    const sandwiches: Sandwich[] = getSandwiches(ETHEREUM, swaps, [], []);

    expect(sandwiches).toEqual([]);
  });

  test('multipath swap', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0x11111112542d85b3ef69ae05771c2dccff4faa26',
        to: '0xce84867c3c02b05dc570d0135103d3fb9cc19433',
        assetIn: '0x514910771af9ca656af840dff83e8264ecf986ca',
        amountIn: 2918704295536500000n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 11499148166696888n,
        block: {
          hash: '0x693c6ec11898b2b82cd1c964e7dced504447b0e82da2e76ce4b3d29de6f655fe',
          number: 14699184,
        },
        transaction: {
          hash: '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
          index: 241,
          gasUsed: 159041,
        },
        event: {
          address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
          logIndex: 448,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0xce84867c3c02b05dc570d0135103d3fb9cc19433',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0x11111112542d85b3ef69ae05771c2dccff4faa26',
        to: '0x416d1a4f718a8c3dda7fc3645435580e743d9249',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 11499148166696888n,
        assetOut: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
        amountOut: 13787057162799104322n,
        block: {
          hash: '0x693c6ec11898b2b82cd1c964e7dced504447b0e82da2e76ce4b3d29de6f655fe',
          number: 14699184,
        },
        transaction: {
          hash: '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
          index: 241,
          gasUsed: 159041,
        },
        event: {
          address: '0xce84867c3c02b05dc570d0135103d3fb9cc19433',
          logIndex: 451,
        },
        metadata: {},
      },
    ];

    const sandwiches: Sandwich[] = getSandwiches(ETHEREUM, swaps, [], []);

    expect(sandwiches).toEqual([]);
  });

  test('cross-protocol split swap', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0x220bda5c8994804ac96ebe4df184d25e5c2196d4',
        to: '0x220bda5c8994804ac96ebe4df184d25e5c2196d4',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 1200000000000000000n,
        assetOut: '0x408e41876cccdc0f92210600ef50372656052a38',
        amountOut: 12343477954337594771362n,
        block: {
          hash: '0xce0bb790b8b7ff2c72039aab32867442b94e3f3a167a22be31825675e6c2960c',
          number: 14698978,
        },
        transaction: {
          hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
          index: 83,
          gasUsed: 421973,
        },
        event: {
          address: '0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c',
          logIndex: 74,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x49ff149d649769033d43783e7456f626862cd160',
          protocol: {
            abi: 'BalancerV1',
            factory: {
              address: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
              label: 'Balancer V1',
            },
          },
        },
        from: '0x220bda5c8994804ac96ebe4df184d25e5c2196d4',
        to: '0x220bda5c8994804ac96ebe4df184d25e5c2196d4',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 2200000000000000000n,
        assetOut: '0x408e41876cccdc0f92210600ef50372656052a38',
        amountOut: 22594064483837836468324n,
        block: {
          hash: '0xce0bb790b8b7ff2c72039aab32867442b94e3f3a167a22be31825675e6c2960c',
          number: 14698978,
        },
        transaction: {
          hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
          index: 83,
          gasUsed: 421973,
        },
        event: {
          logIndex: 77,
          address: '0x49ff149d649769033d43783e7456f626862cd160',
        },
        metadata: {},
      },
      {
        contract: {
          address: '0xec60a5fef79a92c741cb74fdd6bfc340c0279b01',
          protocol: {
            abi: 'BalancerV2',
            factory: {
              address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
              label: 'Balancer V2',
            },
          },
        },
        from: '0x220bda5c8994804ac96ebe4df184d25e5c2196d4',
        to: '0x220bda5c8994804ac96ebe4df184d25e5c2196d4',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 2400000000000000000n,
        assetOut: '0x408e41876cccdc0f92210600ef50372656052a38',
        amountOut: 24663570517081979225739n,
        block: {
          hash: '0xce0bb790b8b7ff2c72039aab32867442b94e3f3a167a22be31825675e6c2960c',
          number: 14698978,
        },
        transaction: {
          hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
          index: 83,
          gasUsed: 421973,
        },
        event: {
          logIndex: 81,
          address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x611cde65dea90918c0078ac0400a72b0d25b9bb1',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0x220bda5c8994804ac96ebe4df184d25e5c2196d4',
        to: '0x220bda5c8994804ac96ebe4df184d25e5c2196d4',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 4200000000000000000n,
        assetOut: '0x408e41876cccdc0f92210600ef50372656052a38',
        amountOut: 43098743320715046083583n,
        block: {
          hash: '0xce0bb790b8b7ff2c72039aab32867442b94e3f3a167a22be31825675e6c2960c',
          number: 14698978,
        },
        transaction: {
          hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
          index: 83,
          gasUsed: 421973,
        },
        event: {
          address: '0x611cde65dea90918c0078ac0400a72b0d25b9bb1',
          logIndex: 87,
        },
        metadata: {},
      },
    ];

    const sandwiches: Sandwich[] = getSandwiches(ETHEREUM, swaps, [], []);

    expect(sandwiches).toEqual([]);
  });

  test('skip sandwich inside a single transaction', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x26d3df804173e776bdbfa862d2ecf899696c20b02621f4148e1359bf81d6a8b0',
          number: 14899935,
        },
        transaction: {
          hash: '0xcd3e3f5db2c39d40dda5ee378fa53c9c6330ea7ee5bdd7ff29b410cf15a2cefa',
          index: 4,
          gasUsed: 85892,
        },
        event: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          logIndex: 35,
        },
        from: '0x01ff6318440f7d5553a82294d78262d5f5084eff',
        to: '0x01ff6318440f7d5553a82294d78262d5f5084eff',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 100390000000000000n,
        assetOut: '0xb2089a7069861c8d90c8da3aacab8e9188c0c531',
        amountOut: 2175552445891n,
        metadata: {},
      },
      {
        contract: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x26d3df804173e776bdbfa862d2ecf899696c20b02621f4148e1359bf81d6a8b0',
          number: 14899935,
        },
        transaction: {
          hash: '0xcd3e3f5db2c39d40dda5ee378fa53c9c6330ea7ee5bdd7ff29b410cf15a2cefa',
          index: 4,
          gasUsed: 85892,
        },
        event: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          logIndex: 40,
        },
        from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 79500000000000000n,
        assetOut: '0xb2089a7069861c8d90c8da3aacab8e9188c0c531',
        amountOut: 1461079497665n,
        metadata: {},
      },
      {
        contract: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x26d3df804173e776bdbfa862d2ecf899696c20b02621f4148e1359bf81d6a8b0',
          number: 14899935,
        },
        transaction: {
          hash: '0xcd3e3f5db2c39d40dda5ee378fa53c9c6330ea7ee5bdd7ff29b410cf15a2cefa',
          index: 4,
          gasUsed: 85892,
        },
        event: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          logIndex: 53,
        },
        from: '0x01ff6318440f7d5553a82294d78262d5f5084eff',
        to: '0x01ff6318440f7d5553a82294d78262d5f5084eff',
        assetIn: '0xb2089a7069861c8d90c8da3aacab8e9188c0c531',
        amountIn: 2175552445891n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 113987923265421470n,
        metadata: {},
      },
    ];

    const sandwiches: Sandwich[] = getSandwiches(ETHEREUM, swaps, [], []);

    expect(sandwiches).toEqual([]);
  });

  test('skip irrelevant swaps detecting a sandwich', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x26d3df804173e776bdbfa862d2ecf899696c20b02621f4148e1359bf81d6a8b0',
          number: 14899935,
        },
        transaction: {
          hash: '0xcd3e3f5db2c39d40dda5ee378fa53c9c6330ea7ee5bdd7ff29b410cf15a2cefa',
          index: 4,
          gasUsed: 85892,
        },
        event: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          logIndex: 35,
        },
        from: '0x01ff6318440f7d5553a82294d78262d5f5084eff',
        to: '0x01ff6318440f7d5553a82294d78262d5f5084eff',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 100390000000000000n,
        assetOut: '0xb2089a7069861c8d90c8da3aacab8e9188c0c531',
        amountOut: 2175552445891n,
        metadata: {},
      },
      {
        contract: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x26d3df804173e776bdbfa862d2ecf899696c20b02621f4148e1359bf81d6a8b0',
          number: 14899935,
        },
        transaction: {
          hash: '0x10a5aa7d57954532b6a0fd871bbb430527532845ed115ca8eaeabe4b7e87931a',
          index: 5,
          gasUsed: 305443,
        },
        event: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          logIndex: 40,
        },
        from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 79500000000000000n,
        assetOut: '0xb2089a7069861c8d90c8da3aacab8e9188c0c531',
        amountOut: 1461079497665n,
        metadata: {},
      },
      {
        contract: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x26d3df804173e776bdbfa862d2ecf899696c20b02621f4148e1359bf81d6a8b0',
          number: 14899935,
        },
        transaction: {
          hash: '0xfa079727c03a36a2f59dba1428d551825bff066a6ebc73717d330888b21272bf',
          index: 6,
          gasUsed: 77304,
        },
        event: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          logIndex: 53,
        },
        from: '0x01ff6318440f7d5553a82294d78262d5f5084eff',
        to: '0x01ff6318440f7d5553a82294d78262d5f5084eff',
        assetIn: '0xb2089a7069861c8d90c8da3aacab8e9188c0c531',
        amountIn: 2175552445891n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 113987923265421470n,
        metadata: {},
      },
      {
        contract: {
          address: '0x3328ca5b535d537f88715b305375c591cf52d541',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xa150533bca92dae166304b4364c465667340f20640b96efa3f2a0ffecb530f73',
          number: 14899113,
        },
        transaction: {
          hash: '0x3650e96b7ff8821a5c72dfdada4812d1ec8bc0b28613402b0b2559189e69d5e7',
          index: 4,
          gasUsed: 212970,
        },
        event: {
          address: '0x3328ca5b535d537f88715b305375c591cf52d541',
          logIndex: 33,
        },
        from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        to: '0x6aa22a902ebad03cef40454f4afd2423270c11a9',
        assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amountIn: 3944016072n,
        assetOut: '0x34f0915a5f15a66eba86f6a58be1a471fb7836a7',
        amountOut: 890898789379244n,
        metadata: {},
      },
      {
        contract: {
          address: '0xd6c783b257e662ca949b441a4fcb08a53fc49914',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xa150533bca92dae166304b4364c465667340f20640b96efa3f2a0ffecb530f73',
          number: 14899113,
        },
        transaction: {
          hash: '0x269bfab026bfd08441d02d6396b2c5bb78efd428ff7e89c4e81029213696e1d1',
          index: 9,
          gasUsed: 87259,
        },
        event: {
          address: '0xd6c783b257e662ca949b441a4fcb08a53fc49914',
          logIndex: 90,
        },
        from: '0x3c28c42b24b7909c8292920929f083f60c4997a6',
        to: '0x3c28c42b24b7909c8292920929f083f60c4997a6',
        assetIn: '0x579cea1889991f68acc35ff5c3dd0621ff29b0c9',
        amountIn: 1000000000000000000000000n,
        assetOut: '0x853d955acef822db058eb8505911ed77f175b99e',
        amountOut: 5916990875407944698111n,
        metadata: {},
      },
    ];

    const sandwiches: Sandwich[] = getSandwiches(ETHEREUM, swaps, [], []);

    expect(sandwiches[0].sandwiched.length).toEqual(1);
  });

  test('sandwich', () => {
    const swapsA: Swap[] = [
      {
        contract: {
          address: '0x7ba9b94127d434182287de708643932ec036d365',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xaeaf5fa2e255e28f504d6d1c9277eaac9e644d73ee0e272c9ffc864f1cace65a',
          number: 14898920,
        },
        transaction: {
          hash: '0x91f7b9e4502210a8309be3ed2a3bcd4cf6bc1dfd46eac5730604cb4dd6a0fae9',
          index: 27,
          gasUsed: 104945,
        },
        event: {
          address: '0x7ba9b94127d434182287de708643932ec036d365',
          logIndex: 3,
        },
        from: '0x0000000000d9455cc7eb92d06e00582a982f68fe',
        to: '0x0000000000d9455cc7eb92d06e00582a982f68fe',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 5031464130389737472n,
        assetOut: '0x5218e472cfcfe0b64a064f055b43b4cdc9efd3a6',
        amountOut: 902667126245596674849461n,
        metadata: {},
      },
      {
        contract: {
          address: '0x7ba9b94127d434182287de708643932ec036d365',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xaeaf5fa2e255e28f504d6d1c9277eaac9e644d73ee0e272c9ffc864f1cace65a',
          number: 14898920,
        },
        transaction: {
          hash: '0xdf4764ee8cfe94ddc8e14f864d2da77a76c7d1323ae62750d13fe2842b8d0014',
          index: 29,
          gasUsed: 94852,
        },
        event: {
          address: '0x7ba9b94127d434182287de708643932ec036d365',
          logIndex: 20,
        },
        from: '0x0000000000d9455cc7eb92d06e00582a982f68fe',
        to: '0x0000000000d9455cc7eb92d06e00582a982f68fe',
        assetIn: '0x5218e472cfcfe0b64a064f055b43b4cdc9efd3a6',
        amountIn: 902667126245596674849461n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 5493739023895625728n,
        metadata: {},
      },
      {
        contract: {
          address: '0x7ba9b94127d434182287de708643932ec036d365',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xaeaf5fa2e255e28f504d6d1c9277eaac9e644d73ee0e272c9ffc864f1cace65a',
          number: 14898920,
        },
        transaction: {
          hash: '0xd79a73e06f04d5f5af5a4c4609c7644b5f7e695db0f69242fabd4825d7e1e66a',
          index: 28,
          gasUsed: 295151,
        },
        event: {
          address: '0x7ba9b94127d434182287de708643932ec036d365',
          logIndex: 12,
        },
        from: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
        to: '0x9306649f8c797d9dd9cb0c4e7d07a81e91cf1e92',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 4404454063785307031n,
        assetOut: '0x5218e472cfcfe0b64a064f055b43b4cdc9efd3a6',
        amountOut: 710561079139015205500459n,
        metadata: {},
      },
    ];
    const swapsB: Swap[] = [
      {
        contract: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x860cc34934acc667ff2973bb9468892a086d4dfcb700952637283b412e691bde',
          number: 14896835,
        },
        transaction: {
          hash: '0xb25e12df177b1d9f02a31ba79e9a7cb00df21b17632876cc87363a7d17c44d14',
          index: 0,
          gasUsed: 212183,
        },
        event: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          logIndex: 2,
        },
        from: '0x000000000035b5e5ad9019092c665357240f594e',
        to: '0x000000000035b5e5ad9019092c665357240f594e',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 872930824134687059036n,
        assetOut: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amountOut: 1531020331978n,
        metadata: {},
      },
      {
        contract: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x860cc34934acc667ff2973bb9468892a086d4dfcb700952637283b412e691bde',
          number: 14896835,
        },
        transaction: {
          hash: '0x347c7cda6fa444959696dfac1afe1f3ebd1d7101b0859d0cc4638299587d0c51',
          index: 1,
          gasUsed: 1020947,
        },
        event: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          logIndex: 11,
        },
        from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 1267500000000000000000n,
        assetOut: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amountOut: 2205742148531n,
        metadata: {},
      },
      {
        contract: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x860cc34934acc667ff2973bb9468892a086d4dfcb700952637283b412e691bde',
          number: 14896835,
        },
        transaction: {
          hash: '0x1bdff71a08a003bdb01a2b82327da325de71a71518094d948419a177a0e86fa6',
          index: 2,
          gasUsed: 292354,
        },
        event: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          logIndex: 33,
        },
        from: '0x000000000035b5e5ad9019092c665357240f594e',
        to: '0x000000000035b5e5ad9019092c665357240f594e',
        assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amountIn: 1531020331977n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 880205545822407982645n,
        metadata: {},
      },
    ];

    const sandwichesA: Sandwich[] = getSandwiches(ETHEREUM, swapsA, [], []);
    const sandwichesB: Sandwich[] = getSandwiches(ETHEREUM, swapsB, [], []);

    expect(sandwichesA).toEqual<Sandwich[]>([
      {
        sandwicher: '0x0000000000d9455cc7eb92d06e00582a982f68fe',
        frontSwap: swapsA[0],
        backSwap: swapsA[1],
        sandwiched: [swapsA[2]],
        profit: {
          asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          amount: 462274893505888255n,
        },
      },
    ]);
    expect(sandwichesB).toEqual<Sandwich[]>([
      {
        sandwicher: '0x000000000035b5e5ad9019092c665357240f594e',
        frontSwap: swapsB[0],
        backSwap: swapsB[2],
        sandwiched: [swapsB[1]],
        profit: {
          asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          amount: 7274721688291086400n,
        },
      },
    ]);
  });

  test('sandwich with non-ether profit asset', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x92cc4300b9fd36242900bca782b2e9e000bd5099',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xb7905bbe98890e1afea3acc3c1fd09d439e3db4c16f2f63de3c175922cbfdf97',
          number: 14899831,
        },
        transaction: {
          hash: '0xcbd3612d384509dfcc9a86d68088299133cfe42232f44e9efe01bf8de924b6c2',
          index: 0,
          gasUsed: 157847,
        },
        event: {
          address: '0x92cc4300b9fd36242900bca782b2e9e000bd5099',
          logIndex: 6,
        },
        from: '0x819de42d3ab832eaf7111a222a8a5a7419f13b48',
        to: '0x00000000008c4fb1c916e0c88fd4cc402d935e7d',
        assetIn: '0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4',
        amountIn: 754870400637081426352n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 888975983124675556n,
        metadata: {},
      },
      {
        contract: {
          address: '0x92cc4300b9fd36242900bca782b2e9e000bd5099',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xb7905bbe98890e1afea3acc3c1fd09d439e3db4c16f2f63de3c175922cbfdf97',
          number: 14899831,
        },
        transaction: {
          hash: '0x9db5f6ebcfbabf07f894fb2b027f48d8a1fbc3cd8822ef77a2b5f1e36a0aa3c0',
          index: 1,
          gasUsed: 231597,
        },
        event: {
          address: '0x92cc4300b9fd36242900bca782b2e9e000bd5099',
          logIndex: 14,
        },
        from: '0xe66b31678d6c16e9ebf358268a790b763c133750',
        to: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
        assetIn: '0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4',
        amountIn: 1156542056074766355140n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 1310637046268747172n,
        metadata: {},
      },
      {
        contract: {
          address: '0x92cc4300b9fd36242900bca782b2e9e000bd5099',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xb7905bbe98890e1afea3acc3c1fd09d439e3db4c16f2f63de3c175922cbfdf97',
          number: 14899831,
        },
        transaction: {
          hash: '0xa72e8b6e0bc5cd637dabf895fd5d5872db2346fbb6460b18e3084f8f679fde95',
          index: 2,
          gasUsed: 140483,
        },
        event: {
          address: '0x92cc4300b9fd36242900bca782b2e9e000bd5099',
          logIndex: 22,
        },
        from: '0x00000000008c4fb1c916e0c88fd4cc402d935e7d',
        to: '0x819de42d3ab832eaf7111a222a8a5a7419f13b48',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 888975983124675556n,
        assetOut: '0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4',
        amountOut: 785608054456497020853n,
        metadata: {},
      },
    ];

    const sandwiches: Sandwich[] = getSandwiches(ETHEREUM, swaps, [], []);

    expect(sandwiches).toEqual<Sandwich[]>([
      {
        sandwicher: '0x00000000008c4fb1c916e0c88fd4cc402d935e7d',
        frontSwap: swaps[0],
        backSwap: swaps[2],
        sandwiched: [swaps[1]],
        profit: {
          asset: '0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4',
          amount: 30737653819415594500n,
        },
      },
    ]);
  });

  test('multiple sandwiches in a single block', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x11b815efb8f581194ae79006d24e0d814b7697f6',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xa150533bca92dae166304b4364c465667340f20640b96efa3f2a0ffecb530f73',
          number: 14899113,
        },
        transaction: {
          hash: '0x45a00f29144e088b9fd8f617665e183234ddbd6f969bfe623ebfa84b042666b8',
          index: 2,
          gasUsed: 183728,
        },
        event: {
          address: '0x11b815efb8f581194ae79006d24e0d814b7697f6',
          logIndex: 23,
        },
        from: '0x00000000008c4fb1c916e0c88fd4cc402d935e7d',
        to: '0x00000000008c4fb1c916e0c88fd4cc402d935e7d',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 371799344156197203112n,
        assetOut: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        amountOut: 665443087704n,
        metadata: {},
      },
      {
        contract: {
          address: '0xd6c783b257e662ca949b441a4fcb08a53fc49914',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xa150533bca92dae166304b4364c465667340f20640b96efa3f2a0ffecb530f73',
          number: 14899113,
        },
        transaction: {
          hash: '0xca9a36487222c905052a96c18fec93ecf771d9e9ebb8d66920b8366282bf8ace',
          index: 10,
          gasUsed: 117924,
        },
        event: {
          address: '0xd6c783b257e662ca949b441a4fcb08a53fc49914',
          logIndex: 94,
        },
        from: '0x000000000035b5e5ad9019092c665357240f594e',
        to: '0x9d45081706102e7aaddd0973268457527722e274',
        assetIn: '0x853d955acef822db058eb8505911ed77f175b99e',
        amountIn: 1348393399625477503394n,
        assetOut: '0x579cea1889991f68acc35ff5c3dd0621ff29b0c9',
        amountOut: 230453025469403490313684n,
        metadata: {},
      },
      {
        contract: {
          address: '0xd6c783b257e662ca949b441a4fcb08a53fc49914',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xa150533bca92dae166304b4364c465667340f20640b96efa3f2a0ffecb530f73',
          number: 14899113,
        },
        transaction: {
          hash: '0x269bfab026bfd08441d02d6396b2c5bb78efd428ff7e89c4e81029213696e1d1',
          index: 9,
          gasUsed: 87259,
        },
        event: {
          address: '0xd6c783b257e662ca949b441a4fcb08a53fc49914',
          logIndex: 90,
        },
        from: '0x3c28c42b24b7909c8292920929f083f60c4997a6',
        to: '0x3c28c42b24b7909c8292920929f083f60c4997a6',
        assetIn: '0x579cea1889991f68acc35ff5c3dd0621ff29b0c9',
        amountIn: 1000000000000000000000000n,
        assetOut: '0x853d955acef822db058eb8505911ed77f175b99e',
        amountOut: 5916990875407944698111n,
        metadata: {},
      },
      {
        contract: {
          address: '0x3328ca5b535d537f88715b305375c591cf52d541',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xa150533bca92dae166304b4364c465667340f20640b96efa3f2a0ffecb530f73',
          number: 14899113,
        },
        transaction: {
          hash: '0x9a27b384c6ba32cbecfd37d558f8f723cba3575fb0ce050a083f415c222a2005',
          index: 3,
          gasUsed: 113243,
        },
        event: {
          address: '0x3328ca5b535d537f88715b305375c591cf52d541',
          logIndex: 26,
        },
        from: '0x46c4128981525aa446e02ffb2ff762f1d6a49170',
        to: '0x46c4128981525aa446e02ffb2ff762f1d6a49170',
        assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amountIn: 6162525112n,
        assetOut: '0x34f0915a5f15a66eba86f6a58be1a471fb7836a7',
        amountOut: 1424388937876910n,
        metadata: {},
      },
      {
        contract: {
          address: '0x11b815efb8f581194ae79006d24e0d814b7697f6',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xa150533bca92dae166304b4364c465667340f20640b96efa3f2a0ffecb530f73',
          number: 14899113,
        },
        transaction: {
          hash: '0xf2ca28c11be0644e75dac5bd8274bfa35aab1861bdd5c9f01377debf1fdb318c',
          index: 1,
          gasUsed: 494111,
        },
        event: {
          address: '0x11b815efb8f581194ae79006d24e0d814b7697f6',
          logIndex: 19,
        },
        from: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
        to: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
        assetIn: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        amountIn: 38494283323n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 21212822316154327650n,
        metadata: {},
      },
      {
        contract: {
          address: '0x11b815efb8f581194ae79006d24e0d814b7697f6',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xa150533bca92dae166304b4364c465667340f20640b96efa3f2a0ffecb530f73',
          number: 14899113,
        },
        transaction: {
          hash: '0xb060d2790cd8e9f08e6dd058ec0d084f0f06d3c8abfed9396686c4315962fb05',
          index: 0,
          gasUsed: 187077,
        },
        event: {
          address: '0x11b815efb8f581194ae79006d24e0d814b7697f6',
          logIndex: 2,
        },
        from: '0x00000000008c4fb1c916e0c88fd4cc402d935e7d',
        to: '0x00000000008c4fb1c916e0c88fd4cc402d935e7d',
        assetIn: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        amountIn: 665071849728n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 371799344156197203112n,
        metadata: {},
      },
      {
        contract: {
          address: '0x3328ca5b535d537f88715b305375c591cf52d541',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xa150533bca92dae166304b4364c465667340f20640b96efa3f2a0ffecb530f73',
          number: 14899113,
        },
        transaction: {
          hash: '0x0b14d5b512d8ab905757aee56373abc72ea5df266334e2d444807df1afe017a7',
          index: 5,
          gasUsed: 108943,
        },
        event: {
          address: '0x3328ca5b535d537f88715b305375c591cf52d541',
          logIndex: 36,
        },
        from: '0x46c4128981525aa446e02ffb2ff762f1d6a49170',
        to: '0x46c4128981525aa446e02ffb2ff762f1d6a49170',
        assetIn: '0x34f0915a5f15a66eba86f6a58be1a471fb7836a7',
        amountIn: 1424388937876909n,
        assetOut: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amountOut: 6235166265n,
        metadata: {},
      },
      {
        contract: {
          address: '0x3328ca5b535d537f88715b305375c591cf52d541',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xa150533bca92dae166304b4364c465667340f20640b96efa3f2a0ffecb530f73',
          number: 14899113,
        },
        transaction: {
          hash: '0x3650e96b7ff8821a5c72dfdada4812d1ec8bc0b28613402b0b2559189e69d5e7',
          index: 4,
          gasUsed: 212970,
        },
        event: {
          address: '0x3328ca5b535d537f88715b305375c591cf52d541',
          logIndex: 33,
        },
        from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        to: '0x6aa22a902ebad03cef40454f4afd2423270c11a9',
        assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amountIn: 3944016072n,
        assetOut: '0x34f0915a5f15a66eba86f6a58be1a471fb7836a7',
        amountOut: 890898789379244n,
        metadata: {},
      },
      {
        contract: {
          address: '0xd6c783b257e662ca949b441a4fcb08a53fc49914',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xa150533bca92dae166304b4364c465667340f20640b96efa3f2a0ffecb530f73',
          number: 14899113,
        },
        transaction: {
          hash: '0x5b1d1fce971a42e715cc63bf8b34f2e8036f1feb80fd741595fb3a81a34edf8a',
          index: 8,
          gasUsed: 136600,
        },
        event: {
          address: '0xd6c783b257e662ca949b441a4fcb08a53fc49914',
          logIndex: 85,
        },
        from: '0x9d45081706102e7aaddd0973268457527722e274',
        to: '0x000000000035b5e5ad9019092c665357240f594e',
        assetIn: '0x579cea1889991f68acc35ff5c3dd0621ff29b0c9',
        amountIn: 221756037403248456355362n,
        assetOut: '0x853d955acef822db058eb8505911ed77f175b99e',
        amountOut: 1348393399625477503394n,
        metadata: {},
      },
    ];

    const sandwiches: Sandwich[] = getSandwiches(ETHEREUM, swaps, [], []);

    expect(sandwiches.length).toEqual(3);
  });

  test('sandwiches with multiple sandwiched swaps', () => {
    // TODO
  });

  test('Balancer V2 sandwich', () => {
    // TODO
  });

  test('correct profit calculation for imbalanced sandwiches', () => {
    const swapsA: Swap[] = [
      {
        contract: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x3a7a1c40d0441c4271a810fcd8a5b794b8a6277461a4ad08bd08c19f5818f08c',
          number: 13699765,
        },
        transaction: {
          hash: '0x59211262bbc5b8260d4d7ea6311ac81d358a09a99a7422f9a27e3b3fbe92b549',
          index: 0,
          gasUsed: 164752,
        },
        event: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          logIndex: 2,
        },
        from: '0x51399b32cd0186bb32230e24167489f3b2f47870',
        to: '0x51399b32cd0186bb32230e24167489f3b2f47870',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 188147969924812013568n,
        assetOut: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amountOut: 751864283801n,
        metadata: {},
      },
      {
        contract: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x3a7a1c40d0441c4271a810fcd8a5b794b8a6277461a4ad08bd08c19f5818f08c',
          number: 13699765,
        },
        transaction: {
          hash: '0x72ba7c267abeea2eb5a5e888feab3d523e0beb8c721be48b096df3d1d6c62b95',
          index: 11,
          gasUsed: 178674,
        },
        event: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          logIndex: 53,
        },
        from: '0xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf',
        to: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 149756129874032907361n,
        assetOut: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amountOut: 598633542409n,
        metadata: {},
      },
      {
        contract: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x3a7a1c40d0441c4271a810fcd8a5b794b8a6277461a4ad08bd08c19f5818f08c',
          number: 13699765,
        },
        transaction: {
          hash: '0x87fda6ee1f2c74e106aab959beca197a8749f988c692aedf10c8499ad5805a81',
          index: 12,
          gasUsed: 176497,
        },
        event: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          logIndex: 56,
        },
        from: '0x51399b32cd0186bb32230e24167489f3b2f47870',
        to: '0x51399b32cd0186bb32230e24167489f3b2f47870',
        assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amountIn: 1957841600000n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 488799232410434891247n,
        metadata: {},
      },
    ];
    const swapsB: Swap[] = [
      {
        contract: {
          address: '0x01ed9cf4290646b0b62795f48fa99de2b514bf60',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x8bdd592c8a06a9cedf2dc9d26daba4e81118dcbc0f74e35c9e3fc7cbfe16095f',
          number: 14899088,
        },
        transaction: {
          hash: '0xba48efd95fc97d37e12b2c00454fafa8cfe90680b8a8d1b4725674fbd3236bec',
          index: 13,
          gasUsed: 96098,
        },
        event: {
          address: '0x01ed9cf4290646b0b62795f48fa99de2b514bf60',
          logIndex: 19,
        },
        from: '0xdeadad06b9cfcce57d0e9118d7e2cfda52ccdead',
        to: '0xdeadad06b9cfcce57d0e9118d7e2cfda52ccdead',
        assetIn: '0x679a0b65a14b06b44a0cc879d92b8bb46a818633',
        amountIn: 154432147817494n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 868168255688738693n,
        metadata: {},
      },
      {
        contract: {
          address: '0x01ed9cf4290646b0b62795f48fa99de2b514bf60',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x8bdd592c8a06a9cedf2dc9d26daba4e81118dcbc0f74e35c9e3fc7cbfe16095f',
          number: 14899088,
        },
        transaction: {
          hash: '0x67bb6aa570c63bafbaadc6f62cba5d64b55e6ad4fffd37f3a8d5f84a61abc942',
          index: 24,
          gasUsed: 115684,
        },
        event: {
          address: '0x01ed9cf4290646b0b62795f48fa99de2b514bf60',
          logIndex: 30,
        },
        from: '0xc5122413ec51eb4c110b88197e50c89487d5d3d4',
        to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        assetIn: '0x679a0b65a14b06b44a0cc879d92b8bb46a818633',
        amountIn: 1050947713761736n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 5470495451854143593n,
        metadata: {},
      },
      {
        contract: {
          address: '0x01ed9cf4290646b0b62795f48fa99de2b514bf60',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0x8bdd592c8a06a9cedf2dc9d26daba4e81118dcbc0f74e35c9e3fc7cbfe16095f',
          number: 14899088,
        },
        transaction: {
          hash: '0xa4921f9a4cbaea4322304eff83bfa9d8f68a8576ae0f8ec08a2c72cfd17878b6',
          index: 25,
          gasUsed: 87885,
        },
        event: {
          address: '0x01ed9cf4290646b0b62795f48fa99de2b514bf60',
          logIndex: 35,
        },
        from: '0xdeadad06b9cfcce57d0e9118d7e2cfda52ccdead',
        to: '0xdeadad06b9cfcce57d0e9118d7e2cfda52ccdead',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 763622534185514711n,
        assetOut: '0x679a0b65a14b06b44a0cc879d92b8bb46a818633',
        amountOut: 154432147817494n,
        metadata: {},
      },
    ];
    const swapsC: Swap[] = [
      {
        contract: {
          address: '0x7ac8bf416827baff959d788cb408bc1566d5914e',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xe912c8ed957ec5c4630a09ab6f0c18beceb05441d51ac04cf8b83088b18859ce',
          number: 14899837,
        },
        transaction: {
          hash: '0xb145267690fd8d87f1d218314b27af21bd88d2172edfcf3add108dc52cb26fc0',
          index: 4,
          gasUsed: 226772,
        },
        event: {
          address: '0x7ac8bf416827baff959d788cb408bc1566d5914e',
          logIndex: 20,
        },
        from: '0x000000000000084e91743124a982076c59f10084',
        to: '0x000000000000084e91743124a982076c59f10084',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 7500000000000000000n,
        assetOut: '0x6755f01e2a13962ee79e17d6f36cf6a2153f3aae',
        amountOut: 858778153585277734039328n,
        metadata: {},
      },
      {
        contract: {
          address: '0x7ac8bf416827baff959d788cb408bc1566d5914e',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xe912c8ed957ec5c4630a09ab6f0c18beceb05441d51ac04cf8b83088b18859ce',
          number: 14899837,
        },
        transaction: {
          hash: '0xc0c53a725e9e4d9277612fa732ca40af5ca8b75682a5d9f070e97540c0b964fa',
          index: 5,
          gasUsed: 221515,
        },
        event: {
          address: '0x7ac8bf416827baff959d788cb408bc1566d5914e',
          logIndex: 28,
        },
        from: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        to: '0xa43c750d5de3bd88ee4f35def72cf76afebec274',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 5000000000000000000n,
        assetOut: '0x6755f01e2a13962ee79e17d6f36cf6a2153f3aae',
        amountOut: 479388447128725732767064n,
        metadata: {},
      },
      {
        contract: {
          address: '0x7ac8bf416827baff959d788cb408bc1566d5914e',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        block: {
          hash: '0xe912c8ed957ec5c4630a09ab6f0c18beceb05441d51ac04cf8b83088b18859ce',
          number: 14899837,
        },
        transaction: {
          hash: '0x1c16ee272fd48520efdc4b9c703ecbdf8d46af790aa063791a90a8957bb7a875',
          index: 6,
          gasUsed: 297103,
        },
        event: {
          address: '0x7ac8bf416827baff959d788cb408bc1566d5914e',
          logIndex: 43,
        },
        from: '0x000000000000084e91743124a982076c59f10084',
        to: '0x000000000000084e91743124a982076c59f10084',
        assetIn: '0x6755f01e2a13962ee79e17d6f36cf6a2153f3aae',
        amountIn: 775159068789820746529043n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 7696110602669783813n,
        metadata: {},
      },
    ];

    const sandwichesA: Sandwich[] = getSandwiches(ETHEREUM, swapsA, [], []);
    const sandwichesB: Sandwich[] = getSandwiches(ETHEREUM, swapsB, [], []);
    const sandwichesC: Sandwich[] = getSandwiches(ETHEREUM, swapsC, [], []);

    expect(sandwichesA).toEqual<Sandwich[]>([
      {
        sandwicher: '0x51399b32cd0186bb32230e24167489f3b2f47870',
        frontSwap: swapsA[0],
        backSwap: swapsA[2],
        sandwiched: [swapsA[1]],
        profit: {
          asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          amount: -435805264121293550n,
        },
      },
    ]);
    expect(sandwichesB).toEqual<Sandwich[]>([
      {
        sandwicher: '0xdeadad06b9cfcce57d0e9118d7e2cfda52ccdead',
        frontSwap: swapsB[0],
        backSwap: swapsB[2],
        sandwiched: [swapsB[1]],
        profit: {
          asset: '0x679a0b65a14b06b44a0cc879d92b8bb46a818633',
          amount: 18596879361898n,
        },
      },
    ]);
    expect(sandwichesC).toEqual<Sandwich[]>([
      {
        sandwicher: '0x000000000000084e91743124a982076c59f10084',
        frontSwap: swapsC[0],
        backSwap: swapsC[2],
        sandwiched: [swapsC[1]],
        profit: {
          asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          amount: 926384344901922834n,
        },
      },
    ]);
  });

  test('imbalanced liquidity sandwich', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
          protocol: {
            abi: 'CurveV2',
            factory: {
              label: 'Curve V2',
              address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
            },
          },
        },
        block: {
          hash: '0x34057bae81d5322ee709fd8e4390603e9c4e0df14efd39521038d5ec7e9e3817',
          number: 15175481,
        },
        transaction: {
          hash: '0x494ff5ab76e94d6b8e2610af1c7c50aea8dcafcb344236a430d0fa764db6d12b',
          index: 0,
          gasUsed: 348339,
        },
        event: {
          address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
          logIndex: 7,
        },
        from: '0xe8c060f8052e07423f71d445277c61ac5138a2e5',
        to: '0xe8c060f8052e07423f71d445277c61ac5138a2e5',
        assetIn: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        amountIn: 853117383751n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 536882756779800724303n,
        metadata: {},
      },
      {
        contract: {
          address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
          protocol: {
            abi: 'CurveV2',
            factory: {
              label: 'Curve V2',
              address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
            },
          },
        },
        block: {
          hash: '0x34057bae81d5322ee709fd8e4390603e9c4e0df14efd39521038d5ec7e9e3817',
          number: 15175481,
        },
        transaction: {
          hash: '0xdf2aff5d20b9bffb9ec507da4af66cfb6f437ec1c0d8da3a7c62a126a598187d',
          index: 2,
          gasUsed: 336993,
        },
        event: {
          address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
          logIndex: 17,
        },
        from: '0xe8c060f8052e07423f71d445277c61ac5138a2e5',
        to: '0xe8c060f8052e07423f71d445277c61ac5138a2e5',
        assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountIn: 624380905015738368000n,
        assetOut: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        amountOut: 1011416590749n,
        metadata: {},
      },
    ];

    const deposits: LiquidityDeposit[] = [
      {
        contract: {
          address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
          protocol: {
            abi: 'CurveV2',
            factory: {
              label: 'Curve V2',
              address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
            },
          },
        },
        block: {
          hash: '0x34057bae81d5322ee709fd8e4390603e9c4e0df14efd39521038d5ec7e9e3817',
          number: 15175481,
        },
        transaction: {
          hash: '0xb170187a424eced74476156e7113bdd90978bd5c053e5520068e921cfc447c0a',
          index: 1,
          gasUsed: 273304,
        },
        event: {
          address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
          logIndex: 12,
        },
        depositor: '0x3993d34e7e99abf6b6f367309975d1360222d446',
        assets: [
          '0xdac17f958d2ee523a2206206994597c13d831ec7',
          '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        ],
        amounts: [2023937497942n, 0n, 0n],
        metadata: {},
      },
    ];

    const sandwiches: Sandwich[] = getSandwiches(ETHEREUM, swaps, deposits, []);

    expect(sandwiches).toEqual<Sandwich[]>([
      {
        sandwicher: '0xe8c060f8052e07423f71d445277c61ac5138a2e5',
        frontSwap: swaps[0],
        backSwap: swaps[1],
        sandwiched: [deposits[0]],
        profit: {
          asset: '0xdac17f958d2ee523a2206206994597c13d831ec7',
          amount: 16563484340n,
        },
      },
    ]);
  });
});
