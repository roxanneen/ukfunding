import { NextResponse } from 'next/server';

// Runs on the server (Vercel), so the request to Substack isn't subject to
// browser CORS and no third-party script loads in the visitor's browser —
// keeping the site's no-client-third-party promise intact.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Public subdomain (not a secret); overridable via env if it ever changes.
const SUBSTACK = process.env.SUBSTACK_SUBDOMAIN ?? 'ukfunding';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = '';
  try {
    const body = await request.json();
    email = String(body?.email ?? '').trim().toLowerCase();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const base = `https://${SUBSTACK}.substack.com`;

  try {
    const res = await fetch(`${base}/api/v1/free`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json, text/plain, */*',
        'user-agent': 'Mozilla/5.0 (compatible; ukfunding.io/1.0; +https://ukfunding.io)',
        origin: base,
        referer: `${base}/`,
      },
      body: JSON.stringify({
        email,
        first_url: `${base}/`,
        first_referrer: '',
        current_url: `${base}/subscribe`,
        current_referrer: '',
        referral_code: '',
        source: 'subscribe_page',
      }),
      // Don't hang the user's request forever if Substack is slow.
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    // Substack may return a bot-protection challenge or other error.
    return NextResponse.json(
      {
        ok: false,
        error: 'We couldn’t complete the sign-up right now. Please try again in a moment.',
      },
      { status: 502 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Couldn’t reach the sign-up service. Please try again.' },
      { status: 502 }
    );
  }
}
