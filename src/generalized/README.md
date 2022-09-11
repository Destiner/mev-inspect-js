# Generalized inspector

A source code for the generalized MEV detection algorithm.

> Note: this code is highly experimental, and not ready for production. Use with caution.

## Definition

To understand how it works, it's helpful to define what MEV is. In general, we can describe MEV as _a transaction or a series of transactions that can earn value risk-free or near risk-free in a rapid period of time._ This includes arbitrage, liquidations, sandwiches, and excludes trading. We also consider protocol exploits as MEV here.

## Framework

Instead of writing classifiers for each protocol or type of MEV, here we try a different approach. We fetch all the asset transfers for a given block or transaction, net them out, and select those transactions that are net positive for a certain address. Assets include ether, tokens, and NFTs.

Of course, this naive approve will yield many false positives. A simple example is bridge withdrawal transaction. A user would receive tokens out of thin air, but don't spend anything (at least, not on this chain specifically). More complex quasi MEV include NFT royalties, ERC20 transfer fees, DEX aggregator fees, sophisticated DeFi operations, and so on.

Therefore, after finding potential MEV transactions, we will have to filter out false positives based on a set of heuristics. We certainly don't want to blacklist each protocol, function call, or asset one-by-one, as that would undermine the whole idea of generic approach. Instead, we try to look for broader patterns.

Additionally, as we go deeper on this route, we realize that setting a line between MEV or non-MEV is hard, if possible at all. Instead, we opt for a scoring model, and providing the end user an option to set the certainty threshold (while providing a sensible default), trading certainty level for amount of MEV missed.

## Results

At current stage, we are able to classify around 70% of DEX arbitrage transactions (with the ideas to bring that to \~95%). We are also able to classify more esoteric type of MEV, like pool balancing, nft arbitrage, complex arbs, and more.

Speaking of false positives, currently about 7% of results mistakenly classified as MEV.
