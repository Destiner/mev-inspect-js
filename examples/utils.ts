import 'dotenv/config';
import { AlchemyProvider, Provider } from '@ethersproject/providers';

const key = process.env.ALCHEMY_KEY;

function getProvider(chainId: number): Provider {
  return new AlchemyProvider(chainId, key);
}

export default getProvider;
