import { ChainId, Swap, isKnownRouter } from '../classifier/index.js';
import { minByAbs } from '../utils.js';

interface Sandwich {
  sandwicher: string;
  frontSwap: Swap;
  backSwap: Swap;
  sandwichedSwaps: Swap[];
  profit: {
    asset: string;
    amount: bigint;
  };
}

function getSandwiches(chainId: ChainId, swaps: Swap[]): Sandwich[] {
  const orderedSwaps = [...swaps];
  orderedSwaps.sort((a, b) => a.event.logIndex - b.event.logIndex);

  const sandwiches: Sandwich[] = [];
  for (const i in orderedSwaps) {
    const swap = orderedSwaps[i];
    const restSwaps = orderedSwaps.slice(parseInt(i) + 1);
    const sandwich = getSandwich(chainId, swap, restSwaps);
    if (sandwich) {
      sandwiches.push(sandwich);
    }
  }
  return sandwiches;
}

function getSandwich(
  chainId: ChainId,
  frontSwap: Swap,
  restSwaps: Swap[],
): Sandwich | null {
  const sandwicher = frontSwap.to;
  const sandwichedSwaps: Swap[] = [];

  if (isKnownRouter(chainId, sandwicher)) {
    return null;
  }

  for (const otherSwap of restSwaps) {
    if (otherSwap.transaction.hash === frontSwap.transaction.hash) {
      continue;
    }

    if (otherSwap.contract.address === frontSwap.contract.address) {
      if (
        otherSwap.assetIn === frontSwap.assetIn &&
        otherSwap.assetOut === frontSwap.assetOut &&
        otherSwap.from !== sandwicher
      ) {
        sandwichedSwaps.push(otherSwap);
      } else if (
        otherSwap.assetOut === frontSwap.assetIn &&
        otherSwap.assetIn === frontSwap.assetOut &&
        otherSwap.from === sandwicher
      ) {
        if (sandwichedSwaps.length > 0) {
          return {
            sandwicher,
            frontSwap,
            backSwap: otherSwap,
            sandwichedSwaps,
            profit: {
              asset: frontSwap.assetIn,
              amount: getProfit(frontSwap, otherSwap),
            },
          };
        }
      }
    }
  }

  return null;
}

function getProfit(frontSwap: Swap, backSwap: Swap): bigint {
  const multiplier = 1_000_000_000_000_000_000_000_000_000_000_000_000n;
  const profitFrontrun =
    (frontSwap.amountOut *
      ((multiplier * backSwap.amountOut) / backSwap.amountIn)) /
      multiplier -
    frontSwap.amountIn;
  const profitBackrun =
    backSwap.amountOut -
    (backSwap.amountIn *
      ((multiplier * frontSwap.amountIn) / frontSwap.amountOut)) /
      multiplier;
  return minByAbs(profitFrontrun, profitBackrun);
}

export { Sandwich, getSandwiches };
