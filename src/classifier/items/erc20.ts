import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';

import erc20Abi from '../../abi/erc20.js';
import { Classifier, Transfer } from '../base.js';
import { ClassifiedEvent } from '../index.js';

function isValid(event: Event): boolean {
  return event.name === 'Transfer';
}

function parse(event: ClassifiedEvent): Transfer {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;

  const from = (values.from as string).toLowerCase();
  const to = (values.to as string).toLowerCase();
  const value = (values.value as BigNumber).toBigInt();

  return {
    asset: address.toLowerCase(),
    from,
    to,
    value,
    transaction: {
      hash,
      gasUsed,
    },
    event: {
      logIndex,
      address: address.toLowerCase(),
    },
  };
}

const CLASSIFIER: Classifier = {
  type: 'transfer',
  abi: erc20Abi,
  isValid,
  parse,
};
export default CLASSIFIER;
