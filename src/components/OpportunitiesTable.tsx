'use client';

import { useMemo, useState } from 'react';
import { schemes } from '@/data';
import type { Scheme, SchemeType } from '@/data/types';
import { deadlineUrgency } from '@/lib/format';

type Filter = 'all' | SchemeType;
type SortKey = 'name' | 'amount' | 'deadline';
type SortDir = 'asc' | 'desc';

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'grant', label: 'Grants' },
  { value: 'equity', label: 'Equity' },
  { value: 'accelerator', label: 'Accelerators' },
  { value: 'loan', label: 'Loans' },
  { value: 'tax', label: 'Tax Relief' },
];

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'deadline', label: 'Deadline' },
  { value: 'amount', label: 'Amount' },
  { value: 'name', label: 'Name' },
];

const typeLabel: Record<SchemeType, string> = {
  grant: 'GRANT',
  equity: 'EQUITY',
  accelerator: 'ACCEL',
  loan: 'LOAN',
  tax: 'TAX',
};

function deadlineSortValue(s: Scheme): number {
  if (!s.deadlineDate) return Number.POSITIVE_INFINITY; // evergreen sinks to bottom
  return new Date(s.deadlineDate).getTime();
}

function isClosed(s: Scheme): boolean {
  return deadlineUrgency(s.deadlineDate) === 'closed';
}

