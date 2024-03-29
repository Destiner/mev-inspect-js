import { JsonRpcProvider } from 'ethers';

type TransactionStateDiffItem =
  | '='
  | { '*': { from: string; to: string | null } }
  | { '+': string };

interface SuccessfulTrace {
  action: {
    callType: 'call';
    from: string;
    gas: string;
    input: string;
    to: string;
    value: string;
  };
  result: {
    gasUsed: string;
    output: string;
  };
  subtraces: number;
  traceAddress: number[];
  type: 'call' | 'create' | 'suicide';
}

interface RevertedTrace {
  action: {
    callType: 'call';
    from: string;
    gas: string;
    input: string;
    to: string;
    value: string;
  };
  error: 'Reverted';
  subtraces: number;
  traceAddress: number;
  type: 'call';
}

interface RawTransactionReplay {
  transactionHash: string;
  output: string;
  stateDiff: Record<
    string,
    {
      balance: TransactionStateDiffItem;
      code: TransactionStateDiffItem;
      nonce: TransactionStateDiffItem;
      storage: Record<string, TransactionStateDiffItem>;
    }
  >;
  trace: (SuccessfulTrace | RevertedTrace)[];
}

interface TransactionTrace {
  calls: {
    from: string;
    to: string;
    input: string;
    output: string;
    value: bigint;
    gas: bigint;
    gasUsed: bigint;
  }[];
}

async function getTransactionTrace(
  provider: JsonRpcProvider,
  hash: string,
): Promise<TransactionTrace | null> {
  const response = (await provider.send('trace_replayTransaction', [
    hash,
    ['trace'],
  ])) as RawTransactionReplay;
  return parseTrace(response);
}

async function getBlockTraces(
  provider: JsonRpcProvider,
  block: number,
): Promise<Record<string, TransactionTrace> | null> {
  const response = (await provider.send('trace_replayBlockTransactions', [
    block,
    ['trace'],
  ])) as RawTransactionReplay[];
  for (const trace of response) {
    if (!trace.trace) {
      return null;
    }
  }
  return Object.fromEntries(
    response.map((replay) => {
      return [replay.transactionHash, parseTrace(replay)];
    }),
  );
}

function parseTrace(replay: RawTransactionReplay): TransactionTrace {
  return {
    calls: replay.trace
      .filter(
        (trace): trace is SuccessfulTrace =>
          trace.type === 'call' && 'result' in trace,
      )
      .map((trace) => {
        const { action, result } = trace;
        return {
          from: action.from,
          to: action.to,
          input: action.input,
          output: result.output,
          value: BigInt(action.value),
          gas: BigInt(action.gas),
          gasUsed: BigInt(result.gasUsed),
        };
      }),
  };
}

export { getBlockTraces, getTransactionTrace };
export type { TransactionTrace };
