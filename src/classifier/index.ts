import Coder, { Event } from 'abi-coder';

import { Log } from '../chain.js';

import { CLASSIFIERS as balancerV1Classifiers } from './balancerV1.js';
import { CLASSIFIERS as balancerV2Classifiers } from './balancerV2.js';
import { Classifier, Pool, Swap, Transaction, Transfer } from './base.js';
import erc20Classifiers from './erc20.js';
import { CLASSIFIERS as uniswapV2Classifiers } from './uniswapV2.js';
import { CLASSIFIERS as uniswapV3Classifiers } from './uniswapV3.js';

interface ClassifiedEvent extends Event {
  address: string;
  transactionHash: string;
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
  const classifiers = [
    balancerV1Classifiers,
    balancerV2Classifiers,
    erc20Classifiers,
    uniswapV2Classifiers,
    uniswapV3Classifiers,
  ];
  return classifiers.flat();
}

export default classify;

export { ClassifiedEvent, Pool, Swap, Transaction, Transfer };
