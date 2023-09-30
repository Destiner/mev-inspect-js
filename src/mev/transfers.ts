import type { Transfer, ClassifiedEvent } from '../classifier/index.js';

function getTransfers(logs: ClassifiedEvent[]): Transfer[] {
  return logs
    .map((log) => {
      if (log.classifier.type !== 'transfer') {
        return null;
      }
      return log.classifier.parse(log);
    })
    .filter((transfer: Transfer | null): transfer is Transfer => !!transfer);
}

export default getTransfers;
