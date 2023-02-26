import { JsonRpcProvider, Provider, TransactionReceipt } from 'ethers';

import { Inspector } from '../src/index.js';

import getProvider from './utils.js';

interface AlchemyTransactionReceipt {
  blockHash: string;
  blockNumber: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  from: string;
  gasUsed: string;
  logs: {
    address: string;
    blockHash: string;
    blockNumber: string;
    data: string;
    logIndex: string;
    topics: string[];
    transactionHash: string;
    transactionIndex: string;
  }[];
  logsBloom: string;
  status: string;
  to: string | null;
  transactionHash: string;
  transactionIndex: string;
  type: string;
}

const CHAIN_ID = 1;

async function run(): Promise<void> {
  const provider = getProvider(CHAIN_ID);
  const inspector = new Inspector(CHAIN_ID, provider);

  const receipts = await getBlockReceipts(provider, 14769194);
  const mev = await inspector.receipts(receipts);
  console.log(mev);
}

async function getBlockReceipts(
  provider: Provider,
  number: number,
): Promise<TransactionReceipt[]> {
  const response = await (provider as JsonRpcProvider).send(
    'alchemy_getTransactionReceipts',
    [{ blockNumber: `0x${number.toString(16)}` }],
  );
  return response.receipts.map((receipt: AlchemyTransactionReceipt) => {
    const {
      blockHash,
      blockNumber,
      contractAddress,
      cumulativeGasUsed,
      effectiveGasPrice,
      from,
      gasUsed,
      logs,
      logsBloom,
      status,
      to,
      transactionHash,
      transactionIndex,
      type,
    } = receipt;
    return {
      blockHash,
      blockNumber: parseInt(blockNumber, 16),
      contractAddress,
      cumulativeGasUsed: BigInt(cumulativeGasUsed),
      effectiveGasPrice: BigInt(effectiveGasPrice),
      from,
      gasUsed: BigInt(gasUsed),
      logs: logs.map((log) => {
        const {
          address,
          blockHash,
          blockNumber,
          data,
          logIndex,
          topics,
          transactionHash,
          transactionIndex,
        } = log;
        return {
          address,
          blockHash,
          blockNumber: parseInt(blockNumber, 16),
          data,
          index: parseInt(logIndex, 16),
          topics,
          transactionHash,
          transactionIndex: parseInt(transactionIndex, 16),
        };
      }),
      logsBloom,
      status: parseInt(status, 16),
      to,
      transactionHash,
      transactionIndex: parseInt(transactionIndex, 16),
      type: parseInt(type, 16),
    };
  });
}

run();
