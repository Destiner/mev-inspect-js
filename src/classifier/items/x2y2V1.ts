import type { Event } from 'abi-coder';
import type { Call } from 'ethcall';
import { ZeroAddress } from 'ethers';

import exchangeAbi from '../../abi/x2y2V1.js';
import type { Classifiers, NftPool, NftPoolData, NftSwap } from '../base.js';
import type { ChainId, ClassifiedEvent } from '../index.js';
import { nativeAsset } from '../index.js';

interface Item {
  price: bigint;
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
): NftPoolData | null {
  return {
    factoryAddress: address.toLowerCase(),
    asset: '',
    collection: '',
    metadata: {},
  };
}

function parse(
  pool: NftPool,
  event: ClassifiedEvent,
  chainId: ChainId,
): NftSwap | null {
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
  const taker = (values.taker as string).toLowerCase();
  const currency = (values.currency as string).toLowerCase();
  const price = (values.item as Item).price;
  const data = (values.item as Item).data.toLowerCase();

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
    assetIn:
      currency === ZeroAddress
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

const CLASSIFIER: Classifiers = {
  nftSwap: {
    type: 'nft_swap',
    protocol: 'X2Y2V1',
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
