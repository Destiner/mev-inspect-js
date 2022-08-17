import { BigNumber } from '@ethersproject/bignumber';
import { Coder, Event } from 'abi-coder';
import { Call } from 'ethcall';

import erc20Abi from '../../abi/erc20.js';
import exchangeAbi from '../../abi/looksRareV1.js';
import { Log } from '../../chain.js';
import { Classifier, NftPool, NftPoolData, NftSwap } from '../base.js';
import { ChainId, ClassifiedEvent } from '../index.js';

function isValid(event: Event): boolean {
  return event.name === 'TakerAsk' || event.name === 'TakerBid';
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
  _chainId: ChainId,
  allLogs: Log[],
): NftSwap | null {
  const {
    name,
    values,
    transactionHash: hash,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;
  const maker = (values.maker as string).toLowerCase();
  const taker = (values.taker as string).toLowerCase();
  const currency = (values.currency as string).toLowerCase();
  const collection = (values.collection as string).toLowerCase();
  const tokenId = (values.tokenId as BigNumber).toBigInt();
  const amount = (values.amount as BigNumber).toBigInt();
  const price = (values.price as BigNumber).toBigInt();

  const txLogs = allLogs.filter((log) => log.transactionHash === hash);
  const erc20Amount =
    name === 'TakerAsk'
      ? getAmount(logIndex, maker, taker, currency, txLogs)
      : price;

  if (amount > 1) {
    return null;
  }

  const from = taker;
  const to = taker;

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
    assetIn:
      name === 'TakerAsk'
        ? {
            type: 'erc721',
            collection,
            id: tokenId,
          }
        : {
            type: 'erc20',
            address: currency,
          },
    amountIn: name === 'TakerAsk' ? 1n : erc20Amount,
    assetOut:
      name === 'TakerAsk'
        ? {
            type: 'erc20',
            address: currency,
          }
        : {
            type: 'erc721',
            collection,
            id: tokenId,
          },
    amountOut: name === 'TakerAsk' ? erc20Amount : 1n,
  };
}

function getAmount(
  swapLogIndex: number,
  maker: string,
  taker: string,
  currency: string,
  logs: Log[],
): bigint {
  const currencyLogs = logs.filter(
    (log) =>
      log.address.toLowerCase() === currency && log.logIndex < swapLogIndex,
  );
  currencyLogs.reverse();
  const nftCoder = new Coder(erc20Abi);

  for (const log of currencyLogs) {
    try {
      const event = nftCoder.decodeEvent(log.topics, log.data);
      if (event.name !== 'Transfer') {
        continue;
      }
      const from = (event.values.from as string).toLowerCase();
      const to = (event.values.to as string).toLowerCase();
      const value = (event.values.value as BigNumber).toBigInt();
      if (maker !== from || taker !== to) {
        continue;
      }
      return value;
    } catch (e) {
      continue;
    }
  }
  return 0n;
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
