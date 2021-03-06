import { Inspector } from '../src/index.js';

import getProvider from './utils.js';

const CHAIN_ID = 1;

interface Transaction {
  hash: string;
  label: string;
}

const transactions: Transaction[] = [
  {
    label: 'Uniswap V2: single swap',
    hash: '0xad39a3e5109e2c146f85f5db53a72da9af886b861d4965aacafdb165c1aec35e',
  },
  {
    label: 'Balancer V2: single swap',
    hash: '0x0beab997294942e83fa3f1328562fcf1ce8299470f5351a63d7f385c2becbf48',
  },
  {
    label: 'Curve V2: single swap',
    hash: '0xabeb95a11ae16f5a2b953d68e690ae218d6b90e06e3f1a134378c5aeeb8c1483',
  },
  {
    label: 'Bancor V2: single swap',
    hash: '0x0a7baae42804053333ef69700807ab6ee39ecfc1f8ea205c037238cf824f5841',
  },
  {
    label: 'Uniswap V2: multipath',
    hash: '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b',
  },
  {
    label: 'Uniswap V2 X Sushiswap arbitrage',
    hash: '0x8baefcf7a8b848bdf8be594d55cb84ed26bf6ea6191dafaf33eedf09198453c6',
  },
  {
    label: 'Sushishap internal arbitrage',
    hash: '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc',
  },
  {
    label: 'Uniswap V3 internal arbitrage',
    hash: '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05',
  },
  {
    label: 'Uniswap V2 X Uniswap V3 arbitrage',
    hash: '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe',
  },
  {
    label: 'Sushiswap X Uniswap V3 arbitrage',
    hash: '0xd53808dc31c908b7acad610d5efa726afe67e7c9739083be9c1b4cb6d2cdaeac',
  },
  {
    label: 'Uniswap V2 X Uniswap V3 X Balancer V1 arbitrage',
    hash: '0x0ec1a4297b198c61598307ed92aa254a234abe8a6ee9415713f8f35a491e9d01',
  },
  {
    label: 'Balancer V1 internal arbitrage',
    hash: '0x355864b3e11f4fb83b231cbfbf53e964010f21ee720948c25776804ff64a91f6',
  },
  {
    label: 'Sushiswap X Balancer V1 arbitrage',
    hash: '0xc9f1ebca7b22e1561b3488105b52ada628c0dc38f3eda5e7b5a84952fb5a0c63',
  },
  {
    label: 'Uniswap V3 X Balancer V2 arbitrage',
    hash: '0x4a4021e87ca17a19574371cb0bd9004970f1f9c5202e42a2efd7cafb979fd504',
  },
  {
    label: 'Balancer V1 X Balancer V2 arbitrage',
    hash: '0x486bc5218470355cbb40bed89a7df8283d08e95034fa6788c4c406b7e1ec2125',
  },
  {
    label: '0x V3 x Uniswap V2 arbitrage',
    hash: '0xa6305bc0474f57c06e8e9b90c8847703ef65a4e2ffcbe8ad6089fdd914788d9a',
  },
  {
    label: '0x V4 x Uniswap V2 arbitrage',
    hash: '0x95eca1930c031a682277ad13ab3822cc02903779d2cf5c38622d50cd30094eee',
  },
  {
    label: 'Uniswap V3 x Curve V1 arbitrage',
    hash: '0x3b5eedd170e871df9b2d3cd01098178088946a642074f0bc6ff49c21fd25eeb6',
  },
  {
    label: 'Bancor V2 x Bancor V3 arbitrage',
    hash: '0x40b495144e2fa851faf7d433bbaf6062ffba65a6cb290e34c5d1a68ebc97ec06',
  },
  // {
  //   label: 'CoW trade, TBD',
  //   hash: '0x7f3217772fe64386dc7c3fbd1e809660c669969405a3b6fca1dcfd6b1dc55fe7',
  // },
  // {
  //   label: 'Many swap events, TBD',
  //   hash: '0x2df4bf1526fcbf5995aaceac44ec95ee5a7d2055dab7bec47e4558518f609b1f',
  // },
  {
    label: '3 arbitrages 1 transaction',
    hash: '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a',
  },
  {
    label: 'Mega arbitrage',
    hash: '0xf1daf4bc6891235d645f31219baef71b63671a506e58f56afe319989591d73d9',
  },
  {
    label: 'DAI profit arbitrage',
    hash: '0xe7cbe0629983e0673c4d971858d05874dbb938bf2b5f0ad4be2fa217ed78a547',
  },
  {
    label: 'Split swap (Balancer V1 + Balancer V2 + Uniswap V2 + Sushiswap)',
    hash: '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8',
  },
  {
    label: 'Split swap (Balancer V2 + Uniswap V2)',
    hash: '0x7054b0a671d433a0309f58bea26afc3c45d8a6af6472996a5eb2acd8a3da2eca',
  },
  {
    label: 'Split swap (Balancer V1 + Balancer V2 + 0x)',
    hash: '0x15db3882045da8df942d1d9c5069575d920002254b79c9d7b5c3ce4a385f1b83',
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
