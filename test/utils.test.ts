import { describe, test, expect } from 'vitest';

import { Arbitrage } from '../src/mev/arbitrage.js';
import { Liquidation } from '../src/mev/liquidations.js';
import {
  isArbitrage,
  isLiquidation,
  equalWithTolerance,
} from '../src/utils.js';

describe('Utilities', () => {
  test('isArbitrage: should be true a valid arbitrage', () => {
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
            assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            amountIn: 238841017533640100000n,
            assetOut: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            amountOut: 1750639111n,
            block: {
              hash: '0xef740f61a6a8a0d45114d57a9e9b9d5f4de852b9026b6c5b4d8cc18815819d00',
              number: 14744280,
            },
            transaction: {
              hash: '0xc158502a952c98c8fe282b5e2bbe56e46fd0a4221c527e7d045f25ccca6a77b2',
              gasUsed: 230198,
            },
            event: {
              address: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
              logIndex: 35,
            },
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
            assetIn: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            amountIn: 1750639111n,
            assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            amountOut: 239024634916096132545n,
            block: {
              hash: '0xef740f61a6a8a0d45114d57a9e9b9d5f4de852b9026b6c5b4d8cc18815819d00',
              number: 14744280,
            },
            transaction: {
              hash: '0xc158502a952c98c8fe282b5e2bbe56e46fd0a4221c527e7d045f25ccca6a77b2',
              gasUsed: 230198,
            },
            event: {
              address: '0x4585fe77225b41b697c938b018e2ac67ac5a20c0',
              logIndex: 33,
            },
          },
        ],
        startAmount: 238841017533640100000n,
        endAmount: 239024634916096132545n,
        profitAsset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
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
            assetIn: '0x6b175474e89094c44da98b954eedeac495271d0f',
            amountIn: 244490660460949241856n,
            assetOut: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            amountOut: 634888n,
            block: {
              hash: '0x0b598c9b3121baecd1db3ece3ff690bb1c91c8c46f9298517f58b6aaec982a8f',
              number: 14703569,
            },
            transaction: {
              hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
              gasUsed: 818860,
            },
            event: {
              address: '0x231b7589426ffe1b75405526fc32ac09d44364c4',
              logIndex: 98,
            },
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
            assetIn: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            amountIn: 634888n,
            assetOut: '0x697ef32b4a3f5a4c39de1cb7563f24ca7bfc5947',
            amountOut: 1275909030322046339158n,
            block: {
              hash: '0x0b598c9b3121baecd1db3ece3ff690bb1c91c8c46f9298517f58b6aaec982a8f',
              number: 14703569,
            },
            transaction: {
              hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
              gasUsed: 818860,
            },
            event: {
              address: '0xee51984781254ad1a0ee3ae0ca26c4d53dea6ecb',
              logIndex: 101,
            },
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
            assetIn: '0x697ef32b4a3f5a4c39de1cb7563f24ca7bfc5947',
            amountIn: 1275909030322046339158n,
            assetOut: '0x6b175474e89094c44da98b954eedeac495271d0f',
            amountOut: 263265751127846220157n,
            block: {
              hash: '0x0b598c9b3121baecd1db3ece3ff690bb1c91c8c46f9298517f58b6aaec982a8f',
              number: 14703569,
            },
            transaction: {
              hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
              gasUsed: 818860,
            },
            event: {
              address: '0xf3933a6a82fba8a349a7124c8d8226d7c4d7b6cb',
              logIndex: 104,
            },
          },
        ],
        startAmount: 244490660460949241856n,
        endAmount: 263265751127846220157n,
        profitAsset: '0x6b175474e89094c44da98b954eedeac495271d0f',
      },
    ];

    expect(
      arbitrages
        .map((arbitrage) => isArbitrage(arbitrage))
        .every((isArbitrage) => isArbitrage),
    ).toBeTruthy();
  });

  test('isArbitrage: should be false for a non-arbitrage', () => {
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
            hash: '0xdf838db24228f280eba8a279266d1602b03b54507afdca3cb4b4ec640535642b',
            gasUsed: 671221,
          },
          event: {
            logIndex: 17,
            address: '0x041171993284df560249b57358f931d9eb7b925d',
          },
          payer: '0xb5c7ad3cb6506c65da01f2fac2e667dcb9e66e9c',
          borrower: '0xf7f6192e35d15a153105d4476a1b4d59ec2014dd',
          asset: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
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
            hash: '0xdf838db24228f280eba8a279266d1602b03b54507afdca3cb4b4ec640535642b',
            gasUsed: 671221,
          },
          event: {
            logIndex: 21,
            address: '0x041171993284df560249b57358f931d9eb7b925d',
          },
          seizor: '0xb5c7ad3cb6506c65da01f2fac2e667dcb9e66e9c',
          borrower: '0xf7f6192e35d15a153105d4476a1b4d59ec2014dd',
          asset: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
          amount: 3402851288n,
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
            hash: '0x580a2d8d142207a50636b74d41feca1774b106143c536078ca80de000f83f3d8',
            gasUsed: 556582,
          },
          event: {
            logIndex: 146,
            address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
          },
          payer: '0xd911560979b78821d7b045c79e36e9cbfc2f6c6f',
          borrower: '0xa8556b50ab7781eeccf647eec1c0bf3bf9e5b3ad',
          asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
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
            hash: '0x580a2d8d142207a50636b74d41feca1774b106143c536078ca80de000f83f3d8',
            gasUsed: 556582,
          },
          event: {
            logIndex: 146,
            address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
          },
          seizor: '0xd911560979b78821d7b045c79e36e9cbfc2f6c6f',
          borrower: '0xa8556b50ab7781eeccf647eec1c0bf3bf9e5b3ad',
          asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          amount: 344839185141066670n,
        },
      },
    ];

    expect(
      liquidations
        .map((liquidation) => isArbitrage(liquidation))
        .every((isArbitrage) => isArbitrage),
    ).toBeFalsy();
  });

  test('isLiquidation: should be true a valid liquidation', () => {
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
            hash: '0xdf838db24228f280eba8a279266d1602b03b54507afdca3cb4b4ec640535642b',
            gasUsed: 671221,
          },
          event: {
            logIndex: 17,
            address: '0x041171993284df560249b57358f931d9eb7b925d',
          },
          payer: '0xb5c7ad3cb6506c65da01f2fac2e667dcb9e66e9c',
          borrower: '0xf7f6192e35d15a153105d4476a1b4d59ec2014dd',
          asset: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
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
            hash: '0xdf838db24228f280eba8a279266d1602b03b54507afdca3cb4b4ec640535642b',
            gasUsed: 671221,
          },
          event: {
            logIndex: 21,
            address: '0x041171993284df560249b57358f931d9eb7b925d',
          },
          seizor: '0xb5c7ad3cb6506c65da01f2fac2e667dcb9e66e9c',
          borrower: '0xf7f6192e35d15a153105d4476a1b4d59ec2014dd',
          asset: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
          amount: 3402851288n,
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
            hash: '0x580a2d8d142207a50636b74d41feca1774b106143c536078ca80de000f83f3d8',
            gasUsed: 556582,
          },
          event: {
            logIndex: 146,
            address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
          },
          payer: '0xd911560979b78821d7b045c79e36e9cbfc2f6c6f',
          borrower: '0xa8556b50ab7781eeccf647eec1c0bf3bf9e5b3ad',
          asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
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
            hash: '0x580a2d8d142207a50636b74d41feca1774b106143c536078ca80de000f83f3d8',
            gasUsed: 556582,
          },
          event: {
            logIndex: 146,
            address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
          },
          seizor: '0xd911560979b78821d7b045c79e36e9cbfc2f6c6f',
          borrower: '0xa8556b50ab7781eeccf647eec1c0bf3bf9e5b3ad',
          asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          amount: 344839185141066670n,
        },
      },
    ];

    expect(
      liquidations
        .map((liquidation) => isLiquidation(liquidation))
        .every((isLiquidation) => isLiquidation),
    ).toBeTruthy();
  });

  test('isLiquidation: should be false for a non-liquidation', () => {
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
            assetIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            amountIn: 238841017533640100000n,
            assetOut: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            amountOut: 1750639111n,
            block: {
              hash: '0xef740f61a6a8a0d45114d57a9e9b9d5f4de852b9026b6c5b4d8cc18815819d00',
              number: 14744280,
            },
            transaction: {
              hash: '0xc158502a952c98c8fe282b5e2bbe56e46fd0a4221c527e7d045f25ccca6a77b2',
              gasUsed: 230198,
            },
            event: {
              address: '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
              logIndex: 35,
            },
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
            assetIn: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            amountIn: 1750639111n,
            assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            amountOut: 239024634916096132545n,
            block: {
              hash: '0xef740f61a6a8a0d45114d57a9e9b9d5f4de852b9026b6c5b4d8cc18815819d00',
              number: 14744280,
            },
            transaction: {
              hash: '0xc158502a952c98c8fe282b5e2bbe56e46fd0a4221c527e7d045f25ccca6a77b2',
              gasUsed: 230198,
            },
            event: {
              address: '0x4585fe77225b41b697c938b018e2ac67ac5a20c0',
              logIndex: 33,
            },
          },
        ],
        startAmount: 238841017533640100000n,
        endAmount: 239024634916096132545n,
        profitAsset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
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
            assetIn: '0x6b175474e89094c44da98b954eedeac495271d0f',
            amountIn: 244490660460949241856n,
            assetOut: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            amountOut: 634888n,
            block: {
              hash: '0x0b598c9b3121baecd1db3ece3ff690bb1c91c8c46f9298517f58b6aaec982a8f',
              number: 14703569,
            },
            transaction: {
              hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
              gasUsed: 818860,
            },
            event: {
              address: '0x231b7589426ffe1b75405526fc32ac09d44364c4',
              logIndex: 98,
            },
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
            assetIn: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            amountIn: 634888n,
            assetOut: '0x697ef32b4a3f5a4c39de1cb7563f24ca7bfc5947',
            amountOut: 1275909030322046339158n,
            block: {
              hash: '0x0b598c9b3121baecd1db3ece3ff690bb1c91c8c46f9298517f58b6aaec982a8f',
              number: 14703569,
            },
            transaction: {
              hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
              gasUsed: 818860,
            },
            event: {
              address: '0xee51984781254ad1a0ee3ae0ca26c4d53dea6ecb',
              logIndex: 101,
            },
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
            assetIn: '0x697ef32b4a3f5a4c39de1cb7563f24ca7bfc5947',
            amountIn: 1275909030322046339158n,
            assetOut: '0x6b175474e89094c44da98b954eedeac495271d0f',
            amountOut: 263265751127846220157n,
            block: {
              hash: '0x0b598c9b3121baecd1db3ece3ff690bb1c91c8c46f9298517f58b6aaec982a8f',
              number: 14703569,
            },
            transaction: {
              hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
              gasUsed: 818860,
            },
            event: {
              address: '0xf3933a6a82fba8a349a7124c8d8226d7c4d7b6cb',
              logIndex: 104,
            },
          },
        ],
        startAmount: 244490660460949241856n,
        endAmount: 263265751127846220157n,
        profitAsset: '0x6b175474e89094c44da98b954eedeac495271d0f',
      },
    ];

    expect(
      arbitrages
        .map((arbitrage) => isLiquidation(arbitrage))
        .every((isLiquidation) => isLiquidation),
    ).toBeFalsy();
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
});