export default function OpportunitiesTable() {
  const [filter, setFilter] = useState<Filter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('deadline');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [showClosed, setShowClosed] = useState(false);

  const { open, closed } = useMemo(() => {
    const base = filter === 'all' ? schemes : schemes.filter((s) => s.type === filter);
    const dir = sortDir === 'asc' ? 1 : -1;
    const sorter = (a: Scheme, b: Scheme) => {
      if (sortKey === 'name') return dir * a.name.localeCompare(b.name);
      if (sortKey === 'amount') return dir * (a.amountCeiling - b.amountCeiling);
      return dir * (deadlineSortValue(a) - deadlineSortValue(b));
    };
    const openRows = base.filter((s) => !isClosed(s)).sort(sorter);
    // Closed schemes: most-recently-closed first, regardless of current sortDir.
    const closedRows = base
      .filter(isClosed)
      .sort((a, b) => deadlineSortValue(b) - deadlineSortValue(a));
    return { open: openRows, closed: closedRows };
  }, [filter, sortKey, sortDir]);

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(k);
      setSortDir('asc');
    }
  };

  const sortIndicator = (k: SortKey) => {
    if (sortKey !== k) return null;
    return <span className="text-accent">{sortDir === 'asc' ? ' ↑' : ' ↓'}</span>;
  };

  return (
    <section id="opportunities" className="section-frame">
      <div className="mb-12 flex max-w-[780px] flex-col gap-4">
        <h2 className="section-em text-display font-medium">
          Live opportunities. <em className="block">No login.</em>
        </h2>
        <p className="max-w-[640px] text-[16px] leading-[1.55] text-ink-mute">
          A maintained shortlist of currently open schemes. Sort by amount or deadline. Filter by type. The full
          database is in the newsletter.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter opportunities by type">
        <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">Filter ⟶</span>
        {filters.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={active}
              className={`border px-3 py-1.5 font-mono text-[12px] tracking-[0.04em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active
                  ? 'border-ink bg-ink text-bg'
                  : 'border-line-strong text-ink-mute hover:border-ink-mute hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Mobile-only sort control (the table headers handle sorting at md+) */}
      <div className="mb-4 flex flex-wrap items-center gap-2 md:hidden" role="group" aria-label="Sort opportunities">
        <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">Sort ⟶</span>
        {sortOptions.map((o) => {
          const active = sortKey === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => toggleSort(o.value)}
              aria-pressed={active}
              className={`border px-3 py-1.5 font-mono text-[12px] tracking-[0.04em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active
                  ? 'border-ink bg-ink text-bg'
                  : 'border-line-strong text-ink-mute hover:border-ink-mute hover:text-ink'
              }`}
            >
              {o.label}
              {active ? <span aria-hidden> {sortDir === 'asc' ? '↑' : '↓'}</span> : null}
            </button>
          );
        })}
      </div>

      {/* Mobile: card list */}
      <ul className="flex flex-col gap-px border border-line bg-line md:hidden">
        {open.length === 0 && (
          <li className="bg-bg px-5 py-10 text-center font-sans text-[15px] font-light text-ink-faint">
            No open schemes match this filter.
          </li>
        )}
        {open.map((s) => (
          <MobileCard key={s.name} scheme={s} />
        ))}
      </ul>

      {/* Desktop: table */}
      <div className="hidden border border-line bg-bg-paper md:block">
        <table className="w-full text-[14px]">
          <caption className="sr-only">Open UK funding opportunities, sortable by scheme, amount, or deadline.</caption>
          <thead>
            <tr>
              <Th
                onClick={() => toggleSort('name')}
                ariaSort={sortKey === 'name' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Scheme{sortIndicator('name')}
              </Th>
              <Th>Type</Th>
              <Th
                onClick={() => toggleSort('amount')}
                ariaSort={sortKey === 'amount' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Amount{sortIndicator('amount')}
              </Th>
              <Th>Stage</Th>
              <Th
                onClick={() => toggleSort('deadline')}
                ariaSort={sortKey === 'deadline' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Deadline{sortIndicator('deadline')}
              </Th>
            </tr>
          </thead>
          <tbody>
            {open.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center font-sans text-[15px] font-light text-ink-faint">
                  No open schemes match this filter.
                </td>
              </tr>
            )}
            {open.map((s) => (
              <Row key={s.name} scheme={s} />
            ))}
          </tbody>
        </table>
      </div>

      {closed.length > 0 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowClosed((v) => !v)}
            className="flex items-center gap-2 border border-line-strong px-4 py-2 font-mono text-[12px] tracking-[0.05em] text-ink-mute transition-colors hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-expanded={showClosed}
          >
            <span aria-hidden>{showClosed ? '−' : '+'}</span>
            {showClosed ? 'Hide closed' : 'Show closed'} ({closed.length})
          </button>

          {showClosed && (
            <>
              {/* Mobile: closed card list */}
              <ul className="mt-4 flex flex-col gap-px border border-line bg-line md:hidden">
                {closed.map((s) => (
                  <MobileCard key={s.name} scheme={s} closed />
                ))}
              </ul>

              {/* Desktop: closed table */}
              <div className="mt-4 hidden border border-line bg-bg-paper md:block">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr>
                      <Th>Scheme</Th>
                      <Th>Type</Th>
                      <Th>Amount</Th>
                      <Th>Stage</Th>
                      <Th>Closed</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {closed.map((s) => (
                      <Row key={s.name} scheme={s} closed />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

/** Mobile card — replaces a table row below the md breakpoint. */
function MobileCard({ scheme, closed }: { scheme: Scheme; closed?: boolean }) {
  const urgency = deadlineUrgency(scheme.deadlineDate);
  return (
    <li className={`flex flex-col gap-3 bg-bg p-4 ${closed ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div
            className={`text-[15px] font-medium leading-tight ${
              closed ? 'text-ink-mute line-through decoration-from-font' : 'text-ink'
            }`}
          >
            {scheme.name}
          </div>
          <div className="mt-1 font-mono text-[12px] text-ink-mute">{scheme.body}</div>
        </div>
        {closed ? (
          <span className="type-tag shrink-0" style={{ borderColor: 'var(--warn)', color: 'var(--warn)' }}>
            CLOSED
          </span>
        ) : (
          <span className={`type-tag shrink-0 ${scheme.type}`}>{typeLabel[scheme.type]}</span>
        )}
      </div>
      <div className="flex items-end justify-between gap-3 border-t border-line pt-3">
        <span className={`font-mono text-[14px] tabular-nums ${closed ? 'text-ink-mute' : 'text-accent'}`}>
          {scheme.amountLabel}
        </span>
        <span
          className={`font-mono text-[12px] tabular-nums ${
            urgency === 'urgent'
              ? 'font-bold text-ink'
              : urgency === 'evergreen'
              ? 'font-light text-ink-mute'
              : closed
              ? 'text-ink-mute line-through decoration-from-font'
              : 'text-ink'
          }`}
        >
          {scheme.deadline}
        </span>
      </div>
    </li>
  );
}

function Row({ scheme, closed }: { scheme: Scheme; closed?: boolean }) {
  const urgency = deadlineUrgency(scheme.deadlineDate);
  const muteAll = closed ? 'opacity-60' : '';
  return (
    <tr className={`border-t border-line transition-colors hover:bg-bg-elev ${muteAll}`}>
      <td className="px-4 py-4 align-middle md:px-5">
        <div className={`text-[14px] font-medium ${closed ? 'text-ink-mute line-through decoration-from-font' : 'text-ink'}`}>
          {scheme.name}
        </div>
        <div className="mt-0.5 font-mono text-[12px] text-ink-mute">{scheme.body}</div>
      </td>
      <td className="px-4 py-4 align-middle md:px-5">
        {closed ? (
          <span className="type-tag" style={{ borderColor: 'var(--warn)', color: 'var(--warn)' }}>
            CLOSED
          </span>
        ) : (
          <span className={`type-tag ${scheme.type}`}>{typeLabel[scheme.type]}</span>
        )}
      </td>
      <td className="whitespace-nowrap px-4 py-4 align-middle font-mono tabular-nums md:px-5">
        <span className={closed ? 'text-ink-mute' : 'text-accent'}>{scheme.amountLabel}</span>
      </td>
      <td className="px-4 py-4 align-middle font-mono text-[11px] uppercase tracking-[0.08em] text-ink-mute md:px-5">
        {scheme.stages.join(' · ')}
      </td>
      <td
        className={`px-4 py-4 align-middle font-mono text-[12px] tabular-nums md:px-5 ${
          urgency === 'urgent'
            ? 'font-bold text-ink'
            : urgency === 'evergreen'
            ? 'font-light text-ink-mute'
            : closed
            ? 'text-ink-mute line-through decoration-from-font'
            : 'text-ink'
        }`}
      >
        {scheme.deadline}
      </td>
    </tr>
  );
}

function Th({
  children,
  onClick,
  ariaSort,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  ariaSort?: 'ascending' | 'descending' | 'none';
}) {
  return (
    <th
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={onClick ? 0 : -1}
      aria-sort={ariaSort}
      scope="col"
      className={`select-none border-b border-line bg-bg px-4 py-4 text-left font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-mute transition-colors md:px-5 ${
        onClick ? 'cursor-pointer hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent focus-visible:text-ink' : ''
      }`}
    >
      {children}
    </th>
  );
}
