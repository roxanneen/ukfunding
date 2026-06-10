import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KEY = 'subscribers';

/**
 * Lazily build the Redis client from whichever env vars the Vercel/Upstash
 * integration injected (Vercel KV uses KV_REST_API_*, the Upstash Marketplace
 * integration uses UPSTASH_REDIS_REST_*). Returns null if not yet configured,
 * so the build and an unprovisioned state stay safe.
 */
function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

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

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      { ok: false, error: 'Sign-up is temporarily unavailable. Please try again shortly.' },
      { status: 503 }
    );
  }

  try {
    // Sorted set keyed by signup time → dedupes, preserves first-signup
    // timestamp (nx keeps the original score on re-subscribe), and exports
    // cleanly to CSV with dates.
    await redis.zadd(KEY, { nx: true }, { score: Date.now(), member: email });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Could not save your sign-up. Please try again.' },
      { status: 502 }
    );
  }
}
