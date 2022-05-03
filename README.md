# MEV Inspect

A JS port of `mev-inspect-py` optimised for ease of use.

## Motivation

While mev-inspect-py is a great resource, I think that there are a few changes can be made to make historical MEV data more accessible. Here are some defining decisions:

* Written in Typescript: easier to run in browser/node, while keeping the code type-safe
* Decoupled from the infra layer: message query, caching, and persistence layers can be added independenty when/if they needed
* Decoupled from pricing: to calculate profit and cost in USD, a pricing provider of your choice can be used
* Added single transaction inspection: while missing some types of MEV, this is helpful for quick transaction review
* Using logs instead of call traces: any historical node would work

## Docs

TODO. For usage examlples, see `/examples`.

## How it works

It starts by fetching all event logs for a given transaction or block. Then, it "sorts" logs based on their source and type. From those logs, it extracts swap data. It then analyzes the swaps to find arbitrage.

## Status

The project is at the "proof of concept" stage. Currently, only arbitrage is detected on Uniswap V2 and its forks.

## TODO

- [ ] balancer v2
- [ ] curve
- [ ] 0x
- [ ] enrich mev events with metadata
- [ ] distinguish forks
- [ ] liquidations
- [ ] sandwitches
- [ ] nfts
