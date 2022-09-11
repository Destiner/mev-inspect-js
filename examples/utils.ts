import 'dotenv/config';
import { AlchemyProvider, JsonRpcProvider } from '@ethersproject/providers';

const key = process.env.ALCHEMY_KEY;

function getProvider(chainId: number): JsonRpcProvider {
  return new AlchemyProvider(chainId, key);
}

export default getProvider;
