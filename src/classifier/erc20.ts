import { BigNumber } from '@ethersproject/bignumber';

import erc20Abi from '../abi/erc20.js';

import { Classifier, Transfer } from './base.js';

import { ClassifiedEvent } from './index.js';

function parse(event: ClassifiedEvent): Transfer {
  const { values, transactionHash: hash, logIndex, address } = event;

  const from = values[0] as string;
  const to = values[1] as string;
  const value = (values[2] as BigNumber).toBigInt();

  return {
    from,
    to,
    value,
    transaction: {
      hash,
    },
    event: {
      logIndex,
      address,
    },
  };
}

const CLASSIFIERS: Classifier[] = [
  {
    event: { name: 'Transfer', type: 'transfer', parse },
    abi: erc20Abi,
  },
];

export default CLASSIFIERS;
