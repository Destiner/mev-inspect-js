import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import marketAbi from '../../abi/compoundV2Market.js';
import { Classifier, Liquidation, Market, Repayment } from '../base.js';
import { ChainId, nativeAsset } from '../directory.js';
import { ClassifiedEvent } from '../index.js';

const CETH_MARKET: Record<string, string> = {
  '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b':
    '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
};

function isValidRepayment(event: Event): boolean {
  return event.name === 'RepayBorrow';
}

function isValidLiquidation(event: Event): boolean {
  return event.name === 'LiquidateBorrow';
}

async function fetchMarket(
  chainId: ChainId,
  provider: Provider,
  address: string,
): Promise<Market> {
  const marketContract = new Contract(address, marketAbi, provider);
  const comptroller = (
    (await marketContract.comptroller()) as string
  ).toLowerCase();
  const cethMarket = CETH_MARKET[comptroller];
  const native = nativeAsset[chainId];
  const underlying =
    address === cethMarket
      ? native
      : ((await marketContract.underlying()) as string).toLowerCase();
  return {
    address: address.toLowerCase(),
    pool: comptroller,
    asset: underlying,
  };
}

function parseRepayment(market: Market,
  event: ClassifiedEvent,): Repayment {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;

  const payer = (values.payer as string).toLowerCase();
  const borrower = (values.borrower as string).toLowerCase();
  const amount = (values.repayAmount as BigNumber).toBigInt();

  const asset = market.asset;

  return {
    contract: {
      address,
      protocol: {
        abi: 'CompoundV2',
        pool: market.pool,
      },
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

function parseLiquidation(
  market: Market,
  event: ClassifiedEvent,
): Liquidation {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;

  const liquidator = (values.liquidator as string).toLowerCase();
  const borrower = (values.borrower as string).toLowerCase();
  const amountDebt = (values.repayAmount as BigNumber).toBigInt();
  const assetCollateral = (values.cTokenCollateral as string).toLowerCase();
  const amountCollateral = (values.seizeTokens as BigNumber).toBigInt();

  const assetDebt = market.asset;

  return {
    contract: {
      address,
      protocol: {
        abi: 'CompoundV2',
        pool: market.pool,
      },
    },
    transaction: {
      hash,
      gasUsed,
    },
    event: {
      logIndex,
      address: address.toLowerCase(),
    },
    liquidator,
    borrower,
    assetDebt,
    amountDebt,
    assetCollateral,
    amountCollateral,
  };
}

const CLASSIFIERS: Classifier[] = [{
  type: 'repayment',
  protocol: 'CompoundV2',
  abi: marketAbi,
  isValid: isValidRepayment,
  parse: parseRepayment,
  fetchMarket,
}, {
  type: 'liquidation',
  protocol: 'CompoundV2',
  abi: marketAbi,
  isValid: isValidLiquidation,
  parse: parseLiquidation,
  fetchMarket,
}];

export default CLASSIFIERS;
