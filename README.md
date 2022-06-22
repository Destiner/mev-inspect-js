# MEV Inspect

A JS port of `mev-inspect-py` optimised for ease of use.

## Motivation

While mev-inspect-py is great, I believe that there are a few changes can be made to make historical MEV data more accessible. Here are some defining decisions for this port:

* Written in Typescript: easier to run in browser/node, while keeping the code type-safe
* Infra layer decoupling: message query, caching, and persistence layers can be added independenty when/if needed
* Pricing data decoupling: to calculate profit and cost in USD, a pricing provider of your choice can be used
* Single transaction inspection: while missing some types of MEV, this is helpful for quick transaction review
* Using logs instead of call traces: any historical node would work

Other, less fundamental, changes include:

* Fork support (e.g. Sushiswap)
* Multichain support
* "Bring your own transaction receipts"

## Usage

> This package uses [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). If you use a bundler, you may want to set the build target to `es2020`.

> This package is a pure ESM package. Follow [this guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for more info.

```bash
npm i mev-inspect
```

## Support

### MEV type

* Arbitrage
* Liquidations
* Sandwiches

### Chains

* Ethereum
* Polygon
* Arbitrum
* Optimism
* Avalanche

### Protocols

* Swaps: Uniswap V2/V3 (+ forks), Balancer V1/V2, Curve V1/V2, 0x V3/V4, Bancor V2/V3
* Lending: Compound V2 (+ forks), Aave V1/V2/V3

## Docs

TODO. For usage examlples, see [`examples`](./examples/).

Also, see [demo](https://metablock.dev/tools/mev/).

You can run examples using `ts-node`, for example:

```bash
npx ts-node --esm examples/arbitrage.ts
```

## How it works

It starts by fetching all event logs for a given transaction or block. Then, it "sorts" logs based on their source and type. From those logs, it extracts swap data. It then analyzes the swaps to find arbitrage.
