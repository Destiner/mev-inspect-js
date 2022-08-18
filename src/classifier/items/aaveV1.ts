import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import poolAbi from '../../abi/aaveV1Pool.js';
import { Classifier, Market, MarketData, Repayment, Seizure } from '../base.js';
import { ChainId, ClassifiedEvent, isValidPool } from '../index.js';

function isValid(event: Event, address: string, chainId: ChainId): boolean {
  return (
    event.name === 'LiquidationCall' &&
    isValidPool(chainId, 'AaveV1', address.toLowerCase())
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

  const asset = normalizeAsset((values.reserve as string).toLowerCase());
  const borrower = (values.user as string).toLowerCase();
  const amount = (values.purchaseAmount as BigNumber).toBigInt();
  const payer = (values.liquidator as string).toLowerCase();

  return {
    contract: {
      address: market.address,
      protocol: {
        abi: 'AaveV1',
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

  const asset = normalizeAsset((values.collateral as string).toLowerCase());
  const borrower = (values.user as string).toLowerCase();
  const amount = (values.liquidatedCollateralAmount as BigNumber).toBigInt();
  const seizor = (values.liquidator as string).toLowerCase();

  return {
    contract: {
      address: market.address,
      protocol: {
        abi: 'AaveV1',
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

function normalizeAsset(asset: string): string {
  if (asset == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    return '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
  }
  return asset;
}

const CLASSIFIERS: Classifier[] = [
  {
    type: 'repayment',
    protocol: 'AaveV1',
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
    protocol: 'AaveV1',
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
