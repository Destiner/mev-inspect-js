import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call, Contract } from 'ethcall';

import factoryAbi from '../../abi/balancerV1Factory.js';
import poolAbi from '../../abi/balancerV1Pool.js';
import {
  Classifiers,
  LiquidityDeposit,
  LiquidityWithdrawal,
  Pool,
  PoolData,
  Swap,
} from '../base.js';
import { ClassifiedEvent } from '../index.js';

const FACTORY_ADDRESS = '0x9424b1412450d0f8fc2255faf6046b98213b76bd';

function isValidSwap(event: Event): boolean {
  return event.name === 'LOG_SWAP';
}

function isValidDeposit(event: Event): boolean {
  return event.name === 'LOG_JOIN';
}

function isValidWithdrawal(event: Event): boolean {
  return event.name === 'LOG_EXIT';
}

function getPoolCalls(address: string): Call[] {
  const factoryContract = new Contract(FACTORY_ADDRESS, factoryAbi);
  const isPoolCall = factoryContract.isBPool(address);
  const poolContract = new Contract(address, poolAbi);
  const assetsCall = poolContract.getCurrentTokens();
  return [isPoolCall, assetsCall];
}

function processPoolCalls(result: unknown[]): PoolData | null {
  const [isPool, tokens] = result;
  if (!isPool || !tokens) {
    return null;
  }
  const assets = (tokens as string[]).map((token) => token.toLowerCase());
  return {
    factoryAddress: FACTORY_ADDRESS,
    assets,
  };
}

function parseSwap(pool: Pool, event: ClassifiedEvent): Swap | null {
  const {
    values,
    transactionFrom,
    transactionHash: hash,
    transactionIndex,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;

  const sender = (values.caller as string).toLowerCase();
  const assetIn = (values.tokenIn as string).toLowerCase();
  const assetOut = (values.tokenOut as string).toLowerCase();
  const amountIn = (values.tokenAmountIn as BigNumber).toBigInt();
  const amountOut = (values.tokenAmountOut as BigNumber).toBigInt();

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'BalancerV1',
        factory: pool.factory,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      from: transactionFrom.toLowerCase(),
      hash,
      index: transactionIndex,
      gasUsed,
    },
    event: {
      logIndex,
      address: address.toLowerCase(),
    },
    from: sender,
    to: sender,
    assetIn: {
      type: 'erc20',
      address: assetIn,
    },
    amountIn,
    assetOut: {
      type: 'erc20',
      address: assetOut,
    },
    amountOut,
    metadata: {},
  };
}

function parseDeposit(
  pool: Pool,
  event: ClassifiedEvent,
): LiquidityDeposit | null {
  const {
    values,
    transactionFrom,
    transactionHash: hash,
    transactionIndex,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;
  const depositor = (values.caller as string).toLowerCase();
  const asset = (values.tokenIn as string).toLowerCase();
  const amount = (values.tokenAmountIn as BigNumber).toBigInt();

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'BalancerV1',
        factory: pool.factory,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      from: transactionFrom.toLowerCase(),
      hash,
      index: transactionIndex,
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
    depositor,
    assets: [
      {
        type: 'erc20',
        address: asset,
      },
    ],
    amounts: [amount],
    metadata: {},
  };
}

function parseWithdrawal(
  pool: Pool,
  event: ClassifiedEvent,
): LiquidityWithdrawal | null {
  const {
    values,
    transactionFrom,
    transactionHash: hash,
    transactionIndex,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;
  const withdrawer = (values.caller as string).toLowerCase();
  const asset = (values.tokenOut as string).toLowerCase();
  const amount = (values.tokenAmountOut as BigNumber).toBigInt();

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'BalancerV1',
        factory: pool.factory,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      from: transactionFrom.toLowerCase(),
      hash,
      index: transactionIndex,
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
    withdrawer,
    assets: [
      {
        type: 'erc20',
        address: asset,
      },
    ],
    amounts: [amount],
    metadata: {},
  };
}

const CLASSIFIER: Classifiers = {
  swap: {
    type: 'swap',
    protocol: 'BalancerV1',
    abi: poolAbi,
    isValid: isValidSwap,
    parse: parseSwap,
    pool: {
      getCalls: getPoolCalls,
      processCalls: processPoolCalls,
    },
  },
  liquidityDeposit: {
    type: 'liquidity_deposit',
    protocol: 'BalancerV1',
    abi: poolAbi,
    isValid: isValidDeposit,
    parse: parseDeposit,
    pool: {
      getCalls: getPoolCalls,
      processCalls: processPoolCalls,
    },
  },
  liquidityWithdrawal: {
    type: 'liquidity_withdrawal',
    protocol: 'BalancerV1',
    abi: poolAbi,
    isValid: isValidWithdrawal,
    parse: parseWithdrawal,
    pool: {
      getCalls: getPoolCalls,
      processCalls: processPoolCalls,
    },
  },
};

export default CLASSIFIER;
