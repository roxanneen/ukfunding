'use client';

import { useState } from 'react';
import { schemes } from '@/data';

const SITE = 'https://ukfunding.io';

/**
 * Pre-written prompt deep-linked into AI assistants (the Levels.fyi pattern).
 * Data-derived (scheme count) so it never drifts from reality.
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

// Brand logo marks, monochrome via currentColor. Real marks are inlined
// (Claude/Perplexity/Gemini sourced from simple-icons; Grok from its official
// logo) so there are no external logo-API requests — keeping the site's
// zero-third-party-request promise. Venice has no clean public SVG yet, so it
// uses a lettermark monogram (swappable the moment a real SVG turns up).
type IconDef = { viewBox: string; paths: string[] };

const ICONS: Record<string, IconDef> = {
  claude: {
    viewBox: '0 0 24 24',
    paths: [
      'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z',
    ],
  },
  perplexity: {
    viewBox: '0 0 24 24',
    paths: [
      'M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z',
    ],
  },
  gemini: {
    viewBox: '0 0 24 24',
    paths: [
      'M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81',
    ],
  },
  grok: {
    viewBox: '0 0 150 150',
    paths: [
      'M59.95,93.59l45.05-33.3c2.21-1.63,5.37-1,6.42,1.54,5.54,13.37,3.06,29.44-7.96,40.48-11.02,11.03-26.35,13.45-40.37,7.94l-15.31,7.1c21.96,15.03,48.63,11.31,65.29-5.38,13.22-13.23,17.31-31.27,13.48-47.54l.03,.03c-5.55-23.9,1.36-33.45,15.53-52.98,.33-.46,.67-.93,1.01-1.4l-18.64,18.66v-.06L59.94,93.6',
      'M50.65,101.68c-15.76-15.07-13.04-38.4,.4-51.86,9.94-9.96,26.24-14.02,40.46-8.05l15.28-7.06c-2.75-1.99-6.28-4.13-10.33-5.64-18.29-7.54-40.2-3.79-55.07,11.09-14.3,14.32-18.8,36.34-11.08,55.13,5.77,14.04-3.69,23.98-13.22,34-3.38,3.55-6.76,7.11-9.49,10.87l43.03-38.48',
    ],
  },
};

type Provider = { name: string; href: string; icon?: keyof typeof ICONS; mono?: string };

function providers(encoded: string): Provider[] {
  return [
    { name: 'Claude', href: `https://claude.ai/new?q=${encoded}`, icon: 'claude' },
    { name: 'Grok', href: `https://grok.com/?q=${encoded}`, icon: 'grok' },
    { name: 'Venice', href: `https://venice.ai/chat?q=${encoded}`, mono: 'V' },
    { name: 'Perplexity', href: `https://www.perplexity.ai/search?q=${encoded}`, icon: 'perplexity' },
    { name: 'Gemini', href: `https://www.google.com/search?udm=50&q=${encoded}`, icon: 'gemini' },
  ];
}

function Mark({ provider }: { provider: Provider }) {
  if (provider.icon) {
    const def = ICONS[provider.icon];
    return (
      <svg viewBox={def.viewBox} fill="currentColor" aria-hidden className="h-4 w-4 shrink-0">
        {def.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    );
  }
  return (
    <span
      aria-hidden
      className="grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border border-current text-[9px] font-bold leading-none"
    >
      {provider.mono}
    </span>
  );
}

export default function AskAI() {
  const prompt = buildPrompt(schemes.length);
  const list = providers(encodeURIComponent(prompt));
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the links still work */
    }
  };

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-line px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
        Summarise this site with AI
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {list.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener"
            aria-label={`Summarise ukfunding.io with ${p.name}`}
            className="inline-flex items-center gap-1.5 rounded-sm font-mono text-[13px] text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Mark provider={p} />
            {p.name}
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
