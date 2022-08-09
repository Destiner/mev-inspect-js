import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import exchangeAbi from '../../abi/looksRareV1.js';
import { Classifier, NftSwap, Pool, PoolData } from '../base.js';
import { ChainId, ClassifiedEvent, nativeAsset } from '../index.js';

interface SpentItem {
  itemType: number;
  token: string;
  identifier: BigNumber;
  amount: BigNumber;
}

interface ReceivedItem extends SpentItem {
  recipient: string;
}

function isValid(event: Event): boolean {
  return event.name === 'OrderFulfilled';
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

  const offerer = (values.offerer as string).toLowerCase();
  const recipient = (values.recipient as string).toLowerCase();
  const offer = values.offer as SpentItem[];
  const consideration = values.consideration as ReceivedItem[];

  // Filter out fee, royalty, and other payments
  const recipientConsideration = consideration.filter(
    (item) => item.recipient === offerer,
  );

  if (offer.length !== 1 || recipientConsideration.length !== 1) {
    // Only single item trades are supported
    return null;
  }

  const spentItem = offer[0];
  const receivedItem = recipientConsideration[0];

  if (spentItem.itemType > 2 || receivedItem.itemType > 2) {
    // Only ERC20/ERC721 supported
    return null;
  }

  const from = recipient;
  const to = receivedItem.recipient;

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'OpenSeaSeaport',
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
      receivedItem.itemType === 0
        ? {
            type: 'erc20',
            address: nativeAsset[chainId],
          }
        : receivedItem.itemType === 1
        ? {
            type: 'erc20',
            address: spentItem.token,
          }
        : {
            type: 'erc721',
            collection: spentItem.token,
            id: spentItem.identifier.toBigInt(),
          },
    amountIn: spentItem.amount.toBigInt(),
    assetOut:
      receivedItem.itemType < 2
        ? {
            type: 'erc20',
            address: nativeAsset[chainId],
          }
        : receivedItem.itemType === 1
        ? {
            type: 'erc20',
            address: receivedItem.token,
          }
        : {
            type: 'erc721',
            collection: receivedItem.token,
            id: receivedItem.identifier.toBigInt(),
          },
    amountOut: receivedItem.amount.toBigInt(),
  };
}

const CLASSIFIER: Classifier = {
  type: 'nft_swap',
  protocol: 'OpenSeaSeaport',
  abi: exchangeAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};
export default CLASSIFIER;
