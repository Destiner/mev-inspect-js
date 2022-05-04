import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import pairAbi from '../abi/uniswapV2/pair.js';

import { Classifier, Pool, Swap } from './base.js';

async function fetchPool(provider: Provider, address: string): Promise<Pool> {
  const pairContract = new Contract(address, pairAbi, provider);
  const asset0 = await pairContract.token0();
  const asset1 = await pairContract.token1();
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
  const amount0In = (values[1] as BigNumber).toBigInt();
  const amount1In = (values[2] as BigNumber).toBigInt();
  const amount0Out = (values[3] as BigNumber).toBigInt();
  const amount1Out = (values[4] as BigNumber).toBigInt();

  const makerAsset = amount0In === 0n ? assets[0] : assets[1];
  const makerAmount = amount0In === 0n ? amount0Out : amount1Out;

  const takerAsset = amount0In === 0n ? assets[1] : assets[0];
  const takerAmount = amount0In === 0n ? amount1In : amount0In;

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
    protocol: 'UniswapV2',
    event: { name: 'Swap', type: 'swap', parse, fetchPool },
    abi: pairAbi,
  },
];

export { fetchPool, CLASSIFIERS };
