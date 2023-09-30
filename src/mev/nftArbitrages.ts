import type {
  Asset,
  Erc20Asset,
  NftSwap,
  Searcher,
} from '../classifier/index.js';

interface NftArbitrage {
  swaps: NftSwap[];
  profit: {
    asset: Erc20Asset;
    amount: bigint;
  };
  arbitrager: Searcher;
}

function getNftArbitrages(swaps: NftSwap[]): NftArbitrage[] {
  const arbitrages: NftArbitrage[] = [];
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

function getTransactionArbitrages(swaps: NftSwap[]): NftArbitrage[] {
  const arbitrages: NftArbitrage[] = [];
  const startEndList = getStartEndSwaps(swaps);
  const usedSwaps: NftSwap[] = [];

  for (const startEnds of startEndList) {
    const [start, ends] = startEnds;
    if (usedSwaps.includes(start)) {
      continue;
    }

    const unusedEnds = ends.filter((end) => !usedSwaps.includes(end));
    const route = getShortestRoute(start, unusedEnds, swaps);

    if (route.length > 0) {
      const sender = route[0].transaction.from;
      const beneficiary = route[0].from;
      const profitAmount =
        route[route.length - 1].amountOut - route[0].amountIn;
      const profitAsset = route[0].assetIn;

      if (profitAsset.type !== 'erc20') {
        continue;
      }

      const arbitrage: NftArbitrage = {
        swaps: route,
        profit: {
          amount: profitAmount,
          asset: profitAsset,
        },
        arbitrager: {
          sender,
          beneficiary,
        },
      };
      arbitrages.push(arbitrage);
      for (const swap of route) {
        usedSwaps.push(swap);
      }
    }
  }

  return arbitrages;
}

function groupSwapsByTransaction(swaps: NftSwap[]): Record<string, NftSwap[]> {
  return swaps.reduce(
    (result, swap) => {
      const hash = swap.transaction.hash;
      if (!result[hash]) result[hash] = [];
      result[hash].push(swap);
      return result;
    },
    {} as Record<string, NftSwap[]>,
  );
}

function getShortestRoute(
  startSwap: NftSwap,
  endSwaps: NftSwap[],
  allSwaps: NftSwap[],
  maxRouteLength?: number,
): NftSwap[] {
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

  let shortestRemainingRoute: NftSwap[] = [];
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

function getStartEndSwaps(swaps: NftSwap[]): [NftSwap, NftSwap[]][] {
  const pools = swaps.map((swap) => swap.event.address);
  const startEnds: [NftSwap, NftSwap[]][] = [];

  for (const index in swaps) {
    const potentialStartSwap = swaps[index];
    const endsForStart: NftSwap[] = [];
    const remainingSwaps = swaps.filter((swap) => swap !== potentialStartSwap);

    for (const potentialEndSwap of remainingSwaps) {
      if (
        areAssetsEqual(potentialStartSwap.assetIn, potentialEndSwap.assetOut) &&
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

function swapOutsMatchSwapIns(swapOut: NftSwap, swapIn: NftSwap): boolean {
  return (
    areAssetsEqual(swapOut.assetOut, swapIn.assetIn) &&
    (swapOut.contract.address == swapIn.from ||
      swapOut.to == swapIn.contract.address ||
      swapOut.to == swapIn.from) &&
    swapOut.amountOut === swapIn.amountIn
  );
}

function areAssetsEqual(assetA: Asset, assetB: Asset): boolean {
  if (assetA.type === 'erc20') {
    if (assetB.type !== 'erc20') {
      return false;
    }
    return assetA.address === assetB.address;
  } else {
    if (assetB.type !== 'erc721') {
      return false;
    }
    return assetA.collection === assetB.collection && assetA.id === assetB.id;
  }
}

export { getNftArbitrages };
export type { NftArbitrage };
