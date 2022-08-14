import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import exchangeAbi from '../../abi/x2y2V1.js';
import { Classifier, NftSwap, Pool, PoolData } from '../base.js';
import { ChainId, ClassifiedEvent, nativeAsset } from '../index.js';

interface Item {
  price: BigNumber;
  data: string;
}

function isValid(event: Event): boolean {
  return event.name === 'EvInventory';
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

function parse(
  pool: Pool,
  event: ClassifiedEvent,
  chainId: ChainId,
): NftSwap | null {
  const {
    values,
    transactionHash: hash,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;
  const taker = (values.taker as string).toLowerCase();
  const currency = (values.currency as string).toLowerCase();
  const price = (values.item as Item).price.toBigInt();
  const data = (values.item as Item).data.toLowerCase();
  // const currency = (values.currency as string).toLowerCase();
  // const collection = (values.collection as string).toLowerCase();
  // const tokenId = (values.tokenId as BigNumber).toBigInt();
  // const amount = (values.amount as BigNumber).toBigInt();
  // const price = (values.price as BigNumber).toBigInt();

  const from = taker;
  const to = taker;

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'X2Y2V1',
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
    assetIn:
      currency === AddressZero
        ? {
            type: 'erc20',
            address: nativeAsset[chainId],
          }
        : {
            type: 'erc20',
            address: currency,
          },
    amountIn: price,
    assetOut: {
      type: 'erc721',
      collection: `0x${data.substring(154, 194)}`,
      id: BigInt(`0x${data.substring(194, 258)}`),
    },
    amountOut: 1n,
  };
}

const CLASSIFIER: Classifier = {
  type: 'nft_swap',
  protocol: 'X2Y2V1',
  abi: exchangeAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};
export default CLASSIFIER;
