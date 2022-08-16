import { Log } from '../chain.js';
import {
  ChainId,
  ClassifiedEvent,
  NftSwap,
  NftSwapProtocol,
  NftPool,
  isValidNftFactory,
} from '../classifier/index.js';

function getSwaps(
  chainId: ChainId,
  pools: NftPool[],
  events: ClassifiedEvent[],
  logs: Log[],
): NftSwap[] {
  return events
    .map((log) => {
      if (log.classifier.type !== 'nft_swap') {
        return null;
      }
      const poolAddress = log.address.toLowerCase();
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
      return log.classifier.parse(pool, log, chainId, logs);
    })
    .filter((swap: NftSwap | null): swap is NftSwap => !!swap);
}

export default getSwaps;
