import Coder, { Event } from 'abi-coder';

import { Log } from '../chain.js';

import {
  Classifier,
  LendingProtocol,
  Liquidation,
  Market,
  Pool,
  Swap,
  SwapProtocol,
  Transaction,
  Transfer,
} from './base.js';
import {
  ChainId,
  lendingPools,
  nativeAsset,
  swapFactories,
} from './directory.js';
import { CLASSIFIER as balancerV1Classifier } from './items/balancerV1.js';
import { CLASSIFIERS as balancerV2Classifiers } from './items/balancerV2.js';
import compoundV2Classifier from './items/compoundV2.js';
import erc20Classifier from './items/erc20.js';
import { CLASSIFIER as uniswapV2Classifier } from './items/uniswapV2.js';
import { CLASSIFIER as uniswapV3Classifier } from './items/uniswapV3.js';

interface ClassifiedEvent extends Event {
  address: string;
  transactionHash: string;
  gasUsed: number;
  logIndex: number;
  classifier: Classifier;
}

function classify(logs: Log[]): ClassifiedEvent[] {
  return logs
    .map((log) => classifyLog(log))
    .filter((log): log is ClassifiedEvent => !!log);
}

function classifyLog(log: Log): ClassifiedEvent | undefined {
  const classifiers = getClassifiers();
  for (const classifier of classifiers) {
    const coder = new Coder.default(classifier.abi);
    try {
      const event = coder.decodeEvent(log.topics, log.data);
      if (classifier.name !== event.name) {
        continue;
      }
      return {
        address: log.address,
        transactionHash: log.transactionHash,
        gasUsed: log.gasUsed,
        logIndex: log.logIndex,
        classifier,
        ...event,
      };
    } catch {
      continue;
    }
  }
  return;
}

function getClassifiers(): Classifier[] {
  return [
    balancerV1Classifier,
    ...balancerV2Classifiers,
    erc20Classifier,
    uniswapV2Classifier,
    uniswapV3Classifier,
    compoundV2Classifier,
  ];
}

export default classify;

export {
  ChainId,
  ClassifiedEvent,
  LendingProtocol,
  Liquidation,
  Market,
  Pool,
  Swap,
  SwapProtocol,
  Transaction,
  Transfer,
  lendingPools,
  nativeAsset,
  swapFactories,
};
