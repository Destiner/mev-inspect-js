import { Provider, TransactionReceipt } from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';
import { JsonRpcProvider } from '@ethersproject/providers';

import { Inspector } from '../src/index.js';

import getProvider from './utils.js';

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
  return response.receipts.map((receipt: TransactionReceipt) => {
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
      blockNumber: parseInt(blockNumber.toString(), 16),
      contractAddress,
      cumulativeGasUsed: BigNumber.from(cumulativeGasUsed),
      effectiveGasPrice: BigNumber.from(effectiveGasPrice),
      from,
      gasUsed: BigNumber.from(gasUsed),
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
          blockNumber: parseInt(blockNumber.toString(), 16),
          data,
          logIndex: parseInt(logIndex.toString(), 16),
          topics,
          transactionHash,
          transactionIndex: parseInt(transactionIndex.toString(), 16),
        };
      }),
      logsBloom,
      status: parseInt(status?.toString() || '0x0', 16),
      to,
      transactionHash,
      transactionIndex: parseInt(transactionIndex?.toString(), 16),
      type: parseInt(type?.toString(), 16),
    };
  });
}

run();
