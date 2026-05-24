# SPA SEO Patterns for Motorsport Portfolio

Extended implementation guides referenced by `seo-spa-motorsport` skill.

---

## react-helmet-async Setup

Install: `npm install react-helmet-async`

```jsx
// src/index.js
import { HelmetProvider } from 'react-helmet-async';

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
```

### Per-route Helmet pattern

```jsx
// src/pages/EnPista.js
import { Helmet } from 'react-helmet-async';

export default function EnPista() {
  return (
    <>
      <Helmet>
        <title>En Pista | Alan Ampudia · #1</title>
        <meta name="description" content="Alan Ampudia en acción: Baja 1000, Baja 500, San Felipe 250. Fotos y videos del Trophy Truck #1 en competencia." />
        <link rel="canonical" href="https://alanampudia.com/en-pista" />

        {/* Open Graph */}
        <meta property="og:title" content="Alan Ampudia en Pista · Trophy Truck #1" />
        <meta property="og:description" content="Fotos y videos del campeón mundial en acción. Baja 1000, Baja 500 y más." />
        <meta property="og:image" content="https://alanampudia.com/images/og-en-pista.jpg" />
        <meta property="og:url" content="https://alanampudia.com/en-pista" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alan Ampudia en Pista · Trophy Truck #1" />
        <meta name="twitter:description" content="Fotos y videos del campeón mundial en acción." />
        <meta name="twitter:image" content="https://alanampudia.com/images/og-en-pista.jpg" />
      </Helmet>
      {/* page content */}
    </>
  );
}
```

### Shell defaults in index.html

Keep `public/index.html` meta tags as crawler fallbacks only. Helmets override them at runtime:

```html
<html lang="es-MX">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Alan Ampudia · #1 · Campeón Mundial Off-Road</title>
  <meta name="description" content="Sitio oficial de Alan Ampudia. SCORE Trophy Truck #1. Campeón Mundial 2024. El Rey Mexicano del Off-Road." />
  <link rel="canonical" href="https://alanampudia.com" />
</head>
```

---

## Prerendering with react-snap

react-snap is the recommended prerendering tool for CRA 5. It crawls the SPA post-build and generates static HTML snapshots for each route.

### Setup

```bash
npm install --save-dev react-snap
```

```json
// package.json
{
  "scripts": {
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "source": "build",
    "include": ["/", "/en-pista", "/fuera-de-pista", "/calendario", "/equipo", "/tienda"],
    "minifyHtml": { "collapseWhitespace": true },
    "puppeteerArgs": ["--no-sandbox", "--disable-setuid-sandbox"]
  }
}
```

### Important react-snap gotchas

- Routes that depend on async data fetches may render empty. Use `navigator.userAgent` detection or a `data-react-snap` attribute to show loading state vs. final state.
- The app must use `ReactDOM.hydrateRoot` instead of `createRoot` if react-snap generates pre-rendered HTML that needs hydration. With CRA 5 default `index.js`, this is handled automatically when `root` div already has children.
- Meta tags set via Helmet on the server side ARE captured in static snapshots, which means crawlers see them.

### prerender-spa-plugin alternative

If react-snap fails (Webpack 5 compatibility issues), use `prerender-spa-plugin` with a custom Webpack config. Requires `react-app-rewired` or ejecting. Generally NOT recommended for CRA 5 — prefer react-snap.

### When to migrate to SSR

If prerendering produces inconsistent results, or if the site adds authenticated/dynamic routes, migrate to Next.js or Remix rather than stacking more CRA plugins. Decision trigger: more than 3 routes need async data AND prerendering fails.

---

## Core Web Vitals for Image-Heavy SPA

Motorsport portfolios are image-heavy. Key optimizations:

### LCP (Largest Contentful Paint)

- Preload the hero image: `<link rel="preload" as="image" href="/images/hero.webp">` in `index.html` OR via Helmet on the homepage.
- Use WebP/AVIF with `<picture>` fallbacks.
- Serve images from CDN or optimized static hosting.
- Keep hero image under 2.5s LCP target.

### CLS (Cumulative Layout Shift)

- Always set explicit `width` and `height` on `<img>` tags.
- Use `aspect-ratio` CSS for containers.
- Reserve space for dynamically loaded content (skeleton placeholders).
- Font-display: swap on custom fonts to prevent FOIT layout jumps.

### INP (Interaction to Next Paint) — FID replacement

- Defer non-critical JS: use `React.lazy` + `<Suspense>` for below-fold routes.
- Avoid long tasks on the main thread: offload image processing, avoid synchronous layout reads.
- Use `loading="lazy"` on below-fold images.

---

## hreflang for es-MX

Since the site targets Spanish-speaking audiences in Mexico:

```html
<!-- In public/index.html shell AND per-route via Helmet -->
<link rel="alternate" hreflang="es-MX" href="https://alanampudia.com/" />
<link rel="alternate" hreflang="es" href="https://alanampudia.com/" />
<link rel="alternate" hreflang="x-default" href="https://alanampudia.com/" />
```

For multi-language in the future:
```html
<link rel="alternate" hreflang="es-MX" href="https://alanampudia.com/" />
<link rel="alternate" hreflang="en" href="https://alanampudia.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://alanampudia.com/" />
```

Also register geographic target in Google Search Console: set targeting to Mexico.

---

## SPA Sitemap Generation

Generate `public/sitemap.xml` statically — CRA doesn't auto-generate it. Example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://alanampudia.com/</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://alanampudia.com/en-pista</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="es-MX" href="https://alanampudia.com/en-pista" />
  </url>
  <url>
    <loc>https://alanampudia.com/fuera-de-pista</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="es-MX" href="https://alanampudia.com/fuera-de-pista" />
  </url>
  <url>
    <loc>https://alanampudia.com/calendario</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="es-MX" href="https://alanampudia.com/calendario" />
  </url>
  <url>
    <loc>https://alanampudia.com/equipo</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="es-MX" href="https://alanampudia.com/equipo" />
  </url>
  <url>
    <loc>https://alanampudia.com/tienda</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="es-MX" href="https://alanampudia.com/tienda" />
  </url>
</urlset>
```
