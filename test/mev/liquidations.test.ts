import { describe, test, expect } from 'vitest';

import { Repayment, Seizure } from '../../src/index.js';
import { Liquidation, getLiquidations } from '../../src/mev/liquidations.js';

describe('MEV: liquidations', () => {
  test('detects a Compound V2 liquidation', () => {
    const repaymentsA: Repayment[] = [
      {
        contract: {
          address: '0x041171993284df560249b57358f931d9eb7b925d',
          protocol: {
            abi: 'CompoundV2',
            pool: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
          },
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
    ];

    const seizuresA: Seizure[] = [
      {
        contract: {
          address: '0x041171993284df560249b57358f931d9eb7b925d',
          protocol: {
            abi: 'CompoundV2',
            pool: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
          },
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
    ];

    const repaymentsB: Repayment[] = [
      {
        contract: {
          address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
          protocol: {
            abi: 'CompoundV2',
            pool: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
          },
        },
        transaction: {
          hash: '0x02a100bfcc45a40b1d4fda92d6c17acb420d4fee8bc2b5bac3fa4650bf7d5093',
          gasUsed: 676976,
        },
        event: {
          logIndex: 62,
          address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
        },
        payer: '0x9a0ef593dcc6a77f80699c9fa00d1e138b67d832',
        borrower: '0x532fd36ea87cf9f316fad40b39385a4716065b8c',
        asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amount: 242839054n,
      },
    ];

    const seizuresB: Seizure[] = [
      {
        contract: {
          address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
          protocol: {
            abi: 'CompoundV2',
            pool: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
          },
        },
        transaction: {
          hash: '0x02a100bfcc45a40b1d4fda92d6c17acb420d4fee8bc2b5bac3fa4650bf7d5093',
          gasUsed: 676976,
        },
        event: {
          logIndex: 66,
          address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
        },
        seizor: '0x9a0ef593dcc6a77f80699c9fa00d1e138b67d832',
        borrower: '0x532fd36ea87cf9f316fad40b39385a4716065b8c',
        asset: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
        amount: 670843809n,
      },
    ];

    const liquidationsA = getLiquidations(repaymentsA, seizuresA);
    const liquidationsB = getLiquidations(repaymentsB, seizuresB);

    expect(liquidationsA).toEqual<Liquidation[]>([
      {
        repayment: repaymentsA[0],
        seizure: seizuresA[0],
      },
    ]);
    expect(liquidationsB).toEqual<Liquidation[]>([
      {
        repayment: repaymentsB[0],
        seizure: seizuresB[0],
      },
    ]);
  });

  test('detects a Aave V2 liquidation', () => {
    const repaymentsA: Repayment[] = [
      {
        contract: {
          address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
          protocol: {
            abi: 'AaveV2',
            pool: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
          },
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
    ];

    const seizuresA: Seizure[] = [
      {
        contract: {
          address: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
          protocol: {
            abi: 'AaveV2',
            pool: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
          },
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
    ];

    const repaymentsB: Repayment[] = [
      {
        contract: {
          address: '0x7937D4799803FbBe595ed57278Bc4cA21f3bFfCB',
          protocol: {
            abi: 'AaveV2',
            pool: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
          },
        },
        transaction: {
          hash: '0x9529b0332f51d586a1d30f9106558daf3dbc66c6bbbd32935f19fbc2601b7aa1',
          gasUsed: 529738,
        },
        event: {
          logIndex: 190,
          address: '0x7937d4799803fbbe595ed57278bc4ca21f3bffcb',
        },
        payer: '0x5e37d0aaf14f00f91fd3fb64f3cd576dcbaaac41',
        borrower: '0xabdc47ed04c62b6c0d58f2668cd09200688e1495',
        asset: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        amount: 1191908646n,
      },
    ];

    const seizuresB: Seizure[] = [
      {
        contract: {
          address: '0x7937D4799803FbBe595ed57278Bc4cA21f3bFfCB',
          protocol: {
            abi: 'AaveV2',
            pool: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
          },
        },
        transaction: {
          hash: '0x9529b0332f51d586a1d30f9106558daf3dbc66c6bbbd32935f19fbc2601b7aa1',
          gasUsed: 529738,
        },
        event: {
          logIndex: 190,
          address: '0x7937d4799803fbbe595ed57278bc4ca21f3bffcb',
        },
        seizor: '0x5e37d0aaf14f00f91fd3fb64f3cd576dcbaaac41',
        borrower: '0xabdc47ed04c62b6c0d58f2668cd09200688e1495',
        asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amount: 608477290571450223n,
      },
    ];

    const liquidationsA = getLiquidations(repaymentsA, seizuresA);
    const liquidationsB = getLiquidations(repaymentsB, seizuresB);

    expect(liquidationsA).toEqual<Liquidation[]>([
      {
        repayment: repaymentsA[0],
        seizure: seizuresA[0],
      },
    ]);
    expect(liquidationsB).toEqual<Liquidation[]>([
      {
        repayment: repaymentsB[0],
        seizure: seizuresB[0],
      },
    ]);
  });
});
