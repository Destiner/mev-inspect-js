import {
  Erc20Asset,
  LiquidityDeposit,
  LiquidityWithdrawal,
  Searcher,
  Swap,
} from '../classifier/index.js';

interface JitSandwich {
  sandwicher: Searcher;
  deposit: LiquidityDeposit;
  withdrawal: LiquidityWithdrawal;
  sandwiched: Swap[];
  deltas: {
    asset: Erc20Asset;
    amount: bigint;
  }[];
}

function getJitSandwiches(
  swaps: Swap[],
  deposits: LiquidityDeposit[],
  withdrawals: LiquidityWithdrawal[],
): JitSandwich[] {
  const orderedSwaps = [...swaps];
  orderedSwaps.sort((a, b) => a.event.logIndex - b.event.logIndex);
  const orderedDeposits = [...deposits];
  orderedDeposits.sort((a, b) => a.event.logIndex - b.event.logIndex);
  const reverseOrderedWithdrawals = [...withdrawals];
  reverseOrderedWithdrawals.sort((a, b) => b.event.logIndex - a.event.logIndex);
  const uniswapV3Swaps = orderedSwaps.filter(
    (swap) => swap.contract.protocol.abi === 'UniswapV3',
  );
  const uniswapV3Deposits = orderedDeposits.filter(
    (deposit) => deposit.contract.protocol.abi === 'UniswapV3',
  );
  const uniswapV3Withdrawals = reverseOrderedWithdrawals.filter(
    (withdrawal) => withdrawal.contract.protocol.abi === 'UniswapV3',
  );
  return getUniswapV3Sandwiches(
    uniswapV3Swaps,
    uniswapV3Deposits,
    uniswapV3Withdrawals,
  );
}

function getUniswapV3Sandwiches(
  swaps: Swap[],
  deposits: LiquidityDeposit[],
  withdrawals: LiquidityWithdrawal[],
): JitSandwich[] {
  const sandwiches: JitSandwich[] = [];
  for (const deposit of deposits) {
    for (const withdrawal of withdrawals) {
      if (deposit.transaction.hash === withdrawal.transaction.hash) {
        continue;
      }
      if (deposit.event.logIndex > withdrawal.event.logIndex) {
        continue;
      }
      if (deposit.event.address !== withdrawal.event.address) {
        continue;
      }
      if (deposit.depositor !== withdrawal.withdrawer) {
        continue;
      }
      if (deposit.metadata.tickLower !== withdrawal.metadata.tickLower) {
        continue;
      }
      if (deposit.metadata.tickUpper !== withdrawal.metadata.tickUpper) {
        continue;
      }
      const tickLower = deposit.metadata.tickLower as number;
      const tickUpper = deposit.metadata.tickUpper as number;
      const sandwiched = swaps.filter((swap) => {
        const tick = swap.metadata.tick as number;
        return (
          swap.event.logIndex > deposit.event.logIndex &&
          swap.event.logIndex < withdrawal.event.logIndex &&
          swap.transaction.hash !== deposit.transaction.hash &&
          swap.transaction.hash !== withdrawal.transaction.hash &&
          swap.event.address === deposit.event.address &&
          swap.from !== deposit.depositor &&
          swap.to !== deposit.depositor &&
          tick >= tickLower &&
          tick <= tickUpper
        );
      });
      if (sandwiched.length === 0) {
        continue;
      } else {
        const sender = deposit.transaction.from;
        const deltas = deposit.assets.map((asset, index) => {
          const addedAmount = deposit.amounts[index];
          const removedAmount = withdrawal.amounts[index];
          return {
            asset,
            amount: removedAmount - addedAmount,
          };
        });
        sandwiches.push({
          sandwicher: { sender, beneficiary: deposit.depositor },
          deposit,
          withdrawal,
          sandwiched,
          deltas,
        });
        break;
      }
    }
  }
  return sandwiches;
}

export { JitSandwich, getJitSandwiches };
