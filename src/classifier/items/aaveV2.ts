import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import poolAbi from '../../abi/aaveV2Pool.js';
import { Classifier, Market, MarketData, Repayment, Seizure } from '../base.js';
import { ChainId, ClassifiedEvent, isValidPool } from '../index.js';

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
  const amount = (values.debtToCover as BigNumber).toBigInt();
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
    asset,
    amount,
  };
}

function parseSeizure(market: Market, event: ClassifiedEvent): Seizure {
  const {
    values,
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
  const amount = (values.liquidatedCollateralAmount as BigNumber).toBigInt();
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
    asset,
    amount,
  };
}

const CLASSIFIERS: Classifier[] = [
  {
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
  {
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
];

export default CLASSIFIERS;
