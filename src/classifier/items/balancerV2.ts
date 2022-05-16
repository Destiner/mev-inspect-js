import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import poolAbi from '../../abi/balancerV2Pool.js';
import vaultAbi from '../../abi/balancerV2Vault.js';
import { Classifier, Pool, Swap, Transfer } from '../base.js';
import { ClassifiedEvent } from '../index.js';

const VAULT = '0xba12222222228d8ba445958a75a0704d566bf2c8';

async function fetchPool(provider: Provider, id: string): Promise<Pool> {
  const address = id.substring(0, 42);
  const poolContract = new Contract(address, poolAbi, provider);
  const vault = (await poolContract.getVault()) as string;
  const vaultContract = new Contract(VAULT, vaultAbi, provider);
  const poolTokens = await vaultContract.getPoolTokens(id);
  const tokens = poolTokens.tokens as string[];
  const assets = tokens.map((token) => token.toLowerCase());
  return { address, assets, factory: vault.toLowerCase() };
}

function parseSwap(
  pool: Pool,
  event: ClassifiedEvent,
  transfers: Transfer[],
): Swap | null {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;

  const assetIn = (values.tokenIn as string).toLowerCase();
  const assetOut = (values.tokenOut as string).toLowerCase();
  const amountIn = (values.amountIn as BigNumber).toBigInt();
  const amountOut = (values.amountOut as BigNumber).toBigInt();

  const swapTransfers = getSwapTransfers(logIndex, transfers);
  if (!swapTransfers) {
    return null;
  }
  const [transferIn, transferOut] = swapTransfers;
  if (transferIn.event.address !== assetIn) {
    return null;
  }
  if (transferOut.event.address !== assetOut) {
    return null;
  }
  if (transferIn.value !== amountIn) {
    return null;
  }
  if (transferOut.value !== amountOut) {
    return null;
  }
  if (transferIn.to !== VAULT) {
    return null;
  }
  if (transferOut.from !== VAULT) {
    return null;
  }
  const from = transferIn.from;
  const to = transferOut.to;

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'BalancerV2',
        factory: pool.factory,
      },
    },
    from,
    to,
    assetIn,
    amountIn,
    assetOut,
    amountOut,
    transaction: {
      hash,
      gasUsed,
    },
    event: {
      logIndex,
      address: address.toLowerCase(),
    },
  };
}

function parseTransfer(event: ClassifiedEvent): Transfer {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;

  const user = (values.user as string).toLowerCase();
  const token = (values.token as string).toLowerCase();
  const delta = (values.delta as BigNumber).toBigInt();

  const from = delta > 0 ? VAULT : user
  const to = delta > 0 ? user : VAULT;
  const value = delta > 0 ? delta : -delta;

  return {
    asset: token,
    from,
    to,
    value,
    transaction: {
      hash,
      gasUsed,
    },
    event: {
      logIndex,
      address: address.toLowerCase(),
    },
  };
}

function getSwapTransfers(
  logIndex: number,
  transfers: Transfer[],
): [Transfer, Transfer] | null {
  const transferIn = transfers.find(
    (transfer) => transfer.event.logIndex === logIndex + 1,
  );
  const transferOut = transfers.find(
    (transfer) => transfer.event.logIndex === logIndex + 2,
  );
  if (!transferIn) {
    return null;
  }
  if (!transferOut) {
    return null;
  }
  return [transferIn, transferOut];
}

const CLASSIFIERS: Classifier[] = [{
  type: 'swap',
  name: 'Swap',
  protocol: 'BalancerV2',
  abi: vaultAbi,
  parse: parseSwap,
  fetchPool,
}, {
  type: 'transfer',
  name: 'InternalBalanceChanged',
  abi: vaultAbi,
  parse: parseTransfer,
}];

export { fetchPool, CLASSIFIERS };
