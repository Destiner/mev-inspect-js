# MEV Inspect

A JS port of `mev-inspect-py` optimised for ease of use.

## Motivation

While mev-inspect-py is great, I believe that there are a few changes can be made to make historical MEV data more accessible. Here are some defining decisions for this port:

- Written in Typescript: easier to run in browser/node, while keeping the code type-safe
- Infra layer decoupling: message query, caching, and persistence layers can be added independenty when/if needed
- Pricing data decoupling: to calculate profit and cost in USD, a pricing provider of your choice can be used
- Single transaction inspection: while missing some types of MEV, this is helpful for quick transaction review
- Using logs instead of call traces: any historical node would work

Other, less fundamental, changes include:

- Fork support (e.g. Sushiswap)
- Multichain support
- Abilitiy to "bring your own transaction receipts" (e.g. via Alchemy)

## API

- Inspector
  - constructor(chainId, provider)
  - tx(hash): processes a single transaction given hash
  - block(number): processes a single block given number
  - receipts(receipts): processes an arbitrary amount of transaction receipts
- getBlock(mev): get MEV block number
- getTransaction(mev): get MEV transaction hash
- getArbitrages(mevList): filter out non-arbitrage MEV
- getLiquidations(mevList): filter out non-liquidation MEV
- getSandwiches(mevList): filter out non-sandwich MEV
- getJitSandwiches(mevList): filter out non-JIT liquidity sandwich MEV
- getNftArbitrages(mevList): filter out non-NFT arbitrage MEV

A common data flow is to first fetch all the MEV using any of the Inspector method, then filter it by type using `getArbitrages`, etc, and finally process each type of MEV separately

## Usage

> This package requires ethers V6. If you use ethers V5, you need to use mev-inspect V3.

> This package uses [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). If you use a bundler, you may want to set the build target to `es2020`.

> This package is a pure ESM package. Follow [this guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for more info.

```bash
npm i mev-inspect
```

```ts
import { ethers } from 'ethers';
import { Inspector } from 'mev-inspect';

const arbitrageTx =
  '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05';
const key = process.env.PROVIDER_KEY;
const provider = new ethers.providers.AlchemyProvider(1, key);
const inspector = new Inspector(1, provider);
const txMev = await inspector.tx(arbitrageTx);
console.log(txMev);
```

For more examlples, see [`examples`](./examples/).

## Support

### MEV type

- Arbitrage
- Liquidations
- Sandwiches
- JIT liquidity sandwiches
- NFT arbitrage

### Chains

- Ethereum
- Polygon
- Arbitrum
- Optimism
- Avalanche

### Protocols

- Swaps: Uniswap V2/V3 (+ forks), Balancer V1/V2, Curve V1/V2, 0x V3/V4, Bancor V2/V3
- Lending: Compound V2 (+ forks), Aave V1/V2/V3
- NFT swaps: Opensea (Seaport), LooksRare, Sudoswap, X2Y2

## How it works

It starts by fetching all event logs for a given transaction or block. Then, it "sorts" logs based on their source and type. From those logs, it extracts swap data. It then analyzes the swaps to find arbitrage.
