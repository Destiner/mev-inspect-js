import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import poolAbi from '../../abi/aaveV3Pool.js';
import { Classifier, Market, MarketData, Repayment, Seizure } from '../base.js';
import { ChainId, ClassifiedEvent, isValidPool } from '../index.js';

function isValid(event: Event, address: string, chainId: ChainId): boolean {
  return (
    event.name === 'LiquidationCall' &&
    isValidPool(chainId, 'AaveV3', address.toLowerCase())
  );
}

async function fetchMarket(
  _chainId: ChainId,
  _provider: Provider,
  address: string,
): Promise<MarketData> {
  return {
    poolAddress: address.toLowerCase(),
    // TODO fix
    asset: '',
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

  const asset = (values.debtAsset as string).toLowerCase();
  const borrower = (values.user as string).toLowerCase();
  const amount = (values.debtToCover as BigNumber).toBigInt();
  const payer = (values.liquidator as string).toLowerCase();

  return {
    contract: {
      address: market.address,
      protocol: {
        abi: 'AaveV3',
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

  const asset = (values.collateralAsset as string).toLowerCase();
  const borrower = (values.user as string).toLowerCase();
  const amount = (values.liquidatedCollateralAmount as BigNumber).toBigInt();
  const seizor = (values.liquidator as string).toLowerCase();

  return {
    contract: {
      address: market.address,
      protocol: {
        abi: 'AaveV3',
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
    protocol: 'AaveV3',
    abi: poolAbi,
    isValid,
    parse: parseRepayment,
    fetchMarket,
  },
  {
    type: 'seizure',
    protocol: 'AaveV3',
    abi: poolAbi,
    isValid,
    parse: parseSeizure,
    fetchMarket,
  },
];

export default CLASSIFIERS;
