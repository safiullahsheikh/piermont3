# Blockers

| # | Blocker | Phase hit | Impact | Fallback | Status |
|---|---|---|---|---|---|
| B0 | This repo is an older version than production (routes, redirects, 404 differ) | All | Redesign would start from stale code and break live URLs | None; production source needed | Open, stop |
| B9 | This laptop (i7-8650U, Intel UHD 620, 8 GB RAM) cannot path-trace renders in useful time | 1B | Local Cycles rendering impractical | Cloud GPU rental, SheepIt farm, licensed footage, AI video | Open |
| B1 | Blender not installed; no Blender MCP | 1B | No renders, GLBs or posters can be produced in-session | Scripts + exact commands in `assets-src/blender/`, run by you (brief path 3) | Open |
| B2 | A realistic rigged diver cannot be scripted credibly | 1B | Diver asset needs a licensed or commissioned model | None acceptable (placeholder geometry as final is prohibited) | Open, needs decision |
| B3 | Spline has no authoring API or MCP here; plan unknown | 1B, 6 | Scenes must be built by a person in the editor; watermark needs Hobby+, code export Pro+, self-hosted export Enterprise | Build the five interactive elements in R3F/SVG instead, if approved | Open, needs decision |
| B4 | `docs/reference/homepage-v1.png` missing | 1C, 1D | No approved composition reference | Follow the written spec in brief 3.4 | Open |
| B5 | No privacy policy page | 6 (form notice), 7 | Brief 6.3 notice cannot link a policy | Notice without link, flagged as incomplete | Open |
| B6 | Preview deploys need `wrangler login` on your Cloudflare account | Every gate | No hosted preview URL | Local run command per gate | Open |
| B7 | Content provenance unverified (projects, logos, testimonials, stats) | 1D, 3, 4 | Cannot confirm these are not template or concept content | Keep as-is pending answer; nothing new added | Open |
| B8 | Raster-only logo | 1A, 1C | Signature-draw loader needs a vector path | Trace with approval; static fade-in loader until then | Open |
