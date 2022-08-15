import {
  ChainId,
  ClassifiedEvent,
  NftSwap,
  NftSwapProtocol,
  NftPool,
  isValidNftFactory,
} from '../classifier/index.js';

function getPoolAddress(log: ClassifiedEvent): string {
  if (log.classifier.type !== 'nft_swap') {
    return '';
  }
  return log.address.toLowerCase();
}

function getSwaps(
  chainId: ChainId,
  pools: NftPool[],
  logs: ClassifiedEvent[],
): NftSwap[] {
  return logs
    .map((log) => {
      if (log.classifier.type !== 'nft_swap') {
        return null;
      }
      const poolAddress = getPoolAddress(log);
      const pool = pools.find((pool) => pool.address === poolAddress);
      if (!pool) {
        return null;
      }
      const protocol = log.classifier.protocol;
      if (!protocol) {
        return null;
      }
      const nftSwapProtocol = protocol as NftSwapProtocol;
      if (!isValidNftFactory(chainId, nftSwapProtocol, pool.factory)) {
        return null;
      }
      return log.classifier.parse(pool, log, chainId);
    })
    .filter((swap: NftSwap | null): swap is NftSwap => !!swap);
}

export default getSwaps;
