# Viddix AI — Marketing Website

Commercial website for Viddix AI (viddix.ai). Built with React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui.

---

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:8080
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run lint       # ESLint
npm run test       # Vitest (single pass)
npm run test:watch # Vitest (watch mode)
```

---

## Project structure

```
src/
  App.tsx                        # Routes + provider tree
  pages/
    Index.tsx                    # Home (hero + sections)
    ServicesPage.tsx
    AIAgentsPage.tsx
    CaseStudiesPage.tsx
    CaseStudyDetail.tsx          # /case-studies/:slug
    PricingPage.tsx
    AboutPage.tsx
    BookCallPage.tsx             # /book — strategy call form
    PrivacyPage.tsx
    TermsPage.tsx
    NotFound.tsx                 # 404
  components/
    Navbar.tsx                   # with theme + language toggles
    Footer.tsx
    Hero.tsx
    Services.tsx
    AIAgents.tsx
    Proof.tsx
    Pricing.tsx
    About.tsx
    CTA.tsx
    LogoVideo.tsx                # theme-aware logo player
    CookieBanner.tsx
    ui/                          # shadcn/ui primitives
  contexts/
    ThemeContext.tsx              # dark/light, persisted to localStorage
    LanguageContext.tsx           # EN/ES, persisted to localStorage
  lib/
    translations.ts              # full EN + ES dictionary
    caseStudies.ts               # case study data (title, slug, tags, content)
    utils.ts
  hooks/
public/
  logo.mp4                       # logo video — served as URL, NOT bundled
  logo.webm
  _redirects                     # Netlify SPA fallback (not used on Vercel)
  robots.txt
  favicon.ico
vercel.json                      # SPA rewrites for Vercel
vite.config.ts                   # build config with manual chunks
```

---

## Editing content

### Copy and translations

All user-facing strings live in **`src/lib/translations.ts`**. Both `en` and `es` objects must stay in sync — TypeScript enforces structural parity via `as typeof en`.

To add a new string:
1. Add it to the `en` object at the right path (e.g. `en.nav.newLink`).
2. Add the Spanish equivalent at the same path in `es`.
3. Use it in any component: `const { t } = useT(); t.nav.newLink`.

### Case studies

Edit **`src/lib/caseStudies.ts`**. Each entry has:

```ts
{
  slug: "unique-url-slug",
  title: "...",
  sector: "...",         // one of the 7 sector tags
  tags: ["..."],
  summary: "...",
  challenge: "...",
  approach: "...",
  outcome: "...",
  stack: ["..."],
  result: { value: "3×", label: "..." },
}
```

The case studies grid at `/case-studies` and the detail page at `/case-studies/:slug` are driven entirely by this file.

### Services

Services copy lives in `translations.ts` under `t.services.items` (array of `{ title, desc, detail }`). Icons are mapped by index in `src/components/Services.tsx`.

### Pricing budgets / FAQs

Edit `t.pricing.budgets`, `t.pricing.timelines`, and `t.pricing.faqs` in `translations.ts`.

### Logo video

The logo is `public/logo.mp4` (and `public/logo.webm`). Drop a new file there — no rebuild needed. In light mode the video is inverted via CSS (`filter: invert(1)`) so a dark-background logo works on both themes.

---

## Analytics

The site has no analytics wired up yet. To add:

**Option A — Vercel Analytics (easiest)**
1. Enable it in the Vercel project dashboard → Analytics tab.
2. `npm install @vercel/analytics`
3. In `src/main.tsx`, add `<Analytics />` from `@vercel/analytics/react` inside `<App />`.

**Option B — Google Analytics 4**
1. Create a GA4 property at analytics.google.com and get the Measurement ID (`G-XXXXXXX`).
2. Paste the gtag snippet into `index.html` before `</head>`.
3. Add the domain to the GA4 property's data stream.

---

## Deploy guide (Vercel)

### First deploy

1. Push this repo to GitHub.
2. Go to vercel.com → Add New Project → import the repo.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build` | Output directory: `dist`.
5. Click Deploy.

`vercel.json` handles SPA routing — all paths rewrite to `index.html`.

### Custom domain

1. In the Vercel project → Settings → Domains → add `viddix.ai` and `www.viddix.ai`.
2. At your DNS provider, add:
   - `A` record for `@` → `76.76.21.21` (Vercel's IP)
   - `CNAME` record for `www` → `cname.vercel-dns.com`
3. Vercel provisions TLS automatically.

### Google Search Console

1. Go to search.google.com/search-console → Add property → Domain type → enter `viddix.ai`.
2. Verify via DNS TXT record (your registrar's DNS panel).
3. Submit `https://viddix.ai/sitemap.xml` once you create it (see below).

### sitemap.xml

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://viddix.ai/</loc><priority>1.0</priority></url>
  <url><loc>https://viddix.ai/services</loc><priority>0.8</priority></url>
  <url><loc>https://viddix.ai/ai-agents</loc><priority>0.8</priority></url>
  <url><loc>https://viddix.ai/case-studies</loc><priority>0.8</priority></url>
  <url><loc>https://viddix.ai/pricing</loc><priority>0.7</priority></url>
  <url><loc>https://viddix.ai/about</loc><priority>0.6</priority></url>
  <url><loc>https://viddix.ai/book</loc><priority>0.9</priority></url>
  <!-- add /case-studies/:slug entries here -->
</urlset>
```

---

## Pre-deploy checklist

- [ ] `npm run build` exits with zero errors and zero warnings
- [ ] `public/logo.mp4` and `public/logo.webm` are present
- [ ] `public/favicon.ico` and `public/favicon.png` are final assets
- [ ] `public/robots.txt` has the correct `Sitemap:` URL
- [ ] All contact links point to `viddixai@gmail.com` (search for `viddixai@`)
- [ ] Both EN and ES translations are complete in `translations.ts`
- [ ] Case study slugs in `caseStudies.ts` are URL-safe (lowercase, hyphens only)
- [ ] Analytics snippet added to `index.html` (or Vercel Analytics enabled)
- [ ] `sitemap.xml` created and added to Search Console
- [ ] Custom domain verified and HTTPS confirmed in browser

---

## Improvements (prioritized)

1. **Real form backend** — replace the `mailto:` form in `BookCallPage` and `Pricing` with Resend or Formspree. One API call on submit; no user dependency on their mail client opening.
2. **Custom email domain** — move from `viddixai@gmail.com` to `hello@viddix.ai` (Resend or Cloudflare Email Routing; free tier covers low volume).
3. **sitemap.xml** — create `public/sitemap.xml` with all routes including case study slugs; submit to Google Search Console.
4. **OG / social meta** — add `<meta property="og:*">` and `<meta name="twitter:*">` tags per page in `index.html` (or via react-helmet-async for per-route tags).
5. **Legal translations** — `TermsPage` and `PrivacyPage` body text is English-only; add ES versions to `translations.ts` and conditionally render them.
6. **Structured data** — add JSON-LD `Organization` schema in `index.html` for Google's knowledge panel.
7. **Lazy-load hls.js** — dynamic `import('hls.js')` inside the Hero component's `useEffect` to reduce initial JS parse time (hls.js = 162 kB gzipped).
8. **Case study images** — add a hero image or video per case study in `caseStudies.ts` for richer detail pages.
9. **Blog / Insights** — add a `/blog` route with MDX-based posts for SEO content marketing.
10. **Cookie consent integration** — wire the banner's accept/decline to actually block/allow GA4 (`gtag('consent', 'update', ...)`) for GDPR compliance.
