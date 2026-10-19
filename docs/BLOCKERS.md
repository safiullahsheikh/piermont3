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

## Found in Phase 2

| ID | Issue | Phase | Impact | Workaround | Status |
|---|---|---|---|---|---|
| B19 | Brief asks for a Spline icon per service | 2 | Spline has no authoring API (B3) | Each page uses production's own hero visual, rebuilt live with the 21st.dev Tilt and Spotlight | Noted |
| B20 | Brief asks for a Blender-rendered hero still in each service's lighting | 2 | No Blender here (B1) | CSS light shafts in each solution's colour; a still can drop in behind them later | Open |
| B21 | Brief allows FAQs only if they add information | 2 | None exist in the content | No FAQ sections; add when you supply real questions | Noted |
| B22 | Home option wheel options fade below 4.5:1 by design (fade 0.25) | 1D, 7 | Accessibility | Weighed against contrast in Phase 7 (the ring target size part was fixed in Phase 3) | Open |

## Found in Phase 3

| ID | Issue | Phase | Impact | Workaround | Status |
|---|---|---|---|---|---|
| B23 | Brief asks for the dome in Blender geometry on the R3F runtime with keyboard navigation | 3 | You chose the React Bits DomeGallery (CSS 3D) | Dome is pointer and touch only; the filtered grid is the keyboard and screen reader path to every project | Noted |
| B24 | No case study publishes measured results (traffic, conversion, revenue) | 3 | Outcomes are qualitative, as on production | Shown as written; no figures estimated. Add real numbers to `app/work/projects.ts` if you have them | Open |
| B25 | Blender device-mockup renders of the screenshots | 3 | No Blender here (B1) | Screenshots and videos shown at their own shape in a rounded frame | Open |
| B26 | Home projects carousel is WebGL (FlexCarousel), so its cards cannot morph into case studies | 3 | Brief asks for a shared-element transition from the coverflow | Morph runs from the grid, solution pages and category ring; the home low-power grid morphs too | Noted |
