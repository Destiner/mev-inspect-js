import Coder, { Event } from 'abi-coder';

import { Log } from '../chain.js';

import { CLASSIFIER as balancerV1Classifier } from './balancerV1.js';
import { CLASSIFIER as balancerV2Classifier } from './balancerV2.js';
import { Classifier, Pool, Swap, Transaction, Transfer } from './base.js';
import directory from './directory.js';
import erc20Classifier from './erc20.js';
import { CLASSIFIER as uniswapV2Classifier } from './uniswapV2.js';
import { CLASSIFIER as uniswapV3Classifier } from './uniswapV3.js';

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
      if (classifier.event.name !== event.name) {
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
    balancerV2Classifier,
    erc20Classifier,
    uniswapV2Classifier,
    uniswapV3Classifier,
  ];
}

export default classify;

export { ClassifiedEvent, Pool, Swap, Transaction, Transfer, directory };
