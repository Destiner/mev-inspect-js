import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import exchangeAbi from '../../abi/bancorV2.js';
import { Classifier, Pool, PoolData, Swap } from '../base.js';
import { ClassifiedEvent } from '../index.js';

function isValid(event: Event): boolean {
  return event.name === 'Conversion';
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
    transactionIndex,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;

  const fromToken = normalizeAsset((values.fromToken as string).toLowerCase());
  const toToken = normalizeAsset((values.toToken as string).toLowerCase());
  const fromAmount = (values.fromAmount as BigNumber).toBigInt();
  const toAmount = (values.toAmount as BigNumber).toBigInt();
  const trader = (values.trader as string).toLowerCase();

  const from = trader;
  const to = trader;

  const assetIn = fromToken;
  const assetOut = toToken;
  const amountIn = fromAmount;
  const amountOut = toAmount;

  return {
    contract: {
      address,
      protocol: {
        abi: 'BancorV2',
        factory: pool.factory,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      hash,
      index: transactionIndex,
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
    metadata: {},
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
  protocol: 'BancorV2',
  abi: exchangeAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};

export default CLASSIFIER;
