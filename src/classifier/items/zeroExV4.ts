import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import exchangeAbi from '../../abi/zeroExV4.js';
import { Classifier, Pool, PoolData, Swap } from '../base.js';
import { ClassifiedEvent } from '../index.js';

function isValid(event: Event): boolean {
  return event.name === 'RfqOrderFilled' || event.name === 'LimitOrderFilled';
}

function getPoolCalls(): Call[] {
  return [];
}

function processPoolCalls(
  _results: unknown[],
  address: string,
): PoolData | null {
  return {
    factoryAddress: address.toLowerCase(),
    assets: [],
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

  const makerToken = (values.makerToken as string).toLowerCase();
  const takerToken = (values.takerToken as string).toLowerCase();
  const taker = (values.taker as string).toLowerCase();
  const makerTokenFilledAmount = (
    values.makerTokenFilledAmount as BigNumber
  ).toBigInt();
  const takerTokenFilledAmount = (
    values.takerTokenFilledAmount as BigNumber
  ).toBigInt();

  const from = taker;
  const to = taker;

  const assetIn = takerToken;
  const amountIn = takerTokenFilledAmount;
  const assetOut = makerToken;
  const amountOut = makerTokenFilledAmount;

  return {
    contract: {
      address,
      protocol: {
        abi: 'ZeroExV4',
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
      address: address.toLowerCase(),
      logIndex,
    },
    from,
    to,
    assetIn,
    amountIn,
    assetOut,
    amountOut,
  };
}

const CLASSIFIER: Classifier = {
  type: 'swap',
  protocol: 'ZeroExV4',
  abi: exchangeAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};
export default CLASSIFIER;
