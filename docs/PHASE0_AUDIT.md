# Phase 0 - Audit and plan

Branch: `redesign/below-the-surface` (from `main` @ `bdf2fe5`, the first commit of the current live site).
Date: 2026-10-16. No feature code in this phase.

> **Stop finding: this repository is not the production source.** The live site is a newer version. Live has `/solutions` and `/case-studies` index pages, case studies at `/case-studies/<category>/<slug>`, a custom 404 page, different page titles, and 308 redirects from `/services` to `/solutions`, from `/projects` to `/case-studies`, and from `/work/<slug>` to `/case-studies/<category>/<slug>`. None of those exist in this folder, which still has `/services`, `/projects` and `/work/[slug]`. The audit below describes this folder; the baseline in `docs/baseline/` describes production. Redesign work must start from the production source (open question 1).

## 1. Stack and build

| Item | Finding |
|---|---|
| Framework | Next.js 16.3.4, App Router, React 19.2.8, TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) plus one 106 KB `app/globals.css` holding most component styles |
| Hosting | Cloudflare Workers via `@opennextjs/cloudflare` (`wrangler.jsonc`, worker `behind-the-pixels`, routes on `piermontstudios.com` and `www.`) |
| Package manager | Two lockfiles (`package-lock.json`, `pnpm-lock.yaml`). pnpm is not installed here, so npm is used. Recommend dropping one lockfile in Phase 1A. |
| Motion today | CSS keyframes and a CSS `[data-reveal]` system, hand-rolled scroll listeners (`ProjectsSection`, `ServicesSection`), SVG turbulence filters. No GSAP, no Three.js. |
| Tests | None. No test script. |
| Lint / types / build | See section 1.1 |
| Deploy scripts | `npm run deploy` publishes **straight to the production routes**. It must never be run from this branch. `npm run upload` uploads a version without promoting it and, with `preview_urls: true`, gives a preview URL. That is the preview path for phase reviews (needs Cloudflare login, see BLOCKERS). |
| Repo rule | `.cursor/rules/no-em-dashes.mdc`: no em or en dashes anywhere (copy, titles, aria labels, comments, commits). This overrides the dash characters used in the brief's sample copy ("Skip the dive - go to content", counter "01 - 06"). |

### 1.1 Build, lint, type-check results (baseline, before any change)

| Check | Result |
|---|---|
| `npm ci` | Passed. npm 11 held back install scripts for `esbuild`, `workerd`, `unrs-resolver` (`npm approve-scripts` to allow); needed for `npm run preview`/`upload`, not for `next build`. |
| `npm run lint` | 0 errors, 6 warnings (`@next/next/no-img-element` in FooterLogoLiquid, HeroHeader, SiteFooter) |
| `tsc --noEmit` | Fails only on `PageProps` / `LayoutProps` (9 errors), which are global types Next generates during `next build` / `next typegen`. Not a code fault; type-check must run after typegen. |
| `next build` | Passed (Turbopack). First attempt failed only because the connection dropped while `next/font/google` fetched Cormorant Garamond and Press Start 2P; self-hosting them in 1A removes that build-time network dependency. `tsc --noEmit` passes after the build generates types. |
| Tests | None exist |

Environment notes: the repo sits in OneDrive, which syncs `node_modules` and `.next` as they are written (installs took 10+ minutes). Recommend moving the working copy outside OneDrive. The internet connection dropped several times during this phase.

## 2. Baseline snapshot

Live site crawled from `https://piermontstudios.com/sitemap.xml` (50 URLs) plus one deliberate 404.
Saved to `docs/baseline/`:
- `pages.json`: URL, status, redirect, title, meta description, canonical, og:title, og:image, h1
- `html/`: raw HTML per URL
- `screenshots/{375,768,1440}/`: full-page JPEG per URL (loader skipped and consent banner dismissed so the page itself is visible)

Results:
- 50 sitemap URLs all return 200; the probe URL returns 404 with a custom "Page not found" page.
- Every page has a unique title, a meta description and a canonical. Home canonical is `https://piermontstudios.com`.
- Live redirects (308): `/services` to `/solutions`, `/projects` to `/case-studies`, `/work/<slug>` to `/case-studies/<category>/<slug>`. These must survive the redesign.
- Screenshots: partial (about 22 of 51 URLs per width). The connection dropped repeatedly mid-run. The crawler resumes where it stopped (`node crawl.mjs docs/baseline`) and will be completed before Phase 1A.

