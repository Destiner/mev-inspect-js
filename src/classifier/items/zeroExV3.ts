import type { Event } from 'abi-coder';
import type { Call } from 'ethcall';

import exchangeAbi from '../../abi/zeroExV3.js';
import type { Classifiers, Pool, PoolData, Swap } from '../base.js';
import type { ClassifiedEvent } from '../index.js';

function isValid(event: Event): boolean {
  return event.name === 'Fill';
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
    transactionFrom,
    transactionHash: hash,
    transactionIndex,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;

  const makerAssetData = values.makerAssetData as string;
  const takerAssetData = values.takerAssetData as string;
  const takerAddress = (values.takerAddress as string).toLowerCase();
  const makerAssetFilledAmount = values.makerAssetFilledAmount as bigint;
  const takerAssetFilledAmount = values.takerAssetFilledAmount as bigint;

  const from = takerAddress;
  const to = takerAddress;

  const assetIn = getAsset(takerAssetData);
  const assetOut = getAsset(makerAssetData);
  const amountIn = takerAssetFilledAmount;
  const amountOut = makerAssetFilledAmount;

  if (!assetIn || !assetOut) {
    return null;
  }

  return {
    contract: {
      address,
      protocol: {
        abi: 'ZeroExV3',
        factory: pool.factory,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      from: transactionFrom.toLowerCase(),
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
    assetIn: {
      type: 'erc20',
      address: assetIn,
    },
    amountIn,
    assetOut: {
      type: 'erc20',
      address: assetOut,
    },
    amountOut,
    metadata: {},
  };
}

function getAsset(assetData: string): string | null {
  if (assetData.length === 74 && assetData.startsWith('0xf47261b')) {
    return `0x${assetData.substring(34).toLowerCase()}`;
  } else {
    return null;
  }
}

const CLASSIFIER: Classifiers = {
  swap: {
    type: 'swap',
    protocol: 'ZeroExV3',
    abi: exchangeAbi,
    isValid,
    parse,
    pool: {
      getCalls: getPoolCalls,
      processCalls: processPoolCalls,
    },
  },
};

export default CLASSIFIER;
