import { Redis } from '@upstash/redis';
import { randomBytes } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EXPORT_KEY_FIELD = 'export_key';

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/**
 * One-time setup for the subscriber CSV export.
 *
 * You authenticate by proving you own the store — pass one of the Upstash REST
 * tokens that Vercel already injected (read-only or read-write) in the
 * `x-setup-token` header. No new Vercel environment variable is required.
 *
 * On success it generates a random export key, stores it in Redis, and returns
 * the ready-to-use export URL. Calling it again rotates the key.
 *
 *   curl -X POST "https://ukfunding.io/api/subscribe/export/setup" \
 *     -H "x-setup-token: <your Upstash read-only token>"
 */
export async function POST(request: Request) {
  const provided = request.headers.get('x-setup-token') ?? '';

  const rw = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? '';
  const ro = process.env.KV_REST_API_READ_ONLY_TOKEN ?? '';

  if (!rw && !ro) {
    return new Response('Subscriber store is not configured.', { status: 503 });
  }
  if (!provided || (provided !== rw && provided !== ro)) {
    return new Response('Unauthorized. Pass a valid Upstash token in the x-setup-token header.', {
      status: 401,
    });
  }

  const redis = getRedis();
  if (!redis) {
    return new Response('Subscriber store is not configured.', { status: 503 });
  }

  const exportKey = randomBytes(24).toString('hex'); // 48 hex chars, URL-safe
  await redis.set(EXPORT_KEY_FIELD, exportKey);

  const origin = new URL(request.url).origin;
  const exportUrl = `${origin}/api/subscribe/export?key=${exportKey}`;

  return Response.json({
    ok: true,
    exportKey,
    exportUrl,
    note: 'Bookmark exportUrl. Re-run this setup to rotate the key.',
  });
}
