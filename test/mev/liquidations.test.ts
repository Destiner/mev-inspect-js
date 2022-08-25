import { describe, test, expect } from 'vitest';

import { Repayment, Seizure } from '../../src/index.js';
import { Liquidation, getLiquidations } from '../../src/mev/liquidations.js';

describe('MEV: liquidations', () => {
  test('Compound V2 liquidation', () => {
    const repaymentsA: Repayment[] = [
      {
        contract: {
          address: '0x041171993284df560249b57358f931d9eb7b925d',
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
    ];

    const seizuresA: Seizure[] = [
      {
        contract: {
          address: '0x041171993284df560249b57358f931d9eb7b925d',
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
    ];

    const repaymentsB: Repayment[] = [
      {
        contract: {
          address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
          protocol: {
            abi: 'CompoundV2',
            pool: {
              address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
              label: 'Compound V2',
            },
          },
        },
        block: {
          hash: '0x9d180bbdcfe694f685b01967cc56b0177cf925e396a11b9f2b3554a3ad50e55f',
          number: 14803328,
        },
        transaction: {
          from: '0x0177ffdf6b5c00ff8eab1a498ea10191ebc965db',
          hash: '0x02a100bfcc45a40b1d4fda92d6c17acb420d4fee8bc2b5bac3fa4650bf7d5093',
          index: 11,
          gasUsed: 676976,
        },
        event: {
          logIndex: 62,
          address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
        },
        payer: '0x9a0ef593dcc6a77f80699c9fa00d1e138b67d832',
        borrower: '0x532fd36ea87cf9f316fad40b39385a4716065b8c',
        asset: {
          type: 'erc20',
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
        amount: 242839054n,
      },
    ];

    const seizuresB: Seizure[] = [
      {
        contract: {
          address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
          protocol: {
            abi: 'CompoundV2',
            pool: {
              address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
              label: 'Compound V2',
            },
          },
        },
        block: {
          hash: '0x9d180bbdcfe694f685b01967cc56b0177cf925e396a11b9f2b3554a3ad50e55f',
          number: 14803328,
        },
        transaction: {
          from: '0x0177ffdf6b5c00ff8eab1a498ea10191ebc965db',
          hash: '0x02a100bfcc45a40b1d4fda92d6c17acb420d4fee8bc2b5bac3fa4650bf7d5093',
          index: 11,
          gasUsed: 676976,
        },
        event: {
          logIndex: 66,
          address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
        },
        seizor: '0x9a0ef593dcc6a77f80699c9fa00d1e138b67d832',
        borrower: '0x532fd36ea87cf9f316fad40b39385a4716065b8c',
        asset: {
          type: 'erc20',
          address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
        },
        amount: 670843809n,
      },
    ];

    const liquidationsA = getLiquidations(repaymentsA, seizuresA);
    const liquidationsB = getLiquidations(repaymentsB, seizuresB);

    expect(liquidationsA).toEqual<Liquidation[]>([
      {
        repayment: repaymentsA[0],
        seizure: seizuresA[0],
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
    ]);
    expect(liquidationsB).toEqual<Liquidation[]>([
      {
        repayment: repaymentsB[0],
        seizure: seizuresB[0],
        liquidator: {
          sender: '0x0177ffdf6b5c00ff8eab1a498ea10191ebc965db',
          beneficiary: '0x9a0ef593dcc6a77f80699c9fa00d1e138b67d832',
        },
        borrower: '0x532fd36ea87cf9f316fad40b39385a4716065b8c',
        collateral: {
          asset: {
            type: 'erc20',
            address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
          },
          amount: 670843809n,
        },
        debt: {
          asset: {
            type: 'erc20',
            address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          },
          amount: 242839054n,
        },
      },
    ]);
  });

  test('Aave V2 liquidation', () => {
    const repaymentsA: Repayment[] = [
      {
        contract: {
          address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
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
    ];

    const seizuresA: Seizure[] = [
      {
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
    ];

    const repaymentsB: Repayment[] = [
      {
        contract: {
          address: '0x7937D4799803FbBe595ed57278Bc4cA21f3bFfCB',
          protocol: {
            abi: 'AaveV2',
            pool: {
              address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
              label: 'Aave V2',
            },
          },
        },
        block: {
          hash: '0xe847c92d57176722ec3e045fffd3af3475a76c761adc6007d4ce5f1565ae6626',
          number: 14769194,
        },
        transaction: {
          from: '0x5368b4d517645749e9e7f8ba10d81ae609c40beb',
          hash: '0x9529b0332f51d586a1d30f9106558daf3dbc66c6bbbd32935f19fbc2601b7aa1',
          index: 25,
          gasUsed: 529738,
        },
        event: {
          logIndex: 190,
          address: '0x7937d4799803fbbe595ed57278bc4ca21f3bffcb',
        },
        payer: '0x5e37d0aaf14f00f91fd3fb64f3cd576dcbaaac41',
        borrower: '0xabdc47ed04c62b6c0d58f2668cd09200688e1495',
        asset: {
          type: 'erc20',
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
        amount: 1191908646n,
      },
    ];

    const seizuresB: Seizure[] = [
      {
        contract: {
          address: '0x7937D4799803FbBe595ed57278Bc4cA21f3bFfCB',
          protocol: {
            abi: 'AaveV2',
            pool: {
              address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
              label: 'Aave V2',
            },
          },
        },
        block: {
          hash: '0xe847c92d57176722ec3e045fffd3af3475a76c761adc6007d4ce5f1565ae6626',
          number: 14769194,
        },
        transaction: {
          from: '0x5368b4d517645749e9e7f8ba10d81ae609c40beb',
          hash: '0x9529b0332f51d586a1d30f9106558daf3dbc66c6bbbd32935f19fbc2601b7aa1',
          index: 25,
          gasUsed: 529738,
        },
        event: {
          logIndex: 190,
          address: '0x7937d4799803fbbe595ed57278bc4ca21f3bffcb',
        },
        seizor: '0x5e37d0aaf14f00f91fd3fb64f3cd576dcbaaac41',
        borrower: '0xabdc47ed04c62b6c0d58f2668cd09200688e1495',
        asset: {
          type: 'erc20',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        amount: 608477290571450223n,
      },
    ];

    const liquidationsA = getLiquidations(repaymentsA, seizuresA);
    const liquidationsB = getLiquidations(repaymentsB, seizuresB);

    expect(liquidationsA).toEqual<Liquidation[]>([
      {
        repayment: repaymentsA[0],
        seizure: seizuresA[0],
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
    ]);
    expect(liquidationsB).toEqual<Liquidation[]>([
      {
        repayment: repaymentsB[0],
        seizure: seizuresB[0],
        liquidator: {
          sender: '0x5368b4d517645749e9e7f8ba10d81ae609c40beb',
          beneficiary: '0x5e37d0aaf14f00f91fd3fb64f3cd576dcbaaac41',
        },
        borrower: '0xabdc47ed04c62b6c0d58f2668cd09200688e1495',
        collateral: {
          asset: {
            type: 'erc20',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          },
          amount: 608477290571450223n,
        },
        debt: {
          asset: {
            type: 'erc20',
            address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
          },
          amount: 1191908646n,
        },
      },
    ]);
  });
});
