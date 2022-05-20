import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import pairAbi from '../../abi/uniswapV2Pair.js';
import { equalWithTolerance } from '../../utils.js';
import {
  Classifier,
  Pool,
  Swap,
  Transfer,
  getLatestPoolTransfer,
} from '../base.js';
import { ClassifiedEvent } from '../index.js';

function isValid(event: Event): boolean {
  return event.name === 'Swap';
}

async function fetchPool(provider: Provider, address: string): Promise<Pool> {
  const pairContract = new Contract(address, pairAbi, provider);
  const factory = (await pairContract.factory()) as string;
  const asset0 = (await pairContract.token0()) as string;
  const asset1 = (await pairContract.token1()) as string;
  return {
    address: address.toLowerCase(),
    assets: [asset0.toLowerCase(), asset1.toLowerCase()],
    factory: factory.toLowerCase(),
  };
}

function parse(
  pool: Pool,
  event: ClassifiedEvent,
  transfers: Transfer[],
): Swap | null {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;
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
    from,
    to,
    assetIn,
    amountIn,
    assetOut,
    amountOut,
    transaction: {
      hash,
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
  };
}

const CLASSIFIER: Classifier = {
  type: 'swap',
  protocol: 'UniswapV2',
  abi: pairAbi,
  isValid,
  parse,
  fetchPool,
};
export { fetchPool, CLASSIFIER };
