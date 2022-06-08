import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { ErrorCode } from '@ethersproject/logger';
import { Provider, TransactionReceipt } from '@ethersproject/providers';

interface Log {
  blockHash: string;
  blockNumber: number;
  transactionHash: string;
  logIndex: number;
  gasUsed: number;
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
    if (!receipt) {
      return [];
    }
    return this.#getLogs(receipt);
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

  parseReceipts(receipts: TransactionReceipt[]): Log[] {
    return receipts.map((receipt) => this.#getLogs(receipt)).flat();
  }

  async #getReceipt(hash: string): Promise<TransactionReceipt | null> {
    let receipt: TransactionReceipt | null | undefined = undefined;
    while (receipt === undefined) {
      try {
        receipt = await this.provider.getTransactionReceipt(hash);
      } catch (e: unknown) {
        const errorCode = (e as Error).code;
        if (errorCode === ErrorCode.TIMEOUT) {
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
        const errorCode = (e as Error).code;
        if (errorCode === ErrorCode.TIMEOUT) {
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

  #getLogs(receipt: TransactionReceipt): Log[] {
    const { logs, gasUsed } = receipt;
    return logs.map((log) => {
      const {
        transactionHash,
        logIndex,
        address,
        topics,
        data,
        blockNumber,
        blockHash,
      } = log;
      return {
        blockHash,
        blockNumber,
        transactionHash,
        logIndex,
        gasUsed: gasUsed.toNumber(),
        address,
        topics,
        data,
      };
    });
  }
}

export default Chain;

export { Log };
