import {
  LiquidityAddition,
  LiquidityRemoval,
  Swap,
} from '../classifier/index.js';

interface JitLiquiditySandwich {
  sandwicher: string;
  addition: LiquidityAddition;
  removal: LiquidityRemoval;
  sandwichedSwaps: Swap[];
  deltas: {
    asset: string;
    amount: bigint;
  }[];
}

function getJitLiquiditySandwiches(
  swaps: Swap[],
  additions: LiquidityAddition[],
  removals: LiquidityRemoval[],
): JitLiquiditySandwich[] {
  const orderedSwaps = [...swaps];
  orderedSwaps.sort((a, b) => a.event.logIndex - b.event.logIndex);
  const orderedAdditions = [...additions];
  orderedAdditions.sort((a, b) => a.event.logIndex - b.event.logIndex);
  const reverseOrderedRemovals = [...removals];
  reverseOrderedRemovals.sort((a, b) => b.event.logIndex - a.event.logIndex);
  const uniswapV3Swaps = orderedSwaps.filter(
    (swap) => swap.contract.protocol.abi === 'UniswapV3',
  );
  const uniswapV3Additions = orderedAdditions.filter(
    (addition) => addition.contract.protocol.abi === 'UniswapV3',
  );
  const uniswapV3Removals = reverseOrderedRemovals.filter(
    (removal) => removal.contract.protocol.abi === 'UniswapV3',
  );
  return getUniswapV3Sandwiches(
    uniswapV3Swaps,
    uniswapV3Additions,
    uniswapV3Removals,
  );
}

function getUniswapV3Sandwiches(
  swaps: Swap[],
  additions: LiquidityAddition[],
  removals: LiquidityRemoval[],
): JitLiquiditySandwich[] {
  const sandwiches: JitLiquiditySandwich[] = [];
  for (const addition of additions) {
    for (const removal of removals) {
      if (addition.event.logIndex > removal.event.logIndex) {
        continue;
      }
      if (addition.event.address !== removal.event.address) {
        continue;
      }
      if (addition.owner !== removal.owner) {
        continue;
      }
      if (addition.metadata.tickLower !== removal.metadata.tickLower) {
        continue;
      }
      if (addition.metadata.tickUpper !== removal.metadata.tickUpper) {
        continue;
      }
      const tickLower = addition.metadata.tickLower as number;
      const tickUpper = addition.metadata.tickUpper as number;
      const sandwichedSwaps = swaps.filter((swap) => {
        const tick = swap.metadata.tick as number;
        return (
          swap.event.address === addition.event.address &&
          swap.from !== addition.owner &&
          swap.to !== addition.owner &&
          tick >= tickLower &&
          tick <= tickUpper
        );
      });
      if (sandwichedSwaps.length === 0) {
        continue;
      } else {
        const deltas = addition.assets.map((asset, index) => {
          const addedAmount = addition.amounts[index];
          const removedAmount = removal.amounts[index];
          return {
            asset,
            amount: removedAmount - addedAmount,
          };
        });
        sandwiches.push({
          sandwicher: addition.owner,
          addition,
          removal,
          sandwichedSwaps,
          deltas,
        });
        break;
      }
    }
  }
  return sandwiches;
}

export { JitLiquiditySandwich, getJitLiquiditySandwiches };
