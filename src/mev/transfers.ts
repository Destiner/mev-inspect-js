import { Transfer, ClassifiedEvent } from '../classifier/index.js';

function getTransfers(logs: ClassifiedEvent[]): Transfer[] {
  return logs
    .map((log) => {
      if (log.classifier.event.type !== 'transfer') {
        return null;
      }
      return log.classifier.event.parse(log);
    })
    .filter((transfer: Transfer | null): transfer is Transfer => !!transfer);
}

export default getTransfers;
