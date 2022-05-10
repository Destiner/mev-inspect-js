import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import poolAbi from '../abi/uniswapV3/pool.js';

import { Classifier, Pool, Swap } from './base.js';

import { ClassifiedEvent } from './index.js';

async function fetchPool(provider: Provider, address: string): Promise<Pool> {
  const poolContract = new Contract(address, poolAbi, provider);
  const asset0 = await poolContract.token0();
  const asset1 = await poolContract.token1();
  return { address, assets: [asset0, asset1] };
}

function parse(pool: Pool, event: ClassifiedEvent): Swap {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;
  const { address: poolAddress, assets } = pool;

  const from = values.sender as string;
  const to = values.recipient as string;
  const amount0 = (values.amount0 as BigNumber).toBigInt();
  const amount1 = (values.amount1 as BigNumber).toBigInt();

  const assetOut = amount0 < 0 ? assets[0] : assets[1];
  const amountOut = amount0 < 0 ? amount0 * -1n : amount1 * -1n;

  const assetIn = amount0 > 0 ? assets[0] : assets[1];
  const amountIn = amount0 > 0 ? amount0 : amount1;

  return {
    contract: poolAddress,
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
      address,
      logIndex,
    },
  };
}

const CLASSIFIERS: Classifier[] = [
  {
    protocol: 'UniswapV3',
    event: { name: 'Swap', type: 'swap', parse, fetchPool },
    abi: poolAbi,
  },
];

export { fetchPool, CLASSIFIERS };
