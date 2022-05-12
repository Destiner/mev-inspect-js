import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import factoryAbi from '../../abi/balancerV1/factory.js';
import poolAbi from '../../abi/balancerV1/pool.js';
import { Classifier, Pool, Swap } from '../base.js';
import { ClassifiedEvent } from '../index.js';

const FACTORY_ADDRESS = '0x9424b1412450d0f8fc2255faf6046b98213b76bd';

async function fetchPool(
  provider: Provider,
  address: string,
): Promise<Pool | null> {
  const factoryContract = new Contract(FACTORY_ADDRESS, factoryAbi, provider);
  const isPool = await factoryContract.isBPool(address);
  const factory = isPool ? FACTORY_ADDRESS : null;
  if (!factory) {
    return null;
  }
  const poolContract = new Contract(address, poolAbi, provider);
  const assets = await poolContract.getCurrentTokens();
  return { address: address.toLowerCase(), factory, assets };
}

function parse(pool: Pool, event: ClassifiedEvent): Swap | null {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;

  const sender = (values.caller as string).toLowerCase();
  const assetIn = (values.tokenIn as string).toLowerCase();
  const assetOut = (values.tokenOut as string).toLowerCase();
  const amountIn = (values.tokenAmountIn as BigNumber).toBigInt();
  const amountOut = (values.tokenAmountOut as BigNumber).toBigInt();

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'BalancerV1',
        factory: pool.factory,
      },
    },
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

const CLASSIFIER: Classifier = {
  protocol: 'BalancerV1',
  event: { name: 'LOG_SWAP', type: 'swap', parse, fetchPool },
  abi: poolAbi,
};

export { fetchPool, CLASSIFIER };
