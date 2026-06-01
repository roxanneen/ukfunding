// src/lib/matchmaker.ts — Filtering logic for the funding matchmaker

import type { Scheme, Stage, SectorId, AmountBand } from '@/data/types';

export interface MatchmakerAnswers {
  stage: Stage | null;
  sector: SectorId | null;
  amount: AmountBand | null;
}

export function filterSchemes(
  schemes: Scheme[],
  answers: MatchmakerAnswers
): Scheme[] {
  const { stage, sector, amount } = answers;
  if (!stage || !sector || !amount) return [];

  return schemes.filter(
    (s) =>
      s.stages.includes(stage) &&
      s.sectors.includes(sector) &&
      s.amounts.includes(amount)
  );
}

export function isComplete(answers: MatchmakerAnswers): boolean {
  return answers.stage !== null && answers.sector !== null && answers.amount !== null;
}
