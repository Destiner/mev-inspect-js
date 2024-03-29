import type { Event } from 'abi-coder';
import type { Call } from 'ethcall';
import { Contract } from 'ethcall';

import poolAbi from '../../abi/uniswapV3Pool.js';
import { equalWithTolerance } from '../../utils.js';
import type {
  Classifiers,
  LiquidityDeposit,
  LiquidityWithdrawal,
  Pool,
  PoolData,
  Swap,
  Transfer,
} from '../base.js';
import { getLatestPoolTransfer } from '../base.js';
import type { ClassifiedEvent } from '../index.js';

function isSwapValid(event: Event): boolean {
  return event.name === 'Swap';
}

function isLiquidityDepositValid(event: Event): boolean {
  return event.name === 'Mint';
}

function isLiquidityWithdrawalValid(event: Event): boolean {
  return event.name === 'Collect';
}

function getPoolCalls(address: string): Call[] {
  const poolContract = new Contract(address, poolAbi);
  const factoryCall = poolContract.factory();
  const asset0Call = poolContract.token0();
  const asset1Call = poolContract.token1();
  return [factoryCall, asset0Call, asset1Call];
}

function processPoolCalls(result: unknown[]): PoolData | null {
  const factory = result[0] as string | null;
  const asset0 = result[1] as string | null;
  const asset1 = result[2] as string | null;
  if (!factory || !asset0 || !asset1) {
    return null;
  }
  const assets = [asset0.toLowerCase(), asset1.toLowerCase()];
  return {
    factoryAddress: factory.toLowerCase(),
    assets,
  };
}

function parseSwap(
  pool: Pool,
  event: ClassifiedEvent,
  transfers: Transfer[],
): Swap | null {
  const {
    values,
    transactionFrom,
    transactionHash: hash,
    transactionIndex,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;
  const { address: poolAddress, assets } = pool;

  const poolTransfer = getLatestPoolTransfer(poolAddress, logIndex, transfers);
  if (!poolTransfer) {
    return null;
  }

  const from = poolTransfer.from;
  const to = (values.recipient as string).toLowerCase();
  const amount0 = values.amount0 as bigint;
  const amount1 = values.amount1 as bigint;
  const tick = values.tick as number;

  const assetOut = amount0 < 0 ? assets[0] : assets[1];
  const amountOut = amount0 < 0 ? amount0 * -1n : amount1 * -1n;

  const assetIn = amount0 > 0 ? assets[0] : assets[1];
  const amountIn = amount0 > 0 ? amount0 : amount1;

  if (poolTransfer.event.address !== assetIn) {
    return null;
  }
  if (!equalWithTolerance(poolTransfer.value, amountIn, 0.001)) {
    return null;
  }

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'UniswapV3',
        factory: pool.factory,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      from: transactionFrom.toLowerCase(),
      hash,
      index: transactionIndex,
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
    from,
    to,
    assetIn: {
      type: 'erc20',
      address: assetIn,
    },
    amountIn,
    assetOut: {
      type: 'erc20',
      address: assetOut,
    },
    amountOut,
    metadata: {
      tick,
    },
  };
}

function parseLiquidityDeposit(
  pool: Pool,
  event: ClassifiedEvent,
  transfers: Transfer[],
): LiquidityDeposit | null {
  const {
    values,
    transactionFrom,
    transactionHash: hash,
    transactionIndex,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;
  const { assets } = pool;

  const amount0 = values.amount0 as bigint;
  const amount1 = values.amount1 as bigint;
  const tickLower = values.tickLower;
  const tickUpper = values.tickUpper;

  const amounts = [amount0, amount1];

  const depositor = getDepositor(assets, amounts, logIndex, address, transfers);

  if (!depositor) {
    return null;
  }

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'UniswapV3',
        factory: pool.factory,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      from: transactionFrom.toLowerCase(),
      hash,
      index: transactionIndex,
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
    depositor,
    assets: assets.map((asset) => {
      return {
        type: 'erc20',
        address: asset,
      };
    }),
    amounts,
    metadata: {
      tickLower,
      tickUpper,
    },
  };
}

