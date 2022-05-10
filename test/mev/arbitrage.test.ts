import { describe, test, expect } from 'vitest';

import { getArbitrages } from '../../src/mev/arbitrage.js';

describe('MEV: arbitrage', () => {
  test('skips a simple swap', () => {
    const swaps = [
      {
        contract: '0x9928e4046d7c6513326cCeA028cD3e7a91c7590A',
        from: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        to: '0xEf3375B491CFf653eAf7C9955a5466f7EA06F37B',
        assetIn: '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B',
        amountIn: 76382000000000000000000n,
        assetOut: '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
        amountOut: 29934139188201577438792n,
        transaction: {
          hash: '0xad39a3e5109e2c146f85f5db53a72da9af886b861d4965aacafdb165c1aec35e',
        },
        event: {
          address: '0x9928e4046d7c6513326cCeA028cD3e7a91c7590A',
          logIndex: 15,
        },
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual([]);
  });

  test('skips a multipath swap', () => {
    const swaps = [
      {
        contract: '0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974',
        from: '0x11111112542D85B3EF69AE05771c2dCCff4fAa26',
        to: '0xCE84867c3c02B05dc570d0135103d3fB9CC19433',
        assetIn: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        amountIn: 2918704295536500000n,
        assetOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountOut: 11499148166696888n,
        transaction: {
          hash: '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
        },
        event: {
          address: '0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974',
          logIndex: 448,
        },
      },
      {
        contract: '0xCE84867c3c02B05dc570d0135103d3fB9CC19433',
        from: '0x11111112542D85B3EF69AE05771c2dCCff4fAa26',
        to: '0x416d1a4F718a8C3dda7FC3645435580E743D9249',
        assetIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: 11499148166696888n,
        assetOut: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
        amountOut: 13787057162799104322n,
        transaction: {
          hash: '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
        },
        event: {
          address: '0xCE84867c3c02B05dc570d0135103d3fB9CC19433',
          logIndex: 451,
        },
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual([]);
  });

  test('skips a cross-protocol split swap', () => {
    const swaps = [
      {
        contract: '0x8Bd1661Da98EBDd3BD080F0bE4e6d9bE8cE9858c',
        from: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        to: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        assetIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: 1200000000000000000n,
        assetOut: '0x408e41876cCCDC0F92210600ef50372656052a38',
        amountOut: 12343477954337594771362n,
        transaction: {
          hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
        },
        event: {
          address: '0x8Bd1661Da98EBDd3BD080F0bE4e6d9bE8cE9858c',
          logIndex: 74,
        },
      },
      {
        contract: '0x49ff149D649769033d43783E7456F626862CD160',
        from: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        to: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        assetIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: 2200000000000000000n,
        assetOut: '0x408e41876cCCDC0F92210600ef50372656052a38',
        amountOut: 22594064483837836468324n,
        transaction: {
          hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
        },
        event: {
          logIndex: 77,
          address: '0x49ff149D649769033d43783E7456F626862CD160',
        },
      },
      {
        contract: '0xec60a5fef79a92c741cb74fdd6bfc340c0279b01',
        from: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        to: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        assetIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: 2400000000000000000n,
        assetOut: '0x408e41876cCCDC0F92210600ef50372656052a38',
        amountOut: 24663570517081979225739n,
        transaction: {
          hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
        },
        event: {
          logIndex: 81,
          address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        },
      },
      {
        contract: '0x611CDe65deA90918c0078ac0400A72B0D25B9bb1',
        from: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        to: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        assetIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: 4200000000000000000n,
        assetOut: '0x408e41876cCCDC0F92210600ef50372656052a38',
        amountOut: 43098743320715046083583n,
        transaction: {
          hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
        },
        event: {
          address: '0x611CDe65deA90918c0078ac0400A72B0D25B9bb1',
          logIndex: 87,
        },
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual([]);
  });

  test.todo('finds 2-swap internal arbitrage', () => {
    // tx 0xc158502a952c98c8fe282b5e2bbe56e46fd0a4221c527e7d045f25ccca6a77b2
  });

  test('finds multistep internal arbitrage', () => {
    const swaps = [
      {
        contract: '0x41B536722C014a577F06A4Bb0dFa08BF0b8F5E87',
        from: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        to: '0x3Ce42eF6b6617b5950C13D1c258eCFDcd30bB4De',
        assetIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: 760000000000000000n,
        assetOut: '0x4fE83213D56308330EC302a8BD641f1d0113A4Cc',
        amountOut: 6627194964611846570392n,
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        },
        event: {
          address: '0x41B536722C014a577F06A4Bb0dFa08BF0b8F5E87',
          logIndex: 5,
        },
      },
      {
        contract: '0x3Ce42eF6b6617b5950C13D1c258eCFDcd30bB4De',
        from: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        to: '0xCC2bd4F3c00c37aDb00864D9a0a8cfEf8B6Ff56a',
        assetIn: '0x4fE83213D56308330EC302a8BD641f1d0113A4Cc',
        amountIn: 6627194964611846570392n,
        assetOut: '0x3b94440C8c4F69D5C9F47BaB9C5A93064Df460F5',
        amountOut: 206953215405128955955015n,
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        },
        event: {
          address: '0x3Ce42eF6b6617b5950C13D1c258eCFDcd30bB4De',
          logIndex: 6,
        },
      },
      {
        contract: '0xCC2bd4F3c00c37aDb00864D9a0a8cfEf8B6Ff56a',
        from: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        to: '0x2519042aa735eDb4688a8376d69D4BB69431206c',
        assetIn: '0x3b94440C8c4F69D5C9F47BaB9C5A93064Df460F5',
        amountIn: 206953215405128955955015n,
        assetOut: '0x58b6A8A3302369DAEc383334672404Ee733aB239',
        amountOut: 91552167112393573131n,
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        },
        event: {
          address: '0xCC2bd4F3c00c37aDb00864D9a0a8cfEf8B6Ff56a',
          logIndex: 7,
        },
      },
      {
        contract: '0x2519042aa735eDb4688a8376d69D4BB69431206c',
        from: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        to: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        assetIn: '0x58b6A8A3302369DAEc383334672404Ee733aB239',
        amountIn: 91552167112393573131n,
        assetOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountOut: 778733861336038399n,
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        },
        event: {
          address: '0x2519042aa735eDb4688a8376d69D4BB69431206c',
          logIndex: 8,
        },
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual([
      {
        swaps,
        startAmount: 760000000000000000n,
        endAmount: 778733861336038399n,
        profitAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      },
    ]);
  });

  test('finds 2-swap cross-protocol arbitrage', () => {
    const swaps = [
      {
        contract: '0x1eC9b867b701C1E5ce9a6567eCC4B71838497c27',
        from: '0xAb319a82803eA5f8f335Dc373cE248008D4f2671',
        to: '0x0beC54c89a7d9F15C4e7fAA8d47ADEdF374462eD',
        assetIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: 69743953265453911n,
        assetOut: '0x2791BfD60D232150Bff86b39B7146c0eaAA2BA81',
        amountOut: 8519704802137125560027n,
        transaction: {
          hash: '0x8baefcf7a8b848bdf8be594d55cb84ed26bf6ea6191dafaf33eedf09198453c6',
        },
        event: {
          address: '0x1eC9b867b701C1E5ce9a6567eCC4B71838497c27',
          logIndex: 3,
        },
      },
      {
        contract: '0x0beC54c89a7d9F15C4e7fAA8d47ADEdF374462eD',
        from: '0xAb319a82803eA5f8f335Dc373cE248008D4f2671',
        to: '0xAb319a82803eA5f8f335Dc373cE248008D4f2671',
        assetIn: '0x2791BfD60D232150Bff86b39B7146c0eaAA2BA81',
        amountIn: 8519704802137125560027n,
        assetOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountOut: 74553296475971132n,
        transaction: {
          hash: '0x8baefcf7a8b848bdf8be594d55cb84ed26bf6ea6191dafaf33eedf09198453c6',
        },
        event: {
          address: '0x0beC54c89a7d9F15C4e7fAA8d47ADEdF374462eD',
          logIndex: 6,
        },
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual([
      {
        swaps,
        startAmount: 69743953265453911n,
        endAmount: 74553296475971132n,
        profitAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      },
    ]);

    // tx 0xd53808dc31c908b7acad610d5efa726afe67e7c9739083be9c1b4cb6d2cdaeac
  });

  test('finds 3-swap cross-protocol arbitrage', () => {
    const swaps = [
      {
        contract: '0x30b705BfA64Be9AE395bD9238EfC63E9f5F8d1Cc',
        from: '0x563bDabAa8846ec445b25Bfbed88d160890a02Ed',
        to: '0x563bDabAa8846ec445b25Bfbed88d160890a02Ed',
        assetIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: 1320898745109993396n,
        assetOut: '0x33349B282065b0284d756F0577FB39c158F935e6',
        amountOut: 76585579871319070341n,
        transaction: {
          hash: '0x0ec1a4297b198c61598307ed92aa254a234abe8a6ee9415713f8f35a491e9d01',
        },
        event: {
          logIndex: 12,
          address: '0x30b705BfA64Be9AE395bD9238EfC63E9f5F8d1Cc',
        },
      },
      {
        contract: '0x7b28470032DA06051f2E620531adBAeAdb285408',
        from: '0x563bDabAa8846ec445b25Bfbed88d160890a02Ed',
        to: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
        assetIn: '0x33349B282065b0284d756F0577FB39c158F935e6',
        amountIn: 76585572212761083209n,
        assetOut: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        amountOut: 3796458224n,
        transaction: {
          hash: '0x0ec1a4297b198c61598307ed92aa254a234abe8a6ee9415713f8f35a491e9d01',
        },
        event: {
          address: '0x7b28470032DA06051f2E620531adBAeAdb285408',
          logIndex: 22,
        },
      },
      {
        contract: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
        from: '0x563bDabAa8846ec445b25Bfbed88d160890a02Ed',
        to: '0x563bDabAa8846ec445b25Bfbed88d160890a02Ed',
        assetIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        amountIn: 3796458224n,
        assetOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountOut: 1334971529092923524n,
        transaction: {
          hash: '0x0ec1a4297b198c61598307ed92aa254a234abe8a6ee9415713f8f35a491e9d01',
        },
        event: {
          address: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
          logIndex: 23,
        },
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual([
      {
        swaps,
        startAmount: 1320898745109993396n,
        endAmount: 1334971529092923524n,
        profitAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      },
    ]);
  });

  test('finds a USD profit arbitrage', () => {
    const swaps = [
      {
        contract: '0x231B7589426Ffe1b75405526fC32aC09D44364c4',
        from: '0xB23DC3F00856288Cd7B6Bde5D06159f01b75aA4C',
        to: '0xEE51984781254Ad1a0eE3ae0ca26c4D53Dea6ecB',
        assetIn: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        amountIn: 244490660460949241856n,
        assetOut: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        amountOut: 634888n,
        transaction: {
          hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
        },
        event: {
          address: '0x231B7589426Ffe1b75405526fC32aC09D44364c4',
          logIndex: 98,
        },
      },
      {
        contract: '0xEE51984781254Ad1a0eE3ae0ca26c4D53Dea6ecB',
        from: '0xB23DC3F00856288Cd7B6Bde5D06159f01b75aA4C',
        to: '0xf3933A6a82fba8a349a7124c8D8226d7c4d7b6Cb',
        assetIn: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        amountIn: 634888n,
        assetOut: '0x697eF32B4a3F5a4C39dE1cB7563f24CA7BfC5947',
        amountOut: 1275909030322046339158n,
        transaction: {
          hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
        },
        event: {
          address: '0xEE51984781254Ad1a0eE3ae0ca26c4D53Dea6ecB',
          logIndex: 101,
        },
      },
      {
        contract: '0xf3933A6a82fba8a349a7124c8D8226d7c4d7b6Cb',
        from: '0xB23DC3F00856288Cd7B6Bde5D06159f01b75aA4C',
        to: '0xB23DC3F00856288Cd7B6Bde5D06159f01b75aA4C',
        assetIn: '0x697eF32B4a3F5a4C39dE1cB7563f24CA7BfC5947',
        amountIn: 1275909030322046339158n,
        assetOut: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        amountOut: 263265751127846220157n,
        transaction: {
          hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
        },
        event: {
          address: '0xf3933A6a82fba8a349a7124c8D8226d7c4d7b6Cb',
          logIndex: 104,
        },
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual([
      {
        swaps,
        startAmount: 244490660460949241856n,
        endAmount: 263265751127846220157n,
        profitAsset: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      },
    ]);
  });

  test('finds multiple mev in one transaction', () => {
    const swaps = [
      {
        contract: '0x7f46c12a7Ac8343D11652FfFDaed411D2D427eB0',
        from: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        to: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        assetIn: '0xb2089A7069861C8D90c8dA3aaCAB8e9188C0C531',
        amountIn: 1987151334450n,
        assetOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountOut: 55589057873471949n,
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0x7f46c12a7Ac8343D11652FfFDaed411D2D427eB0',
          logIndex: 26,
        },
      },
      {
        contract: '0x4Efc9E2E3E77732Ce2F9612b8F050082C01688BD',
        from: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        to: '0x7f46c12a7Ac8343D11652FfFDaed411D2D427eB0',
        assetIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: 50662506837650511n,
        assetOut: '0xb2089A7069861C8D90c8dA3aaCAB8e9188C0C531',
        amountOut: 1987151334450n,
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0x4Efc9E2E3E77732Ce2F9612b8F050082C01688BD',
          logIndex: 28,
        },
      },
      {
        contract: '0x9C18A2F9545112AB2FCBDd228536562406A53232',
        from: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        to: '0x5399a36F54cA91a5DB5C148eEB2B909bBA81B82C',
        assetIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: 236177765391862272n,
        assetOut: '0x630d98424eFe0Ea27fB1b3Ab7741907DFFEaAd78',
        amountOut: 1370607005377n,
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0x9C18A2F9545112AB2FCBDd228536562406A53232',
          logIndex: 32,
        },
      },
      {
        contract: '0x5399a36F54cA91a5DB5C148eEB2B909bBA81B82C',
        from: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        to: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        assetIn: '0x630d98424eFe0Ea27fB1b3Ab7741907DFFEaAd78',
        amountIn: 1370607005377n,
        assetOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountOut: 240392410078442798n,
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0x5399a36F54cA91a5DB5C148eEB2B909bBA81B82C',
          logIndex: 35,
        },
      },
      {
        contract: '0xC8CA3C0f011FE42C48258ECBbf5d94c51f141C17',
        from: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        to: '0x1374042F78Fb0fc78658b17c053678940C008543',
        assetIn: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountIn: 414065221269164835n,
        assetOut: '0x1fE24F25b1Cf609B9c4e7E12D802e3640dFA5e43',
        amountOut: 4834125186588659431531n,
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0xC8CA3C0f011FE42C48258ECBbf5d94c51f141C17',
          logIndex: 41,
        },
      },
      {
        contract: '0x1374042F78Fb0fc78658b17c053678940C008543',
        from: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        to: '0x60594a405d53811d3BC4766596EFD80fd545A270',
        assetIn: '0x1fE24F25b1Cf609B9c4e7E12D802e3640dFA5e43',
        amountIn: 4834120317098111321210n,
        assetOut: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        amountOut: 1191073880145115762817n,
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0x1374042F78Fb0fc78658b17c053678940C008543',
          logIndex: 42,
        },
      },
      {
        contract: '0x60594a405d53811d3BC4766596EFD80fd545A270',
        from: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        to: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        assetIn: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        amountIn: 1191072689011330014562n,
        assetOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        amountOut: 421189973521534385n,
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0x60594a405d53811d3BC4766596EFD80fd545A270',
          logIndex: 43,
        },
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual([
      {
        swaps: [swaps[1], swaps[0]],
        startAmount: 50662506837650511n,
        endAmount: 55589057873471949n,
        profitAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      },
      {
        swaps: [swaps[2], swaps[3]],
        startAmount: 236177765391862272n,
        endAmount: 240392410078442798n,
        profitAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      },
      {
        swaps: [swaps[4], swaps[5], swaps[6]],
        startAmount: 414065221269164835n,
        endAmount: 421189973521534385n,
        profitAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      },
    ]);
  });

  test('counts russian doll arbitrage as a single item', () => {
    const swaps = [
      {
        contract: '0x25be6ce04a504D4BCEcb6ba7f5967F7aae6Af579',
        from: '0xEef86c2E49E11345F1a693675dF9a38f7d880C8F',
        to: '0x8fE536c7dC019455cce34746755C64bBE2Aa163b',
        assetIn: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
        amountIn: 8570113295352525635508n,
        assetOut: '0xc2544A32872A91F4A553b404C6950e89De901fdb',
        amountOut: 1482727342492416365490n,
        transaction: {
          hash: '0x08b606f3c528907688cdcab26a70cea2b9dd409850838662eb4b98a30ac33900',
        },
        event: {
          address: '0x25be6ce04a504D4BCEcb6ba7f5967F7aae6Af579',
          logIndex: 44,
        },
      },
      {
        contract: '0x9A834b70C07C81a9fcD6F22E842BF002fBfFbe4D',
        from: '0xEef86c2E49E11345F1a693675dF9a38f7d880C8F',
        to: '0x25be6ce04a504D4BCEcb6ba7f5967F7aae6Af579',
        assetIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        amountIn: 8570994710n,
        assetOut: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
        amountOut: 8570113295352525635508n,
        transaction: {
          hash: '0x08b606f3c528907688cdcab26a70cea2b9dd409850838662eb4b98a30ac33900',
        },
        event: {
          address: '0x9A834b70C07C81a9fcD6F22E842BF002fBfFbe4D',
          logIndex: 46,
        },
      },
      {
        contract: '0x8fE536c7dC019455cce34746755C64bBE2Aa163b',
        from: '0xEef86c2E49E11345F1a693675dF9a38f7d880C8F',
        to: '0xc63B0708E2F7e69CB8A1df0e1389A98C35A76D52',
        assetIn: '0xc2544A32872A91F4A553b404C6950e89De901fdb',
        amountIn: 1482727342492416365490n,
        assetOut: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
        amountOut: 8673476107028977732054n,
        transaction: {
          hash: '0x08b606f3c528907688cdcab26a70cea2b9dd409850838662eb4b98a30ac33900',
        },
        event: {
          address: '0x8fE536c7dC019455cce34746755C64bBE2Aa163b',
          logIndex: 47,
        },
      },
      {
        contract: '0xc63B0708E2F7e69CB8A1df0e1389A98C35A76D52',
        from: '0xEef86c2E49E11345F1a693675dF9a38f7d880C8F',
        to: '0xEef86c2E49E11345F1a693675dF9a38f7d880C8F',
        assetIn: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
        amountIn: 8673475239681367029156n,
        assetOut: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        amountOut: 8667791350n,
        transaction: {
          hash: '0x08b606f3c528907688cdcab26a70cea2b9dd409850838662eb4b98a30ac33900',
        },
        event: {
          address: '0xc63B0708E2F7e69CB8A1df0e1389A98C35A76D52',
          logIndex: 48,
        },
      },
    ];

    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual([
      {
        swaps: [swaps[1], swaps[0], swaps[2], swaps[3]],
        startAmount: 8570994710n,
        endAmount: 8667791350n,
        profitAsset: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      },
    ]);
  });
});
