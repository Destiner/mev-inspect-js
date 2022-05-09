import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';

import poolAbi from '../abi/balancerV1/pool.js';

import { Classifier, Pool, Swap } from './base.js';

import { ClassifiedEvent } from './index.js';

async function fetchPool(_provider: Provider, address: string): Promise<Pool> {
  // const poolContract = new Contract(address, poolAbi, provider);
  // const assets = await poolContract.getCurrentTokens();
  // return { address, assets };
  return { address, assets: [] };
}

function parse(pool: Pool, event: ClassifiedEvent): Swap {
  const { values, transactionHash: hash, logIndex, address } = event;
  const { address: poolAddress } = pool;

  const sender = values.caller as string;
  const takerAsset = values.tokenIn as string;
  const makerAsset = values.tokenOut as string;
  const takerAmount = (values.tokenAmountIn as BigNumber).toBigInt();
  const makerAmount = (values.tokenAmountOut as BigNumber).toBigInt();

  return {
    maker: poolAddress,
    makerAmount,
    makerAsset,
    taker: sender,
    takerAmount,
    takerAsset,
    transaction: {
      hash,
    },
    event: {
      logIndex,
      address,
    },
  };
}

const CLASSIFIERS: Classifier[] = [
  {
    protocol: 'BalancerV1',
    event: { name: 'LOG_SWAP', type: 'swap', parse, fetchPool },
    abi: poolAbi,
  },
];

export { fetchPool, CLASSIFIERS };
