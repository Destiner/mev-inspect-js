import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import poolAbi from '../abi/uniswapV3/pool.js';

import { Classifier, Pool, Swap } from './base.js';

async function fetchPool(provider: Provider, address: string): Promise<Pool> {
  const poolContract = new Contract(address, poolAbi, provider);
  const asset0 = await poolContract.token0();
  const asset1 = await poolContract.token1();
  return { address, assets: [asset0, asset1] };
}

function parse(
  pool: Pool,
  transactionHash: string,
  logIndex: number,
  event: Event,
): Swap {
  const { values } = event;
  const { address, assets } = pool;

  const sender = values[0] as string;
  const amount0 = (values[2] as BigNumber).toBigInt();
  const amount1 = (values[3] as BigNumber).toBigInt();

  const makerAsset = amount0 < 0 ? assets[0] : assets[1];
  const makerAmount = amount0 < 0 ? amount0 * -1n : amount1 * -1n;

  const takerAsset = amount0 > 0 ? assets[0] : assets[1];
  const takerAmount = amount0 > 0 ? amount0 : amount1;

  return {
    maker: address,
    makerAmount,
    makerAsset,
    taker: sender,
    takerAmount,
    takerAsset,
    metadata: {
      transactionHash,
      logIndex,
      eventAddress: address,
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
