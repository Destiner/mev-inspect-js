import { ChainId, Swap, isKnownRouter } from '../classifier/index.js';

interface Sandwich {
  sandwicher: string;
  frontSwap: Swap;
  backSwap: Swap;
  sandwichedSwaps: Swap[];
  profitAsset: string;
  profitAmount: bigint;
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
            profitAsset: frontSwap.assetIn,
            profitAmount: otherSwap.amountOut - frontSwap.amountIn,
          };
        }
      }
    }
  }

  return null;
}

export { Sandwich, getSandwiches };
