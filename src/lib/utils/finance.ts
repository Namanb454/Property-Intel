export interface EmiInput {
  /** Loan amount in rupees. */
  principal: number;
  /** Annual interest rate as a percentage, e.g. 8.5. */
  annualRatePct: number;
  years: number;
}

export interface EmiResult {
  monthly: number;
  totalInterest: number;
  totalPayment: number;
}

/** Standard reducing-balance EMI. */
export function calculateEmi({ principal, annualRatePct, years }: EmiInput): EmiResult {
  const monthlyRate = annualRatePct / 12 / 100;
  const months = years * 12;

  const monthly =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = monthly * months;
  return { monthly, totalPayment, totalInterest: totalPayment - principal };
}
