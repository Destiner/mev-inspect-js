import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import pairAbi from '../abi/uniswapV2/pair.js';

import { Classifier, Pool, Swap } from './base.js';

import { ClassifiedEvent } from './index.js';

async function fetchPool(provider: Provider, address: string): Promise<Pool> {
  const pairContract = new Contract(address, pairAbi, provider);
  const asset0 = await pairContract.token0();
  const asset1 = await pairContract.token1();
  return { address, assets: [asset0, asset1] };
}

function parse(pool: Pool, event: ClassifiedEvent): Swap {
  const { values, transactionHash: hash, logIndex, address } = event;
  const { address: poolAddress, assets } = pool;

  const from = values.sender as string;
  const to = values.to as string;
  const amount0In = (values.amount0In as BigNumber).toBigInt();
  const amount1In = (values.amount1In as BigNumber).toBigInt();
  const amount0Out = (values.amount0Out as BigNumber).toBigInt();
  const amount1Out = (values.amount1Out as BigNumber).toBigInt();

  const assetOut = amount0In === 0n ? assets[0] : assets[1];
  const amountOut = amount0In === 0n ? amount0Out : amount1Out;

  const assetIn = amount0In === 0n ? assets[1] : assets[0];
  const amountIn = amount0In === 0n ? amount1In : amount0In;

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
    },
    event: {
      address,
      logIndex,
    },
  };
}

const CLASSIFIERS: Classifier[] = [
  {
    protocol: 'UniswapV2',
    event: { name: 'Swap', type: 'swap', parse, fetchPool },
    abi: pairAbi,
  },
];

export { fetchPool, CLASSIFIERS };
