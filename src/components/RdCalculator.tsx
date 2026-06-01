'use client';

import { useMemo, useState } from 'react';
import { calculateRdCredit, type ProfitLossPosition, type SchemeRoute } from '@/lib/calculator';
import { formatGBP } from '@/lib/format';

const plOptions: { value: ProfitLossPosition; label: string }[] = [
  { value: 'profit', label: 'Profit-making' },
  { value: 'loss', label: 'Loss-making' },
  { value: 'rdi', label: 'R&D-Intensive Loss' },
];

const schemeOptions: { value: SchemeRoute; label: string }[] = [
  { value: 'merged', label: 'Merged Scheme' },
  { value: 'rdec', label: 'RDEC (large co.)' },
];

function parseAmount(input: string): number {
  const cleaned = input.replace(/[^0-9]/g, '');
  return cleaned ? Number(cleaned) : 0;
}

export default function RdCalculator() {
  const [qeInput, setQeInput] = useState('500,000');
  const [pl, setPl] = useState<ProfitLossPosition>('profit');
  const [scheme, setScheme] = useState<SchemeRoute>('merged');

  const qe = parseAmount(qeInput);
  const result = useMemo(
    () => calculateRdCredit({ qualifyingExpenditure: qe, profitLoss: pl, scheme }),
    [qe, pl, scheme]
  );

  const onQeChange = (raw: string) => {
    const n = parseAmount(raw);
    setQeInput(n ? n.toLocaleString('en-GB') : '');
  };

  return (
    <section id="calculator" className="section-frame">
      <div className="mb-12 flex max-w-[780px] flex-col gap-4">
        <h2 className="section-em text-display font-medium">
          R&amp;D credit, <em>back-of-envelope</em>.
        </h2>
        <p className="max-w-[640px] text-[16px] leading-[1.55] text-ink-mute">
          Estimate what HMRC&rsquo;s merged scheme returns on qualifying expenditure. Loss-making R&amp;D-intensive SMEs
          can claim under ERIS for a higher effective rate.
        </p>
      </div>

      <div className="grid border border-line bg-bg-paper lg:grid-cols-2">
        {/* Inputs */}
        <div className="border-line p-8 lg:border-r lg:p-12">
          <h3 className="mb-2 font-sans text-[22px] font-medium tracking-[-0.01em]">Inputs</h3>
          <p className="mb-8 text-[14px] leading-[1.5] text-ink-mute">
            Use qualifying R&amp;D expenditure (staff costs, software, subcontractor costs at 65%, consumables, etc.).
            Round figures are fine for a back-of-envelope.
          </p>

          <Field label="Qualifying R&D Expenditure (annual)">
            <div className="flex items-center border border-line-strong bg-bg px-4 py-3.5 transition-colors focus-within:border-accent">
              <span className="mr-2 font-mono text-[18px] text-ink-mute">£</span>
              <input
                type="text"
                inputMode="numeric"
                value={qeInput}
                onChange={(e) => onQeChange(e.target.value)}
                className="w-full border-none bg-transparent font-mono text-[18px] text-ink tabular-nums outline-none"
              />
            </div>
          </Field>

          <Field label="Profit / Loss position">
            <Toggle options={plOptions} value={pl} onChange={setPl} />
          </Field>

          <Field label="Scheme route">
            <Toggle options={schemeOptions} value={scheme} onChange={setScheme} />
          </Field>
        </div>

        {/* Output */}
        <div className="flex flex-col justify-center bg-bg p-8 lg:p-12">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            Estimated Net Benefit
          </div>
          <div className="mb-2 font-sans text-[clamp(48px,7vw,72px)] font-medium leading-none tracking-[-0.035em] text-ink tabular-nums">
            <span className="font-light text-ink-mute">£</span>
            {formatGBP(Math.max(0, Math.round(result.netBenefit)))}
          </div>
          <div className="mb-8 text-[14px] text-ink-mute">
            Effective rate:{' '}
            <strong className="font-medium text-ink">{result.effectiveRate}%</strong> ·{' '}
            <span>{result.routeDescription}</span>
          </div>

          <dl className="border-t border-line pt-6">
            <Row label="Qualifying expenditure" value={`£${formatGBP(qe)}`} />
            <Row
              label={pl === 'rdi' ? 'Enhanced expenditure (86% uplift)' : 'Above-the-line credit'}
              value={`£${formatGBP(Math.round(result.aboveTheLine))}`}
            />
            {pl !== 'rdi' && (
              <Row
                label={`Less corp. tax (${pl === 'loss' ? '19' : scheme === 'rdec' ? '25' : '25'}%)`}
                value={`−£${formatGBP(Math.round(-result.taxOrSurrender))}`}
              />
            )}
            {pl === 'rdi' && (
              <Row
                label="Surrender @ 14.5%"
                value={`£${formatGBP(Math.round(result.taxOrSurrender))}`}
              />
            )}
            <Row label="Net benefit" value={`£${formatGBP(Math.round(result.netBenefit))}`} highlight />
            <p className="mt-3 font-sans text-[11px] leading-[1.5] text-ink-faint">
              Indicative only. Always confirm with a qualified R&amp;D tax adviser. Rates per HMRC rules from 1 April
              2024.
            </p>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <label className="mb-3 block font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">{label}</label>
      {children}
    </div>
  );
}

function Toggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" className="flex border border-line-strong">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={`flex-1 border-none px-3 py-3 font-mono text-[12px] tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
              active ? 'bg-ink text-bg' : 'text-ink-mute hover:text-ink'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`flex justify-between py-2 font-mono text-[13px] tabular-nums ${
        highlight ? 'text-accent' : ''
      }`}
    >
      <span className={highlight ? 'font-medium text-accent' : 'text-ink-mute'}>{label}</span>
      <span className={highlight ? 'font-medium' : 'text-ink'}>{value}</span>
    </div>
  );
}
