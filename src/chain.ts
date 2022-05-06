import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { ErrorCode } from '@ethersproject/logger';
import { Provider, TransactionReceipt } from '@ethersproject/providers';

interface Log {
  transactionHash: string;
  logIndex: number;
  address: string;
  topics: string[];
  data: string;
}

interface Error {
  code: string;
}

class Chain {
  provider: Provider;

  constructor(provider: Provider) {
    this.provider = provider;
  }

  async getTransactionLogs(hash: string): Promise<Log[]> {
    const receipt = await this.#getReceipt(hash);
    return receipt.logs.map((log) => {
      const { transactionHash, logIndex, address, topics, data } = log;
      return {
        transactionHash,
        logIndex,
        address,
        topics,
        data,
      };
    });
  }

  async getBlockLogs(number: number): Promise<Log[]> {
    const block = await this.#getBlock(number);
    const hashes = block.transactions.map((tx) => tx.hash);
    const logs: Log[][] = [];
    for (const hash of hashes) {
      const txLogs = await this.getTransactionLogs(hash);
      logs.push(txLogs);
    }
    return logs.flat();
  }

  async #getReceipt(hash: string): Promise<TransactionReceipt> {
    let receipt: TransactionReceipt | null = null;
    while (!receipt) {
      try {
        receipt = await this.provider.getTransactionReceipt(hash);
      } catch (e: unknown) {
        console.error('Ethers error:', e);
        const errorCode = (e as Error).code;
        if (
          errorCode === ErrorCode.SERVER_ERROR ||
          errorCode === ErrorCode.TIMEOUT
        ) {
          console.log(
            `Failed to fetch receipts, reason: ${errorCode}, retrying`,
          );
        } else {
          throw e;
        }
      }
    }
    return receipt;
  }

  async #getBlock(number: number): Promise<BlockWithTransactions> {
    let block: BlockWithTransactions | null = null;
    while (!block) {
      try {
        block = await this.provider.getBlockWithTransactions(number);
      } catch (e: unknown) {
        console.error('Ethers error:', e);
        const errorCode = (e as Error).code;
        if (
          errorCode === ErrorCode.SERVER_ERROR ||
          errorCode === ErrorCode.TIMEOUT
        ) {
          console.log(
            `Failed to fetch the block, reason: ${errorCode}, retrying`,
          );
        } else {
          throw e;
        }
      }
    }
    return block;
  }
}

export default Chain;

export { Log };
