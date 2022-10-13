import { Inspector } from '../src/index.js';

import getProvider from './utils.js';

const CHAIN_ID = 137;

interface Transaction {
  hash: string;
  label: string;
}

const transactions: Transaction[] = [
  {
    label: 'Balancer V2 internal arbitrage',
    hash: '0xd8b484b99a0742f87a51f7fa656e0abdd3b38ae36074a896cbfcb9f794dfb706',
  },
  {
    label: 'Balancer V2 X Sushiswap arbitrage',
    hash: '0xde56117bfdf9fe034b9e6bdebfc113df28ae93e8cd26c2be872f0c251c256aeb',
  },
  {
    label: 'Aave V2 liquidation',
    hash: '0xb86d39f97dde86b792a00e21852399ec022ecf0c4de043b2bd6b53d3a5b2efe5',
  },
  {
    label: 'Aave V3 liquidation',
    hash: '0x2eae1162064c0560ed72d5bb7b375cee0e22886796a240533c9589fc77dec67b',
  },
  {
    label: 'Cream liquidation',
    hash: '0xe452500d18f4da21d591a8122ad022059d53ec8ce076166d9bd9576791720784',
  },
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
