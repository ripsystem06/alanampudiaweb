---
name: seo-spa-motorsport
description: "Trigger: SPA SEO, prerendering CRA, React Helmet, OG meta, motorsport Schema.org, es-MX SEO, Core Web Vitals SPA. Optimize CRA 5 + React 19 motorsport athlete SPA for search engines with per-route meta tags, JSON-LD, and prerendering."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Activate when optimizing a CRA 5 + React 19 + React Router 7 SPA motorsport athlete portfolio for search engines. Also activate when asked about SPA SEO, per-route meta tags, structured data for athletes/motorsport, prerendering a React SPA, OG/Twitter social cards, or es-MX international SEO.

Do NOT activate for generic SEO fundamentals — the existing `seo` skill covers technical SEO, on-page optimization, and generic structured data (Organization, Article, Product, FAQ, BreadcrumbList). This skill extends that coverage for SPA-specific, motorsport-domain, and international concerns.

## Hard Rules

- Never duplicate coverage from the `seo` skill — inherit its technical SEO and on-page rules.
- Always install `react-helmet-async` (NOT `react-helmet`) for React 19 compatibility.
- Always wrap the app root in `<HelmetProvider>` before any `<Helmet>` usage.
- Keep `public/index.html` meta tags as shell fallbacks only — per-route tags go through Helmet.
- Always use JSON-LD `<script>` blocks for structured data — never microdata or RDFa.
- Serve `robots.txt`, `sitemap.xml`, and static assets from `public/`.
- Set `<html lang="es-MX">` as the canonical language.

## Decision Gates

| Scenario | Action |
|----------|--------|
| Per-route meta tags needed | Use `<Helmet>` per page component. See `references/spa-seo-patterns.md`. |
| SPA needs search engine visibility | Install and configure `react-snap` postbuild. See `references/spa-seo-patterns.md`. |
| react-snap fails with Webpack 5 | Migrate to SSR (Next.js/Remix) rather than stacking CRA plugins. |
| Athlete/motorsport structured data | Use templates from `assets/jsonld-templates.json`. |
| Social sharing previews | Add OG + Twitter Card meta via Helmet per route. |
| Spanish/Mexico targeting | Set `lang="es-MX"`, add self-referencing hreflang, register MX geographic target in Search Console. |
| Image-heavy page LCP/CLS issues | Follow Core Web Vitals guide in `references/spa-seo-patterns.md`. |

## Execution Steps

1. Install `react-helmet-async`. Optionally install `react-snap` for prerendering.
2. Wrap root in `<HelmetProvider>` in `src/index.js`.
3. Add per-route `<Helmet>` with `<title>`, `<meta name="description">`, `<link rel="canonical">`, `og:*`, `twitter:*`.
4. Generate `robots.txt` with sitemap reference and `public/sitemap.xml` listing all routes with hreflang annotations.
5. Insert route-appropriate JSON-LD from `assets/jsonld-templates.json`: Person/Athlete on home, SportsTeam on equipo, SportsEvent on calendario, WebSite site-wide.
6. Set `<html lang="es-MX">` and add self-referencing hreflang.
7. If prerendering: configure `reactSnap` in `package.json`, add postbuild script, verify HTML in `build/`.
8. Register in Google Search Console, submit sitemap, set MX geographic target.
9. Validate with Lighthouse SEO, PageSpeed Insights, and Rich Results Test.

## Output Contract

When this skill activates, produce:
- Per-route Helmet configuration: title, description, canonical, OG, Twitter Card
- Complete `robots.txt` with sitemap reference
- Complete `sitemap.xml` covering all routes with hreflang
- Route-appropriate JSON-LD from the assets template
- If prerendering requested: `reactSnap` config in `package.json` + postbuild script
- Self-referencing hreflang tag

## References

- `references/spa-seo-patterns.md` — react-helmet-async setup, react-snap configuration, Core Web Vitals for SPAs, sitemap template
- `assets/jsonld-templates.json` — Schema.org templates for Person, Athlete, SportsTeam, SportsEvent, WebSite, BreadcrumbList
