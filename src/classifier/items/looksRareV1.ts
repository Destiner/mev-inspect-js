import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import exchangeAbi from '../../abi/looksRareV1.js';
import { Classifier, NftSwap, Pool, PoolData } from '../base.js';
import { ClassifiedEvent } from '../index.js';

function isValid(event: Event): boolean {
  return event.name === 'TakerBid';
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

function parse(pool: Pool, event: ClassifiedEvent): NftSwap | null {
  const {
    values,
    transactionHash: hash,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;
  const from = (values.taker as string).toLowerCase();
  const to = (values.taker as string).toLowerCase();
  const currency = (values.currency as string).toLowerCase();
  const collection = (values.collection as string).toLowerCase();
  const tokenId = (values.tokenId as BigNumber).toBigInt();
  const amount = (values.amount as BigNumber).toBigInt();
  const price = (values.price as BigNumber).toBigInt();

  if (amount > 1) {
    return null;
  }

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'LooksRareV1',
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
    assetIn: {
      type: 'erc20',
      address: currency,
    },
    amountIn: price,
    assetOut: {
      type: 'erc721',
      collection,
      id: tokenId,
    },
    amountOut: 1n,
  };
}

const CLASSIFIER: Classifier = {
  type: 'nft_swap',
  protocol: 'LooksRareV1',
  abi: exchangeAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};
export default CLASSIFIER;
