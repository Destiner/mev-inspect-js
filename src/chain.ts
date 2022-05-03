import { Provider } from '@ethersproject/providers';

interface Log {
  transactionHash: string;
  address: string;
  topics: string[];
  data: string;
}

class Chain {
  provider: Provider;

  constructor(provider: Provider) {
    this.provider = provider;
  }

  async getTransactionLogs(hash: string): Promise<Log[]> {
    const receipt = await this.provider.getTransactionReceipt(hash);
    return receipt.logs.map((log) => {
      const { transactionHash, address, topics, data } = log;
      return {
        transactionHash,
        address,
        topics,
        data,
      };
    });
  }

  async getBlockLogs(number: number): Promise<Log[]> {
    const block = await this.provider.getBlockWithTransactions(number);
    const hashes = block.transactions.map((tx) => tx.hash);
    const logs: Log[][] = [];
    for (const hash of hashes) {
      const txLogs = await this.getTransactionLogs(hash);
      logs.push(txLogs);
    }
    return logs.flat();
  }
}

export default Chain;

export { Log };