## 3. Route inventory

| Current URL | Count | Purpose | Proposed location | Redirect |
|---|---|---|---|---|
| `/` | 1 | Home | `/` (chapters 01-06) | No |
| `/about` | 1 | Studio story, values, process summary | `/about` (habitat) | No |
| `/services` | 1 | Six-card services stack | `/services` (system overview) | No |
| `/solutions/[slug]` | 5 | Per-service landing pages | Keep URLs; become the per-service pages of Phase 2 | No |
| `/projects` | 1 | Work index, grouped by category | Keep as the work index; nav label "Work" points here | No |
| `/case-studies/[category]` | 6 | Category grids | Keep | No |
| `/work/[slug]` | 25 | Case studies | Keep | No |
| `/blog`, `/blog/[slug]` | 1 + 6 | Articles | Keep | No |
| `/process` | 1 | Six-phase process | Keep (not in the brief's nav; stays in footer and Flowing Menu) | No |
| `/testimonials` | 1 | Testimonials and highlight stats | Keep | No |
| `/contact` | 1 | Form (Turnstile + Resend) and details | Keep (Spline sonar in Phase 6) | No |
| `/api/contact` | 1 | Form backend | Keep unchanged | n/a |
| `/work` (no index today) | 0 | | Optional: 308 to `/projects` so a "Work" URL guess resolves | Add |
| Privacy policy | 0 | **Does not exist** | Needed for the form notice (brief 6.3) | See open question 5 |

No existing URL changes. The brief's `/work` grid becomes `/projects`, which already exists and ranks.

## 4. Content inventory

| Content | Source | Notes |
|---|---|---|
| Business details | `app/site.ts`, `app/contact/page.tsx` | Email harris@piermontstudios.com, phone 307-655-6848, offices Sheridan WY and London EC2A, hours Mon-Fri 9am-6pm, Instagram, LinkedIn |
| Services (A) | `ServicesSection.tsx` (home and `/services`) | 6: Brand Identity, Strategy, Design & Innovation, AI Systems, SEO, Development. Only Development links anywhere. |
| Services (B) | `solutions/solutions.ts` | 5 pages: Website Development, Social Media Design, Ad Campaigns, AI Development, Branding |
| Services (C) | Contact form | 8 options: Brand Strategy, Brand Identity, UX Design, Visual Content, Web Development, eCommerce, Web & Mobile Apps, Embedded & Hardware |
| Services (D) | Root metadata, project groups | Branding, website design, UI/UX, performance marketing, video editing, product development |
| Projects | `work/projects.ts` | 25 projects across 6 groups. Includes Boeing, Qatar Airways, Raycast, Resend, Gamma, Rarible, Luma, Refero Styles. Two are labelled "Concept" in their service line (Augen Pro, Rise). |
| Categories | `work/projects.ts` `CATEGORIES` | Website Design, UI/UX Design, Product Development, Branding, Digital Marketing, Video Editing |
| Testimonials | `TestimonialsSection.tsx` (4), `testimonials/page.tsx` (6) | Two extra on the page reuse avatars 1 and 2. Several quotes name other people or studios ("Giacomo Troncon", "MP", "partnering since 2013"). |
| Stats | `testimonials/page.tsx` | 50+ projects delivered, 4.9 average rating, 12+ years of partnership |
| Client logos | `StoriesSection.tsx` `/brands/` | 12: Diesel, Qatar Airways, Columbia, Heineken, Burberry, Baileys, On, Louis Vuitton, Bacardi, The North Face, Reebok, Alo, under "Brands who are part of our success story" |
| Achievements | `SiteFooter.tsx` | Clutch Top 1000 + Google 5 star image, Trustpilot image, review icons (Bark, Trustpilot, Google, Clutch), all with `href: null` |
| Blog | `blog/posts.ts` | 6 posts, Jul 10 - Sep 18 2026, author is the organisation, `BlogPosting` JSON-LD present |
| Process | `process/page.tsx`, `about/page.tsx` | 6 phases with durations on `/process`, 4 steps on `/about` |
| Footer | `SiteFooter.tsx` | Company, Solutions, Resources, Case studies, Locations, Contact, Socials. Copyright year is hard-coded "2026". |
| Consent | `CookieBanner.tsx` | Exists, with `hasCookieConsent()`. No analytics script is loaded anywhere, so nothing needs gating yet. |
| Form | `ContactSection.tsx`, `api/contact/route.ts` | Turnstile (already in use, so allowed by brief 6.3) + Resend. Env: `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, optional `CONTACT_FROM_EMAIL`. No data-retention notice. |
| Legal | none | No privacy policy or terms pages |
| Spelling | mixed | Metadata is `en_US`; some copy uses UK spellings ("optimisation"). The business is US and UK. Keep each string's existing spelling; new copy follows US English to match `en_US`. |

## 5. Asset inventory

| Asset | Finding |
|---|---|
| Logo | **Raster only.** `MainLogo.png` (black), `FooterLogo.png` (cream), `LogoW.png` / `LogoP.png` (2000 px, navy and cream). `public/logo.svg` is an unrelated teal figure mark and is unused. The signature-draw loader needs a traced SVG (approval required, letterforms unchanged). |
| Brand colour | Navy around `#0F3375` from `LogoP.png`; site background cream `#fdfbf7`; accent red `#ff2d1a` in rules |
| Fonts | Figtree (local, OFL), Fragment Mono (local, OFL), Cormorant Garamond (Google, OFL), Press Start 2P (Google, OFL, used for the retro hero) |
| Video | Hero reel `video.mp4` 6.5 MB, 5 service loops, `contact.mp4`, `pcVideo.mp4`, 20+ project loops (`public/projects/` 52 MB total) |
| Images | Project stills, process posters, blog story images, 12 brand logos, testimonial avatars |
| Unreferenced (static scan) | `TestimonialImages/` (15 named portraits, 19 MB), `logos/` (12 hashed JPGs), `OtherAssets/Awards.png` (Wix Partner, Velo and Wix Expert badges), `OtherAssets/Strugbits White Logo.png` (another agency's name), `OtherAssets/Colored Logo.png`, three hashed `.webp` files, `retro-computer.png`, `project-{hope,sprint,brands,typography}.png`, `logo.svg`. Not deleted; listed for your decision. |
| 3D | None |
| Total `public/` | 94 MB |

## 6. Toolchain access report

| Tool | Status | Consequence |
|---|---|---|
| Blender | **Not installed.** No Blender MCP in this session. | Brief path 3 applies today: scripts plus exact commands, and I stop for you to run them. If you install Blender (free) I can drive it headless myself (`blender --background --python`). With the `blender-mcp` add-on ([ahujasid/blender-mcp](https://github.com/ahujasid/blender-mcp)) I could drive it live. |
| Spline | No MCP, no authoring API. | Spline scenes can only be built by a person in the Spline editor. I can write exact scene specs in `assets-src/spline/`. Plans ([spline.design/pricing](https://spline.design/pricing)): watermark removal from Hobby ($15/mo), code export from Pro ($30/mo), self-hosted export Enterprise only. The React package is `@splinetool/react-spline` + `@splinetool/runtime` (`/next` entry for SSR placeholder); scenes load from `prod.spline.design` by default. |
| Git LFS | 3.7.1 installed, not configured for this repo | Proposal in section 7.1 |
| GSAP | Not installed. Free for commercial use including all former Club plugins (SplitText, DrawSVG, Inertia, etc.), per [gsap.com/licensing](https://gsap.com/licensing/). The only prohibited use is building a no-code visual animation tool that competes with Webflow. | Add `gsap` + `@gsap/react` in 1A |
| Three.js / R3F | Not installed | Add in 1C; version compatibility with React 19.2 checked against docs then |
| React Bits | MIT + Commons Clause: use in a client site is allowed, reselling the components is not ([LICENSE](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md)). Pro access unknown. | Free components adapted with attribution; Pro ones (Contact 10) only with confirmed access, otherwise original builds |
| Lenis | Not installed | Deferred. Added in 1C only if scroll-linked 3D measurably needs it. |
| ffmpeg 9.0.1 | Installed (full build, AV1 + H.264 encoders) | Video fallbacks and posters |
| Chrome, Node 24, npm 11, Python 3.12 | Installed | Screenshots, Lighthouse, scripts |
| gltf-transform | Not installed; run via `npx @gltf-transform/cli` when needed | Optimisation pipeline |
| Preview deploys | `npm run upload` needs `wrangler login` on your Cloudflare account | Until then each gate ships a local run command (`npm run dev` or `npm run preview`) |

## 7. 3D asset plan

The honest constraint: a **realistic, rigged human diver with swim cycles cannot be credibly built from a Python script**. Scripting is good for environments, lighting, particles, camera paths and renders. A realistic character needs a sculpted or scanned, rigged model. Placeholder geometry presented as final is prohibited, so the diver has to be licensed or commissioned.

| Asset | Source | Licence | Est. runtime size |
|---|---|---|---|
| Diver (rigged) + 4 clips | Licensed rigged scuba-diver model (Sketchfab, CGTrader, TurboSquid, Fab) re-clipped in Blender, or commissioned | Per-model commercial licence, recorded in LICENCES.md | 1.5-3 MB (Draco/meshopt + KTX2), LOD low ~0.6 MB |
| Pier and ocean surface | Scripted in Blender (pier from primitives + bevels, surface from ocean modifier), CC0 textures (ambientCG, Poly Haven) | CC0 | 1-2 MB |
| Underwater environment (rock walls, coral, kelp, seabed) | Scripted geometry (displaced rock, scattered instances) + CC0 scans from Poly Haven | CC0 | 3-5 MB high, 1.5-2.5 MB medium |
| Light shafts, caustics | Shader in R3F + baked caustic texture sequence from Blender | Own | 0.3-0.8 MB |
| Camera paths | Blender camera animation exported in GLB or keyframe JSON | Own | < 50 KB |
| Glass dome habitat loop | Scripted Blender scene, Cycles render, silhouettes only | Own | Video 2-4 MB + poster |
| Device mockups (services, projects) | Licensed or CC0 device models, rendered in Blender with real project screenshots | Per-model | ~150 KB per AVIF still |
| Bubbles, particles | Instanced meshes in R3F + small sprite atlas | Own | < 200 KB |
| Pre-rendered fallbacks | Cycles renders, AV1 + H.264 | Own | Hero loop 3 MB mobile / 6 MB desktop |
| HDRI | Poly Haven underwater or overcast HDRI | CC0 | Bake only, not shipped |
| Spline: service icons, porthole, sonar, 404 diver | Built in Spline editor from my specs (by you or a designer) | Spline plan terms | Runtime ~500 KB+ gzip (to be measured), scenes 50-300 KB each |

Totals land inside brief 6.2 (≤ 8 MB mobile, ≤ 15 MB desktop) if the diver stays near 3 MB.

### 7.0 Hyper-realism strategy (your direction: "hyper-realistic, a $20M feel")

Hyper-real on the web is a production question, not a laptop question. Visitors' devices play the site; the authoring machine only matters while producing footage, and that can happen anywhere.

1. **Photoreal comes from pre-rendered or filmed imagery, not real-time WebGL.** Real-time 3D on a mid-range phone reads as "game", not "film". Top-tier sites get their realism from path-traced renders or real footage, scrubbed by scroll. Recommendation: the hero, waterline crossing and scroll descent become **scroll-scrubbed image sequences / video** (AVIF frames or a seek-optimised MP4), and real-time WebGL is used only for light layers on top (bubbles, particles, refraction band, cursor parallax). This replaces brief 2.3's real-time diver. It also lowers the risk on mobile and the static fallback is the same footage.
2. **Three ways to get the footage, cheapest first:**
   - **Licensed real underwater cinematography** (a real diver, light shafts, reef): filmed, so photoreal by definition. Stock libraries sell 4K clips with commercial licences; some free libraries (e.g. Pexels) also allow commercial use. Must match the brand grade, which we do in post.
   - **AI video generation** (current text/image-to-video models) for specific shots stock lacks, e.g. the pier-to-waterline plunge. Licence terms per tool are checked before use.
   - **Blender Cycles renders** of scanned assets (Fab/Megascans, Poly Haven CC0) plus a licensed rigged diver, rendered on a **rented cloud GPU** (hourly rental) or the free SheepIt render farm. I write the scenes and render scripts; the render runs off this laptop.
3. **What makes it feel expensive** is art direction more than polygon count: one consistent colour grade, real lens behaviour (depth of field, motion blur, grain), restraint in motion, typography with room to breathe, and nothing that looks templated. That part is design work I do in the code phases.

### 7.1 Git LFS proposal

Existing videos on `main` stay as they are (migrating them would rewrite history, which is prohibited). For new files only:

```
assets-src/**            filter=lfs diff=lfs merge=lfs -text
public/3d/**             filter=lfs diff=lfs merge=lfs -text
public/media/**          filter=lfs diff=lfs merge=lfs -text
*.blend *.glb *.ktx2 *.splinecode *.exr *.hdr  filter=lfs diff=lfs merge=lfs -text
```

Check the GitHub account's LFS storage and bandwidth quota before Phase 1B. Deploys run locally with wrangler, so LFS files are present at build time.

## 8. Performance budget confirmation

Lighthouse baseline (mobile, throttled) is pending a stable connection; numbers measured over a dropping link would be misleading. Lighthouse 12 is installed in the scratchpad and will run against production before 1A.

Budget (brief 6.1, 6.2) confirmed as achievable on this stack provided: the hero headline stays the LCP element, the 3D bundle is a dynamic import after first paint, and the medium tier stays under 8 MB.

## 9. Open questions (blocking)

1. **Production source.** Where is the code that is live now (the version with `/case-studies/<category>/<slug>`)? Another repo, branch, folder or machine? Redesign must start from it. Blocks everything.
2. **Palette.** Your standing default for this project is ash grey, black and white. The brief specifies navy, cobalt and off-white, building on the logo's navy, and rules out a "black-and-chrome default". Which one wins? Blocks 1A tokens.
3. **Hyper-real footage route** (section 7.0). Approve scroll-scrubbed footage as the hero/descent engine instead of a real-time diver, and pick the source mix: licensed real footage, AI-generated shots, cloud-rendered Blender, or a combination. Spline: do you have a plan and someone to build scenes? If not, I build those five elements in code. Blocks 1B.
4. **Content provenance and services.** Once the production source is in hand: are the projects (Boeing, Qatar Airways, Raycast, Resend, Gamma, Rarible, Luma, Refero) commissioned client work, are the 12 brand logos clients, are the testimonials and the 50+ / 4.9 / 12+ stats genuine, and which service list is canonical? Unverified items get labelled "concept" or removed. Blocks 1D.
5. **Missing inputs.** `docs/reference/homepage-v1.png` is not in the repo, and no privacy policy exists for the form notice (it cannot be invented). Blocks 1C and 6.

## 10. Assumptions

- Nav "Work" points to `/projects`; services pages stay at `/solutions/[slug]`; `/process` and `/testimonials` stay.
- No em or en dashes anywhere, per the repo rule.
- Display serif chosen in 1A from OFL fonts (candidates: Cormorant Garamond, already loaded; or a didone such as Playfair Display). Body stays Figtree.
- npm is the package manager; `pnpm-lock.yaml` is removed in 1A unless you use pnpm elsewhere.
- Existing consent banner stays; analytics remains absent unless you add one.
- The current retro-computer hero, glitch headline and liquid footer logo are replaced by the new concept. Their copy ("We Strategize Build and Promote") is kept as the hero headline unless the copy deck changes it.

## 11. Revised phase plan

Every page must work with 3D off, and the 3D assets depend on tools and purchases outside the repo, so asset production should not block the code phases:

| Phase | Scope | Change from brief |
|---|---|---|
| 0 | This audit | - |
| 1A | Tokens, type, SVG logo, shell, header, footer, nav, motion scaffold, tier detection, a11y/perf tooling | Same |
| 1B-proto | Motion blocking for the waterline and descent | As a GSAP + R3F greybox in the browser if Spline is not available (clearly labelled blocking, not final) |
| 1C-static | Static hero with Blender posters (or interim stills) and real content | Pulled forward |
| 1D | Homepage sections with static fallbacks | Before final 3D |
| 1B | Blender and Spline production, runs **in parallel** with 1A-1D as soon as tools exist | Parallel, still gated by review renders |
| 1C-3D | Loader, live hero, waterline, scroll descent on the finished assets | After 1B |
| 2-7 | As the brief | Same |
