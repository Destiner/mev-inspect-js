import { Inspector } from '../src/index.js';

import getProvider from './utils.js';

const CHAIN_ID = 1;

interface Transaction {
  hash: string;
  label: string;
}

const transactions: Transaction[] = [
  {
    label: 'Compound V2',
    hash: '0xdf838db24228f280eba8a279266d1602b03b54507afdca3cb4b4ec640535642b',
  }
];

async function run(): Promise<void> {
  const provider = getProvider(CHAIN_ID);
  const inspector = new Inspector(CHAIN_ID, provider);
  for (const transaction of transactions) {
    const { hash, label } = transaction;
    const txMev = await inspector.tx(hash);
    console.log(
      `Transaction { hash = ${hash}, label = ${label}, mev found = ${txMev.length} }`,
    );
    for (const mev of txMev) {
      console.log(mev);
    }
  }
}

run();
