# Green Channels — website prototype

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lenis · three.js / React Three Fiber.
Prepared by Taqwa Tech as the coded concept for the Green Channels design challenge.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## What is in it

| Route | Purpose |
|---|---|
| `/` | Homepage: WebGL fabric hero, garment grid, pinned "concept to shipment" rail, seven-stage quality sequence, partner network with verification cards, tech-pack CTA |
| `/workwear-uniforms` | The nine confirmed garments, one technical flat and construction notes each |
| `/capabilities` | The service span, plus Fashion & casualwear and Home textiles as secondary capabilities |
| `/quality` | The seven QC stages and how testing is coordinated (not claimed) |
| `/about` | How Green Channels works, responsible sourcing, team placeholders, contact |
| `/start-a-project` | RFQ form with tech-pack upload, validation and spam protection |
| `/privacy`, `/terms` | Draft legal pages |
| `/api/rfq` | Validates fields and files, returns a reference (nothing is stored or emailed yet) |
| `/sitemap.xml`, `/robots.txt` | Technical SEO (AI-search crawlers explicitly allowed) |

## Where things live

- `src/lib/content.ts` — **all copy and data** (this is what the CMS would manage). Items marked *indicative* are illustrative wording to be confirmed by Green Channels.
- `src/app/globals.css` — design tokens (colours, type, texture).
- `src/components/FabricCanvas.tsx` — the WebGL hero (a single shader: twill weave, seam, cursor light). Lazy-loaded, paused off-screen, static for reduced-motion users.
- `src/components/GarmentFlat.tsx` — the hand-drawn technical garment flats.

## Rules the content follows

Taken from the client's own answers: no sector specialisation, no PPE/conformity claims, no factory-count or capacity numbers, and certifications are shown only as held by partner factories, never as Green Channels' own. Partner units on the site are **illustrative, not real data**.

## Before launch

- Replace placeholder drawings with real photography (see the photo/video recommendation).
- Confirm every *indicative* line with Green Channels; add the real team, logo file and legal text.
- Connect `/api/rfq` to email delivery and the CMS/database, with rate limiting.
- Move `content.ts` into the chosen headless CMS (Payload / Sanity / Strapi).
- Run Lighthouse on real devices and set the committed performance targets.
