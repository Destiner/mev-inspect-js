import type { Event } from 'abi-coder';
import type { Call } from 'ethcall';

import poolAbi from '../../abi/aaveV2Pool.js';
import type {
  Classifiers,
  Market,
  MarketData,
  Repayment,
  Seizure,
} from '../base.js';
import type { ChainId, ClassifiedEvent } from '../index.js';
import { isValidPool } from '../index.js';

function isValid(event: Event, address: string, chainId: ChainId): boolean {
  return (
    event.name === 'LiquidationCall' &&
    isValidPool(chainId, 'AaveV2', address.toLowerCase())
  );
}

function getMarketCalls(): Call[] {
  return [];
}

function processMarketCalls(_chainId: ChainId, address: string): MarketData {
  return {
    poolAddress: address.toLowerCase(),
  };
}

function parseRepayment(market: Market, event: ClassifiedEvent): Repayment {
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

  const asset = (values.debtAsset as string).toLowerCase();
  const borrower = (values.user as string).toLowerCase();
  const amount = values.debtToCover as bigint;
  const payer = (values.liquidator as string).toLowerCase();

  return {
    contract: {
      address: market.address,
      protocol: {
        abi: 'AaveV2',
        pool: market.pool,
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
    payer,
    borrower,
    asset: {
      type: 'erc20',
      address: asset,
    },
    amount,
  };
}

function parseSeizure(market: Market, event: ClassifiedEvent): Seizure {
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

  const asset = (values.collateralAsset as string).toLowerCase();
  const borrower = (values.user as string).toLowerCase();
  const amount = values.liquidatedCollateralAmount as bigint;
  const seizor = (values.liquidator as string).toLowerCase();

  return {
    contract: {
      address: market.address,
      protocol: {
        abi: 'AaveV2',
        pool: market.pool,
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
    seizor,
    borrower,
    asset: {
      type: 'erc20',
      address: asset,
    },
    amount,
  };
}

const CLASSIFIERS: Classifiers = {
  repayment: {
    type: 'repayment',
    protocol: 'AaveV2',
    abi: poolAbi,
    isValid,
    parse: parseRepayment,
    market: {
      getCalls: getMarketCalls,
      processCalls: processMarketCalls,
    },
  },
  seizure: {
    type: 'seizure',
    protocol: 'AaveV2',
    abi: poolAbi,
    isValid,
    parse: parseSeizure,
    market: {
      getCalls: getMarketCalls,
      processCalls: processMarketCalls,
    },
  },
};

export default CLASSIFIERS;
