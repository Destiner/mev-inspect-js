import { Mev, Inspector, Sandwich, isSandwich } from '../src/index.js';

import getProvider from './utils.js';

const CHAIN_ID = 1;

interface Transaction {
  block: number;
  label: string;
}

const transactions: Transaction[] = [
{
  block: 14899935,
  label: 'Uniswap V2 sandwich',
}, {
  block: 14898920,
  label: 'Uniswap V2 sandwich',
}, {
  block: 14899831,
  label: 'Uniswap V2 sandwich with non-ether profit asset',
}, {
  block: 14896835,
  label: 'Uniswap V2 sandwich (large volume)',
}, {
  block: 14899113,
  label: 'Sushiswap sandwich',
}, {
  block: 13699765,
  label: 'Sandwich with partial frontswap buy',
}, {
  block: 14899088,
  label: 'Sandwich with partial backswap sell',
}, {
  block: 14899837,
  label: 'Uniswap V2 sandwich with backswap split',
}
];

async function run(): Promise<void> {
  const provider = getProvider(CHAIN_ID);
  const inspector = new Inspector(CHAIN_ID, provider);
  for (const transaction of transactions) {
    const { block, label } = transaction;
    const blockMev = await inspector.block(block);
    const sandwichMev = blockMev.filter((mev: Mev): mev is Sandwich => isSandwich(mev))
    console.log(
      `Block { block = ${block}, label = ${label}, mev found = ${sandwichMev.length} }`,
    );
    for (const mev of sandwichMev) {
      console.log(mev);
    }
  }
}

run();
