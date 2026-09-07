# Forex Blog — Next.js + Tailwind + MDX

## Setup

```bash
npm install
npm run dev
```

Content lives in `content/posts/*.mdx`. Each post needs frontmatter:

```yaml
---
title: "..."
description: "..."
date: "YYYY-MM-DD"
tags: ["..."]
pair: "EUR/USD"   # optional, powers related-post matching
---
```

## Before going live — checklist

1. **Domain & metadata**: update `SITE.url` and `SITE.name` in `lib/seo.ts`.
2. **Google Search Console**:
   - Add your property (domain or URL-prefix) in GSC.
   - Use the "HTML tag" verification method, copy the `content` value, and paste it into the `verification.google` field in `app/layout.tsx`.
   - After deploying, submit `https://yourdomain.com/sitemap.xml` in GSC → Sitemaps.
3. **Google Analytics**: create a GA4 property, copy the Measurement ID (`G-XXXXXXX`), and set it as `NEXT_PUBLIC_GA_ID` in your Vercel project's environment variables.
4. **Open Graph image**: replace `/public/og-default.png` with a real 1200×630 image, or add a dynamic `opengraph-image.tsx` per route.
5. **Deploy to Vercel**: `vercel --prod`, or connect the GitHub repo in the Vercel dashboard for auto-deploys.

## Adding a post

Drop a new `.mdx` file in `content/posts/`. It's picked up automatically by the blog index, sitemap, and related-posts logic — no other code changes needed.

## Diagrams

`scripts/gen-charts.mjs` generates the branded candlestick/structure diagrams in `public/images/` (and the default OG card at `public/og-default.png`) as SVG, matching the site's ink/paper/gold palette. Run `node scripts/gen-charts.mjs` then convert to PNG (e.g. with `cairosvg` or any SVG-to-PNG tool) if you want to regenerate or add new ones — PNG is used instead of SVG for broader Open Graph/social-preview compatibility.
