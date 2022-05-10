import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';

import poolAbi from '../abi/balancerV1/pool.js';

import { Classifier, Pool, Swap } from './base.js';

import { ClassifiedEvent } from './index.js';

async function fetchPool(_provider: Provider, address: string): Promise<Pool> {
  // const poolContract = new Contract(address, poolAbi, provider);
  // const assets = await poolContract.getCurrentTokens();
  // return { address, assets };
  return { address: address.toLowerCase(), assets: [] };
}

function parse(pool: Pool, event: ClassifiedEvent): Swap {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;
  const { address: poolAddress } = pool;

  const sender = (values.caller as string).toLowerCase();
  const assetIn = (values.tokenIn as string).toLowerCase();
  const assetOut = (values.tokenOut as string).toLowerCase();
  const amountIn = (values.tokenAmountIn as BigNumber).toBigInt();
  const amountOut = (values.tokenAmountOut as BigNumber).toBigInt();

  return {
    contract: poolAddress,
    from: sender,
    to: sender,
    assetIn,
    amountIn,
    assetOut,
    amountOut,
    transaction: {
      hash,
      gasUsed,
    },
    event: {
      logIndex,
      address: address.toLowerCase(),
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
