import { JsonFragment } from '@ethersproject/abi';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import { Log } from '../chain.js';

import { Factory } from './directory.js';

import { ChainId, ClassifiedEvent } from './index.js';

interface PoolData {
  factoryAddress: string;
  assets: string[];
}

interface Pool {
  address: string;
  factory: Factory;
  assets: string[];
}

interface MarketData {
  poolAddress: string;
  asset?: string;
}

interface Market {
  address: string;
  pool: {
    address: string;
    label: string;
  };
  asset: string;
}

interface NftPoolData {
  factoryAddress: string;
  asset: string;
  collection: string;
  metadata: Record<string, unknown>;
}

interface NftPool {
  address: string;
  factory: Factory;
  asset: string;
  collection: string;
  metadata: Record<string, unknown>;
}

interface Erc20Asset {
  type: 'erc20';
  address: string;
}

interface Erc721Asset {
  type: 'erc721';
  collection: string;
  id: bigint;
}

type Asset = Erc20Asset | Erc721Asset;

interface Block {
  hash: string;
  number: number;
}

interface Transaction {
  hash: string;
  gasUsed: number;
}

interface Base {
  block: Block;
  transaction: Transaction;
  event: {
    address: string;
    logIndex: number;
  };
}

interface Transfer extends Base {
  asset: string;
  from: string;
  to: string;
  value: bigint;
}

interface Swap extends Base {
  contract: {
    address: string;
    protocol: {
      abi: Protocol;
      factory: Factory;
    };
  };
  from: string;
  to: string;
  assetIn: string;
  amountIn: bigint;
  assetOut: string;
  amountOut: bigint;
  metadata: Record<string, unknown>;
}

interface LiquidityDeposit extends Base {
  contract: {
    address: string;
    protocol: {
      abi: Protocol;
      factory: Factory;
    };
  };
  depositor: string;
  assets: string[];
  amounts: bigint[];
  metadata: Record<string, unknown>;
}

interface LiquidityWithdrawal extends Base {
  contract: {
    address: string;
    protocol: {
      abi: Protocol;
      factory: Factory;
    };
  };
  withdrawer: string;
  assets: string[];
  amounts: bigint[];
  metadata: Record<string, unknown>;
}

interface NftSwap extends Base {
  contract: {
    address: string;
    protocol: {
      abi: Protocol;
      factory: Factory;
    };
  };
  from: string;
  to: string;
  assetIn: Asset;
  amountIn: bigint;
  assetOut: Asset;
  amountOut: bigint;
}

interface Repayment extends Base {
  contract: {
    address: string;
    protocol: {
      abi: Protocol;
      pool: {
        address: string;
        label: string;
      };
    };
  };
  payer: string;
  borrower: string;
  amount: bigint;
  asset: string;
}

interface Seizure extends Base {
  contract: {
    address: string;
    protocol: {
      abi: Protocol;
      pool: {
        address: string;
        label: string;
      };
    };
  };
  seizor: string;
  borrower: string;
  asset: string;
  amount: bigint;
}

type SwapProtocol =
  | 'BalancerV1'
  | 'BalancerV2'
  | 'UniswapV2'
  | 'UniswapV3'
  | 'ZeroExV3'
  | 'ZeroExV4'
  | 'CurveV1'
  | 'CurveV2'
  | 'BancorV2'
  | 'BancorV3';

type NftSwapProtocol =
  | 'LooksRareV1'
  | 'X2Y2V1'
  | 'SudoswapV1'
  | 'OpenseaSeaport';

type LendingProtocol = 'CompoundV2' | 'AaveV1' | 'AaveV2' | 'AaveV3';

type Protocol = SwapProtocol | NftSwapProtocol | LendingProtocol;

interface BaseClassifier {
  abi: JsonFragment[];
}

interface TransferClassifier extends BaseClassifier {
  type: 'transfer';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (event: ClassifiedEvent) => Transfer;
}

interface SwapClassifier extends BaseClassifier {
  protocol: SwapProtocol;
  type: 'swap';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (
    pool: Pool,
    event: ClassifiedEvent,
    transfers: Transfer[],
    allEvents: ClassifiedEvent[],
  ) => Swap | null;
  pool: {
    getCalls: (id: string) => Call[];
    processCalls: (result: unknown[], address: string) => PoolData | null;
  };
}

interface LiquidityDepositClassifier extends BaseClassifier {
  protocol: SwapProtocol;
  type: 'liquidity_deposit';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (pool: Pool, event: ClassifiedEvent) => LiquidityDeposit | null;
  pool: {
    getCalls: (id: string) => Call[];
    processCalls: (result: unknown[], address: string) => PoolData | null;
  };
}

interface LiquidityWithdrawalClassifier extends BaseClassifier {
  protocol: SwapProtocol;
  type: 'liquidity_withdrawal';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (pool: Pool, event: ClassifiedEvent) => LiquidityWithdrawal | null;
  pool: {
    getCalls: (id: string) => Call[];
    processCalls: (result: unknown[], address: string) => PoolData | null;
  };
}

interface NftSwapClassifier extends BaseClassifier {
  protocol: NftSwapProtocol;
  type: 'nft_swap';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (
    pool: NftPool,
    event: ClassifiedEvent,
    chainId: ChainId,
    allLogs: Log[],
  ) => NftSwap | null;
  pool: {
    getCalls: (id: string) => Call[];
    processCalls: (
      result: unknown[],
      address: string,
      chainId: ChainId,
    ) => NftPoolData | null;
  };
}

interface RepaymentClassifier extends BaseClassifier {
  protocol: LendingProtocol;
  type: 'repayment';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (market: Market, event: ClassifiedEvent) => Repayment | null;
  market: {
    getCalls: (address: string) => Call[];
    processCalls: (
      chainId: ChainId,
      address: string,
      result: unknown[],
    ) => MarketData | null;
  };
}

interface SeizureClassifier extends BaseClassifier {
  protocol: LendingProtocol;
  type: 'seizure';
  isValid: (event: Event, address: string, chainId: ChainId) => boolean;
  parse: (market: Market, event: ClassifiedEvent) => Seizure | null;
  market: {
    getCalls: (address: string) => Call[];
    processCalls: (
      chainId: ChainId,
      address: string,
      result: unknown[],
    ) => MarketData | null;
  };
}

type Classifier =
  | TransferClassifier
  | SwapClassifier
  | LiquidityDepositClassifier
  | LiquidityWithdrawalClassifier
  | NftSwapClassifier
  | RepaymentClassifier
  | SeizureClassifier;

function getLatestPoolTransfer(
  pool: string,
  logIndex: number,
  transfers: Transfer[],
): Transfer | null {
  const allTransfersToPool = transfers.filter(
    (transfer) => transfer.to === pool,
  );
  const previousTransfers = allTransfersToPool.filter(
    (transfer) => transfer.event.logIndex < logIndex,
  );
  previousTransfers.sort((a, b) => b.event.logIndex - a.event.logIndex);
  return previousTransfers[0];
}

export {
  Asset,
  Base,
  Block,
  Classifier,
  LendingProtocol,
  LiquidityDeposit,
  LiquidityWithdrawal,
  Market,
  MarketData,
  NftPool,
  NftPoolData,
  NftSwap,
  NftSwapProtocol,
  Pool,
  PoolData,
  Protocol,
  Repayment,
  Seizure,
  Swap,
  SwapProtocol,
  Transaction,
  Transfer,
  getLatestPoolTransfer,
};
