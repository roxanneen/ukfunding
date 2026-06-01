// Two deployment targets:
//   - default (BUILD_TARGET unset): dynamic build for Vercel / `next start`.
//                                   Server features (edge OG, headers via vercel.json) work.
//   - BUILD_TARGET=static: full static export. Produces `out/` for upload to any
//                          static host (S3, Cloudflare Pages, nginx, GitHub Pages, etc.).
//                          No Node server required at runtime.

const isStatic = process.env.BUILD_TARGET === 'static';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStatic && {
    output: 'export',
    images: { unoptimized: true },
    // Static hosts often don't rewrite extensionless URLs; trailing slash keeps links stable.
    trailingSlash: true,
  }),
};

export default nextConfig;
