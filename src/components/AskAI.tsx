'use client';

import { useState } from 'react';
import { schemes } from '@/data';

const SITE = 'https://ukfunding.io';

/**
 * Pre-written prompt deep-linked into AI assistants (the Levels.fyi pattern).
 * Kept data-derived (scheme count) so it never drifts from reality.
 */
function buildPrompt(schemeCount: number): string {
  return (
    `Summarise ukfunding.io (${SITE}) for a first-time UK founder. ` +
    `It's an independent editorial atlas of UK startup funding — ${schemeCount}+ schemes across grants, ` +
    `equity, ARIA programmes, accelerators, loans and R&D tax relief, public and private, ` +
    `sorted by stage, sector and UK region. Cover its free tools: the funding matchmaker ` +
    `(${SITE}/#matchmaker), the capital-stack guide (${SITE}/#stack), the R&D tax-credit calculator ` +
    `(${SITE}/#calculator), and the live opportunities list (${SITE}/#opportunities). ` +
    `No vendors, no affiliate links.`
  );
}

/**
 * Deep-link builders per assistant.
 * Confirmed prefill: Claude, Perplexity. Best-effort (click-test): Grok, Venice, Google AI.
 * The "Copy prompt" button is the universal fallback if any provider stops prefilling.
 */
function providerLinks(encoded: string): { name: string; href: string }[] {
  return [
    { name: 'Claude', href: `https://claude.ai/new?q=${encoded}` },
    { name: 'Grok', href: `https://grok.com/?q=${encoded}` },
    { name: 'Venice', href: `https://venice.ai/chat?q=${encoded}` },
    { name: 'Perplexity', href: `https://www.perplexity.ai/search?q=${encoded}` },
    { name: 'Google AI', href: `https://www.google.com/search?udm=50&q=${encoded}` },
  ];
}

export default function AskAI() {
  const prompt = buildPrompt(schemes.length);
  const links = providerLinks(encodeURIComponent(prompt));
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — links still work */
    }
  };

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-line px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
        Summarise this site with AI
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {links.map((l) => (
          <a
            key={l.name}
            href={l.href}
            target="_blank"
            rel="noopener"
            className="rounded-sm font-mono text-[13px] text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {l.name}&nbsp;↗
          </a>
        ))}
        <span aria-hidden className="text-ink-faint">
          ·
        </span>
        <button
          type="button"
          onClick={copyPrompt}
          className="rounded-sm font-mono text-[13px] text-ink-mute transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {copied ? 'Copied ✓' : 'Copy prompt'}
        </button>
      </div>
    </div>
  );
}
