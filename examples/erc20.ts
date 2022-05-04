import Chain from '../src/chain.js';
import classify from '../src/classifier/index.js';
import { getTransfers } from '../src/mev.js';

import getProvider from './utils.js';

const CHAIN_ID = 1;

interface Transaction {
  hash: string;
  label: string;
}

const transactions: Transaction[] = [
  {
    hash: '0x7c9406116fcbec7a6c2f3b775ed223afc4a96eb6974fa23d0619b34c2c229a03',
    label: 'DAI, transfer',
  },
  {
    hash: '0xd2484950b0cb586f2369535f0b9b0eb6e7d47cd58baaab03e0bd8cda3a49f1a9',
    label: 'MKR, transfer',
  },
  {
    hash: '0x4f0b53b542915739c0333e5970d590b174a051d0f03914784719dfe0f65650d6',
    label: 'MKR, transferFrom',
  },
  {
    hash: '0xad39a3e5109e2c146f85f5db53a72da9af886b861d4965aacafdb165c1aec35e',
    label: 'Uniswap V2: single swap',
  },
  {
    hash: '0x74a37fcec31140fa733abeea22f085012daa3523860f77837f839dfe05f2b1fe',
    label: 'Compound: liquidation',
  },
];

async function run(): Promise<void> {
  const provider = getProvider(CHAIN_ID);
  const chain = new Chain(provider);
  for (const transaction of transactions) {
    const { hash, label } = transaction;
    const logs = await chain.getTransactionLogs(hash);
    const classified = classify(logs);
    const transfers = getTransfers(classified);
    console.log(
      `Transaction { hash = ${hash}, label = ${label}, logs found = ${logs.length} }`,
    );
    for (const log of classified) {
      console.log(log);
    }
    for (const transfer of transfers) {
      console.log(transfer);
    }
  }
}

run();
