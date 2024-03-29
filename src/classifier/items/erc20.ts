import type { Event } from 'abi-coder';

import erc20Abi from '../../abi/erc20.js';
import type { Classifiers, Transfer } from '../base.js';
import type { ClassifiedEvent } from '../index.js';

function isValid(event: Event): boolean {
  return event.name === 'Transfer';
}

function parse(event: ClassifiedEvent): Transfer {
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

  const from = (values.from as string).toLowerCase();
  const to = (values.to as string).toLowerCase();
  const value = values.value as bigint;

  return {
    asset: address.toLowerCase(),
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
      logIndex,
      address: address.toLowerCase(),
    },
    from,
    to,
    value,
  };
}

const CLASSIFIER: Classifiers = {
  transfer: {
    type: 'transfer',
    abi: erc20Abi,
    isValid,
    parse,
  },
};

export default CLASSIFIER;
