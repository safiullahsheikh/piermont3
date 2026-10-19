# Licences

## In use today (baseline)

| Item | Where | Licence | Verified |
|---|---|---|---|
| Figtree | `public/Font/figtree` | SIL OFL 1.1 (`OFL.txt` included) | Yes, file present |
| Fragment Mono | `public/Font/fragment-mono` | SIL OFL 1.1 (`OFL.txt` included) | Yes, file present |
| Cormorant Garamond | `next/font/google` | SIL OFL 1.1 | Google Fonts (removed in 1C) |
| Press Start 2P | `next/font/google` | SIL OFL 1.1 | Google Fonts (removed in 1C) |
| Client and brand logos (`public/brands`, `public/logos`) | Stories marquee | Third-party trademarks; use depends on a client relationship | Pending (open question 2) |
| Project stills and videos | `public/projects` | Studio work product | Pending (open question 2) |

## Added in Phase 1A

| Item | Where | Licence | Verified |
|---|---|---|---|
| Bodoni Moda (Latin subset) | `public/Font/bodoni-moda` | SIL OFL 1.1 (`OFL.txt` included); source github.com/google/fonts `ofl/bodonimoda` | Yes |
| GSAP 3.15 (ScrollTrigger, SplitText, CustomEase) | npm `gsap` | GSAP Standard "No Charge" licence (all plugins free since 3.13) | Yes |
| @gsap/react | npm | MIT | Yes |
| axe-core | npm, dev only | MPL-2.0 | Yes |
| puppeteer-core | npm, dev only | Apache-2.0 | Yes |

## Added in Phase 1C/1D

| Item | Where | Licence | Verified |
|---|---|---|---|
| Footage: pier, water, diver, coral reef, bubbles | `assets/` (sources, not committed), `public/footage/` (encodes) | Supplied by you; source pages not recorded | No (B14) |
| Sea-wave sound | `app/sound/waves.ts` | Synthesised in the browser; no recording, no licence needed | Yes |

## Added in Phase 1C/1D part 2

| Item | Where | Licence | Verified |
|---|---|---|---|
| React Bits FlowingMenu, DomeGallery, OptionWheel, FlexCarousel (TS + CSS registry versions, lightly edited) | `app/vendor/react-bits/` | MIT + Commons Clause (use in sites allowed, resale of components not allowed); https://reactbits.dev | Yes |
| @use-gesture/react 10.3.1 (DomeGallery dependency) | npm | MIT | Yes |
| DriftWall | `app/components/DriftWall.tsx` | Own code, written from the documented behaviour of https://21st.dev/@Legacy/components/driftwall (MIT); no source copied, the source needs a 21st.dev API key | Yes |
| ogl 1.0.11 (FlexCarousel dependency) | npm | MIT | Yes |
| Wheel click sound | `public/sounds/click-soft.mp3` | Own: a 45 ms 1400 Hz tone generated with ffmpeg | Yes |
| Photos: pier lamps, pier at dusk, freediver | `public/media/` | Supplied by you; source pages not recorded | No (B14) |
| Google Analytics 4 (only with your ID, only after Accept) | `app/components/Analytics.tsx` | Google Analytics terms | Yes |

## Added in Phase 2

| Item | Where | Licence | Verified |
|---|---|---|---|
| 21st.dev components: TextEffect, Tilt, Spotlight, AnimatedBackground, AnimatedGroup, InView, ScrollProgress, TransitionPanel (motion-primitives, @ibelick); Timeline, AnimatedTestimonials (aceternity, @manuarora700); NumberTicker (magicui, @dillionverma) | `app/vendor/21st/` (sources and changes in its README) | MIT, as listed on each 21st.dev component page | Yes |
| framer-motion 12.43.0 | npm | MIT | Yes |
| clsx 2, tailwind-merge 3 | npm (`lib/utils.ts`) | MIT | Yes |

## Planned (verified in Phase 0, added only when used)

| Item | Licence | Source |
|---|---|---|
| GSAP + all plugins | GSAP standard licence, free for commercial use; no use in a no-code tool competing with Webflow | https://gsap.com/licensing/ |
| React Bits (free components) | MIT + Commons Clause: use in sites allowed, resale of components not allowed | https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md |
| Spline runtime | Spline terms; watermark removal Hobby+, code export Pro+, self-hosted export Enterprise | https://spline.design/pricing |
| Poly Haven / ambientCG textures, HDRIs | CC0 | polyhaven.com, ambientcg.com |
| Rigged diver model | Per-model commercial licence | To be chosen |
