import { describe, test, expect } from 'vitest';

import {
  LiquidityDeposit,
  LiquidityWithdrawal,
  Swap,
} from '../../src/index.js';
import { JitSandwich, getJitSandwiches } from '../../src/mev/jitSandwiches.js';

describe('MEV: JIT liquidity sandwich', () => {
  test('skip an empty list of swaps', () => {
    const swaps: Swap[] = [];
    const deposits: LiquidityDeposit[] = [
      {
        contract: {
          address: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        block: {
          hash: '0x6a1f7b9df7c4f75f802b6ae9c7ba29a55184e135c7ddfb1229ff844e22e6f094',
          number: 15196081,
        },
        transaction: {
          hash: '0xf618862404eaa9a2d6e1d95b8a4ec74627e4e44fb0dd520e743359b7721a7778',
          gasUsed: 500595,
        },
        event: {
          address: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36',
          logIndex: 10,
        },
        depositor: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
        assets: [
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          '0xdac17f958d2ee523a2206206994597c13d831ec7',
        ],
        amounts: [21096147899993320165870n, 7486084510631n],
        metadata: { tickLower: -202860, tickUpper: -202800 },
      },
    ];
    const withdrawals: LiquidityWithdrawal[] = [
      {
        contract: {
          address: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        block: {
          hash: '0x6a1f7b9df7c4f75f802b6ae9c7ba29a55184e135c7ddfb1229ff844e22e6f094',
          number: 15196081,
        },
        transaction: {
          hash: '0xafde1f9e82c1641578186cab977a26b849a917076c4556be912f0a10feb28453',
          gasUsed: 248807,
        },
        event: {
          address: '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36',
          logIndex: 27,
        },
        withdrawer: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
        assets: [
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          '0xdac17f958d2ee523a2206206994597c13d831ec7',
        ],
        amounts: [21101087919393998260023n, 7478418743820n],
        metadata: { tickLower: -202860, tickUpper: -202800 },
      },
    ];

    const sandwiches = getJitSandwiches(swaps, deposits, withdrawals);

    expect(sandwiches).toEqual<JitSandwich[]>([]);
  });

  test.todo('skip irrelevant swaps', () => {
    // same user
    // different pool
    // different protocol
    // outside the range

    const swaps: Swap[] = [];
    const deposits: LiquidityDeposit[] = [
      {
        contract: {
          address: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        block: {
          hash: '0x8c4a948fcc65455e582f331e51551a0ec4c789b67252244e3ea4afe48de384d1',
          number: 15194684,
        },
        transaction: {
          hash: '0x07c06542c2fa73d4ccb005ce23b4ef2b34c8ddfa987008b7eb5e81ec8b73cef7',
          gasUsed: 559946,
        },
        event: {
          address: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
          logIndex: 66,
        },
        depositor: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
        assets: [
          '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        ],
        amounts: [25837051722n, 238585298602n],
        metadata: { tickLower: 54180, tickUpper: 54240 },
      },
    ];
    const withdrawals: LiquidityWithdrawal[] = [
      {
        contract: {
          address: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
          protocol: {
            abi: 'UniswapV3',
            factory: {
              address: '0x1f98431c8ad98523631ae4a59f267346ea31f984',
              label: 'Uniswap V3',
            },
          },
        },
        block: {
          hash: '0x8c4a948fcc65455e582f331e51551a0ec4c789b67252244e3ea4afe48de384d1',
          number: 15194684,
        },
        transaction: {
          hash: '0x83b15feb99e0cb393bb9846465db6b547ac3a171e976875db52c5e432d5209ff',
          gasUsed: 253248,
        },
        event: {
          address: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
          logIndex: 79,
        },
        withdrawer: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
        assets: [
          '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        ],
        amounts: [25978966747n, 206595332782n],
        metadata: { tickLower: 54180, tickUpper: 54240 },
      },
    ];

    const sandwiches = getJitSandwiches(swaps, deposits, withdrawals);

    expect(sandwiches).toEqual<JitSandwich[]>([]);
  });

  test('Uniswap V3 sandwich', () => {
    const swaps: Swap[] = [
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
          hash: '0xe533410ec2eb24a443e8b209ce293424e01997f55b84c6b76c9bfb478393dd4c',
          gasUsed: 207310,
        },
        event: {
          address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
          logIndex: 31,
        },
        from: '0x53fe3edb7604fec209157a5318aa696308bf0dea',
        to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        assetIn: '0x4d224452801aced8b2f0aebe155379bb5d594381',
        amountIn: 8917981510557040846754n,
        assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        amountOut: 36809378513050823801n,
        metadata: { tick: -54875 },
      },
    ];
    const deposits: LiquidityDeposit[] = [
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
          hash: '0x5ffe23a52fd695160fc5eef15678576574e7c42cb7203568031f33ce09d30c49',
          gasUsed: 591690,
        },
        event: {
          address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
          logIndex: 24,
        },
        depositor: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
        assets: [
          '0x4d224452801aced8b2f0aebe155379bb5d594381',
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        ],
        amounts: [129735801701915403613047n, 458679217156579091198n],
        metadata: { tickLower: -54900, tickUpper: -54840 },
      },
    ];
    const withdrawals: LiquidityWithdrawal[] = [
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
          hash: '0x0e93b0006f66e5efd9e5b26c090f7dab202bea6151bb6f942e636601034567eb',
          gasUsed: 253098,
        },
        event: {
          address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
          logIndex: 35,
        },
        withdrawer: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
        assets: [
          '0x4d224452801aced8b2f0aebe155379bb5d594381',
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        ],
        amounts: [138200019333940881352647n, 423637645189105331266n],
        metadata: { tickLower: -54900, tickUpper: -54840 },
      },
    ];

    const sandwiches = getJitSandwiches(swaps, deposits, withdrawals);

    expect(sandwiches).toEqual<JitSandwich[]>([
      {
        sandwicher: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
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
            hash: '0x5ffe23a52fd695160fc5eef15678576574e7c42cb7203568031f33ce09d30c49',
            gasUsed: 591690,
          },
          event: {
            address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
            logIndex: 24,
          },
          depositor: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
          assets: [
            '0x4d224452801aced8b2f0aebe155379bb5d594381',
            '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
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
            hash: '0x0e93b0006f66e5efd9e5b26c090f7dab202bea6151bb6f942e636601034567eb',
            gasUsed: 253098,
          },
          event: {
            address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
            logIndex: 35,
          },
          withdrawer: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
          assets: [
            '0x4d224452801aced8b2f0aebe155379bb5d594381',
            '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          ],
          amounts: [138200019333940881352647n, 423637645189105331266n],
          metadata: { tickLower: -54900, tickUpper: -54840 },
        },
        sandwichedSwaps: [
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
              hash: '0xe533410ec2eb24a443e8b209ce293424e01997f55b84c6b76c9bfb478393dd4c',
              gasUsed: 207310,
            },
            event: {
              address: '0xac4b3dacb91461209ae9d41ec517c2b9cb1b7daf',
              logIndex: 31,
            },
            from: '0x53fe3edb7604fec209157a5318aa696308bf0dea',
            to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
            assetIn: '0x4d224452801aced8b2f0aebe155379bb5d594381',
            amountIn: 8917981510557040846754n,
            assetOut: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            amountOut: 36809378513050823801n,
            metadata: { tick: -54875 },
          },
        ],
        deltas: [
          {
            asset: '0x4d224452801aced8b2f0aebe155379bb5d594381',
            amount: 8464217632025477739600n,
          },
          {
            asset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            amount: -35041571967473759932n,
          },
        ],
      },
    ]);
  });
});
