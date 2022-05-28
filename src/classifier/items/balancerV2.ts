import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import poolAbi from '../../abi/balancerV2Pool.js';
import vaultAbi from '../../abi/balancerV2Vault.js';
import { Classifier, Pool, PoolData, Swap, Transfer } from '../base.js';
import { ClassifiedEvent } from '../index.js';

function isValidSwap(event: Event): boolean {
  return event.name === 'Swap';
}

function isValidTransfer(event: Event): boolean {
  return event.name === 'InternalBalanceChanged';
}

async function fetchPool(provider: Provider, id: string): Promise<PoolData> {
  const address = id.substring(0, 42);
  const poolContract = new Contract(address, poolAbi, provider);
  const vault = (await poolContract.getVault()) as string;
  const vaultContract = new Contract(vault, vaultAbi, provider);
  const poolTokens = await vaultContract.getPoolTokens(id);
  const tokens = poolTokens.tokens as string[];
  const assets = tokens.map((token) => token.toLowerCase());
  return {
    assets,
    factoryAddress: vault.toLowerCase(),
  };
}

function parseSwap(
  pool: Pool,
  event: ClassifiedEvent,
  transfers: Transfer[],
  allEvents: ClassifiedEvent[],
): Swap | null {
  const { transactionHash: hash, gasUsed, logIndex, address } = event;
  const { assetIn, assetOut, amountIn, amountOut } = getSwapValues(event);
  const vault = event.address.toLowerCase();

  const { from, to } = getClusterInputOutput(vault, logIndex, allEvents, transfers);
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

  const vault = event.address.toLowerCase();

  const from = delta > 0 ? vault : user;
  const to = delta > 0 ? user : vault;
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

function getClusterInputOutput(
  vault: string,
  logIndex: number,
  allEvents: ClassifiedEvent[],
  transfers: Transfer[],
): {
  from: string;
  to: string;
} {
  function isVaultSwap(event: ClassifiedEvent): boolean {
    return (
      event.classifier.type === 'swap' &&
      event.classifier.protocol === 'BalancerV2'
    );
  }

  const emptyInputOutput = {
    from: AddressZero,
    to: AddressZero,
  };

  const sortedEvents = [...allEvents];
  sortedEvents.sort((a, b) => a.logIndex - b.logIndex);
  // Go back from current event until not a Balancer V2 swap found
  let startIndex = allEvents.findIndex((event) => event.logIndex === logIndex);
  while (startIndex > 0 && isVaultSwap(allEvents[startIndex - 1])) {
    startIndex--;
  }
  const startSwap = allEvents[startIndex];
  // Go forward from current event until not a Balancer V2 swap found
  let endIndex = allEvents.findIndex((event) => event.logIndex === logIndex);
  while (
    endIndex < allEvents.length - 1 &&
    isVaultSwap(allEvents[endIndex + 1])
  ) {
    endIndex++;
  }
  const endSwap = allEvents[endIndex];
  // Go forward from there until a swap found
  let endTransferIndex = endIndex;
  while (
    endTransferIndex < allEvents.length - 1 &&
    allEvents[endTransferIndex + 1].classifier.type === 'transfer'
  ) {
    endTransferIndex++;
  }
  // Make sure there is at least one transfer
  if (endIndex === endTransferIndex) {
    // Theoretically possible, but not economically viable
    // Either way, w/o transfers, we can't deduct the sender
    return emptyInputOutput;
  }
  const endTransfer = allEvents[endTransferIndex];
  // Make sure all swaps in cluster form a valid chain
  for (let i = startIndex; i < endIndex; i++) {
    const swap = allEvents[i];
    const nextSwap = allEvents[i + 1];
    if (
      swap.classifier.type !== 'swap' ||
      nextSwap.classifier.type !== 'swap'
    ) {
      return emptyInputOutput;
    }

    const { assetOut: swapAssetOut, amountOut: swapAmountOut } =
      getSwapValues(swap);
    const { assetIn: nextSwapAssetIn, amountIn: nextSwapAmountIn } =
      getSwapValues(nextSwap);

    if (swapAssetOut !== nextSwapAssetIn) {
      return emptyInputOutput;
    }
    if (swapAmountOut !== nextSwapAmountIn) {
      return emptyInputOutput;
    }
  }
  // Get cluster transfers, inflows, outflows
  const clusterTransfers = transfers.filter(
    (transfer) =>
      transfer.event.logIndex > endSwap.logIndex &&
      transfer.event.logIndex <= endTransfer.logIndex,
  );
  const clusterInflows = clusterTransfers.filter(
    (transfer) => transfer.to === vault,
  );
  const clusterOutflows = clusterTransfers.filter(
    (transfer) => transfer.from === vault,
  );
  // Get first inflow, last outflow
  const firstInflow = clusterInflows[0];
  const lastOutflow = clusterOutflows[clusterOutflows.length - 1];
  // Make sure first inflow matches first swap in a cluster
  if (clusterInflows.length > 0) {
    const { assetIn, amountIn } = getSwapValues(startSwap);
    if (
      firstInflow.asset !== assetIn ||
      (firstInflow.value !== amountIn && firstInflow.event.address !== vault) ||
      firstInflow.to !== vault
    ) {
      return emptyInputOutput;
    }
  }
  // Make sure last outflow matches last swap in a cluster
  if (clusterOutflows.length > 0) {
    const { assetOut, amountOut } = getSwapValues(endSwap);
    if (
      lastOutflow.asset !== assetOut ||
      (lastOutflow.value !== amountOut &&
        lastOutflow.event.address !== vault) ||
      lastOutflow.from !== vault
    ) {
      return emptyInputOutput;
    }
  }
  // Get input/output
  const clusterFrom =
    clusterInflows.length === 0
      ? clusterOutflows.length === 0
        ? AddressZero
        : lastOutflow.to
      : firstInflow.from;
  const clusterTo =
    clusterOutflows.length === 0
      ? clusterInflows.length === 0
        ? AddressZero
        : firstInflow.from
      : lastOutflow.to;
  const from = logIndex === startSwap.logIndex ? clusterFrom : vault;
  const to = logIndex === endSwap.logIndex ? clusterTo : vault;
  return {
    from,
    to,
  };
}

function getSwapValues(swap: ClassifiedEvent): {
  assetIn: string;
  assetOut: string;
  amountIn: bigint;
  amountOut: bigint;
} {
  const assetIn = (swap.values.tokenIn as string).toLowerCase();
  const assetOut = (swap.values.tokenOut as string).toLowerCase();
  const amountIn = (swap.values.amountIn as BigNumber).toBigInt();
  const amountOut = (swap.values.amountOut as BigNumber).toBigInt();

  return {
    assetIn,
    assetOut,
    amountIn,
    amountOut,
  };
}

const CLASSIFIERS: Classifier[] = [
  {
    type: 'swap',
    protocol: 'BalancerV2',
    abi: vaultAbi,
    isValid: isValidSwap,
    parse: parseSwap,
    fetchPool,
  },
  {
    type: 'transfer',
    abi: vaultAbi,
    isValid: isValidTransfer,
    parse: parseTransfer,
  },
];

export default CLASSIFIERS;
