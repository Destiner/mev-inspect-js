import { Repayment, Seizure } from '../classifier/index.js';

interface Liquidation {
  seizure: Seizure;
  repayment: Repayment;
}

function getLiquidations(
  repayments: Repayment[],
  seizures: Seizure[],
): Liquidation[] {
  return seizures
    .map((seizure) => {
      const repayment = getRepayment(seizure, repayments);
      if (!repayment) {
        return null;
      }
      return {
        repayment,
        seizure,
      };
    })
    .filter(
      (liquidation: Liquidation | null): liquidation is Liquidation =>
        !!liquidation,
    );
}

function getRepayment(
  seizure: Seizure,
  repayments: Repayment[],
): Repayment | null {
  const repayment = repayments.reverse().find((repayment) => {
    if (seizure.contract.protocol.abi === 'CompoundV2') {
      return (
        repayment.event.logIndex < seizure.event.logIndex &&
        repayment.event.address === seizure.event.address &&
        repayment.payer === seizure.seizor &&
        repayment.borrower === seizure.borrower
      );
    }
    return repayment.event.logIndex === seizure.event.logIndex;
  });
  return repayment ? repayment : null;
}

export { Liquidation, getLiquidations };
