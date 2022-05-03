import Coder, { Event } from 'abi-coder';

import { Log } from '../chain.js';

import { Classifier } from './base.js';
import { CLASSIFIERS as uniswapV2Classifiers } from './uniswapV2.js';

interface ClassifiedLog {
  address: string;
  transactionHash: string;
  event: Event;
  classifier: Classifier;
}

function classify(logs: Log[]): ClassifiedLog[] {
  return logs
    .map((log) => classifyLog(log))
    .filter((log): log is ClassifiedLog => !!log);
}

function classifyLog(log: Log): ClassifiedLog | undefined {
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
        event,
        classifier,
      };
    } catch {
      continue;
    }
  }
  return;
}

function getClassifiers(): Classifier[] {
  const classifiers = [uniswapV2Classifiers];
  return classifiers.flat();
}

export default classify;

export { ClassifiedLog };
