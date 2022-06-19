import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import exchangeAbi from '../../abi/bancorV3.js';
import { Classifier, Pool, PoolData, Swap } from '../base.js';
import { ClassifiedEvent } from '../index.js';

function isValid(event: Event): boolean {
  return event.name === 'TokensTraded';
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

  const sourceToken = normalizeAsset(
    (values.sourceToken as string).toLowerCase(),
  );
  const targetToken = normalizeAsset(
    (values.targetToken as string).toLowerCase(),
  );
  const sourceAmount = (values.sourceAmount as BigNumber).toBigInt();
  const targetAmount = (values.targetAmount as BigNumber).toBigInt();
  const trader = (values.trader as string).toLowerCase();

  const from = trader;
  const to = trader;

  const assetIn = sourceToken;
  const assetOut = targetToken;
  const amountIn = sourceAmount;
  const amountOut = targetAmount;

  return {
    contract: {
      address,
      protocol: {
        abi: 'BancorV3',
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

function normalizeAsset(asset: string): string {
  if (asset == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    return '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
  }
  return asset;
}

const CLASSIFIER: Classifier = {
  type: 'swap',
  protocol: 'BancorV3',
  abi: exchangeAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};

export default CLASSIFIER;
