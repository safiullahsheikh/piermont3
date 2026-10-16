# Blockers

| # | Blocker | Phase hit | Impact | Fallback | Status |
|---|---|---|---|---|---|
| B0 | This repo was an older version than production | All | Resolved: routes, redirects, metadata and 404 synced to the production baseline (`npm run audit` checks all 51 URLs) | | Resolved |
| B9 | This laptop (i7-8650U, Intel UHD 620, 8 GB RAM) cannot path-trace renders in useful time | 1B | Local Cycles rendering impractical | Cloud GPU rental, SheepIt farm, licensed footage, AI video | Open |
| B1 | Blender not installed; no Blender MCP | 1B | No renders, GLBs or posters can be produced in-session | Scripts + exact commands in `assets-src/blender/`, run by you (brief path 3) | Open |
| B2 | A realistic rigged diver cannot be scripted credibly | 1B | Resolved: you chose a scroll-driven footage route; you supplied the footage on 2026-10-16 | | Resolved |
| B3 | Spline has no authoring API or MCP here | 1B, 6 | Resolved: you chose code alternatives (SVG/WebGL with static fallbacks) | | Resolved |
| B4 | `docs/reference/homepage-v1.png` missing | 1C, 1D | No approved composition reference | Follow the written spec in brief 3.4 | Open |
| B5 | Privacy policy and terms are drafts | 1D, 7 | Written only from what the site does (form fields, Cloudflare, Turnstile, Resend, consent storage); not legal advice | Your legal review before launch | Open |
| B6 | Preview deploys need `wrangler login` on your Cloudflare account | Every gate | No hosted preview URL | Local run command per gate | Open |
| B7 | Content provenance (projects, logos, testimonials, stats) | 1D, 3, 4 | Resolved: you confirmed the projects are real | | Resolved |
| B8 | Raster-only logo | 1A, 1C | Signature-draw loader needs a vector path | Trace with approval; static fade-in loader until then | Open |

## Found in Phase 1A

| ID | Issue | Phase | Impact | Plan | Status |
|---|---|---|---|---|---|
| B10 | Page bodies of home, about, contact, process and testimonials still differ from production (copy, form fields, budgets) | 1D, 4, 6 | Local bodies are older than live | Rebuild each from `docs/baseline/html` in its phase | Open |
| B11 | Pre-existing colour-contrast failures in the old page bodies (eyebrows, process steps, contact submit), unchanged from `main` | 1D, 2 to 6 | `npm run audit` reports them | Fixed as each body is rebuilt on the new tokens | Open |
| B12 | Analytics needs your Google Analytics 4 measurement ID | 1D | Nothing is measured until it is set | Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the build environment; loads only after Accept | Open |
| B13 | Palette: brief section 3.2 (navy, cobalt) used over the general ash-grey preference | All | Colour direction | Say "ash grey" to switch; tokens live in `app/styles/tokens.css` | Assumption |
| B14 | Footage and photo source URLs and licences not recorded | 1C, 1D | Licence must be verifiable | Add the page URL for each clip and photo to `docs/LICENCES.md` | Open |

## Found in Phase 1C/1D

| ID | Issue | Phase | Impact | Workaround | Status |
|---|---|---|---|---|---|
| B15 | Loader differs from brief 4.2: the raster logo is revealed with a wipe, not drawn as a vector stroke; the sequence runs about 5 s because of the five welcome words | 1C | Brief deviation | Vector trace on approval (B8); words were your instruction | Noted |
| B16 | Loader progress is time-based (CSS), not tied to asset loading; there is no percentage | 1C | Brief 4.2 asks progress to reflect real loading | The page never waits on it; skip and 6.5 s timeout | Noted |
| B17 | Contact form keys not set locally (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`) | 1D, 6 | Form cannot send locally, so the thank-you redirect is untested end to end | Assumed set in Cloudflare for production; confirm | Open |
| B18 | DriftWall and Option Wheel sources on 21st.dev need an API key | 1D | Built from their documented behaviour instead | A 21st.dev API key lets the originals be compared | Noted |
