import { Swap } from '../classifier/index.js';
import { equalWithTolerance } from '../utils.js';

interface Arbitrage {
  swaps: Swap[];
  profitAsset: string;
  profitAmount: bigint;
  arbitrager: string;
}

const MAX_TOKEN_AMOUNT_PERCENT_DIFFERENCE = 0.00001;

function getArbitrages(swaps: Swap[]): Arbitrage[] {
  const arbitrages: Arbitrage[] = [];
  const groupedSwaps = groupSwapsByTransaction(swaps);
  for (const hash in groupedSwaps) {
    const swaps = groupedSwaps[hash];
    const transactionArbitrages = getTransactionArbitrages(swaps);
    for (const arbitrage of transactionArbitrages) {
      arbitrages.push(arbitrage);
    }
  }
  return arbitrages;
}

function getTransactionArbitrages(swaps: Swap[]): Arbitrage[] {
  const arbitrages: Arbitrage[] = [];
  const startEndList = getStartEndSwaps(swaps);
  const usedSwaps: Swap[] = [];

  for (const startEnds of startEndList) {
    const [start, ends] = startEnds;
    if (usedSwaps.includes(start)) {
      continue;
    }

    const unusedEnds = ends.filter((end) => !usedSwaps.includes(end));
    const route = getShortestRoute(start, unusedEnds, swaps);

    if (route.length > 0) {
      const arbitrager = route[0].from;
      const profitAmount =
        route[route.length - 1].amountOut - route[0].amountIn;
      const profitAsset = route[0].assetIn;

      const arbitrage = {
        swaps: route,
        profitAmount,
        profitAsset,
        arbitrager,
      };
      arbitrages.push(arbitrage);
      for (const swap of route) {
        usedSwaps.push(swap);
      }
    }
  }

  return arbitrages;
}

function groupSwapsByTransaction(swaps: Swap[]): Record<string, Swap[]> {
  return swaps.reduce((result, swap) => {
    const hash = swap.transaction.hash;
    if (!result[hash]) result[hash] = [];
    result[hash].push(swap);
    return result;
  }, {} as Record<string, Swap[]>);
}

function getShortestRoute(
  startSwap: Swap,
  endSwaps: Swap[],
  allSwaps: Swap[],
  maxRouteLength?: number,
): Swap[] {
  if (endSwaps.length === 0) {
    return [];
  }
  if (maxRouteLength && maxRouteLength < 2) {
    return [];
  }
  for (const endSwap of endSwaps) {
    if (swapOutsMatchSwapIns(startSwap, endSwap)) {
      return [startSwap, endSwap];
    }
  }

  if (maxRouteLength && maxRouteLength === 2) {
    return [];
  }

  const otherSwaps = allSwaps.filter(
    (swap) => startSwap !== swap && !endSwaps.includes(swap),
  );

  if (otherSwaps.length === 0) {
    return [];
  }

  let shortestRemainingRoute: Swap[] = [];
  let maxRemainingRouteLength = maxRouteLength ? maxRouteLength - 1 : undefined;

  for (const nextSwap of otherSwaps) {
    if (swapOutsMatchSwapIns(startSwap, nextSwap)) {
      const shortestFromNext = getShortestRoute(
        nextSwap,
        endSwaps,
        otherSwaps,
        maxRemainingRouteLength,
      );

      if (
        shortestFromNext.length > 0 &&
        (shortestRemainingRoute.length === 0 ||
          shortestFromNext.length < shortestRemainingRoute.length)
      ) {
        shortestRemainingRoute = shortestFromNext;
        maxRemainingRouteLength = shortestFromNext.length - 1;
      }
    }
  }

  return shortestRemainingRoute.length === 0
    ? []
    : [startSwap, ...shortestRemainingRoute];
}

function getStartEndSwaps(swaps: Swap[]): [Swap, Swap[]][] {
  const pools = swaps.map((swap) => swap.event.address);
  const startEnds: [Swap, Swap[]][] = [];

  for (const index in swaps) {
    const potentialStartSwap = swaps[index];
    const endsForStart: Swap[] = [];
    const remainingSwaps = swaps.filter((swap) => swap !== potentialStartSwap);

    for (const potentialEndSwap of remainingSwaps) {
      if (
        potentialStartSwap.assetIn === potentialEndSwap.assetOut &&
        potentialStartSwap.from === potentialEndSwap.to &&
        !pools.includes(potentialStartSwap.from)
      ) {
        endsForStart.push(potentialEndSwap);
      }
    }

    if (endsForStart.length > 0) {
      startEnds.push([potentialStartSwap, endsForStart]);
    }
  }

  return startEnds;
}

function swapOutsMatchSwapIns(swapOut: Swap, swapIn: Swap): boolean {
  return (
    swapOut.assetOut === swapIn.assetIn &&
    (swapOut.contract.address == swapIn.from ||
      swapOut.to == swapIn.contract.address ||
      swapOut.to == swapIn.from) &&
    equalWithTolerance(
      swapOut.amountOut,
      swapIn.amountIn,
      MAX_TOKEN_AMOUNT_PERCENT_DIFFERENCE,
    )
  );
}

export { Arbitrage, getArbitrages };
