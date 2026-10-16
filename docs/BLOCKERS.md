# Blockers

| # | Blocker | Phase hit | Impact | Fallback | Status |
|---|---|---|---|---|---|
| B0 | This repo was an older version than production | All | Resolved: routes, redirects, metadata and 404 synced to the production baseline (`npm run audit` checks all 51 URLs) | | Resolved |
| B9 | This laptop (i7-8650U, Intel UHD 620, 8 GB RAM) cannot path-trace renders in useful time | 1B | Local Cycles rendering impractical | Cloud GPU rental, SheepIt farm, licensed footage, AI video | Open |
| B1 | Blender not installed; no Blender MCP | 1B | No renders, GLBs or posters can be produced in-session | Scripts + exact commands in `assets-src/blender/`, run by you (brief path 3) | Open |
| B2 | A realistic rigged diver cannot be scripted credibly | 1B | Resolved: you chose a scroll-driven footage route; you supplied the footage on 2026-10-16 | | Resolved |
| B3 | Spline has no authoring API or MCP here | 1B, 6 | Resolved: you chose code alternatives (SVG/WebGL with static fallbacks) | | Resolved |
| B4 | `docs/reference/homepage-v1.png` missing | 1C, 1D | No approved composition reference | Follow the written spec in brief 3.4 | Open |
| B5 | No privacy policy page | 6 (form notice), 7 | Brief 6.3 notice cannot link a policy | Notice without link, flagged as incomplete | Open |
| B6 | Preview deploys need `wrangler login` on your Cloudflare account | Every gate | No hosted preview URL | Local run command per gate | Open |
| B7 | Content provenance (projects, logos, testimonials, stats) | 1D, 3, 4 | Resolved: you confirmed the projects are real | | Resolved |
| B8 | Raster-only logo | 1A, 1C | Signature-draw loader needs a vector path | Trace with approval; static fade-in loader until then | Open |

## Found in Phase 1A

| ID | Issue | Phase | Impact | Plan | Status |
|---|---|---|---|---|---|
| B10 | Page bodies of home, about, contact, process and testimonials still differ from production (copy, form fields, budgets) | 1D, 4, 6 | Local bodies are older than live | Rebuild each from `docs/baseline/html` in its phase | Open |
| B11 | Pre-existing colour-contrast failures in the old page bodies (eyebrows, process steps, contact submit), unchanged from `main` | 1D, 2 to 6 | `npm run audit` reports them | Fixed as each body is rebuilt on the new tokens | Open |
| B12 | No analytics or non-essential scripts exist, locally or live | 1A | Consent gating has nothing to gate yet | `hasCookieConsent()` gate kept; any analytics added later must check it | Noted |
| B13 | Palette: brief section 3.2 (navy, cobalt) used over the general ash-grey preference | All | Colour direction | Say "ash grey" to switch; tokens live in `app/styles/tokens.css` | Assumption |
| B14 | Footage source URLs and licences not recorded | 1C | Licence must be verifiable | Add the page URL for each clip to `docs/LICENCES.md` | Open |

