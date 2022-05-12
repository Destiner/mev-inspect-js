import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import poolAbi from '../../abi/uniswapV3Pool.js';
import { equalWithTolerance } from '../../utils.js';
import {
  Classifier,
  Pool,
  Swap,
  Transfer,
  getLatestPoolTransfer,
} from '../base.js';
import { ClassifiedEvent } from '../index.js';

async function fetchPool(provider: Provider, address: string): Promise<Pool> {
  const poolContract = new Contract(address, poolAbi, provider);
  const factory = (await poolContract.factory()) as string;
  const asset0 = (await poolContract.token0()) as string;
  const asset1 = (await poolContract.token1()) as string;
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
  const { address: poolAddress, assets } = pool;

  const poolTransfer = getLatestPoolTransfer(poolAddress, logIndex, transfers);
  if (!poolTransfer) {
    return null;
  }

  const from = poolTransfer.from;
  const to = (values.recipient as string).toLowerCase();
  const amount0 = (values.amount0 as BigNumber).toBigInt();
  const amount1 = (values.amount1 as BigNumber).toBigInt();

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
  name: 'Swap',
  protocol: 'UniswapV3',
  abi: poolAbi,
  parse,
  fetchPool,
};
export { fetchPool, CLASSIFIER };
