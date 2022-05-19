import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import marketAbi from '../../abi/compoundV2Market.js';
import { Classifier, Liquidation, Market } from '../base.js';
import { ChainId, nativeAsset } from '../directory.js';
import { ClassifiedEvent } from '../index.js';

const CETH_MARKET: Record<string, string> = {
  '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b':
    '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
};

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

function parseLiquidation(
  market: Market,
  event: ClassifiedEvent,
): Liquidation | null {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;

  const liquidator = (values.liquidator as string).toLowerCase();
  const borrower = (values.borrower as string).toLowerCase();
  const amountRepay = (values.repayAmount as BigNumber).toBigInt();
  const assetSeized = (values.cTokenCollateral as string).toLowerCase();
  const amountSeized = (values.seizeTokens as BigNumber).toBigInt();

  const assetRepay = market.asset;

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
    assetRepay,
    amountRepay,
    assetSeized,
    amountSeized,
  };
}

const CLASSIFIERS: Classifier = {
  type: 'liquidation',
  name: 'LiquidateBorrow',
  protocol: 'CompoundV2',
  abi: marketAbi,
  parse: parseLiquidation,
  fetchMarket,
};

export default CLASSIFIERS;
