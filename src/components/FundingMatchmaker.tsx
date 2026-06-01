'use client';

import { useMemo, useState } from 'react';
import { schemes } from '@/data';
import type { AmountBand, SectorId, Stage } from '@/data/types';
import { filterSchemes, isComplete, type MatchmakerAnswers } from '@/lib/matchmaker';

type Choice<T extends string> = { value: T; label: string; sub: string };

const stageChoices: Choice<Stage>[] = [
  { value: 'idea', label: 'Idea / Pre-team', sub: 'No incorporation yet' },
  { value: 'preseed', label: 'Pre-seed', sub: 'Building MVP, <£500K' },
  { value: 'seed', label: 'Seed', sub: 'Early revenue, £500K–£3M' },
  { value: 'seriesa', label: 'Series A+', sub: 'Scaling, £3M–£25M' },
];

const sectorChoices: Choice<SectorId>[] = [
  { value: 'ai', label: 'AI / ML', sub: 'Models, infrastructure, applications' },
  { value: 'health', label: 'Health / Med-tech', sub: 'Devices, software, diagnostics' },
  { value: 'space', label: 'Space / Aerospace', sub: 'Upstream, downstream' },
  { value: 'robotics', label: 'Robotics / Hardware', sub: 'Industrial, advanced manufacturing' },
  { value: 'climate', label: 'Climate / Energy', sub: 'Net-zero, fusion, materials' },
  { value: 'defence', label: 'Defence / Dual-Use', sub: 'Autonomy, counter-UAS, AI security' },
  { value: 'other', label: 'Other / Cross-cutting', sub: 'Fintech, deeptech, etc.' },
];

const amountChoices: Choice<AmountBand>[] = [
  { value: 'micro', label: 'Up to £25K', sub: 'Loans, micro-grants' },
  { value: 'small', label: '£25K – £250K', sub: 'Pre-seed, SEIS round' },
  { value: 'mid', label: '£250K – £2M', sub: 'Smart Grants, EIS, seed' },
  { value: 'large', label: '£2M+', sub: 'Large grants, growth equity' },
];

const emptyAnswers: MatchmakerAnswers = { stage: null, sector: null, amount: null };

export default function FundingMatchmaker() {
  const [answers, setAnswers] = useState<MatchmakerAnswers>(emptyAnswers);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const results = useMemo(() => filterSchemes(schemes, answers), [answers]);
  const done = isComplete(answers);

  const pickStage = (v: Stage) => {
    setAnswers((a) => ({ ...a, stage: v }));
    setStep(2);
  };
  const pickSector = (v: SectorId) => {
    setAnswers((a) => ({ ...a, sector: v }));
    setStep(3);
  };
  const pickAmount = (v: AmountBand) => {
    setAnswers((a) => ({ ...a, amount: v }));
  };

  const back = () => {
    if (step === 3) {
      setAnswers((a) => ({ ...a, amount: null, sector: a.sector }));
      setStep(2);
    } else if (step === 2) {
      setAnswers((a) => ({ ...a, sector: null }));
      setStep(1);
    }
  };
  const reset = () => {
    setAnswers(emptyAnswers);
    setStep(1);
  };

  return (
    <section id="matchmaker" className="section-frame">
      <div className="mb-12 flex max-w-[780px] flex-col gap-4">
        <h2 className="section-em text-display font-medium">
          Three questions. <em>A shortlist worth opening.</em>
        </h2>
        <p className="max-w-[640px] text-[16px] leading-[1.55] text-ink-mute">
          Most founders waste weeks reading scheme criteria they were never going to qualify for. Filter by what you
          actually have: a stage, a sector, and a number.
        </p>
      </div>

      <div className="grid min-h-[500px] border border-line bg-bg-paper lg:grid-cols-[1.1fr_1fr]">
        <div className="border-line p-8 lg:border-r lg:p-12">
          {step === 1 && (
            <Step
              num="QUESTION 01 / 03"
              heading="What stage is the company at?"
              choices={stageChoices}
              selected={answers.stage}
              onPick={pickStage}
            />
          )}
          {step === 2 && (
            <Step
              num="QUESTION 02 / 03"
              heading="Which sector best describes the work?"
              choices={sectorChoices}
              selected={answers.sector}
              onPick={pickSector}
            />
          )}
          {step === 3 && (
            <Step
              num="QUESTION 03 / 03"
              heading="How much are you trying to raise or claim?"
              choices={amountChoices}
              selected={answers.amount}
              onPick={pickAmount}
            />
          )}

          <div className="mt-8 flex gap-1">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`h-0.5 flex-1 transition-colors ${step >= n ? 'bg-accent' : 'bg-line-strong'}`}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-between font-mono text-[12px] tracking-[0.05em]">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              className="text-ink-mute transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-ink-mute"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={reset}
              className="text-ink-mute transition-colors hover:text-ink"
            >
              Reset all
            </button>
          </div>
        </div>

        <ResultsPanel done={done} results={results} />
      </div>
    </section>
  );
}

function Step<T extends string>({
  num,
  heading,
  choices,
  selected,
  onPick,
}: {
  num: string;
  heading: string;
  choices: Choice<T>[];
  selected: T | null;
  onPick: (v: T) => void;
}) {
  return (
    <div className="step-fade-in" key={num}>
      <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-accent">{num}</div>
      <h3 className="mb-7 font-sans text-[26px] font-medium leading-[1.1] tracking-[-0.01em]">{heading}</h3>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {choices.map((c) => {
          const active = selected === c.value;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => onPick(c.value)}
              aria-pressed={active}
              className={`flex flex-col gap-1.5 border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active
                  ? 'border-accent bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]'
                  : 'border-line-strong hover:border-accent hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]'
              }`}
            >
              <span className="text-[14px] font-medium text-ink">{c.label}</span>
              <span className="font-mono text-[11px] tracking-[0.04em] text-ink-mute">{c.sub}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultsPanel({
  done,
  results,
}: {
  done: boolean;
  results: ReturnType<typeof filterSchemes>;
}) {
  return (
    <div className="flex flex-col bg-bg p-8 lg:p-12">
      <div className="mb-6 flex items-baseline justify-between border-b border-line pb-4">
        <div className="font-sans text-[24px] font-medium tabular-nums text-ink">
          {done ? results.length : '—'}{' '}
          <span className="ml-1.5 font-mono text-[13px] tracking-[0.1em] text-ink-mute">SCHEMES</span>
        </div>
        <div className="font-mono text-label uppercase text-ink-mute">SHORTLIST</div>
      </div>

      {!done && (
        <div className="grid flex-1 place-items-center text-center font-sans text-[18px] font-light text-ink-faint">
          Pick the three answers — your shortlist will appear here.
        </div>
      )}

      {done && results.length === 0 && (
        <div className="grid flex-1 place-items-center text-center font-sans text-[18px] font-light text-ink-faint">
          No schemes match this combination yet. Try a wider amount band or sector.
        </div>
      )}

      {done && results.length > 0 && (
        <div className="-mx-8 flex max-h-[420px] flex-col gap-px overflow-y-auto bg-line lg:-mx-12">
          {results.map((s) => (
            <div
              key={s.name}
              className="grid grid-cols-[1fr_auto] items-center gap-5 bg-bg px-8 py-5 transition-colors hover:bg-bg-elev lg:px-12"
            >
              <div>
                <div className="text-[15px] font-medium text-ink">{s.name}</div>
                <div className="mt-1 font-mono text-[11px] tracking-[0.02em] text-ink-mute">{s.tag}</div>
              </div>
              <div className="text-right font-mono text-[13px] tabular-nums text-accent">{s.amountLabel}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
