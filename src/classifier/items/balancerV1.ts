import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call, Contract } from 'ethcall';

import factoryAbi from '../../abi/balancerV1Factory.json' assert { type: 'json' };
import poolAbi from '../../abi/balancerV1Pool.json' assert { type: 'json' };
import { Classifier, Pool, PoolData, Swap } from '../base.js';
import { ClassifiedEvent } from '../index.js';

const FACTORY_ADDRESS = '0x9424b1412450d0f8fc2255faf6046b98213b76bd';

function isValid(event: Event): boolean {
  return event.name === 'LOG_SWAP';
}

function getPoolCalls(address: string): Call[] {
  const factoryContract = new Contract(FACTORY_ADDRESS, factoryAbi);
  const isPoolCall = factoryContract.isBPool(address);
  const poolContract = new Contract(address, poolAbi);
  const assetsCall = poolContract.getCurrentTokens();
  return [isPoolCall, assetsCall];
}

function processPoolCalls(result: unknown[]): PoolData | null {
  const [isPool, tokens] = result;
  if (!isPool || !tokens) {
    return null;
  }
  const assets = (tokens as string[]).map((token) => token.toLowerCase());
  return {
    factoryAddress: FACTORY_ADDRESS,
    assets,
  };
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
    metadata: {},
  };
}

const CLASSIFIER: Classifier = {
  type: 'swap',
  protocol: 'BalancerV1',
  abi: poolAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};

export default CLASSIFIER;
