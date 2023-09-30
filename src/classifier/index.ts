import type { ValueMap } from 'abi-coder';
import { Coder } from 'abi-coder';

import type { Log } from '../chain.js';

import type {
  Asset,
  Base,
  Block,
  Classifier,
  Erc20Asset,
  LendingProtocol,
  LiquidityDeposit,
  LiquidityWithdrawal,
  Market,
  NftPool,
  NftSwap,
  NftSwapProtocol,
  Pool,
  Protocol,
  Repayment,
  Searcher,
  Seizure,
  Swap,
  SwapProtocol,
  Transaction,
  Transfer,
} from './base.js';
import type { ChainId } from './directory.js';
import {
  getFactoryByAddress,
  getNftFactoryByAddress,
  getPoolByAddress,
  isKnownRouter,
  isValidFactory,
  isValidNftFactory,
  isValidPool,
  nativeAsset,
} from './directory.js';
import aaveV1Classifiers from './items/aaveV1.js';
import aaveV2Classifiers from './items/aaveV2.js';
import aaveV3Classifiers from './items/aaveV3.js';
import balancerV1Classifiers from './items/balancerV1.js';
import balancerV2Classifiers from './items/balancerV2.js';
import bancorV2Classifier from './items/bancorV2.js';
import bancorV3Classifier from './items/bancorV3.js';
import compoundV2Classifiers from './items/compoundV2.js';
import curveV1Classifiers from './items/curveV1.js';
import curveV2Classifiers from './items/curveV2.js';
import erc20Classifier from './items/erc20.js';
import looksRareV1Classifier from './items/looksRareV1.js';
import openseaSeaportClassifier from './items/openseaSeaport.js';
import sudoswapV1Classifier from './items/sudoswapV1.js';
import uniswapV2Classifier from './items/uniswapV2.js';
import uniswapV3Classifier from './items/uniswapV3.js';
import x2y2V1Classifier from './items/x2y2V1.js';
import zeroExV3Classifier from './items/zeroExV3.js';
import zeroExV4Classifier from './items/zeroExV4.js';

interface ClassifiedEvent {
  address: string;
  blockHash: string;
  blockNumber: number;
  transactionFrom: string;
  transactionHash: string;
  transactionIndex: number;
  gasUsed: number;
  logIndex: number;
  classifier: Classifier;
  name: string;
  values: ValueMap;
}

function classify(chainId: ChainId, logs: Log[]): ClassifiedEvent[] {
  return logs.map((log) => classifyLog(chainId, log)).flat();
}

function classifyLog(chainId: ChainId, log: Log): ClassifiedEvent[] {
  const events: ClassifiedEvent[] = [];
  const classifiers = getClassifiers();
  for (const classifier of classifiers) {
    const coder = new Coder(classifier.abi);
    try {
      const {
        topics,
        data,
        address,
        transactionFrom,
        transactionHash,
        transactionIndex,
        gasUsed,
        logIndex,
        blockHash,
        blockNumber,
      } = log;
      const event = coder.decodeEvent(topics as string[], data);
      if (!classifier.isValid(event, address, chainId)) {
        continue;
      }
      const classifiedEvent: ClassifiedEvent = {
        address,
        blockHash,
        blockNumber,
        transactionFrom,
        transactionHash,
        transactionIndex,
        gasUsed,
        logIndex,
        classifier,
        ...event,
      };
      events.push(classifiedEvent);
    } catch {
      continue;
    }
  }
  return events;
}

function getClassifiers(): Classifier[] {
  return [
    ...Object.values(balancerV1Classifiers),
    ...Object.values(balancerV2Classifiers),
    bancorV2Classifier.swap,
    bancorV3Classifier.swap,
    ...Object.values(curveV1Classifiers),
    ...Object.values(curveV2Classifiers),
    erc20Classifier.transfer,
    looksRareV1Classifier.nftSwap,
    openseaSeaportClassifier.nftSwap,
    sudoswapV1Classifier.nftSwap,
    uniswapV2Classifier.swap,
    ...Object.values(uniswapV3Classifier),
    x2y2V1Classifier.nftSwap,
    zeroExV3Classifier.swap,
    zeroExV4Classifier.swap,
    ...Object.values(compoundV2Classifiers),
    ...Object.values(aaveV1Classifiers),
    ...Object.values(aaveV2Classifiers),
    ...Object.values(aaveV3Classifiers),
  ];
}

export default classify;

export {
  getFactoryByAddress,
  getNftFactoryByAddress,
  getPoolByAddress,
  isValidFactory,
  isValidNftFactory,
  isValidPool,
  isKnownRouter,
  nativeAsset,
};
export type {
  Asset,
  Base,
  Block,
  ChainId,
  ClassifiedEvent,
  Erc20Asset,
  LendingProtocol,
  LiquidityDeposit,
  LiquidityWithdrawal,
  Market,
  NftPool,
  NftSwap,
  NftSwapProtocol,
  Pool,
  Protocol,
  Repayment,
  Searcher,
  Seizure,
  Swap,
  SwapProtocol,
  Transaction,
  Transfer,
};
