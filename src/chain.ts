import { Block, Provider, TransactionReceipt } from 'ethers';

interface Log {
  blockHash: string;
  blockNumber: number;
  transactionFrom: string;
  transactionHash: string;
  transactionIndex: number;
  logIndex: number;
  gasUsed: number;
  address: string;
  topics: readonly string[];
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
    const receipt = await this.getReceipt(hash);
    if (!receipt) {
      return [];
    }
    return this.#getLogs(receipt);
  }

  async getBlockLogs(number: number): Promise<Log[]> {
    const block = await this.#getBlock(number);
    const hashes = block.transactions;
    const logs: Log[][] = [];
    for (const hash of hashes) {
      const txLogs = await this.getTransactionLogs(hash);
      logs.push(txLogs);
    }
    return logs.flat();
  }

  async getReceipt(hash: string): Promise<TransactionReceipt | null> {
    let receipt: TransactionReceipt | null | undefined = undefined;
    while (receipt === undefined) {
      try {
        receipt = await this.provider.getTransactionReceipt(hash);
      } catch (e: unknown) {
        const errorCode = (e as Error).code;
        if (errorCode === 'TIMEOUT') {
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

  async getBlockReceipts(number: number): Promise<TransactionReceipt[]> {
    const block = await this.#getBlock(number);
    const hashes = block.transactions;
    const receipts: TransactionReceipt[] = [];
    for (const hash of hashes) {
      const receipt = await this.getReceipt(hash);
      if (!receipt) {
        continue;
      }
      receipts.push(receipt);
    }
    return receipts;
  }

  parseReceipts(receipts: TransactionReceipt[]): Log[] {
    return receipts.map((receipt) => this.#getLogs(receipt)).flat();
  }

  async #getBlock(number: number): Promise<Block> {
    let block: Block | null = null;
    while (!block) {
      try {
        block = await this.provider.getBlock(number, true);
      } catch (e: unknown) {
        const errorCode = (e as Error).code;
        if (errorCode === 'TIMEOUT') {
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
    const { from, logs, gasUsed } = receipt;
    return logs.map((log) => {
      const {
        transactionHash,
        transactionIndex,
        index,
        address,
        topics,
        data,
        blockNumber,
        blockHash,
      } = log;
      return {
        blockHash,
        blockNumber,
        transactionFrom: from,
        transactionHash,
        transactionIndex,
        logIndex: index,
        gasUsed: parseInt(gasUsed.toString()),
        address,
        topics,
        data,
      };
    });
  }
}

export default Chain;

export { Log };
