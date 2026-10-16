# Changelog

## Phase 1C/1D (part 2) - Flowing menu, gallery pieces and launch checklist (2026-10-16)

Built on your instructions of 2026-10-16 (flowing menu, dome gallery, ripple logo, accordion, drift wall, option wheel, ghost cursor, your photos, launch checklist).

- Navigation moved to a bar fixed at the bottom of the screen. The menu rises from it and is a React Bits FlowingMenu: eight rows, each with its own photo in the marquee, the current page marked. On phones the bar keeps the logo, "Start a project" and Menu (the sticky mobile CTA); the sound switch moves into the menu's bar.
- Home projects: a large accordion of 10 of the 25 projects over the diver footage (wide panels on desktop, stacked on phones). Hover, focus or tap opens a panel.
- Home services: a 3D option wheel of the six services, turned by scroll (1024 px and up, full motion). Arrow keys, Home, End and click work too. Elsewhere, the glass panels.
- Brands: a drift wall of the client logos in three lanes, named for screen readers, slowing on hover. Static grid for reduced motion.
- Ghost cursor (React Bits) on the home page for mouse users with full motion.
- Loader logo ripples into place (SVG turbulence filter).
- `/case-studies`: a dome gallery (React Bits) of all 25 projects, drag to look around. Skipped on the low tier.
- Your three photos (pier lamps, pier at dusk, freediver) used in the menu.
- New pages: `/privacy`, `/terms` (drafts, see B5), `/thank-you` (noindex; the contact form goes there after a successful send). Footer links to privacy and terms; the cookie banner links to privacy.
- Google Analytics 4, loaded only after Accept, only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (B12).
- Web app manifest, route loading state, `:user-invalid` styling for form fields.

**Verified:** build (62 pages), lint (0 errors; 1 pre-existing warning), type-check; screenshots at 375, 768 and 1440; wheel turns with scroll; menu opens with eight rows; dome renders; no console errors.

**Known failures:** B11 only.

## Phase 1C/1D (part 1) - Footage homepage, loader and sea sound (2026-10-16)

Built on your instruction of 2026-10-16 (your footage, mapped clip by clip). Phase 1B (Blender) is replaced by this footage route.

- Loader (`app/components/Loader.tsx`): pier footage, logo writes in, "welcome" in Spanish, English, Arabic, French and Chinese, then a ripple opens onto the page. Once per session; skipped for reduced motion; click, tap, Escape or any letter key skips it; 6.5 s safety timeout. Tab, Enter and Space do not skip, so keyboard users can reach the sound switch.
- Sound switch on the loader and in the header (`app/components/SoundToggle.tsx`, `aria-pressed`). Sea waves are synthesised with Web Audio (`app/sound/waves.ts`): no audio file, nothing loads until the switch is pressed, suspended when the tab is hidden.
- Footage chapters (`app/components/Footage.tsx`): poster first (all that low tier and reduced motion get), video streamed after first paint. Hero: water loop. Projects: diver, scrubbed to scroll. Services: coral reef, scrubbed. Contact: bubbles, scrubbed.
- Projects: 10 projects in a pinned 3D corridor over the diver (768 px and up), a plain grid otherwise.
- Services: six glass panels that tilt up out of the water, then the five solutions.
- Testimonials and stories recoloured for the dark descent (production markup and wording unchanged).
- Depth gauge on the right edge (1024 px and up, decorative).
- `scripts/encode-footage.sh` encodes `assets/` (gitignored 4K sources) to `public/footage/` (720p, 1600x900 hero; portrait crops). Hero 5.5 MB desktop and 2.3 MB mobile, inside the 6 MB and 3 MB budgets.
- `npm run check`: runnable check of the device-tier decision.
- Removed: old loading screen, home video, hero computer, glitch headline, projects and services sections; Cormorant Garamond and Press Start 2P (only those components used them).

**Verified:** build, lint (0 errors; 1 pre-existing warning), type-check, `npm run check`; loader order and skip; sound on and off (AudioContext running, then suspended); menu open, Escape, focus return; reduced motion (no loader, no video, flat project list); `?tier=low` (posters only); 375 and 1440 screenshots; no console errors.

**Known failures:** B11 only (pre-existing contrast in old page bodies, now including the old contact submit button on the home page).

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
