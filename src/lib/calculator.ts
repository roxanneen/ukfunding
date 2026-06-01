// src/lib/calculator.ts — R&D Tax Credit calculation logic
// Rates per HMRC rules from 1 April 2024

export type ProfitLossPosition = 'profit' | 'loss' | 'rdi';
export type SchemeRoute = 'merged' | 'rdec';

export interface CalcInput {
  qualifyingExpenditure: number;
  profitLoss: ProfitLossPosition;
  scheme: SchemeRoute;
}

export interface CalcOutput {
  netBenefit: number;
  effectiveRate: number;
  routeDescription: string;
  aboveTheLine: number;
  taxOrSurrender: number;
}

export function calculateRdCredit(input: CalcInput): CalcOutput {
  const { qualifyingExpenditure: qe, profitLoss, scheme } = input;

  if (scheme === 'merged' && profitLoss === 'rdi') {
    // ERIS: 86% enhancement on QE, then 14.5% surrender rate
    const enhancement = qe * 0.86;
    const enhanced = qe + enhancement;
    const surrender = enhanced * 0.145;
    const rate = (surrender / qe) * 100;
    return {
      netBenefit: surrender,
      effectiveRate: parseFloat(rate.toFixed(1)),
      routeDescription: 'ERIS · loss-making R&D-intensive SME',
      aboveTheLine: enhancement,
      taxOrSurrender: surrender,
    };
  }

  if (scheme === 'merged' && profitLoss === 'loss') {
    // Loss-making merged: 20% ATL credit, taxed at 19% (small profits rate)
    const atlCredit = qe * 0.2;
    const tax = atlCredit * 0.19;
    const net = atlCredit - tax;
    const rate = (net / qe) * 100;
    return {
      netBenefit: net,
      effectiveRate: parseFloat(rate.toFixed(1)),
      routeDescription: 'Merged scheme · loss-making',
      aboveTheLine: atlCredit,
      taxOrSurrender: -tax,
    };
  }

  // Default: profit-making merged OR RDEC (same mechanics)
  // 20% ATL credit, taxed at 25% corporation tax
  const atlCredit = qe * 0.2;
  const tax = atlCredit * 0.25;
  const net = atlCredit - tax;
  const rate = (net / qe) * 100;

  const desc =
    scheme === 'rdec'
      ? 'RDEC · large company'
      : 'Merged scheme · profit-making';

  return {
    netBenefit: net,
    effectiveRate: parseFloat(rate.toFixed(1)),
    routeDescription: desc,
    aboveTheLine: atlCredit,
    taxOrSurrender: -tax,
  };
}
