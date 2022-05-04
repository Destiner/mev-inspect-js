import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';

import erc20Abi from '../abi/erc20.js';

import { Classifier, Transfer } from './base.js';

function parse(
  asset: string,
  transactionHash: string,
  logIndex: number,
  event: Event,
): Transfer {
  const { values } = event;

  const from = values[0] as string;
  const to = values[1] as string;
  const value = (values[2] as BigNumber).toBigInt();

  return {
    from,
    to,
    value,
    metadata: {
      transactionHash,
      logIndex,
      eventAddress: asset,
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
