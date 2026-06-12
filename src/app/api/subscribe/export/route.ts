import { Redis } from '@upstash/redis';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const KEY = 'subscribers';
const EXPORT_KEY_FIELD = 'export_key';

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/**
 * Password-gated CSV export of the subscriber list, ready to import into
 * Substack (or anywhere). Visit:
 *   /api/subscribe/export?key=YOUR_EXPORT_KEY
 *
 * The expected key is taken from the SUBSCRIBE_EXPORT_KEY env var if set;
 * otherwise from a key provisioned once via POST /api/subscribe/export/setup
 * and stored in Redis. The Redis path means the export works without having to
 * add a Vercel environment variable.
 */
export async function GET(request: Request) {
  const provided = new URL(request.url).searchParams.get('key') ?? '';

  const redis = getRedis();
  if (!redis) {
    return new Response('Subscriber store is not configured.', { status: 503 });
  }

  // Env var wins if present; otherwise fall back to the key set up in Redis.
  const envKey = process.env.SUBSCRIBE_EXPORT_KEY ?? '';
  const storedKey = envKey ? '' : (await redis.get<string>(EXPORT_KEY_FIELD)) ?? '';
  const expected = envKey || storedKey;

  if (!expected) {
    return new Response(
      'Export is not configured yet. Run the one-time setup first (POST /api/subscribe/export/setup).',
      { status: 503 }
    );
  }
  if (provided !== expected) {
    return new Response('Unauthorized.', { status: 401 });
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
