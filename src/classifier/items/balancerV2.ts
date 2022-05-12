import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import poolAbi from '../../abi/balancerV2/pool.js';
import vaultAbi from '../../abi/balancerV2/vault.js';
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

function parse(
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

const CLASSIFIER: Classifier = {
  protocol: 'BalancerV2',
  event: { name: 'Swap', type: 'swap', parse, fetchPool },
  abi: vaultAbi,
};

export { fetchPool, CLASSIFIER };
