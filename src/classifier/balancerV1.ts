import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import poolAbi from '../abi/balancerV1/pool.js';

import { Classifier, Pool, Swap } from './base.js';

import { ClassifiedEvent } from './index.js';

async function fetchPool(provider: Provider, address: string): Promise<Pool> {
  const poolContract = new Contract(address, poolAbi, provider);
  const assets = await poolContract.getCurrentTokens();
  return { address, assets };
}

function parse(pool: Pool, event: ClassifiedEvent): Swap {
  const { values, transactionHash: hash, logIndex, address } = event;
  const { address: poolAddress } = pool;

  const sender = values[0] as string;
  const takerAsset = values[1] as string;
  const makerAsset = values[2] as string;
  const takerAmount = (values[3] as BigNumber).toBigInt();
  const makerAmount = (values[4] as BigNumber).toBigInt();

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