function parseLiquidityWithdrawal(
  pool: Pool,
  event: ClassifiedEvent,
  transfers: Transfer[],
): LiquidityWithdrawal | null {
  const {
    values,
    transactionFrom,
    transactionHash: hash,
    transactionIndex,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;
  const { assets } = pool;

  const amount0 = values.amount0 as bigint;
  const amount1 = values.amount1 as bigint;
  const tickLower = values.tickLower as number;
  const tickUpper = values.tickUpper as number;

  const amounts = [amount0, amount1];

  const withdrawer = getWithdrawer(
    assets,
    amounts,
    logIndex,
    address,
    transfers,
  );

  if (!withdrawer) {
    return null;
  }

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'UniswapV3',
        factory: pool.factory,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      from: transactionFrom.toLowerCase(),
      hash,
      index: transactionIndex,
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
    withdrawer,
    assets: assets.map((asset) => {
      return {
        type: 'erc20',
        address: asset,
      };
    }),
    amounts,
    metadata: {
      tickLower,
      tickUpper,
    },
  };
}

function getDepositor(
  assets: string[],
  amounts: bigint[],
  logIndex: number,
  address: string,
  transfers: Transfer[],
): string | null {
  const transferA = transfers.find(
    (transfer) => transfer.event.logIndex === logIndex - 2,
  );
  const transferB = transfers.find(
    (transfer) => transfer.event.logIndex === logIndex - 1,
  );
  if (!transferA || !transferB) {
    return null;
  }
  if (transferA.to !== address || transferB.to !== address) {
    return null;
  }
  if (transferA.asset !== assets[0] || transferB.asset !== assets[1]) {
    return null;
  }
  if (transferA.value !== amounts[0] || transferB.value !== amounts[1]) {
    return null;
  }
  if (transferA.from !== transferB.from) {
    return null;
  }
  return transferA.from;
}

function getWithdrawer(
  assets: string[],
  amounts: bigint[],
  logIndex: number,
  address: string,
  transfers: Transfer[],
): string | null {
  const transferA = transfers.find(
    (transfer) => transfer.event.logIndex === logIndex - 2,
  );
  const transferB = transfers.find(
    (transfer) => transfer.event.logIndex === logIndex - 1,
  );
  if (!transferA || !transferB) {
    return null;
  }
  if (transferA.from !== address || transferB.from !== address) {
    return null;
  }
  if (transferA.asset !== assets[0] || transferB.asset !== assets[1]) {
    return null;
  }
  if (transferA.value !== amounts[0] || transferB.value !== amounts[1]) {
    return null;
  }
  if (transferA.to !== transferB.to) {
    return null;
  }
  return transferA.to;
}

const CLASSIFIER: Classifiers = {
  swap: {
    type: 'swap',
    protocol: 'UniswapV3',
    abi: poolAbi,
    isValid: isSwapValid,
    parse: parseSwap,
    pool: {
      getCalls: getPoolCalls,
      processCalls: processPoolCalls,
    },
  },
  liquidityDeposit: {
    type: 'liquidity_deposit',
    protocol: 'UniswapV3',
    abi: poolAbi,
    isValid: isLiquidityDepositValid,
    parse: parseLiquidityDeposit,
    pool: {
      getCalls: getPoolCalls,
      processCalls: processPoolCalls,
    },
  },
  liquidityWithdrawal: {
    type: 'liquidity_withdrawal',
    protocol: 'UniswapV3',
    abi: poolAbi,
    isValid: isLiquidityWithdrawalValid,
    parse: parseLiquidityWithdrawal,
    pool: {
      getCalls: getPoolCalls,
      processCalls: processPoolCalls,
    },
  },
};

export default CLASSIFIER;
