import Link from 'next/link';
import type { Scheme } from '@/data/types';
import { formatTicket, hasDetail } from '@/lib/schemes';

/**
 * Shared scheme list for the sector, region and deadline pages.
 *
 * Schemes with a published page link to it. Schemes still waiting on their
 * editorial pass render as plain rows, so nothing links into a 404.
 */
export default function SchemeList({
  schemes,
  emptyLabel = 'Nothing tracked here yet.',
}: {
  schemes: Scheme[];
  emptyLabel?: string;
}) {
  if (schemes.length === 0) {
    return <p className="py-8 text-[15px] text-ink-faint">{emptyLabel}</p>;
  }

  return (
    <ul className="grid gap-px bg-line sm:grid-cols-2">
      {schemes.map((s) => {
        const meta = `${s.funder} · ${formatTicket(s.ticketMin, s.ticketMax)} · ${s.deadline}`;
        const inner = (
          <>
            <div className="font-sans text-[15px] font-medium leading-[1.25] text-ink">{s.name}</div>
            <div className="mt-1.5 font-mono text-[11px] text-ink-mute">{meta}</div>
          </>
        );
        return (
          <li key={s.slug} className="bg-bg">
            {hasDetail(s) ? (
              <Link
                href={`/funding/${s.slug}`}
                className="block h-full p-4 transition-colors hover:bg-bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
              >
                {inner}
              </Link>
            ) : (
              <div className="h-full p-4">{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
