import { BigNumber } from '@ethersproject/bignumber';

import erc20Abi from '../../abi/erc20.js';
import { Classifier, Transfer } from '../base.js';
import { ClassifiedEvent } from '../index.js';

function parse(event: ClassifiedEvent): Transfer {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;

  const from = (values.from as string).toLowerCase();
  const to = (values.to as string).toLowerCase();
  const value = (values.value as BigNumber).toBigInt();

  return {
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
  name: 'Transfer',
  abi: erc20Abi,
  parse,
};
export default CLASSIFIER;
