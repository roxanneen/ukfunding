// src/lib/format.ts — Formatting helpers

export function formatGBP(n: number): string {
  return n.toLocaleString('en-GB', { maximumFractionDigits: 0 });
}

export function formatGBPCompact(n: number): string {
  if (n >= 1_000_000_000) return `£${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `£${(n / 1_000).toFixed(0)}K`;
  return `£${n}`;
}

export function daysUntil(isoDate: string | null): number | null {
  if (!isoDate) return null;
  const target = new Date(isoDate).getTime();
  const now = Date.now();
  return Math.ceil((target - now) / (86_400 * 1_000));
}

export type DeadlineUrgency = 'closed' | 'urgent' | 'normal' | 'evergreen';

export function deadlineUrgency(isoDate: string | null): DeadlineUrgency {
  const days = daysUntil(isoDate);
  if (days === null) return 'evergreen';
  if (days < 0) return 'closed';
  if (days < 30) return 'urgent';
  return 'normal';
}
