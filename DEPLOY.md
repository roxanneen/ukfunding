# Deploy

Two supported paths. Pick one — both produce a working site.

## Path A — Vercel (recommended if you have a Vercel account)

Native Next.js host. Edge OG image, automatic HTTPS, preview deploys per PR.

1. Push the repo to GitHub.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework auto-detects as Next.js. No env vars needed.
4. First deploy uses `npm run build`. `vercel.json` adds security + cache headers.
5. **Custom domain**: Vercel dashboard → Project → Settings → Domains → add `ukfunding.io`. Vercel issues a certificate automatically.

DNS records to point at Vercel:
```
A     @       76.76.21.21
CNAME www     cname.vercel-dns.com
```

That's it.

## Path B — Static export (any host, no Node runtime)

For uploading to S3, Cloudflare Pages, GitHub Pages, Netlify static, your own nginx, or anywhere that serves files.

```bash
npm run build:static
```

Produces `out/` with `index.html`, `_next/static/…`, `robots.txt`, `sitemap.xml`, favicons, and the OG image. No Node server at runtime.

To preview the static build locally:
```bash
npm run serve:static
# → http://localhost:3000
```

### Upload targets

**Cloudflare Pages** (easiest)
1. Cloudflare dashboard → Pages → Create → Connect to Git.
2. Build command: `npm run build:static`. Output directory: `out`.
3. Add custom domain in the Pages project settings.

**S3 + CloudFront**
```bash
aws s3 sync ./out s3://ukfunding-io --delete \
  --cache-control "public, max-age=3600"
aws s3 cp ./out/_next s3://ukfunding-io/_next --recursive \
  --cache-control "public, max-age=31536000, immutable"
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

**Netlify (drop-in)**
Drag `out/` into Netlify's deploy UI, or:
```bash
npx netlify deploy --dir=out --prod
```

**GitHub Pages**
```bash
npm run build:static
touch out/.nojekyll
# push out/ to gh-pages branch via your favourite action
```

**Self-hosted nginx**
See [`nginx.conf.example`](./nginx.conf.example). Copy `out/` to `/var/www/ukfunding-io/`, point nginx at it, terminate TLS with Caddy/Certbot.

### Security headers on static hosts

Since `next.config` headers don't apply to static export, configure these at the host:

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Cache-Control` for `/_next/static/*` | `public, max-age=31536000, immutable` |

Cloudflare Pages: add via `_headers` file in the output (see below).
nginx: see `nginx.conf.example`.

### Cloudflare Pages `_headers` (optional)

Create `public/_headers` before building:

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
```

## Verifying the deploy

After it's live, sanity-check:
- `/robots.txt` returns the right rules.
- `/sitemap.xml` lists the site.
- `/icon.svg` and `/apple-icon.svg` resolve.
- `/opengraph-image` returns a 1200×630 PNG (or `.png` extension on static export).
- Lighthouse score in Chrome DevTools — should be 95+ across all categories on a cold load.
