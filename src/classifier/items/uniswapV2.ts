import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call, Contract } from 'ethcall';

import pairAbi from '../../abi/uniswapV2Pair.json' assert { type: 'json' };
import { equalWithTolerance } from '../../utils.js';
import {
  Classifier,
  Pool,
  PoolData,
  Swap,
  Transfer,
  getLatestPoolTransfer,
} from '../base.js';
import { ClassifiedEvent } from '../index.js';

function isValid(event: Event): boolean {
  return event.name === 'Swap';
}

function getPoolCalls(address: string): Call[] {
  const pairContract = new Contract(address, pairAbi);
  const factoryCall = pairContract.factory();
  const asset0Call = pairContract.token0();
  const asset1Call = pairContract.token1();
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

function parse(
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
  const { assets } = pool;

  const poolTransfer = getLatestPoolTransfer(pool.address, logIndex, transfers);
  if (!poolTransfer) {
    return null;
  }

  const from = poolTransfer.from;
  const to = (values.to as string).toLowerCase();
  const amount0In = (values.amount0In as BigNumber).toBigInt();
  const amount1In = (values.amount1In as BigNumber).toBigInt();
  const amount0Out = (values.amount0Out as BigNumber).toBigInt();
  const amount1Out = (values.amount1Out as BigNumber).toBigInt();

  const assetOut = amount0In === 0n ? assets[0] : assets[1];
  const amountOut = amount0In === 0n ? amount0Out : amount1Out;

  const assetIn = amount0In === 0n ? assets[1] : assets[0];
  const amountIn = amount0In === 0n ? amount1In : amount0In;

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
        abi: 'UniswapV2',
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
    metadata: {},
  };
}

const CLASSIFIER: Classifier = {
  type: 'swap',
  protocol: 'UniswapV2',
  abi: pairAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};
export default CLASSIFIER;
