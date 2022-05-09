import { describe, test, expect } from 'vitest';

import { getArbitrages } from '../../src/mev/arbitrage.js';

describe('MEV: arbitrage', () => {
  test('skips a simple swap', () => {
    const swaps = [
      {
        maker: '0x9928e4046d7c6513326cCeA028cD3e7a91c7590A',
        makerAmount: 29934139188201577438792n,
        makerAsset: '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
        taker: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        takerAmount: 76382000000000000000000n,
        takerAsset: '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B',
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
        maker: '0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974',
        makerAmount: 11499148166696888n,
        makerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        taker: '0x11111112542D85B3EF69AE05771c2dCCff4fAa26',
        takerAmount: 2918704295536500000n,
        takerAsset: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        transaction: {
          hash: '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
        },
        event: {
          address: '0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974',
          logIndex: 448,
        },
      },
      {
        maker: '0xCE84867c3c02B05dc570d0135103d3fB9CC19433',
        makerAmount: 13787057162799104322n,
        makerAsset: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
        taker: '0x11111112542D85B3EF69AE05771c2dCCff4fAa26',
        takerAmount: 11499148166696888n,
        takerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
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

  test('skips a multiprotocol split swap', () => {
    const swaps = [
      {
        maker: '0x8Bd1661Da98EBDd3BD080F0bE4e6d9bE8cE9858c',
        makerAmount: 12343477954337594771362n,
        makerAsset: '0x408e41876cCCDC0F92210600ef50372656052a38',
        taker: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        takerAmount: 1200000000000000000n,
        takerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        transaction: {
          hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
        },
        event: {
          address: '0x8Bd1661Da98EBDd3BD080F0bE4e6d9bE8cE9858c',
          logIndex: 74,
        },
      },
      {
        maker: '0x49ff149D649769033d43783E7456F626862CD160',
        makerAmount: 22594064483837836468324n,
        makerAsset: '0x408e41876cCCDC0F92210600ef50372656052a38',
        taker: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        takerAmount: 2200000000000000000n,
        takerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        transaction: {
          hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
        },
        event: {
          logIndex: 77,
          address: '0x49ff149D649769033d43783E7456F626862CD160',
        },
      },
      {
        maker: '0xec60a5fef79a92c741cb74fdd6bfc340c0279b01',
        makerAmount: 24663570517081979225739n,
        makerAsset: '0x408e41876cCCDC0F92210600ef50372656052a38',
        taker: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        takerAmount: 2400000000000000000n,
        takerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        transaction: {
          hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
        },
        event: {
          logIndex: 81,
          address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        },
      },
      {
        maker: '0x611CDe65deA90918c0078ac0400A72B0D25B9bb1',
        makerAmount: 43098743320715046083583n,
        makerAsset: '0x408e41876cCCDC0F92210600ef50372656052a38',
        taker: '0x220bdA5c8994804Ac96ebe4DF184d25e5c2196D4',
        takerAmount: 4200000000000000000n,
        takerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
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

  test.todo('finds internal 2 swap arbitrage', () => {
    // tx 0xc158502a952c98c8fe282b5e2bbe56e46fd0a4221c527e7d045f25ccca6a77b2
  });

  test('finds multistep internal arbitrage', () => {
    const swaps = [
      {
        maker: '0x41B536722C014a577F06A4Bb0dFa08BF0b8F5E87',
        makerAmount: 6627194964611846570392n,
        makerAsset: '0x4fE83213D56308330EC302a8BD641f1d0113A4Cc',
        taker: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        takerAmount: 760000000000000000n,
        takerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        },
        event: {
          address: '0x41B536722C014a577F06A4Bb0dFa08BF0b8F5E87',
          logIndex: 5,
        },
      },
      {
        maker: '0x3Ce42eF6b6617b5950C13D1c258eCFDcd30bB4De',
        makerAmount: 206953215405128955955015n,
        makerAsset: '0x3b94440C8c4F69D5C9F47BaB9C5A93064Df460F5',
        taker: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        takerAmount: 6627194964611846570392n,
        takerAsset: '0x4fE83213D56308330EC302a8BD641f1d0113A4Cc',
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        },
        event: {
          address: '0x3Ce42eF6b6617b5950C13D1c258eCFDcd30bB4De',
          logIndex: 6,
        },
      },
      {
        maker: '0xCC2bd4F3c00c37aDb00864D9a0a8cfEf8B6Ff56a',
        makerAmount: 91552167112393573131n,
        makerAsset: '0x58b6A8A3302369DAEc383334672404Ee733aB239',
        taker: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        takerAmount: 206953215405128955955015n,
        takerAsset: '0x3b94440C8c4F69D5C9F47BaB9C5A93064Df460F5',
        transaction: {
          hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
        },
        event: {
          address: '0xCC2bd4F3c00c37aDb00864D9a0a8cfEf8B6Ff56a',
          logIndex: 7,
        },
      },
      {
        maker: '0x2519042aa735eDb4688a8376d69D4BB69431206c',
        makerAmount: 778733861336038399n,
        makerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        taker: '0x5f62593C70069AbB35dFe2B63db969e8906609d6',
        takerAmount: 91552167112393573131n,
        takerAsset: '0x58b6A8A3302369DAEc383334672404Ee733aB239',
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

  test('finds cross protocol 2 swap arbitrage', () => {
    const swaps = [
      {
        maker: '0x69b81152c5A8d35A67B32A4D3772795d96CaE4da',
        makerAmount: 722121104748n,
        makerAsset: '0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5',
        taker: '0x58418d6c83EfAB01ed78b0AC42E55af01eE77DbA',
        takerAmount: 5137825921816247575n,
        takerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        transaction: {
          hash: '0xd53808dc31c908b7acad610d5efa726afe67e7c9739083be9c1b4cb6d2cdaeac',
        },
        event: {
          address: '0x69b81152c5A8d35A67B32A4D3772795d96CaE4da',
          logIndex: 10,
        },
      },
      {
        maker: '0x88051B0eea095007D3bEf21aB287Be961f3d8598',
        makerAmount: 5187612076728941787n,
        makerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        taker: '0x58418d6c83EfAB01ed78b0AC42E55af01eE77DbA',
        takerAmount: 722121104748n,
        takerAsset: '0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5',
        transaction: {
          hash: '0xd53808dc31c908b7acad610d5efa726afe67e7c9739083be9c1b4cb6d2cdaeac',
        },
        event: {
          address: '0x88051B0eea095007D3bEf21aB287Be961f3d8598',
          logIndex: 13,
        },
      },
    ];
    const arbitrages = getArbitrages(swaps);

    expect(arbitrages).toEqual([
      {
        swaps,
        startAmount: 5137825921816247575n,
        endAmount: 5187612076728941787n,
        profitAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      },
    ]);
  });

  test('finds cross protocol 3 swap arbitrage', () => {
    const swaps = [
      {
        maker: '0x30b705BfA64Be9AE395bD9238EfC63E9f5F8d1Cc',
        makerAmount: 76585579871319070341n,
        makerAsset: '0x33349B282065b0284d756F0577FB39c158F935e6',
        taker: '0x563bDabAa8846ec445b25Bfbed88d160890a02Ed',
        takerAmount: 1320898745109993396n,
        takerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        transaction: {
          hash: '0x0ec1a4297b198c61598307ed92aa254a234abe8a6ee9415713f8f35a491e9d01',
        },
        event: {
          logIndex: 12,
          address: '0x30b705BfA64Be9AE395bD9238EfC63E9f5F8d1Cc',
        },
      },
      {
        maker: '0x7b28470032DA06051f2E620531adBAeAdb285408',
        makerAmount: 3796458224n,
        makerAsset: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        taker: '0x563bDabAa8846ec445b25Bfbed88d160890a02Ed',
        takerAmount: 76585572212761083209n,
        takerAsset: '0x33349B282065b0284d756F0577FB39c158F935e6',
        transaction: {
          hash: '0x0ec1a4297b198c61598307ed92aa254a234abe8a6ee9415713f8f35a491e9d01',
        },
        event: {
          address: '0x7b28470032DA06051f2E620531adBAeAdb285408',
          logIndex: 22,
        },
      },
      {
        maker: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
        makerAmount: 1334971529092923524n,
        makerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        taker: '0x563bDabAa8846ec445b25Bfbed88d160890a02Ed',
        takerAmount: 3796458224n,
        takerAsset: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
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

  test('finds USD profit arbitrage', () => {
    const swaps = [
      {
        maker: '0x231B7589426Ffe1b75405526fC32aC09D44364c4',
        makerAmount: 634888n,
        makerAsset: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        taker: '0xB23DC3F00856288Cd7B6Bde5D06159f01b75aA4C',
        takerAmount: 244490660460949241856n,
        takerAsset: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        transaction: {
          hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
        },
        event: {
          address: '0x231B7589426Ffe1b75405526fC32aC09D44364c4',
          logIndex: 98,
        },
      },
      {
        maker: '0xEE51984781254Ad1a0eE3ae0ca26c4D53Dea6ecB',
        makerAmount: 1275909030322046339158n,
        makerAsset: '0x697eF32B4a3F5a4C39dE1cB7563f24CA7BfC5947',
        taker: '0xB23DC3F00856288Cd7B6Bde5D06159f01b75aA4C',
        takerAmount: 634888n,
        takerAsset: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        transaction: {
          hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
        },
        event: {
          address: '0xEE51984781254Ad1a0eE3ae0ca26c4D53Dea6ecB',
          logIndex: 101,
        },
      },
      {
        maker: '0xf3933A6a82fba8a349a7124c8D8226d7c4d7b6Cb',
        makerAmount: 263265751127846220157n,
        makerAsset: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        taker: '0xB23DC3F00856288Cd7B6Bde5D06159f01b75aA4C',
        takerAmount: 1275909030322046339158n,
        takerAsset: '0x697eF32B4a3F5a4C39dE1cB7563f24CA7BfC5947',
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

  test('finds multiple mev in one tx', () => {
    const swaps = [
      {
        maker: '0x7f46c12a7Ac8343D11652FfFDaed411D2D427eB0',
        makerAmount: 55589057873471949n,
        makerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        taker: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        takerAmount: 1987151334450n,
        takerAsset: '0xb2089A7069861C8D90c8dA3aaCAB8e9188C0C531',
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0x7f46c12a7Ac8343D11652FfFDaed411D2D427eB0',
          logIndex: 26,
        },
      },
      {
        maker: '0x4Efc9E2E3E77732Ce2F9612b8F050082C01688BD',
        makerAmount: 1987151334450n,
        makerAsset: '0xb2089A7069861C8D90c8dA3aaCAB8e9188C0C531',
        taker: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        takerAmount: 50662506837650511n,
        takerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0x4Efc9E2E3E77732Ce2F9612b8F050082C01688BD',
          logIndex: 28,
        },
      },
      {
        maker: '0x9C18A2F9545112AB2FCBDd228536562406A53232',
        makerAmount: 1370607005377n,
        makerAsset: '0x630d98424eFe0Ea27fB1b3Ab7741907DFFEaAd78',
        taker: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        takerAmount: 236177765391862272n,
        takerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0x9C18A2F9545112AB2FCBDd228536562406A53232',
          logIndex: 32,
        },
      },
      {
        maker: '0x5399a36F54cA91a5DB5C148eEB2B909bBA81B82C',
        makerAmount: 240392410078442798n,
        makerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        taker: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        takerAmount: 1370607005377n,
        takerAsset: '0x630d98424eFe0Ea27fB1b3Ab7741907DFFEaAd78',
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0x5399a36F54cA91a5DB5C148eEB2B909bBA81B82C',
          logIndex: 35,
        },
      },
      {
        maker: '0xC8CA3C0f011FE42C48258ECBbf5d94c51f141C17',
        makerAmount: 4834125186588659431531n,
        makerAsset: '0x1fE24F25b1Cf609B9c4e7E12D802e3640dFA5e43',
        taker: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        takerAmount: 414065221269164835n,
        takerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0xC8CA3C0f011FE42C48258ECBbf5d94c51f141C17',
          logIndex: 41,
        },
      },
      {
        maker: '0x1374042F78Fb0fc78658b17c053678940C008543',
        makerAmount: 1191073880145115762817n,
        makerAsset: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        taker: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        takerAmount: 4834120317098111321210n,
        takerAsset: '0x1fE24F25b1Cf609B9c4e7E12D802e3640dFA5e43',
        transaction: {
          hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
        },
        event: {
          address: '0x1374042F78Fb0fc78658b17c053678940C008543',
          logIndex: 42,
        },
      },
      {
        maker: '0x60594a405d53811d3BC4766596EFD80fd545A270',
        makerAmount: 421189973521534385n,
        makerAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        taker: '0x4d944a25bC871D6C6EE08baEf0b7dA0b08E6b7b3',
        takerAmount: 1191072689011330014562n,
        takerAsset: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
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

  test.todo('counts russian doll arbitrage as a single item', () => {
    // tx 0x08b606f3c528907688cdcab26a70cea2b9dd409850838662eb4b98a30ac33900
  });
});
