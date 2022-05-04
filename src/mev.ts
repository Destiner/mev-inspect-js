import { Pool, Transfer } from './classifier/base.js';
import { ClassifiedLog } from './classifier/index.js';

interface Base {
  tx: {
    hash: string;
  };
}

interface Metadata {
  transactionHash: string;
  eventAddress: string;
}

interface Swap {
  maker: string;
  makerAsset: string;
  makerAmount: bigint;
  taker: string;
  takerAsset: string;
  takerAmount: bigint;
  metadata: Metadata;
}

interface Arbitrage {
  swaps: Swap[];
  profitAsset: string;
  startAmount: bigint;
  endAmount: bigint;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Liquidation extends Base {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Sandwich extends Base {}

type TxMev = Arbitrage | Liquidation;

type BlockMev = TxMev | Sandwich;

const MAX_TOKEN_AMOUNT_PERCENT_DIFFERENCE = 1;

function getTransfers(logs: ClassifiedLog[]): Transfer[] {
  return logs
    .map((log) => {
      if (log.classifier.event.type !== 'transfer') {
        return null;
      }
      return log.classifier.event.parse(log.address, log.event);
    })
    .filter((transfer: Transfer | null): transfer is Transfer => !!transfer);
}

function getSwaps(pools: Pool[], logs: ClassifiedLog[]): Swap[] {
  return logs
    .map((log) => {
      if (log.classifier.event.type !== 'swap') {
        return null;
      }
      const pool = pools.find((pool) => pool.address === log.address);
      if (!pool) {
        return null;
      }
      return log.classifier.event.parse(pool, log.transactionHash, log.event);
    })
    .filter((swap: Swap | null): swap is Swap => !!swap);
}

function getArbitrages(swaps: Swap[]): Arbitrage[] {
  const arbitrages: Arbitrage[] = [];
  const groupedSwaps = groupSwapsByHash(swaps);
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

function groupSwapsByHash(swaps: Swap[]): Record<string, Swap[]> {
  return swaps.reduce((result, swap) => {
    const hash = swap.metadata.transactionHash;
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
  const pools = swaps.map((swap) => swap.metadata.eventAddress);
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

export {
  Arbitrage,
  BlockMev,
  Liquidation,
  Sandwich,
  Swap,
  TxMev,
  getArbitrages,
  getSwaps,
  getTransfers,
};
