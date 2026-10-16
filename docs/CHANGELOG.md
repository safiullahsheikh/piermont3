# Changelog

## Phase 1A - Foundation (2026-10-16)

**Synced with production first** (production is authoritative):
- Routes: `/solutions` and `/case-studies` index pages, `/case-studies/<category>/<slug>` case studies, live 404 page.
- 308 redirects: `/services`, `/projects`, `/work`, all 25 `/work/<slug>`.
- Titles, descriptions and canonicals match production on all 51 baseline URLs.

**Foundation:**
- Tokens (`app/styles/tokens.css`): colour, type scale, spacing, layout, z-index, focus and motion; reduced-motion overrides.
- Bodoni Moda display serif (small caps for labels), Figtree body.
- Shell (`app/styles/shell.css`): header with centred nav, active states, "Start a project" pill and a "Menu" dialog (native `<dialog>`: Escape, focus return, `aria-expanded`); footer with all production links and a dynamic copyright year; skip link; consent banner restyled.
- Motion module `app/motion/`: tokens, GSAP registration (ScrollTrigger, SplitText, CustomEase "buoyant"), device tiers, reduced motion, `<Reveal>`.
- `npm run audit` (axe WCAG 2.2 AA, console errors, `href="#"`, dead links, redirects, SEO vs production) and `npm run audit:lighthouse`.
- Removed the old header, menu and footer CSS (5,799 to 5,046 lines in `globals.css`).

**Known failures:** B11 (pre-existing contrast in old page bodies). Everything else in `npm run audit` passes.

## Phase 0 - Audit (2026-10-16)

- Added `docs/PHASE0_AUDIT.md`, `docs/BLOCKERS.md`, `docs/LICENCES.md`.
- Added `docs/baseline/` (production crawl: `pages.json`, raw HTML for 51 URLs, partial screenshots at 375/768/1440).
- No application code changed.
