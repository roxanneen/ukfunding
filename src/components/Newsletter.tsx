'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="section-frame">
      <div className="relative grid items-center gap-8 border border-line bg-bg-paper p-6 sm:gap-10 sm:p-10 md:grid-cols-2 md:gap-16 md:p-16">
        <div>
          <h3 className="section-em mb-4 font-sans text-[clamp(24px,3.2vw,40px)] font-medium leading-[1.15] tracking-[-0.02em]">
            The shortlist, <em>monthly,</em> in your inbox.
          </h3>
          <p className="max-w-[460px] text-[14px] leading-[1.55] text-ink-mute sm:text-[15px]">
            One email per month. Newly-opened schemes, changes to existing ones, deadlines that matter. Built for
            founders, not consultants.
          </p>
        </div>

        <div>
          {submitted ? (
            <div className="border border-ink bg-[color-mix(in_srgb,var(--ink)_5%,transparent)] px-5 py-4 font-sans text-[15px] text-ink">
              ✓ You&rsquo;re on the list. First issue lands first Tuesday of next month.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@yourcompany.co.uk"
                aria-label="Email address for newsletter signup"
                className="min-w-0 flex-1 border border-line-strong bg-bg px-4 py-3.5 font-mono text-[14px] text-ink outline-none transition-colors focus:border-accent sm:border-r-0 sm:px-5 sm:py-4"
              />
              <button
                type="submit"
                className="-mt-px w-full border border-ink bg-ink px-5 py-3.5 font-mono text-[13px] tracking-[0.05em] text-bg transition-colors hover:bg-transparent hover:text-ink sm:mt-0 sm:w-auto sm:px-7 sm:py-4"
              >
                Subscribe →
              </button>
            </form>
          )}
          <div className="mt-3.5 font-mono text-[11px] tracking-[0.04em] text-ink-mute">
            No spam · unsubscribe in one click · we don&rsquo;t sell data
          </div>
        </div>
      </div>
    </section>
  );
}
