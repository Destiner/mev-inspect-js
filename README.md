# MEV Inspect

A JS port of `mev-inspect-py` optimised for ease of use.

## Motivation

While mev-inspect-py is a great resource, I think that there are a few changes can be made to make historical MEV data more accessible. Here are some defining decisions:

* Written in Typescript: easier to run in browser/node, while keeping the code type-safe
* Decoupled from the infra layer: message query, caching, and persistence layers can be added independenty when/if they needed
* Decoupled from pricing: to calculate profit and cost in USD, a pricing provider of your choice can be used
* Added single transaction inspection: while missing some types of MEV, this is helpful for quick transaction review
* Using logs instead of call traces: any historical node would work

## Usage

> This package uses [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). If you use a bundler, you may want to set target to `es2020`.

> This package is a pure ESM package. Follow [this guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for more info.

```bash
npm i mev-inspect
```

## Docs

TODO. For usage examlples, see [`examples`](./examples/).

You can run examples using `ts-node`, for example:

```bash
npx ts-node --esm examples/arbitrage.ts
```

## How it works

It starts by fetching all event logs for a given transaction or block. Then, it "sorts" logs based on their source and type. From those logs, it extracts swap data. It then analyzes the swaps to find arbitrage.

## Status

The project is experimental. Currently, arbitrage and liquidations are detected. Expect API to have breaking changes.

## TODO

- [ ] curve
- [ ] 0x
- [ ] sandwitches
- [ ] nfts
