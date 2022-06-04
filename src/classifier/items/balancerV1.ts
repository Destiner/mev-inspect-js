import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import factoryAbi from '../../abi/balancerV1Factory.js';
import poolAbi from '../../abi/balancerV1Pool.js';
import { Classifier, Pool, PoolData, Swap } from '../base.js';
import { ClassifiedEvent } from '../index.js';

const FACTORY_ADDRESS = '0x9424b1412450d0f8fc2255faf6046b98213b76bd';

function isValid(event: Event): boolean {
  return event.name === 'LOG_SWAP';
}

async function fetchPool(
  provider: Provider,
  address: string,
): Promise<PoolData | null> {
  const factoryContract = new Contract(FACTORY_ADDRESS, factoryAbi, provider);
  const isPool = await factoryContract.isBPool(address);
  const factoryAddress = isPool ? FACTORY_ADDRESS : null;
  if (!factoryAddress) {
    return null;
  }
  const poolContract = new Contract(address, poolAbi, provider);
  const assets = await poolContract.getCurrentTokens();
  return { factoryAddress, assets };
}

function parse(pool: Pool, event: ClassifiedEvent): Swap | null {
  const {
    values,
    transactionHash: hash,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;

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
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      hash,
      gasUsed,
    },
    event: {
      logIndex,
      address: address.toLowerCase(),
    },
    from: sender,
    to: sender,
    assetIn,
    amountIn,
    assetOut,
    amountOut,
  };
}

const CLASSIFIER: Classifier = {
  type: 'swap',
  protocol: 'BalancerV1',
  abi: poolAbi,
  isValid,
  parse,
  fetchPool,
};

export default CLASSIFIER;
