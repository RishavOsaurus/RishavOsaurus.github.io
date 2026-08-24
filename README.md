# Rishav Chapagain, portfolio (static export)

    index.html     the page
    404.html       custom not-found page
    styles.css     design tokens + page rules
    app.js         project details toggle + CV dialog
    robots.txt     crawler policy, points at sitemap.xml
    sitemap.xml    the one indexable URL (this is a single-page site)
    CNAME          GitHub Pages custom domain (crishav.com.np)
    assets/        portrait.webp, rishav-chapagain-cv.pdf, favicon.svg/.ico,
                   apple-touch-icon.png, og-image.png (Open Graph/Twitter image)

No build step. Open `index.html`, or drop the folder on any static host
(GitHub Pages, Netlify, Cloudflare Pages).

## SEO

- Canonical URL, Open Graph and Twitter Card metadata, and JSON-LD
  (`Person`, `WebSite`, `ProfilePage`, project `SoftwareSourceCode` entries,
  the two published papers as `ScholarlyArticle`, and the FAQ section as
  `FAQPage`) live inline in `index.html`'s `<head>`.
- `assets/og-image.png` and the favicon set were generated from the real
  portrait photo and brand colors with `Pillow`. Regenerate them the same
  way if the portrait or copy changes; there's no build step wired up for it.
- `robots.txt` / `sitemap.xml` assume the canonical host is
  `https://crishav.com.np/`. Update both if the domain ever changes.

Fonts load from Google Fonts (Archivo Black, Archivo, JetBrains Mono). To go
fully offline, download the woff2 files into `assets/fonts/` and replace the
`@import` at the top of `styles.css` with local `@font-face` rules.
