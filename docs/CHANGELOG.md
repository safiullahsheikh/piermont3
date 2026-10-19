# Changelog

## Phase 2: Solutions (2026-10-19)

- `/solutions` overview explains the offering as a system: the problem each solution answers, what it is, how many case studies back it (with three of them shown), the six disciplines behind all five, and the six-phase process with durations, linking to `/process`. The coral reef footage, cut from the home page, opens it.
- One template for the five solution pages, each with its own content: hero, what we build, capabilities, how we ship, what you walk away with, every case study in that service, a call to action and links to the other four. No FAQ, because none exist yet.
- Each solution is lit in its own colour, carried from production's per-page hues: light shafts in the hero, numbers, tags and hover states.
- Hero objects are production's per-solution visuals rebuilt as live pieces: a browser playing Augen Pro, a feed of five phones (the middle one playing), a sponsored post, an AI prompt typing its answer, and the brand type specimen. They tilt toward the cursor with a glare that follows it.
- Motion from 21st.dev, copied from the authors' published source (`app/vendor/21st/`): Tilt and Spotlight on the hero object, a word-by-word blur-in on page titles (TextEffect), and a soft torch of the solution's colour on capability cards (Spotlight). All still under reduced motion.
- Page body background is now the abyss everywhere, so the strip below the footer kept for the pill is no longer cream.
- The old `sol-` styles (about 500 lines) are removed from `globals.css`; the new ones live in `app/styles/solutions.css`.
- Project cards (`WorkGrid`) rebuilt on the new tokens; the title link covers the card.

**Verified:** build (62 pages), lint (0 errors, 1 pre-existing warning), type-check; all six routes at 375, 768 and 1440 px with no console errors and no sideways scroll; titles and descriptions match production; `npm run audit` reports no failures on any solutions page.

**Known failures:** B11 (old page bodies). New and logged for Phase 7: B22.

## Services wheel on scroll, one diver shot, small menu (2026-10-16)

- Home services (1024px and up): the option wheel holds still on screen while scrolling turns it, one service per 60svh of scroll. Clicking a service or the arrow keys scroll to it. The mouse wheel is no longer captured by the wheel, and drag is off (it fought the scroll). Held with CSS sticky, not a GSAP pin.
- Coral footage removed from the home page. The diver shot now runs on under projects and services as one chapter, so the descent never cuts. The coral files stay in `public/footage/` for later phases.
- Hero to diver: the hero footage fades to the abyss as it sinks, meeting the diver chapter's dark top edge, so there is no hard break between the two.
- Menu: a small panel that rises just above the pill (all eight pages, Start a project, email, phone) instead of a full-screen page. Closes on the pill's close button, a click outside, or Escape.

## Dome videos, cursor turn, one-screen projects, hero type (2026-10-16)

- `/case-studies` dome: edge to edge, one screen tall, no round vignette, so the tiles run off the left and right of the screen. The mouse turns it (left edge to right edge is a full turn, eased); drag still works on touch. Scroll no longer turns it.
- Dome tiles are the 25 case studies: each plays its video while the mouse is on it. Clicking opens the video in colour, playing, at its own shape (no crop). Pantry has no video, so its image opens at its shape.
- Home projects: heading, carousel and links fit one screen. The carousel no longer takes the mouse wheel (the page scrolls); drag, sideways swipe, arrow keys or a click move it.
- Home hero: both lines in the same face, size, colour and style on one left edge (the italic, indented second line is gone).

## React Bits wheel and carousel, card media, cursor removed, frame rate (2026-10-16)

- Home services: the React Bits OptionWheel with your settings (side left, font size 3, tilt 6, blur 2, fade 0.25 and so on) on 1024 px and up. Mouse wheel, drag, click or arrow keys turn it; at either end the wheel hands back to the page. Its click plays only when the site sound is on (`/sounds/click-soft.mp3`, a short tone made with ffmpeg).
- Service cards have their production media back: Brand Identity, Strategy, Design & Innovation, SEO and Development videos, the AI Systems image, under a dark scrim.
- Home projects: the accordion is replaced by the React Bits FlexCarousel with your settings (liquid preset, rise intro, twist curl, wheel capture). After one full lap of the wheel the page scrolls on. A link under it names the project in front. Low-power devices get a plain grid.
- `/case-studies` dome uses your settings: fit 0.8, min radius 600, no vertical tilt, 34 segments, drag dampening 2, greyscale.
- Cursor effects removed on your instruction (blob and ghost); the normal pointer everywhere.
- Frame rate: only the open service card's video decodes (all six used to play at once); no backdrop blur behind the service cards; the dome's greyscale is one blend layer instead of a filter on every tile. Measured in headless Chrome on this machine (i7-8650U, integrated graphics): home scroll 54 fps average, dome 60 fps.

**Verified:** build (62 pages), lint (0 errors, 1 pre-existing warning), type-check; wheel by mouse wheel, click and keys; carousel by wheel and keys, lap release; card media at 1440 and 375; dome; no console errors.

## Navigation pill and media fix (2026-10-16)

- `/case-studies`: the dome is now a full-screen globe. Scrolling through it turns it a full 360 (CSS scroll timeline; browsers without one get drag only); dragging still turns it.
- Category pages show their projects on a 3D ring carousel: drag or swipe sideways, arrow buttons, or Tab through the cards; the front project is named below.
- Home hero headline resized so "Brands, websites & ads" stays on one line from tablets up and breaks evenly on phones.
- Navigation is now a floating pill at the lower middle of the screen: logo, sound switch (bars only) and a three-line menu button. The menu rises behind the pill, and the button turns into an X. The inline page links and the "Start a project" button left the bar on your instruction; "Start a project" stays in the hero and in the menu.
- Footage and photos are stored as normal git files instead of Git LFS, so Vercel (and any host) gets the real files. The largest is 5.8 MB. Git LFS stays for source files (`assets-src/`, Blender, GLB, KTX2, EXR, HDR).
- Removed the stale `pnpm-lock.yaml`; the project installs with npm.

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
