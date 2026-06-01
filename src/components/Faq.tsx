'use client';

import { useState } from 'react';
import { faq } from '@/data/faq';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-frame">
      <div className="mb-12 flex max-w-[780px] flex-col gap-4">
        <h2 className="section-em text-display font-medium">
          Founder questions, <em>plainly answered</em>.
        </h2>
        <p className="max-w-[640px] text-[16px] leading-[1.55] text-ink-mute">
          The things people actually ask before applying. Not financial advice.
        </p>
      </div>

      <div className="border-y border-line">
        {faq.map((entry, i) => {
          const isOpen = open === i;
          const itemId = `faq-item-${i}`;
          const panelId = `faq-panel-${i}`;
          return (
            <div key={entry.q} className="border-b border-line last:border-b-0">
              <h3>
                <button
                  id={itemId}
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                >
                  <span className="font-sans text-[18px] font-medium leading-[1.3] tracking-[-0.005em] text-ink md:text-[20px]">
                    {entry.q}
                  </span>
                  <span
                    aria-hidden
                    className={`font-mono text-[18px] text-accent transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
              </h3>
              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={itemId}
                  className="max-w-[820px] pb-7 pr-10 text-[15px] leading-[1.6] text-ink-mute"
                >
                  {entry.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
