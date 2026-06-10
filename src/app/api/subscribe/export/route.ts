import { Redis } from '@upstash/redis';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const KEY = 'subscribers';

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/**
 * Password-gated CSV export of the subscriber list, ready to import into
 * Substack (or anywhere). Visit:
 *   /api/subscribe/export?key=YOUR_SUBSCRIBE_EXPORT_KEY
 * The key is the SUBSCRIBE_EXPORT_KEY env var you set in Vercel.
 */
export async function GET(request: Request) {
  const provided = new URL(request.url).searchParams.get('key') ?? '';
  const expected = process.env.SUBSCRIBE_EXPORT_KEY ?? '';

  if (!expected || provided !== expected) {
    return new Response('Unauthorized', { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return new Response('Subscriber store is not configured.', { status: 503 });
  }

  // withScores returns a flat array: [member, score, member, score, ...]
  const raw = (await redis.zrange(KEY, 0, -1, { withScores: true })) as (string | number)[];

  const rows: string[] = ['email,signed_up_at'];
  for (let i = 0; i < raw.length; i += 2) {
    const email = String(raw[i]).replace(/"/g, '""');
    const ts = Number(raw[i + 1]);
    const iso = Number.isFinite(ts) ? new Date(ts).toISOString() : '';
    rows.push(`"${email}","${iso}"`);
  }

  return new Response(rows.join('\n'), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="ukfunding-subscribers.csv"',
      'cache-control': 'no-store',
    },
  });
}
