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
  },
  {
    label: 'Compound V2, cETH',
    hash: '0x02a100bfcc45a40b1d4fda92d6c17acb420d4fee8bc2b5bac3fa4650bf7d5093',
  },
  {
    label: 'Aave V2',
    hash: '0x580a2d8d142207a50636b74d41feca1774b106143c536078ca80de000f83f3d8',
  },
  {
    label: 'Aave V2: AMM market',
    hash: '0x9529b0332f51d586a1d30f9106558daf3dbc66c6bbbd32935f19fbc2601b7aa1',
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
