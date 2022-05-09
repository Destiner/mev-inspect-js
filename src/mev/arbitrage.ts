import { Swap } from '../classifier/index.js';

interface Arbitrage {
  swaps: Swap[];
  profitAsset: string;
  startAmount: bigint;
  endAmount: bigint;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Liquidation {}

interface Sandwich {
  swaps: Swap[];
}

type TxMev = Arbitrage | Liquidation;

type BlockMev = TxMev | Sandwich;

const MAX_TOKEN_AMOUNT_PERCENT_DIFFERENCE = 1;

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
      const startAmount = route[0].takerAmount;
      const endAmount = route[route.length - 1].makerAmount;
      const profitAsset = route[0].takerAsset;

      const arbitrage = {
        swaps: route,
        startAmount,
        endAmount,
        profitAsset,
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
        potentialStartSwap.takerAsset === potentialEndSwap.makerAsset &&
        potentialStartSwap.taker === potentialEndSwap.taker &&
        !pools.includes(potentialStartSwap.taker)
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
    swapOut.makerAsset === swapIn.takerAsset &&
    // TODO compare w/ contract address (?)
    swapOut.taker === swapIn.taker &&
    equalWithPercent(
      swapOut.makerAmount,
      swapIn.takerAmount,
      MAX_TOKEN_AMOUNT_PERCENT_DIFFERENCE,
    )
  );
}

function equalWithPercent(
  firstValue: bigint,
  secondValue: bigint,
  thresholdPercent: number,
): boolean {
  const diff =
    (100n * 2n * (firstValue - secondValue)) / (firstValue + secondValue);
  return diff >= 0 ? diff < thresholdPercent : diff > -thresholdPercent;
}

export { Arbitrage, BlockMev, Liquidation, Sandwich, TxMev, getArbitrages };
