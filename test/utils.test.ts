import { describe, test, expect } from 'vitest';

import type { Arbitrage } from '../src/mev/arbitrage.js';
import type { JitSandwich } from '../src/mev/jitSandwiches.js';
import type { Liquidation } from '../src/mev/liquidations.js';
import type { NftArbitrage } from '../src/mev/nftArbitrages.js';
import type { Sandwich } from '../src/mev/sandwiches.js';
import {
  isArbitrage,
  isLiquidation,
  isSandwich,
  isJitSandwich,
  isNftArbitrage,
  equalWithTolerance,
  minByAbs,
  groupBy,
} from '../src/utils.js';

describe('Utilities', () => {
  test('isArbitrage: should be true a valid arbitrage', () => {
    expect(
      arbitrages
        .map((arbitrage) => isArbitrage(arbitrage))
        .every((isArbitrage) => isArbitrage),
    ).toBeTruthy();
  });

  test('isArbitrage: should be false for a non-arbitrage', () => {
    expect(
      liquidations
        .map((liquidation) => isArbitrage(liquidation))
        .every((isArbitrage) => !isArbitrage),
    ).toBeTruthy();

    expect(
      sandwiches
        .map((sandwich) => isArbitrage(sandwich))
        .every((isArbitrage) => !isArbitrage),
    ).toBeTruthy();

    expect(
      jitSandwiches
        .map((jitSandwich) => isArbitrage(jitSandwich))
        .every((isArbitrage) => !isArbitrage),
    ).toBeTruthy();

    expect(
      nftArbitrages
        .map((nftArbitrage) => isArbitrage(nftArbitrage))
        .every((isArbitrage) => !isArbitrage),
    ).toBeTruthy();
  });

  test('isLiquidation: should be true a valid liquidation', () => {
    expect(
      liquidations
        .map((liquidation) => isLiquidation(liquidation))
        .every((isLiquidation) => isLiquidation),
    ).toBeTruthy();
  });

  test('isLiquidation: should be false for a non-liquidation', () => {
    expect(
      arbitrages
        .map((arbitrage) => isLiquidation(arbitrage))
        .every((isLiquidation) => !isLiquidation),
    ).toBeTruthy();

    expect(
      sandwiches
        .map((sandwich) => isLiquidation(sandwich))
        .every((isLiquidation) => !isLiquidation),
    ).toBeTruthy();

    expect(
      jitSandwiches
        .map((jitSandwich) => isLiquidation(jitSandwich))
        .every((isLiquidation) => !isLiquidation),
    ).toBeTruthy();

    expect(
      nftArbitrages
        .map((nftArbitrage) => isLiquidation(nftArbitrage))
        .every((isLiquidation) => !isLiquidation),
    ).toBeTruthy();
  });

  test('isSandwich: should be true a valid sandwich', () => {
    expect(
      sandwiches
        .map((liquidation) => isSandwich(liquidation))
        .every((isSandwich) => isSandwich),
    ).toBeTruthy();
  });

  test('isSandwich: should be false for a non-sandwich', () => {
    expect(
      arbitrages
        .map((arbitrage) => isSandwich(arbitrage))
        .every((isSandwich) => !isSandwich),
    ).toBeTruthy();

    expect(
      liquidations
        .map((liquidation) => isSandwich(liquidation))
        .every((isSandwich) => !isSandwich),
    ).toBeTruthy();

    expect(
      jitSandwiches
        .map((jitSandwich) => isSandwich(jitSandwich))
        .every((isSandwich) => !isSandwich),
    ).toBeTruthy();

    expect(
      nftArbitrages
        .map((nftArbitrage) => isArbitrage(nftArbitrage))
        .every((isArbitrage) => !isArbitrage),
    ).toBeTruthy();
  });

  test('isJitSandwich: should be true a valid JIT sandwich', () => {
    expect(
      jitSandwiches
        .map((jitSandwich) => isJitSandwich(jitSandwich))
        .every((isJitSandwich) => isJitSandwich),
    ).toBeTruthy();
  });

  test('isJitSandwich: should be false for a non-JIT sandwich', () => {
    expect(
      arbitrages
        .map((arbitrage) => isJitSandwich(arbitrage))
        .every((isJitSandwich) => !isJitSandwich),
    ).toBeTruthy();

    expect(
      liquidations
        .map((liquidation) => isJitSandwich(liquidation))
        .every((isJitSandwich) => !isJitSandwich),
    ).toBeTruthy();

    expect(
      sandwiches
        .map((sandwich) => isJitSandwich(sandwich))
        .every((isJitSandwich) => !isJitSandwich),
    ).toBeTruthy();

    expect(
      nftArbitrages
        .map((nftArbitrage) => isJitSandwich(nftArbitrage))
        .every((isJitSandwich) => !isJitSandwich),
    ).toBeTruthy();
  });

  test('isNftArbitrage: should be true a valid NFT arbitrage', () => {
    expect(
      nftArbitrages
        .map((nftArbitrage) => isNftArbitrage(nftArbitrage))
        .every((isNftArbitrage) => isNftArbitrage),
    ).toBeTruthy();
  });

  test('isNftArbitrage: should be false for a non-NFT arbitrage', () => {
    expect(
      arbitrages
        .map((arbitrage) => isNftArbitrage(arbitrage))
        .every((isNftArbitrage) => !isNftArbitrage),
    ).toBeTruthy();

    expect(
      liquidations
        .map((liquidation) => isNftArbitrage(liquidation))
        .every((isNftArbitrage) => !isNftArbitrage),
    ).toBeTruthy();

    expect(
      sandwiches
        .map((sandwich) => isNftArbitrage(sandwich))
        .every((isNftArbitrage) => !isNftArbitrage),
    ).toBeTruthy();

    expect(
      jitSandwiches
        .map((jitSandwich) => isNftArbitrage(jitSandwich))
        .every((isNftArbitrage) => !isNftArbitrage),
    ).toBeTruthy();
  });

  test('equalWithTolerance: should be true for equal values', () => {
    const values: [bigint, bigint, number][] = [
      [0n, 0n, 0.01],
      [12n, 12n, 0.01],
      [956n, 956n, 0.0000001],
      [34n, 34n, 1],
      [-3n, -3n, 0.01],
      [
        123_456_789_123_456_789_123_456n,
        123_456_789_123_456_789_123_456n,
        0.01,
      ],
    ];

    for (const value of values) {
      expect(equalWithTolerance(...value)).toEqual(true);
    }
  });

  test('equalWithTolerance: should be true for values within bounds', () => {
    const values: [bigint, bigint, number][] = [
      [100n, 101n, 0.01],
      [987n, 978n, 0.01],
      [34_522n, 36_248n, 0.1],
      [100n, 200n, 1],
      [200n, 100n, 0.5],
      [100n, 101n, 0.05],
      [100n, 101n, 0.01],
      [100n, 99n, 0.01],
      [100n, 98n, 0.02],
      [-100n, -101n, 0.05],
      [-100n, -101n, 0.01],
      [-100n, -99n, 0.01],
      [-100n, -98n, 0.02],
    ];

    for (const value of values) {
      expect(equalWithTolerance(...value)).toEqual(true);
    }
  });

  test('equalWithTolerance: should be false for values outside bounds', () => {
    const values: [bigint, bigint, number][] = [
      [10_000_000n, 9_999_999n, 0],
      [10_000_000n, 9_999_998n, 0.0000001],
      [10n, 9n, 0.01],
      [200n, 100n, 0.1],
      [100n, 200n, 0.5],
      [100n, 201n, 0.01],
      [100n, 102n, 0.01],
      [100n, 98n, 0.01],
      [-100n, -102n, 0.01],
      [-100n, -98n, 0.01],
    ];

    for (const value of values) {
      expect(equalWithTolerance(...value)).toEqual(false);
    }
  });

  test('minByAbs', () => {
    expect(minByAbs(1n, 2n)).toEqual(1n);
    expect(minByAbs(0n, 2n)).toEqual(0n);
    expect(minByAbs(-1n, -2n)).toEqual(-1n);
    expect(minByAbs(-1n, 2n)).toEqual(-1n);
    expect(minByAbs(-2n, 1n)).toEqual(1n);
    expect(minByAbs(-2n, 0n)).toEqual(0n);
  });

  test('groupBy', () => {
    expect(groupBy([1, 2, 3], (item) => item.toString())).toEqual({
      '1': [1],
      '2': [2],
      '3': [3],
    });

    expect(
      groupBy(['apple', 'pear', 'orange', 'lemon'], (item) =>
        item.length.toString(),
      ),
    ).toEqual({
      '4': ['pear'],
      '5': ['apple', 'lemon'],
      '6': ['orange'],
    });

    const personA = {
      name: 'Lily',
      age: 14,
    };
    const personB = {
      name: 'Anton',
      age: 15,
    };
    const personC = {
      name: 'Jack',
      age: 14,
    };
    expect(
      groupBy([personA, personB, personC], (item) => item.age.toString()),
    ).toEqual({
      '14': [personA, personC],
      '15': [personB],
    });
  });

  const arbitrages: Arbitrage[] = [
    {
      swaps: [
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
      ],
      profit: {
        amount: 183617382456032545n,
        asset: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      arbitrager: {
        sender: '0x0000000a9dbf8af9fe5ea03ff1272d8242ed3ab1',
        beneficiary: '0x0000000000005117dd3a72e64a705198753fdd54',
      },
    },
    {
      swaps: [
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
      ],
      profit: {
        amount: 18775090666896978301n,
        asset: {
          type: 'erc20',
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        },
      },
      arbitrager: {
        sender: '0x38accdeb1c62dade625bcabdca85701d5f6c8618',
        beneficiary: '0xb23dc3f00856288cd7b6bde5d06159f01b75aa4c',
      },
    },
  ];

  const liquidations: Liquidation[] = [
    {
      repayment: {
        contract: {
          address: '0x041171993284df560249B57358F931D9eB7b925D',
          protocol: {
            abi: 'CompoundV2',
            pool: {
              address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
              label: 'Compound V2',
            },
          },
        },
        block: {
          hash: '0x2807e9aaf0406aa232f9d95aca53f38670501c8186d39feb673c0ea12905da33',
          number: 14787423,
        },
        transaction: {
          from: '0xf4bb585ab3bcb7ce3b817ab2abd1c8ea2e691687',
          hash: '0xdf838db24228f280eba8a279266d1602b03b54507afdca3cb4b4ec640535642b',
          index: 3,
          gasUsed: 671221,
        },
        event: {
          logIndex: 17,
          address: '0x041171993284df560249b57358f931d9eb7b925d',
        },
        payer: '0xb5c7ad3cb6506c65da01f2fac2e667dcb9e66e9c',
        borrower: '0xf7f6192e35d15a153105d4476a1b4d59ec2014dd',
        asset: {
          type: 'erc20',
          address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
        },
        amount: 1257619793546196402568n,
      },
      seizure: {
        contract: {
          address: '0x041171993284df560249B57358F931D9eB7b925D',
          protocol: {
            abi: 'CompoundV2',
            pool: {
              address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
              label: 'Compound V2',
            },
          },
        },
        block: {
          hash: '0x2807e9aaf0406aa232f9d95aca53f38670501c8186d39feb673c0ea12905da33',
          number: 14787423,
        },
        transaction: {
          from: '0xf4bb585ab3bcb7ce3b817ab2abd1c8ea2e691687',
          hash: '0xdf838db24228f280eba8a279266d1602b03b54507afdca3cb4b4ec640535642b',
          index: 3,
          gasUsed: 671221,
        },
        event: {
          logIndex: 21,
          address: '0x041171993284df560249b57358f931d9eb7b925d',
        },
        seizor: '0xb5c7ad3cb6506c65da01f2fac2e667dcb9e66e9c',
        borrower: '0xf7f6192e35d15a153105d4476a1b4d59ec2014dd',
        asset: {
          type: 'erc20',
          address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
        },
        amount: 3402851288n,
      },
      liquidator: {
        sender: '0xf4bb585ab3bcb7ce3b817ab2abd1c8ea2e691687',
        beneficiary: '0xb5c7ad3cb6506c65da01f2fac2e667dcb9e66e9c',
      },
      borrower: '0xf7f6192e35d15a153105d4476a1b4d59ec2014dd',
      collateral: {
        asset: {
          type: 'erc20',
          address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
        },
        amount: 3402851288n,
      },
      debt: {
        asset: {
          type: 'erc20',
          address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
        },
        amount: 1257619793546196402568n,
      },
    },
    {
      repayment: {
        contract: {
          address: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
          protocol: {
            abi: 'AaveV2',
            pool: {
              address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
              label: 'Aave V2',
            },
          },
        },
        block: {
          hash: '0x4c462f472947289c04108125cfdc124b32db90e5db9851777f7502346ac3b1f0',
          number: 14802369,
        },
        transaction: {
          from: '0x01a5677183bd82e97be53ad6900bbcff50ca6743',
          hash: '0x580a2d8d142207a50636b74d41feca1774b106143c536078ca80de000f83f3d8',
          index: 26,
          gasUsed: 556582,
        },
        event: {
          logIndex: 146,
          address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        },
        payer: '0xd911560979b78821d7b045c79e36e9cbfc2f6c6f',
        borrower: '0xa8556b50ab7781eeccf647eec1c0bf3bf9e5b3ad',
        asset: {
          type: 'erc20',
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
        amount: 631587280n,
      },
      seizure: {
        contract: {
          address: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
          protocol: {
            abi: 'AaveV2',
            pool: {
              address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
              label: 'Aave V2',
            },
          },
        },
        block: {
          hash: '0x4c462f472947289c04108125cfdc124b32db90e5db9851777f7502346ac3b1f0',
          number: 14802369,
        },
        transaction: {
          from: '0x01a5677183bd82e97be53ad6900bbcff50ca6743',
          hash: '0x580a2d8d142207a50636b74d41feca1774b106143c536078ca80de000f83f3d8',
          index: 26,
          gasUsed: 556582,
        },
        event: {
          logIndex: 146,
          address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        },
        seizor: '0xd911560979b78821d7b045c79e36e9cbfc2f6c6f',
        borrower: '0xa8556b50ab7781eeccf647eec1c0bf3bf9e5b3ad',
        asset: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amount: 344839185141066670n,
      },
      liquidator: {
        sender: '0x01a5677183bd82e97be53ad6900bbcff50ca6743',
        beneficiary: '0xd911560979b78821d7b045c79e36e9cbfc2f6c6f',
      },
      borrower: '0xa8556b50ab7781eeccf647eec1c0bf3bf9e5b3ad',
      collateral: {
        asset: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amount: 344839185141066670n,
      },
      debt: {
        asset: {
          type: 'erc20',
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
        amount: 631587280n,
      },
    },
  ];

  const sandwiches: Sandwich[] = [
    {
      sandwiched: [
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
          block: {
            hash: '0x26d3df804173e776bdbfa862d2ecf899696c20b02621f4148e1359bf81d6a8b0',
            number: 14899935,
          },
          transaction: {
            from: '0xeae5f13fe7c773c5bc942d168a9bf81e9cb4394a',
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
          assetIn: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
          amountIn: 79500000000000000n,
          assetOut: {
            type: 'erc20',
            address: '0xb2089a7069861c8d90c8da3aacab8e9188c0c531',
          },
          amountOut: 1461079497665n,
          metadata: {},
        },
      ],
      sandwicher: {
        sender: '0x5aa17fc7f2950eca85376c3a8cb1509e8e4b39df',
        beneficiary: '0x01ff6318440f7d5553a82294d78262d5f5084eff',
      },
      frontSwap: {
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
        block: {
          hash: '0x26d3df804173e776bdbfa862d2ecf899696c20b02621f4148e1359bf81d6a8b0',
          number: 14899935,
        },
        transaction: {
          from: '0x5aa17fc7f2950eca85376c3a8cb1509e8e4b39df',
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
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 100390000000000000n,
        assetOut: {
          type: 'erc20',
          address: '0xb2089a7069861c8d90c8da3aacab8e9188c0c531',
        },
        amountOut: 2175552445891n,
        metadata: {},
      },
      backSwap: {
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
        block: {
          hash: '0x26d3df804173e776bdbfa862d2ecf899696c20b02621f4148e1359bf81d6a8b0',
          number: 14899935,
        },
        transaction: {
          from: '0x5aa17fc7f2950eca85376c3a8cb1509e8e4b39df',
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
        assetIn: {
          type: 'erc20',
          address: '0xb2089a7069861c8d90c8da3aacab8e9188c0c531',
        },
        amountIn: 2175552445891n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 113987923265421470n,
        metadata: {},
      },
      profit: {
        asset: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amount: 13597923265421469n,
      },
    },
    {
      sandwiched: [
        {
          contract: {
            address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
            protocol: {
              abi: 'CurveV2',
              factory: {
                address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
                label: 'Curve V2',
              },
            },
          },
          block: {
            hash: '0x34057bae81d5322ee709fd8e4390603e9c4e0df14efd39521038d5ec7e9e3817',
            number: 15175481,
          },
          transaction: {
            from: '0x85d14b5b709573c275b1ca9c1686cc120e9e715f',
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
            {
              type: 'erc20',
              address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            },
            {
              type: 'erc20',
              address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            },
            {
              type: 'erc20',
              address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            },
          ],
          amounts: [2023937497942n, 0n, 0n],
          metadata: {},
        },
      ],
      sandwicher: {
        sender: '0xb8feffac830c45b4cd210ecdaab9d11995d338ee',
        beneficiary: '0xe8c060f8052e07423f71d445277c61ac5138a2e5',
      },
      frontSwap: {
        contract: {
          address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
          protocol: {
            abi: 'CurveV2',
            factory: {
              address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
              label: 'Curve V2',
            },
          },
        },
        block: {
          hash: '0x34057bae81d5322ee709fd8e4390603e9c4e0df14efd39521038d5ec7e9e3817',
          number: 15175481,
        },
        transaction: {
          from: '0xb8feffac830c45b4cd210ecdaab9d11995d338ee',
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
        assetIn: {
          type: 'erc20',
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
        amountIn: 853117383751n,
        assetOut: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountOut: 536882756779800724303n,
        metadata: {},
      },
      backSwap: {
        contract: {
          address: '0xd51a44d3fae010294c616388b506acda1bfaae46',
          protocol: {
            abi: 'CurveV2',
            factory: {
              address: '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
              label: 'Curve V2',
            },
          },
        },
        block: {
          hash: '0x34057bae81d5322ee709fd8e4390603e9c4e0df14efd39521038d5ec7e9e3817',
          number: 15175481,
        },
        transaction: {
          from: '0xb8feffac830c45b4cd210ecdaab9d11995d338ee',
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
        assetIn: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amountIn: 624380905015738368000n,
        assetOut: {
          type: 'erc20',
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
        amountOut: 1011416590749n,
        metadata: {},
      },
      profit: {
        asset: {
          type: 'erc20',
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
        amount: 16563484340n,
      },
    },
  ];

  const jitSandwiches: JitSandwich[] = [
    {
      sandwicher: {
        sender: '0x4603180bbb8221157880afaa84638e0fc467738d',
        beneficiary: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
      },
      deposit: {
        contract: {
          address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        block: {
          hash: '0x46242a1e6f84eadb3cb4d6a1074115b2e2c63a647d999985ea71078fbab2f6ec',
          number: 15194488,
        },
        transaction: {
          from: '0x4603180bbb8221157880afaa84638e0fc467738d',
          hash: '0x5ffe23a52fd695160fc5eef15678576574e7c42cb7203568031f33ce09d30c49',
          index: 4,
          gasUsed: 591690,
        },
        event: {
          address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
          logIndex: 24,
        },
        depositor: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
        assets: [
          {
            type: 'erc20',
            address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
          },
          {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        ],
        amounts: [129735801701915403613047n, 458679217156579091198n],
        metadata: { tickLower: -54900, tickUpper: -54840 },
      },
      withdrawal: {
        contract: {
          address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        block: {
          hash: '0x46242a1e6f84eadb3cb4d6a1074115b2e2c63a647d999985ea71078fbab2f6ec',
          number: 15194488,
        },
        transaction: {
          from: '0x4603180bbb8221157880afaa84638e0fc467738d',
          hash: '0x0e93b0006f66e5efd9e5b26c090f7dab202bea6151bb6f942e636601034567eb',
          index: 6,
          gasUsed: 253098,
        },
        event: {
          address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
          logIndex: 35,
        },
        withdrawer: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
        assets: [
          {
            type: 'erc20',
            address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
          },
          {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
        ],
        amounts: [138200019333940881352647n, 423637645189105331266n],
        metadata: { tickLower: -54900, tickUpper: -54840 },
      },
      sandwiched: [
        {
          contract: {
            address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
            protocol: {
              abi: 'UniswapV3',
              factory: {
                address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
                label: 'Uniswap V3',
              },
            },
          },
          block: {
            hash: '0x46242a1e6f84eadb3cb4d6a1074115b2e2c63a647d999985ea71078fbab2f6ec',
            number: 15194488,
          },
          transaction: {
            from: '0x53fe3edb7604fec209157a5318aa696308bf0dea',
            hash: '0xe533410ec2eb24a443e8b209ce293424e01997f55b84c6b76c9bfb478393dd4c',
            index: 5,
            gasUsed: 207310,
          },
          event: {
            address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
            logIndex: 31,
          },
          from: '0x53fe3edb7604fec209157a5318aa696308bf0dea',
          to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
          assetIn: {
            type: 'erc20',
            address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
          },
          amountIn: 8917981510557040846754n,
          assetOut: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
          amountOut: 36809378513050823801n,
          metadata: { tick: -54875 },
        },
      ],
      deltas: [
        {
          asset: {
            type: 'erc20',
            address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
          },
          amount: 8464217632025477739600n,
        },
        {
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
          amount: -35041571967473759932n,
        },
      ],
    },
  ];

  const nftArbitrages: NftArbitrage[] = [
    {
      swaps: [
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
            hash: '0xf688e5d238c0acc87ff424d0903e2e05c2e2761ecde37792af5f52c02ecab84d',
            number: 15293406,
          },
          transaction: {
            from: '0xbce31af175dfc6be46d93665ab2022ec9420ac57',
            hash: '0x21dc6fba36e9ea446d5997f7e4030f3fc9c1eb4a65aad89d4904cf39b7642ba3',
            index: 0,
            gasUsed: 240735,
          },
          event: {
            address: '0x00000000006c3852cbef3e08e8df289169ede581',
            logIndex: 0,
          },
          from: '0x0000008682fa8c3aa14b11894e90e3dcbbff715b',
          to: '0x0000008682fa8c3aa14b11894e90e3dcbbff715b',
          assetIn: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
          amountIn: 34990000000000000n,
          assetOut: {
            type: 'erc721',
            collection: '0x80d2f4321d5fcbae61d06b8a716b1b1ef49471df',
            id: 1n,
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
            hash: '0xf688e5d238c0acc87ff424d0903e2e05c2e2761ecde37792af5f52c02ecab84d',
            number: 15293406,
          },
          transaction: {
            from: '0xbce31af175dfc6be46d93665ab2022ec9420ac57',
            hash: '0x21dc6fba36e9ea446d5997f7e4030f3fc9c1eb4a65aad89d4904cf39b7642ba3',
            index: 0,
            gasUsed: 240735,
          },
          event: {
            address: '0x00000000006c3852cbef3e08e8df289169ede581',
            logIndex: 2,
          },
          from: '0x0000008682fa8c3aa14b11894e90e3dcbbff715b',
          to: '0x0000008682fa8c3aa14b11894e90e3dcbbff715b',
          assetIn: {
            type: 'erc721',
            collection: '0x80d2f4321d5fcbae61d06b8a716b1b1ef49471df',
            id: 1n,
          },
          amountIn: 1n,
          assetOut: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
          amountOut: 59508750000000000n,
        },
      ],
      profit: {
        amount: 24518750000000000n,
        asset: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
      },
      arbitrager: {
        sender: '0xbce31af175dfc6be46d93665ab2022ec9420ac57',
        beneficiary: '0x0000008682fa8c3aa14b11894e90e3dcbbff715b',
      },
    },
    {
      swaps: [
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
      ],
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
  ];
});
