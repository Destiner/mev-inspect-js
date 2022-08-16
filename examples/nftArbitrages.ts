import { Inspector } from '../src/index.js';

import getProvider from './utils.js';

const CHAIN_ID = 1;

interface Transaction {
  hash: string;
  label: string;
}

const transactions: Transaction[] = [
  {
    label: 'Opensea X LooksRare arbitrage',
    hash: '0xce93e804cdaa9e2d1c781c5eeba4cf47a898987ce4dc20752dfb5d9980f3f6ad',
  },
  {
    label: 'Opensea X LooksRare arbitrage',
    hash: '0x04282310de374471a153cfc036b82439778473707291d4101cedd84cf607c070',
  },
  {
    label: 'Opensea X Sudoswap arbitrage',
    hash: '0xd058a3f40b8540250ed1b37153f273af36a2649d449e8c3660d52a78cae28d8c',
  },
  {
    label: 'Opensea X Sudoswap arbitrage',
    hash: '0xa252eca3b91db2d43810b4d23b4e1b607b55a95976c5727c6b889cf9cb90a4d7',
  },
  {
    label: 'Opensea X X2Y2 arbitrage',
    hash: '0xe4ab98644cf93f3c5112b64eb1986f3cef88f58a52301b90f878df7438a8192d',
  },
  {
    label: 'Opensea X Opensea arbitrage',
    hash: '0x21dc6fba36e9ea446d5997f7e4030f3fc9c1eb4a65aad89d4904cf39b7642ba3',
  },
  {
    label: 'Opensea X Opensea arbitrage',
    hash: '0xe82e8db26891d4fab3b5f46f0326e1f374de0ca7b171ef69a4e98ad209f37834',
  },
  {
    label: 'Opensea X Opensea arbitrage',
    hash: '0x20a1414207c0e76a9cb45a6b010f6c70b55cb1b4855abaa23802018ae5f6cc1e',
  },
  {
    label: 'Sudoswap X X2XY arbitrage',
    hash: '0x8864c15eb8a62a240c4de2acf091a97fd3cc9b553284cc6858db502a5b902bb5',
  },
  {
    label: 'LooksRare X Sudoswap arbitrage',
    hash: '0xfb99e6f2e9161f2ecf57ff3d17f1c309e6123f3757ca406509f57ae68f7b832e',
  },
  {
    label: 'LooksRare X LooksRare arbitrage',
    hash: '0x2ac87f3a40f3dd0f77d36090f96922181a0be57243691e3fd58dec041454573c',
  },
  // {
  //   label: 'Opensea X NFTX arbitrage',
  //   hash: '0x799389015c8b0fd44ae2b389bf322f725fa3367140ee3050193dff7b4c38cd49',
  // },
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
