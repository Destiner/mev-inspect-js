import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call, Contract } from 'ethcall';

import poolAbi from '../../abi/uniswapV3Pool.js';
import { equalWithTolerance } from '../../utils.js';
import {
  Classifier,
  LiquidityDeposit,
  LiquidityWithdrawal,
  Pool,
  PoolData,
  Swap,
  Transfer,
  getLatestPoolTransfer,
} from '../base.js';
import { ClassifiedEvent } from '../index.js';

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
    transactionHash: hash,
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
  const amount0 = (values.amount0 as BigNumber).toBigInt();
  const amount1 = (values.amount1 as BigNumber).toBigInt();
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
      hash,
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
    from,
    to,
    assetIn,
    amountIn,
    assetOut,
    amountOut,
    metadata: {
      tick,
    },
  };
}

function parseLiquidityDeposit(
  pool: Pool,
  event: ClassifiedEvent,
): LiquidityDeposit {
  const {
    values,
    transactionHash: hash,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;
  const { assets } = pool;

  const owner = (values.owner as string).toLowerCase();
  const amount0 = (values.amount0 as BigNumber).toBigInt();
  const amount1 = (values.amount1 as BigNumber).toBigInt();
  const tickLower = values.tickLower;
  const tickUpper = values.tickUpper;

  const amounts = [amount0, amount1];

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
      hash,
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
    owner,
    assets,
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
): LiquidityWithdrawal {
  const {
    values,
    transactionHash: hash,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;
  const { assets } = pool;

  const owner = (values.owner as string).toLowerCase();
  const amount0 = (values.amount0 as BigNumber).toBigInt();
  const amount1 = (values.amount1 as BigNumber).toBigInt();
  const tickLower = values.tickLower as number;
  const tickUpper = values.tickUpper as number;

  const amounts = [amount0, amount1];

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
      hash,
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
    owner,
    assets,
    amounts,
    metadata: {
      tickLower,
      tickUpper,
    },
  };
}

const CLASSIFIER: Classifier[] = [
  {
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
  {
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
  {
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
];
export default CLASSIFIER;
