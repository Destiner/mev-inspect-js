import { describe, test, expect } from 'vitest';

import { Swap } from '../../src/index.js';
import { Arbitrage, getArbitrages } from '../../src/mev/arbitrage.js';

describe('MEV: arbitrage', () => {
  test('skip simple swaps', () => {
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
        assetIn: {
          type: 'erc20',
          address: '0xc7283b66eb1eb5fb86327f08e1b5816b0720212b',
        },
        amountIn: 76382000000000000000000n,
        assetOut: {
          type: 'erc20',
          address: '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
        },
        amountOut: 29934139188201577438792n,
        block: {
          hash: '0xed0883b6e3f80ff2f8263bbeb17717805ae54297dabc998da8384384f9f29fc5',
          number: 14698911,
        },
        transaction: {
          from: '0xef3375b491cff653eaf7c9955a5466f7ea06f37b',
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
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual<Arbitrage[]>([]);
  });

  test('skip multipath swaps', () => {
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
        assetIn: {
          type: 'erc20',
          address: '0x514910771af9ca656af840dff83e8264ecf986ca',
        },
        amountIn: 2918704295536500000n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 11499148166696888n,
        block: {
          hash: '0x693c6ec11898b2b82cd1c964e7dced504447b0e82da2e76ce4b3d29de6f655fe',
          number: 14699184,
        },
        transaction: {
          from: '0x416d1a4f718a8c3dda7fc3645435580e743d9249',
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
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 11499148166696888n,
        assetOut: {
          type: 'erc20',
          address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
        },
        amountOut: 13787057162799104322n,
        block: {
          hash: '0x693c6ec11898b2b82cd1c964e7dced504447b0e82da2e76ce4b3d29de6f655fe',
          number: 14699184,
        },
        transaction: {
          from: '0x416d1a4f718a8c3dda7fc3645435580e743d9249',
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
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual<Arbitrage[]>([]);
  });

  test('skip cross-protocol split swaps', () => {
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
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 1200000000000000000n,
        assetOut: {
          type: 'erc20',
          address: '0x408e41876cccdc0f92210600ef50372656052a38',
        },
        amountOut: 12343477954337594771362n,
        block: {
          hash: '0xce0bb790b8b7ff2c72039aab32867442b94e3f3a167a22be31825675e6c2960c',
          number: 14698978,
        },
        transaction: {
          from: '0xf40b3d16ae26262db9b19e0ec80d8a490c40bdcb',
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
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 2200000000000000000n,
        assetOut: {
          type: 'erc20',
          address: '0x408e41876cccdc0f92210600ef50372656052a38',
        },
        amountOut: 22594064483837836468324n,
        block: {
          hash: '0xce0bb790b8b7ff2c72039aab32867442b94e3f3a167a22be31825675e6c2960c',
          number: 14698978,
        },
        transaction: {
          from: '0xf40b3d16ae26262db9b19e0ec80d8a490c40bdcb',
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
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 2400000000000000000n,
        assetOut: {
          type: 'erc20',
          address: '0x408e41876cccdc0f92210600ef50372656052a38',
        },
        amountOut: 24663570517081979225739n,
        block: {
          hash: '0xce0bb790b8b7ff2c72039aab32867442b94e3f3a167a22be31825675e6c2960c',
          number: 14698978,
        },
        transaction: {
          from: '0xf40b3d16ae26262db9b19e0ec80d8a490c40bdcb',
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
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 4200000000000000000n,
        assetOut: {
          type: 'erc20',
          address: '0x408e41876cccdc0f92210600ef50372656052a38',
        },
        amountOut: 43098743320715046083583n,
        block: {
          hash: '0xce0bb790b8b7ff2c72039aab32867442b94e3f3a167a22be31825675e6c2960c',
          number: 14698978,
        },
        transaction: {
          from: '0xf40b3d16ae26262db9b19e0ec80d8a490c40bdcb',
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
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual<Arbitrage[]>([]);
  });

  test('2-swap internal arbitrage', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x4585fe77225b41b697c938b018e2ac67ac5a20c0',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0x0000000000005117dd3a72e64a705198753fdd54',
        to: '0x0000000000005117dd3a72e64a705198753fdd54',
        assetIn: {
          type: 'erc20',
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        },
        amountIn: 1750639111n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 239024634916096132545n,
        block: {
          hash: '0xef740f61a6a8a0d45114d57a9e9b9d5f4de852b9026b6c5b4d8cc18815819d00',
          number: 14744280,
        },
        transaction: {
          from: '0x0000000a9dbf8af9fe5ea03ff1272d8242ed3ab1',
          hash: '0xc158502a952c98c8fe282b5e2bbe56e46fd0a4221c527e7d045f25ccca6a77b2',
          index: 6,
          gasUsed: 230198,
        },
        event: {
          address: '0x4585fe77225b41b697c938b018e2ac67ac5a20c0',
          logIndex: 33,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0x0000000000005117dd3a72e64a705198753fdd54',
        to: '0x0000000000005117dd3a72e64a705198753fdd54',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 238841017533640100000n,
        assetOut: {
          type: 'erc20',
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        },
        amountOut: 1750639111n,
        block: {
          hash: '0xef740f61a6a8a0d45114d57a9e9b9d5f4de852b9026b6c5b4d8cc18815819d00',
          number: 14744280,
        },
        transaction: {
          from: '0x0000000a9dbf8af9fe5ea03ff1272d8242ed3ab1',
          hash: '0xc158502a952c98c8fe282b5e2bbe56e46fd0a4221c527e7d045f25ccca6a77b2',
          index: 6,
          gasUsed: 230198,
        },
        event: {
          address: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
          logIndex: 35,
        },
        metadata: {},
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual<Arbitrage[]>([
      {
        swaps: [swaps[1], swaps[0]],
        profit: {
          amount: 183617382456032545n,
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        },
        arbitrager: '0x0000000000005117dd3a72e64a705198753fdd54',
      },
    ]);
  });

  test('multistep internal arbitrage', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
        to: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 760000000000000000n,
        assetOut: {
          type: 'erc20',
          address: '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
        },
        amountOut: 6627194964611846570392n,
        block: {
          hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
          number: 14703765,
        },
        transaction: {
          from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          index: 0,
          gasUsed: 277422,
        },
        event: {
          address: '0x41b536722c014a577f06a4bb0dfa08bf0b8f5e87',
          logIndex: 5,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
        to: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
        assetIn: {
          type: 'erc20',
          address: '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
        },
        amountIn: 6627194964611846570392n,
        assetOut: {
          type: 'erc20',
          address: '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
        },
        amountOut: 206953215405128955955015n,
        block: {
          hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
          number: 14703765,
        },
        transaction: {
          from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          index: 0,
          gasUsed: 277422,
        },
        event: {
          address: '0x3ce42ef6b6617b5950c13d1c258ecfdcd30bb4de',
          logIndex: 6,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
        to: '0x2519042aa735edb4688a8376d69d4bb69431206c',
        assetIn: {
          type: 'erc20',
          address: '0x3b94440c8c4f69d5c9f47bab9c5a93064df460f5',
        },
        amountIn: 206953215405128955955015n,
        assetOut: {
          type: 'erc20',
          address: '0x58b6a8a3302369daec383334672404ee733ab239',
        },
        amountOut: 91552167112393573131n,
        block: {
          hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
          number: 14703765,
        },
        transaction: {
          from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          index: 0,
          gasUsed: 277422,
        },
        event: {
          address: '0xcc2bd4f3c00c37adb00864d9a0a8cfef8b6ff56a',
          logIndex: 7,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x2519042aa735edb4688a8376d69d4bb69431206c',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
        to: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
        assetIn: {
          type: 'erc20',
          address: '0x58b6a8a3302369daec383334672404ee733ab239',
        },
        amountIn: 91552167112393573131n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 778733861336038399n,
        block: {
          hash: '0x0c1613b51d33f1a48d9ce4e77f7b6d0fa465a2597a61fa43ab45164c47874bd0',
          number: 14703765,
        },
        transaction: {
          from: '0xd7e1236c08731c3632519dcd1a581bfe6876a3b2',
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
          index: 0,
          gasUsed: 277422,
        },
        event: {
          address: '0x2519042aa735edb4688a8376d69d4bb69431206c',
          logIndex: 8,
        },
        metadata: {},
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual<Arbitrage[]>([
      {
        swaps,
        profit: {
          amount: 18733861336038399n,
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        },
        arbitrager: '0x5f62593c70069abb35dfe2b63db969e8906609d6',
      },
    ]);
  });

  test('2-swap cross-protocol arbitrage', () => {
    const swapsA: Swap[] = [
      {
        contract: {
          address: '0x1ec9b867b701c1e5ce9a6567ecc4b71838497c27',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0xab319a82803ea5f8f335dc373ce248008d4f2671',
        to: '0x0bec54c89a7d9f15c4e7faa8d47adedf374462ed',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 69743953265453911n,
        assetOut: {
          type: 'erc20',
          address: '0x2791bfd60d232150bff86b39b7146c0eaaa2ba81',
        },
        amountOut: 8519704802137125560027n,
        block: {
          hash: '0x7177d1d8378095a76ec8212d4962b16d3bdc466732b269b1d61ba4eb5fa1399c',
          number: 14677379,
        },
        transaction: {
          from: '0x5cf8face6064e435b97e6dc3cc1ad1f8dddc3905',
          hash: '0x8baefcf7a8b848bdf8be594d55cb84ed26bf6ea6191dafaf33eedf09198453c6',
          index: 0,
          gasUsed: 130574,
        },
        event: {
          address: '0x1ec9b867b701c1e5ce9a6567ecc4b71838497c27',
          logIndex: 3,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x0bec54c89a7d9f15c4e7faa8d47adedf374462ed',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0xab319a82803ea5f8f335dc373ce248008d4f2671',
        to: '0xab319a82803ea5f8f335dc373ce248008d4f2671',
        assetIn: {
          type: 'erc20',
          address: '0x2791bfd60d232150bff86b39b7146c0eaaa2ba81',
        },
        amountIn: 8519704802137125560027n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 74553296475971132n,
        block: {
          hash: '0x7177d1d8378095a76ec8212d4962b16d3bdc466732b269b1d61ba4eb5fa1399c',
          number: 14677379,
        },
        transaction: {
          from: '0x5cf8face6064e435b97e6dc3cc1ad1f8dddc3905',
          hash: '0x8baefcf7a8b848bdf8be594d55cb84ed26bf6ea6191dafaf33eedf09198453c6',
          index: 0,
          gasUsed: 130574,
        },
        event: {
          address: '0x0bec54c89a7d9f15c4e7faa8d47adedf374462ed',
          logIndex: 6,
        },
        metadata: {},
      },
    ];
    const arbitragesA = getArbitrages(swapsA);

    expect(arbitragesA).toEqual<Arbitrage[]>([
      {
        swaps: swapsA,
        profit: {
          amount: 4809343210517221n,
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        },
        arbitrager: '0xab319a82803ea5f8f335dc373ce248008d4f2671',
      },
    ]);

    const swapsB: Swap[] = [
      {
        contract: {
          address: '0x69b81152c5a8d35a67b32a4d3772795d96cae4da',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
        to: '0x58418d6c83efab01ed78b0ac42e55af01ee77dba',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 5137825921816247575n,
        assetOut: {
          type: 'erc20',
          address: '0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5',
        },
        amountOut: 722121104748n,
        block: {
          hash: '0xd63d013d0a3cf4c4bdf189229fd3c8153e8fd3f0b0107f81dda2b82a46de34fc',
          number: 14703898,
        },
        transaction: {
          from: '0x5cf8face6064e435b97e6dc3cc1ad1f8dddc3905',
          hash: '0xd53808dc31c908b7acad610d5efa726afe67e7c9739083be9c1b4cb6d2cdaeac',
          index: 61,
          gasUsed: 152180,
        },
        event: {
          address: '0x69b81152c5a8d35a67b32a4d3772795d96cae4da',
          logIndex: 10,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x88051b0eea095007d3bef21ab287be961f3d8598',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0x58418d6c83efab01ed78b0ac42e55af01ee77dba',
        to: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
        assetIn: {
          type: 'erc20',
          address: '0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5',
        },
        amountIn: 722121104748n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 5187612076728941787n,
        block: {
          hash: '0xd63d013d0a3cf4c4bdf189229fd3c8153e8fd3f0b0107f81dda2b82a46de34fc',
          number: 14703898,
        },
        transaction: {
          from: '0x5cf8face6064e435b97e6dc3cc1ad1f8dddc3905',
          hash: '0xd53808dc31c908b7acad610d5efa726afe67e7c9739083be9c1b4cb6d2cdaeac',
          index: 61,
          gasUsed: 152180,
        },
        event: {
          address: '0x88051b0eea095007d3bef21ab287be961f3d8598',
          logIndex: 13,
        },
        metadata: {},
      },
    ];
    const arbitragesB = getArbitrages(swapsB);

    expect(arbitragesB).toEqual<Arbitrage[]>([
      {
        swaps: swapsB,
        profit: {
          amount: 49786154912694212n,
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        },
        arbitrager: '0x5aa3393e361c2eb342408559309b3e873cd876d6',
      },
    ]);
  });

  test('3-swap cross-protocol arbitrage', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x30b705bfa64be9ae395bd9238efc63e9f5f8d1cc',
          protocol: {
            abi: 'BalancerV1',
            factory: {
              address: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
              label: 'Balancer V1',
            },
          },
        },
        from: '0x563bdabaa8846ec445b25bfbed88d160890a02ed',
        to: '0x563bdabaa8846ec445b25bfbed88d160890a02ed',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 1320898745109993396n,
        assetOut: {
          type: 'erc20',
          address: '0x33349b282065b0284d756f0577fb39c158f935e6',
        },
        amountOut: 76585579871319070341n,
        block: {
          hash: '0xadc569bbf37a3e458ecf692979b977fc839a767c3625d07545612ca449351a89',
          number: 14703794,
        },
        transaction: {
          from: '0x82836c765a5096e8635637459dd77076ad54cd08',
          hash: '0x0ec1a4297b198c61598307ed92aa254a234abe8a6ee9415713f8f35a491e9d01',
          index: 2,
          gasUsed: 249345,
        },
        event: {
          logIndex: 12,
          address: '0x30b705bfa64be9ae395bd9238efc63e9f5f8d1cc',
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x7b28470032da06051f2e620531adbaeadb285408',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0x563bdabaa8846ec445b25bfbed88d160890a02ed',
        to: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        assetIn: {
          type: 'erc20',
          address: '0x33349b282065b0284d756f0577fb39c158f935e6',
        },
        amountIn: 76585572212761083209n,
        assetOut: {
          type: 'erc20',
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
        amountOut: 3796458224n,
        block: {
          hash: '0xadc569bbf37a3e458ecf692979b977fc839a767c3625d07545612ca449351a89',
          number: 14703794,
        },
        transaction: {
          from: '0x82836c765a5096e8635637459dd77076ad54cd08',
          hash: '0x0ec1a4297b198c61598307ed92aa254a234abe8a6ee9415713f8f35a491e9d01',
          index: 2,
          gasUsed: 249345,
        },
        event: {
          address: '0x7b28470032da06051f2e620531adbaeadb285408',
          logIndex: 22,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0x563bdabaa8846ec445b25bfbed88d160890a02ed',
        to: '0x563bdabaa8846ec445b25bfbed88d160890a02ed',
        assetIn: {
          type: 'erc20',
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
        amountIn: 3796458224n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 1334971529092923524n,
        block: {
          hash: '0xadc569bbf37a3e458ecf692979b977fc839a767c3625d07545612ca449351a89',
          number: 14703794,
        },
        transaction: {
          from: '0x82836c765a5096e8635637459dd77076ad54cd08',
          hash: '0x0ec1a4297b198c61598307ed92aa254a234abe8a6ee9415713f8f35a491e9d01',
          index: 2,
          gasUsed: 249345,
        },
        event: {
          address: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
          logIndex: 23,
        },
        metadata: {},
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual<Arbitrage[]>([
      {
        swaps,
        profit: {
          amount: 14072783982930128n,
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        },
        arbitrager: '0x563bdabaa8846ec445b25bfbed88d160890a02ed',
      },
    ]);
  });

  test('arbitrage with profit in USD token', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x231b7589426ffe1b75405526fc32ac09d44364c4',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0xb23dc3f00856288cd7b6bde5d06159f01b75aa4c',
        to: '0xee51984781254ad1a0ee3ae0ca26c4d53dea6ecb',
        assetIn: {
          type: 'erc20',
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        },
        amountIn: 244490660460949241856n,
        assetOut: {
          type: 'erc20',
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        },
        amountOut: 634888n,
        block: {
          hash: '0x0b598c9b3121baecd1db3ece3ff690bb1c91c8c46f9298517f58b6aaec982a8f',
          number: 14703569,
        },
        transaction: {
          from: '0x38accdeb1c62dade625bcabdca85701d5f6c8618',
          hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
          index: 7,
          gasUsed: 818860,
        },
        event: {
          address: '0x231b7589426ffe1b75405526fc32ac09d44364c4',
          logIndex: 98,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0xee51984781254ad1a0ee3ae0ca26c4d53dea6ecb',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0xb23dc3f00856288cd7b6bde5d06159f01b75aa4c',
        to: '0xf3933a6a82fba8a349a7124c8d8226d7c4d7b6cb',
        assetIn: {
          type: 'erc20',
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        },
        amountIn: 634888n,
        assetOut: {
          type: 'erc20',
          address: '0x697ef32b4a3f5a4c39de1cb7563f24ca7bfc5947',
        },
        amountOut: 1275909030322046339158n,
        block: {
          hash: '0x0b598c9b3121baecd1db3ece3ff690bb1c91c8c46f9298517f58b6aaec982a8f',
          number: 14703569,
        },
        transaction: {
          from: '0x38accdeb1c62dade625bcabdca85701d5f6c8618',
          hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
          index: 7,
          gasUsed: 818860,
        },
        event: {
          address: '0xee51984781254ad1a0ee3ae0ca26c4d53dea6ecb',
          logIndex: 101,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0xf3933a6a82fba8a349a7124c8d8226d7c4d7b6cb',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0xb23dc3f00856288cd7b6bde5d06159f01b75aa4c',
        to: '0xb23dc3f00856288cd7b6bde5d06159f01b75aa4c',
        assetIn: {
          type: 'erc20',
          address: '0x697ef32b4a3f5a4c39de1cb7563f24ca7bfc5947',
        },
        amountIn: 1275909030322046339158n,
        assetOut: {
          type: 'erc20',
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        },
        amountOut: 263265751127846220157n,
        block: {
          hash: '0x0b598c9b3121baecd1db3ece3ff690bb1c91c8c46f9298517f58b6aaec982a8f',
          number: 14703569,
        },
        transaction: {
          from: '0x38accdeb1c62dade625bcabdca85701d5f6c8618',
          hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
          index: 7,
          gasUsed: 818860,
        },
        event: {
          address: '0xf3933a6a82fba8a349a7124c8d8226d7c4d7b6cb',
          logIndex: 104,
        },
        metadata: {},
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual<Arbitrage[]>([
      {
        swaps,
        profit: {
          amount: 18775090666896978301n,
          asset: {
            type: 'erc20',
            address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          },
        },
        arbitrager: '0xb23dc3f00856288cd7b6bde5d06159f01b75aa4c',
      },
    ]);
  });

  test('multiple arbitrage in one transaction', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        to: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        assetIn: {
          type: 'erc20',
          address: '0xb2089a7069861c8d90c8da3aacab8e9188c0c531',
        },
        amountIn: 1987151334450n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 55589057873471949n,
        block: {
          hash: '0x2ba2cb87946f4700af442d62d8eea00940c6e5a14e33c74f00d8a5287bc94272',
          number: 14704280,
        },
        transaction: {
          from: '0x74067744295a1b9d440e900e1af660c90150d510',
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
          index: 6,
          gasUsed: 424142,
        },
        event: {
          address: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
          logIndex: 26,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x4efc9e2e3e77732ce2f9612b8f050082c01688bd',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        to: '0x7f46c12a7ac8343d11652fffdaed411d2d427eb0',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 50662506837650511n,
        assetOut: {
          type: 'erc20',
          address: '0xb2089a7069861c8d90c8da3aacab8e9188c0c531',
        },
        amountOut: 1987151334450n,
        block: {
          hash: '0x2ba2cb87946f4700af442d62d8eea00940c6e5a14e33c74f00d8a5287bc94272',
          number: 14704280,
        },
        transaction: {
          from: '0x74067744295a1b9d440e900e1af660c90150d510',
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
          index: 6,
          gasUsed: 424142,
        },
        event: {
          address: '0x4efc9e2e3e77732ce2f9612b8f050082c01688bd',
          logIndex: 28,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x9c18a2f9545112ab2fcbdd228536562406a53232',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        to: '0x5399a36f54ca91a5db5c148eeb2b909bba81b82c',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 236177765391862272n,
        assetOut: {
          type: 'erc20',
          address: '0x630d98424efe0ea27fb1b3ab7741907dffeaad78',
        },
        amountOut: 1370607005377n,
        block: {
          hash: '0x2ba2cb87946f4700af442d62d8eea00940c6e5a14e33c74f00d8a5287bc94272',
          number: 14704280,
        },
        transaction: {
          from: '0x74067744295a1b9d440e900e1af660c90150d510',
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
          index: 6,
          gasUsed: 424142,
        },
        event: {
          address: '0x9c18a2f9545112ab2fcbdd228536562406a53232',
          logIndex: 32,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x5399a36f54ca91a5db5c148eeb2b909bba81b82c',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        to: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        assetIn: {
          type: 'erc20',
          address: '0x630d98424efe0ea27fb1b3ab7741907dffeaad78',
        },
        amountIn: 1370607005377n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 240392410078442798n,
        block: {
          hash: '0x2ba2cb87946f4700af442d62d8eea00940c6e5a14e33c74f00d8a5287bc94272',
          number: 14704280,
        },
        transaction: {
          from: '0x74067744295a1b9d440e900e1af660c90150d510',
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
          index: 6,
          gasUsed: 424142,
        },
        event: {
          address: '0x5399a36f54ca91a5db5c148eeb2b909bba81b82c',
          logIndex: 35,
        },
        metadata: {},
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual<Arbitrage[]>([
      {
        swaps: [swaps[1], swaps[0]],
        profit: {
          amount: 4926551035821438n,
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        },
        arbitrager: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
      },
      {
        swaps: [swaps[2], swaps[3]],
        profit: {
          amount: 4214644686580526n,
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        },
        arbitrager: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
      },
    ]);
  });

  test('arbitrage of swaps with different amounts', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0xc8ca3c0f011fe42c48258ecbbf5d94c51f141c17',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        to: '0x1374042f78fb0fc78658b17c053678940c008543',
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 414065221269164835n,
        assetOut: {
          type: 'erc20',
          address: '0x1fe24f25b1cf609b9c4e7e12d802e3640dfa5e43',
        },
        amountOut: 4834125186588659431531n,
        block: {
          hash: '0x2ba2cb87946f4700af442d62d8eea00940c6e5a14e33c74f00d8a5287bc94272',
          number: 14704280,
        },
        transaction: {
          from: '0x74067744295a1b9d440e900e1af660c90150d510',
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
          index: 6,
          gasUsed: 424142,
        },
        event: {
          address: '0xc8ca3c0f011fe42c48258ecbbf5d94c51f141c17',
          logIndex: 41,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x1374042f78fb0fc78658b17c053678940c008543',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        to: '0x60594a405d53811d3bc4766596efd80fd545a270',
        assetIn: {
          type: 'erc20',
          address: '0x1fe24f25b1cf609b9c4e7e12d802e3640dfa5e43',
        },
        amountIn: 4834120317098111321210n,
        assetOut: {
          type: 'erc20',
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        },
        amountOut: 1191073880145115762817n,
        block: {
          hash: '0x2ba2cb87946f4700af442d62d8eea00940c6e5a14e33c74f00d8a5287bc94272',
          number: 14704280,
        },
        transaction: {
          from: '0x74067744295a1b9d440e900e1af660c90150d510',
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
          index: 6,
          gasUsed: 424142,
        },
        event: {
          address: '0x1374042f78fb0fc78658b17c053678940c008543',
          logIndex: 42,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x60594a405d53811d3bc4766596efd80fd545a270',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        to: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
        assetIn: {
          type: 'erc20',
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        },
        amountIn: 1191072689011330014562n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 421189973521534385n,
        block: {
          hash: '0x2ba2cb87946f4700af442d62d8eea00940c6e5a14e33c74f00d8a5287bc94272',
          number: 14704280,
        },
        transaction: {
          from: '0x74067744295a1b9d440e900e1af660c90150d510',
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
          index: 6,
          gasUsed: 424142,
        },
        event: {
          address: '0x60594a405d53811d3bc4766596efd80fd545a270',
          logIndex: 43,
        },
        metadata: {},
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual<Arbitrage[]>([
      {
        swaps,
        profit: {
          amount: 7124752252369550n,
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        },
        arbitrager: '0x4d944a25bc871d6c6ee08baef0b7da0b08e6b7b3',
      },
    ]);
  });

  test('russian doll arbitrage', () => {
    const swaps: Swap[] = [
      {
        contract: {
          address: '0x25be6ce04a504d4bcecb6ba7f5967f7aae6af579',
          protocol: {
            abi: 'UniswapV2',
            factory: {
              address: '0x54f454d747e037da288db568d4121117eab34e79',
              label: 'Uniswap V2',
            },
          },
        },
        from: '0xeef86c2e49e11345f1a693675df9a38f7d880c8f',
        to: '0x8fe536c7dc019455cce34746755c64bbe2aa163b',
        assetIn: {
          type: 'erc20',
          address: '0x853d955acef822db058eb8505911ed77f175b99e',
        },
        amountIn: 8570113295352525635508n,
        assetOut: {
          type: 'erc20',
          address: '0xc2544a32872a91f4a553b404c6950e89de901fdb',
        },
        amountOut: 1482727342492416365490n,
        block: {
          hash: '0x1942042bd0cc1d24530856b513b17cfba954db2ddf81db5b377806fa77a2ea80',
          number: 14713415,
        },
        transaction: {
          from: '0xb691ce1def24a1cb0d7aaffd6340aea33f886503',
          hash: '0x08b606f3c528907688cdcab26a70cea2b9dd409850838662eb4b98a30ac33900',
          index: 4,
          gasUsed: 485584,
        },
        event: {
          address: '0x25be6ce04a504d4bcecb6ba7f5967f7aae6af579',
          logIndex: 44,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x9a834b70c07c81a9fcd6f22e842bf002fbffbe4d',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0xeef86c2e49e11345f1a693675df9a38f7d880c8f',
        to: '0x25be6ce04a504d4bcecb6ba7f5967f7aae6af579',
        assetIn: {
          type: 'erc20',
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
        amountIn: 8570994710n,
        assetOut: {
          type: 'erc20',
          address: '0x853d955acef822db058eb8505911ed77f175b99e',
        },
        amountOut: 8570113295352525635508n,
        block: {
          hash: '0x1942042bd0cc1d24530856b513b17cfba954db2ddf81db5b377806fa77a2ea80',
          number: 14713415,
        },
        transaction: {
          from: '0xb691ce1def24a1cb0d7aaffd6340aea33f886503',
          hash: '0x08b606f3c528907688cdcab26a70cea2b9dd409850838662eb4b98a30ac33900',
          index: 4,
          gasUsed: 485584,
        },
        event: {
          address: '0x9a834b70c07c81a9fcd6f22e842bf002fbffbe4d',
          logIndex: 46,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0x8fe536c7dc019455cce34746755c64bbe2aa163b',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0xeef86c2e49e11345f1a693675df9a38f7d880c8f',
        to: '0xc63b0708e2f7e69cb8a1df0e1389a98c35a76d52',
        assetIn: {
          type: 'erc20',
          address: '0xc2544a32872a91f4a553b404c6950e89de901fdb',
        },
        amountIn: 1482727342492416365490n,
        assetOut: {
          type: 'erc20',
          address: '0x853d955acef822db058eb8505911ed77f175b99e',
        },
        amountOut: 8673476107028977732054n,
        block: {
          hash: '0x1942042bd0cc1d24530856b513b17cfba954db2ddf81db5b377806fa77a2ea80',
          number: 14713415,
        },
        transaction: {
          from: '0xb691ce1def24a1cb0d7aaffd6340aea33f886503',
          hash: '0x08b606f3c528907688cdcab26a70cea2b9dd409850838662eb4b98a30ac33900',
          index: 4,
          gasUsed: 485584,
        },
        event: {
          address: '0x8fe536c7dc019455cce34746755c64bbe2aa163b',
          logIndex: 47,
        },
        metadata: {},
      },
      {
        contract: {
          address: '0xc63b0708e2f7e69cb8a1df0e1389a98c35a76d52',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        from: '0xeef86c2e49e11345f1a693675df9a38f7d880c8f',
        to: '0xeef86c2e49e11345f1a693675df9a38f7d880c8f',
        assetIn: {
          type: 'erc20',
          address: '0x853d955acef822db058eb8505911ed77f175b99e',
        },
        amountIn: 8673475239681367029156n,
        assetOut: {
          type: 'erc20',
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
        amountOut: 8667791350n,
        block: {
          hash: '0x1942042bd0cc1d24530856b513b17cfba954db2ddf81db5b377806fa77a2ea80',
          number: 14713415,
        },
        transaction: {
          from: '0xb691ce1def24a1cb0d7aaffd6340aea33f886503',
          hash: '0x08b606f3c528907688cdcab26a70cea2b9dd409850838662eb4b98a30ac33900',
          index: 4,
          gasUsed: 485584,
        },
        event: {
          address: '0xc63b0708e2f7e69cb8a1df0e1389a98c35a76d52',
          logIndex: 48,
        },
        metadata: {},
      },
    ];

    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual<Arbitrage[]>([
      {
        swaps: [swaps[1], swaps[0], swaps[2], swaps[3]],
        profit: {
          amount: 96796640n,
          asset: {
            type: 'erc20',
            address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          },
        },
        arbitrager: '0xeef86c2e49e11345f1a693675df9a38f7d880c8f',
      },
    ]);
  });
});
