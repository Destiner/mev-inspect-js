import { BigNumber } from '@ethersproject/bignumber';
import { Coder, Event } from 'abi-coder';
import { Call, Contract } from 'ethcall';

import erc721Abi from '../../abi/erc721.js';
import poolAbi from '../../abi/sudoswapV1.js';
import { Log } from '../../chain.js';
import { Classifier, NftPool, NftPoolData, NftSwap } from '../base.js';
import { ChainId, ClassifiedEvent, nativeAsset } from '../index.js';

const EXPONENTIAL_CURVE = '0x432f962d8209781da23fb37b6b59ee15de7d9841';
const LINEAR_CURVE = '0x5b6ac51d9b1cede0068a1b26533cace807f883ee';

const PROTOCOL_FEE = 5_000_000_000_000_000n;

type PoolType = 'linear' | 'exponential';

interface NftTransfer {
  from: string;
  to: string;
  id: bigint;
}

interface NewSpotPriceEvent {
  logIndex: number;
  value: bigint;
}

function isValid(event: Event): boolean {
  return event.name === 'SwapNFTInPair' || event.name === 'SwapNFTOutPair';
}

function getPoolCalls(address: string): Call[] {
  const poolContract = new Contract(address, poolAbi);
  const factoryCall = poolContract.factory();
  const tokenCall = poolContract.token();
  const nftCall = poolContract.nft();
  const bondingCurveCall = poolContract.bondingCurve();
  const feeCall = poolContract.fee();
  const deltaCall = poolContract.delta();
  return [
    factoryCall,
    tokenCall,
    nftCall,
    bondingCurveCall,
    feeCall,
    deltaCall,
  ];
}

function processPoolCalls(
  results: unknown[],
  _address: string,
  chainId: ChainId,
): NftPoolData | null {
  const factory = (results[0] as string).toLowerCase();
  const token = (results[1] as string | null)?.toLowerCase();
  const nft = (results[2] as string).toLowerCase();
  const bondingCurve = (results[3] as string).toLowerCase();
  const fee = (results[4] as BigNumber).toBigInt();
  const delta = (results[5] as BigNumber).toBigInt();
  const type: PoolType | null =
    bondingCurve === EXPONENTIAL_CURVE
      ? 'exponential'
      : bondingCurve === LINEAR_CURVE
      ? 'linear'
      : null;
  if (!type) {
    return null;
  }
  return {
    factoryAddress: factory.toLowerCase(),
    asset: token || nativeAsset[chainId],
    collection: nft,
    metadata: {
      type,
      fee,
      delta,
    },
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
    transactionHash: hash,
    gasUsed,
    logIndex,
    blockHash,
    blockNumber,
  } = event;
  const { address, asset, collection, metadata } = pool;

  const fee = metadata.fee as bigint;
  const delta = metadata.delta as bigint;
  const poolType = metadata.type as PoolType;

  const txLogs = allLogs.filter((log) => log.transactionHash === hash);
  const newSpotPriceEvent = getNewSpotPrice(logIndex, address, txLogs);
  if (!newSpotPriceEvent) {
    return null;
  }
  const nftTransfers = getNftTransfers(
    logIndex,
    newSpotPriceEvent.logIndex,
    collection,
    txLogs,
  );
  if (nftTransfers.length !== 1) {
    return null;
  }
  const transfer = nftTransfers[0];

  const swapIn = name === 'SwapNFTInPair';

  const effectivePrice = getEffectivePrice(
    poolType,
    fee,
    delta,
    newSpotPriceEvent.value,
    swapIn,
  );

  const from = swapIn ? transfer.from : transfer.to;
  const to = swapIn ? transfer.from : transfer.to;

  return {
    contract: {
      address,
      protocol: {
        abi: 'SudoswapV1',
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
      address,
      logIndex,
    },
    from,
    to,
    assetIn: swapIn
      ? {
          type: 'erc721',
          collection,
          id: transfer.id,
        }
      : {
          type: 'erc20',
          address: asset,
        },
    amountIn: swapIn ? 1n : effectivePrice,
    assetOut: swapIn
      ? {
          type: 'erc20',
          address: asset,
        }
      : {
          type: 'erc721',
          collection,
          id: transfer.id,
        },
    amountOut: swapIn ? effectivePrice : 1n,
  };
}

function getNewSpotPrice(
  swapLogIndex: number,
  poolAddress: string,
  logs: Log[],
): NewSpotPriceEvent | null {
  const poolLogs = logs.filter(
    (log) => log.address.toLowerCase() === poolAddress,
  );
  poolLogs.reverse();
  const log = poolLogs.find((log) => log.logIndex < swapLogIndex);
  if (!log) {
    return null;
  }
  const sudoswapCoder = new Coder(poolAbi);
  const event = sudoswapCoder.decodeEvent(log.topics, log.data);
  const price = (event.values.newSpotPrice as BigNumber).toBigInt();
  return {
    logIndex: log.logIndex,
    value: price,
  };
}

function getNftTransfers(
  swapLogIndex: number,
  newSpotPriceLogIndex: number,
  collection: string,
  logs: Log[],
): NftTransfer[] {
  const collectionLogs = logs.filter(
    (log) =>
      log.address.toLowerCase() === collection &&
      log.logIndex > newSpotPriceLogIndex &&
      log.logIndex < swapLogIndex,
  );
  const nftCoder = new Coder(erc721Abi);
  return collectionLogs
    .map((log) => {
      try {
        const event = nftCoder.decodeEvent(log.topics, log.data);
        return event.name === 'Transfer'
          ? {
              from: (event.values.from as string).toLowerCase(),
              to: (event.values.to as string).toLowerCase(),
              id: (event.values.tokenId as BigNumber).toBigInt(),
            }
          : null;
      } catch (e) {
        return null;
      }
    })
    .filter((item): item is NftTransfer => item !== null);
}

function getEffectivePrice(
  type: PoolType,
  fee: bigint,
  delta: bigint,
  nextSpotPrice: bigint,
  swapIn: boolean,
): bigint {
  const precisionMultiplier = 1_000_000_000_000_000_000n;
  const spotPrice =
    type === 'linear'
      ? swapIn
        ? nextSpotPrice + delta
        : nextSpotPrice - delta
      : swapIn
      ? (nextSpotPrice * delta) / precisionMultiplier
      : (nextSpotPrice * precisionMultiplier) / delta;
  return type === 'linear'
    ? swapIn
      ? (spotPrice * (precisionMultiplier - fee - PROTOCOL_FEE)) /
        precisionMultiplier
      : ((spotPrice + delta) * (precisionMultiplier + fee + PROTOCOL_FEE)) /
        precisionMultiplier
    : swapIn
    ? (spotPrice * (precisionMultiplier - fee - PROTOCOL_FEE)) /
      precisionMultiplier
    : (spotPrice * (precisionMultiplier + fee + PROTOCOL_FEE) * delta) /
      precisionMultiplier /
      precisionMultiplier;
}

const CLASSIFIER: Classifier = {
  type: 'nft_swap',
  protocol: 'SudoswapV1',
  abi: poolAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};

export default CLASSIFIER;

export { getEffectivePrice };
