import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';

import poolAbi from '../../abi/aaveV2Pool.js';
import { Classifier, Liquidation, Market } from '../base.js';
import { ChainId } from '../directory.js';
import { ClassifiedEvent } from '../index.js';

async function fetchMarket(
  _chainId: ChainId,
  _provider: Provider,
  address: string,
): Promise<Market> {
  // TODO fix
  return {
    address: address.toLowerCase(),
    pool: address.toLowerCase(),
    asset: '',
  };
}

function parseLiquidation(
  market: Market,
  event: ClassifiedEvent,
): Liquidation | null {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;

  const assetSeized = (values.collateralAsset as string).toLowerCase();
  const assetRepay = (values.debtAsset as string).toLowerCase();
  const borrower  = (values.user as string).toLowerCase();
  const amountRepay = (values.debtToCover as BigNumber).toBigInt();
  const amountSeized = (values.liquidatedCollateralAmount as BigNumber).toBigInt();
  const liquidator = (values.liquidator as string).toLowerCase();

  return {
    contract: {
      address,
      protocol: {
        abi: 'AaveV2',
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
  name: 'LiquidationCall',
  protocol: 'AaveV2',
  abi: poolAbi,
  parse: parseLiquidation,
  fetchMarket,
};

export default CLASSIFIERS;
