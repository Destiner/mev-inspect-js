import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import vaultAbi from '../abi/balancerV2/vault.js';

import { Classifier, Pool, Swap } from './base.js';

async function fetchPool(provider: Provider, id: string): Promise<Pool> {
  const address = id.substring(0, 42);
  const vaultContract = new Contract(address, vaultAbi, provider);
  const poolTokens = await vaultContract.getPoolTokens(address);
  const assets = poolTokens.tokens;
  return { address, assets };
}

function parse(pool: Pool, transactionHash: string, logIndex: number, event: Event): Swap {
  const { values } = event;
  const { address } = pool;

  const sender = '0x0000000000000000000000000000000000000000';
  const takerAsset = values[1] as string;
  const makerAsset = values[2] as string;
  const takerAmount = (values[3] as BigNumber).toBigInt();
  const makerAmount = (values[4] as BigNumber).toBigInt();

  return {
    maker: address,
    makerAmount,
    makerAsset,
    taker: sender,
    takerAmount,
    takerAsset,
    metadata: {
      transactionHash,
      logIndex,
      eventAddress: address,
    },
  };
}

const CLASSIFIERS: Classifier[] = [
  {
    protocol: 'BalancerV2',
    event: { name: 'Swap', type: 'swap', parse, fetchPool },
    abi: vaultAbi,
  },
];

export { fetchPool, CLASSIFIERS };
