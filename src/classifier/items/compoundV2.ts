import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call, Contract } from 'ethcall';

import marketAbi from '../../abi/compoundV2Market.js';
import { Classifier, Market, MarketData, Repayment, Seizure } from '../base.js';
import { ChainId, nativeAsset } from '../directory.js';
import { ClassifiedEvent } from '../index.js';

const CETH_MARKET: Record<string, string> = {
  '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b':
    '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
};

function isValidRepayment(event: Event): boolean {
  return event.name === 'RepayBorrow';
}

function isValidSeizure(event: Event): boolean {
  return event.name === 'LiquidateBorrow';
}

function getMarketCalls(address: string): Call[] {
  const marketContract = new Contract(address, marketAbi);
  const comptrollerCall = marketContract.comptroller();
  const underlyingCall = marketContract.underlying();
  return [comptrollerCall, underlyingCall];
}

function processMarketCalls(
  chainId: ChainId,
  address: string,
  result: unknown[],
): MarketData | null {
  const comptroller = result[0] as string | undefined;
  const underlying = result[1] as string | undefined;
  if (!comptroller || !underlying) {
    return null;
  }
  const cethMarket = CETH_MARKET[comptroller];
  const native = nativeAsset[chainId];
  const asset = address === cethMarket ? native : underlying.toLowerCase();
  return {
    poolAddress: comptroller.toLowerCase(),
    asset,
  };
}

function parseRepayment(market: Market, event: ClassifiedEvent): Repayment {
  const {
    values,
    transactionHash: hash,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;

  const payer = (values.payer as string).toLowerCase();
  const borrower = (values.borrower as string).toLowerCase();
  const amount = (values.repayAmount as BigNumber).toBigInt();

  const asset = market.asset;

  return {
    contract: {
      address: market.address,
      protocol: {
        abi: 'CompoundV2',
        pool: market.pool,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      hash,
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
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;

  const seizor = (values.liquidator as string).toLowerCase();
  const borrower = (values.borrower as string).toLowerCase();
  const asset = (values.cTokenCollateral as string).toLowerCase();
  const amount = (values.seizeTokens as BigNumber).toBigInt();

  return {
    contract: {
      address: market.address,
      protocol: {
        abi: 'CompoundV2',
        pool: market.pool,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      hash,
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
    protocol: 'CompoundV2',
    abi: marketAbi,
    isValid: isValidRepayment,
    parse: parseRepayment,
    market: {
      getCalls: getMarketCalls,
      processCalls: processMarketCalls,
    },
  },
  {
    type: 'seizure',
    protocol: 'CompoundV2',
    abi: marketAbi,
    isValid: isValidSeizure,
    parse: parseSeizure,
    market: {
      getCalls: getMarketCalls,
      processCalls: processMarketCalls,
    },
  },
];

export default CLASSIFIERS;
