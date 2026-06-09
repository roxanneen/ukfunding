'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.includes('@') || status === 'loading') return;

    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus('success');
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error — please try again.');
      setStatus('error');
    }
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
          {status === 'success' ? (
            <div className="border border-ink bg-[color-mix(in_srgb,var(--ink)_5%,transparent)] px-5 py-4 font-sans text-[15px] text-ink">
              ✓ You&rsquo;re on the list. We&rsquo;ll email you when the first issue lands.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row" noValidate>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading'}
                placeholder="founder@yourcompany.co.uk"
                aria-label="Email address for newsletter signup"
                aria-invalid={status === 'error'}
                className="min-w-0 flex-1 border border-line-strong bg-bg px-4 py-3.5 font-mono text-[14px] text-ink outline-none transition-colors focus:border-accent disabled:opacity-60 sm:border-r-0 sm:px-5 sm:py-4"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="-mt-px w-full border border-ink bg-ink px-5 py-3.5 font-mono text-[13px] tracking-[0.05em] text-bg transition-colors hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-ink disabled:hover:text-bg sm:mt-0 sm:w-auto sm:px-7 sm:py-4"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe →'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <div role="alert" className="mt-3 font-mono text-[12px] tracking-[0.02em] text-warn">
              {errorMsg}
            </div>
          )}

          <div className="mt-3.5 font-mono text-[11px] leading-[1.5] tracking-[0.04em] text-ink-mute">
            No spam · unsubscribe in one click · we don&rsquo;t sell data. By subscribing you agree to our{' '}
            <a
              href="/legal#privacy"
              className="text-ink underline-offset-2 transition-colors hover:text-ink-mute hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </section>
  );
}
