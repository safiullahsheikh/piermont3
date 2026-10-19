# Copy deck

Proposed copy ships to the preview branch and is approved at the phase gate. Testimonials, stats and legal wording are never changed.

| Location | Current | Proposed | Reason | Phase | Status |
|---|---|---|---|---|---|
| Header CTA, home hero CTA, CTA bands | "Let's Talk" / "Start Project" | "Start a project" | One name for one action, sentence case, per brief 3.4 | 1A | Proposed |
| Header menu trigger | "Open Menu" | "Menu" | Brief 3.4; state is carried by `aria-expanded` | 1A | Proposed |
| Header nav | (menu only) | Home, Solutions, Work, About, Contact | Brief lists "Services"; kept the site's own word "Solutions" because `/services` redirects there | 1A | Proposed |
| Footer tagline | (none) | "Brands, websites & ads built to grow." | Reuses the production hero line; no new claim | 1A | Proposed |
| Footer copyright | "Copyright © 2026 ..." (fixed) | Same text, year generated | Brief 3.4 | 1A | Done |
| Skip link | "Skip to content" | unchanged | The brief's suggested wording contains a dash, which the repo rules forbid | 1A | Kept |
| 404 page | Production copy | unchanged | Any rewrite is deferred to Phase 6 | 1A | Kept |
| Loader | (none) | "Bienvenidos", "Welcome", "أهلاً وسهلاً", "Bienvenue", "欢迎" | Your instruction, 2026-10-16 | 1C | Proposed |
| Home hero CTA | "Let's Talk" | "Start a project" | Same action name as the header | 1C | Proposed |
| Home loader | (none) | Sound switch: "Sound", state "On" / "Off" | Your instruction, 2026-10-16 | 1C | Proposed |
| Home projects heading | "Projects" | "Projects" with the count 25; lead "Brands, products and campaigns we’ve shaped." | Count is the real number of case studies; lead is new | 1D | Proposed |
| Home projects end | (none) | "See all 25 case studies" | Names the destination | 1D | Proposed |
| Home services heading | "WHAT WE DO BEST, AND WHAT YOUR NEXT PROJECT NEEDS MOST." | Same words, sentence case | Brief 3.3 type rules; no all-caps headings | 1D | Proposed |
| Home solutions block | (none) | "What we build", "Five ways we help brands grow, each with its own team, process and track record.", "All solutions" | Introduces the five existing solution pages | 1D | Proposed |
| Menu | Production menu list | Home, Solutions, Case studies, About, Process, Testimonials, Blog, Contact, in a flowing menu | Your instruction; same pages as production | 1D | Proposed |
| Home brands label | "Brands who are part of our success story" | unchanged, logos now drift | Production wording kept | 1D | Kept |
| `/case-studies` dome | (none) | Section label for screen readers "Every project, as a gallery", hint "Move to turn, click to play" | Introduces the dome | 1D | Proposed |
| `/privacy` | (no page) | Draft privacy policy | Launch checklist; needs your legal review (B5) | 1D | Proposed |
| `/terms` | (no page) | Draft terms of use | Launch checklist; needs your legal review (B5) | 1D | Proposed |
| `/thank-you` | (no page) | "Thank you", then the production success message "Thanks, we got your request and will be in touch soon." | Reuses production wording | 1D | Proposed |
| Cookie banner | Production text | Same text plus a "Privacy policy" link | Links the new page | 1D | Proposed |
| Footer | (no legal links) | "Privacy policy", "Terms of use" | Links the new pages | 1D | Proposed |
| Navigation | Bar with Home, Solutions, Work, About, Contact, "Start a project" and "Menu" | Pill with logo, sound and a three-line button named "Menu" ("Close menu" when open) | Your instruction, 2026-10-16 | 1D | Proposed |
| Category pages, project ring | Project grid | Ring carousel; buttons "Previous project" / "Next project"; caption shows the front client and service | Your instruction, 2026-10-16 | 1D | Proposed |
| Home projects, carousel | Accordion | React Bits FlexCarousel; screen reader label "Featured projects"; captions client and service; link "View [client]" under it | Your instruction, 2026-10-16 | 1D | Proposed |
| Home services, wheel | Own option wheel | React Bits OptionWheel, labelled "Services" | Your instruction, 2026-10-16 | 1D | Proposed |
| Solution page titles | "WEBSITE DEVELOPMENT", "SOCIAL MEDIA DESIGN", "AD CAMPAIGNS", "AI DEVELOPMENT", "BRAND IDENTITY" (two lines, capitals) | Same words, title case, one heading | Brief 3.3 type rules; no all-caps headings | 2 | Proposed |
| `/solutions` items | (none) | "Your site looks fine but doesn’t bring in business.", "Your posts get scrolled past.", "Your ads get views, not customers.", "Your team repeats the same work every day.", "People can’t tell you apart from the rest." | Brief: name the typical problem each solution answers; no new claims | 2 | Proposed |
| `/solutions` items | (none) | "{n} case studies" link to the category | Real counts from the project list | 2 | Proposed |
| `/solutions` sections | (none) | "The team" / "The disciplines we bring" (the six home service cards); "How we work" / "Six phases, one team, no surprises." with the `/process` phases and durations; "Not sure which you need? Tell us about the project and we’ll point you the right way." | Explains the offering as a system; reuses existing copy | 2 | Proposed |
| Solution pages, deliverables | "In every build" | "In every project" | Social, ads and branding are not builds | 2 | Proposed |
| Solution pages, work | "Selected work" label | Label removed; "View all" link to the category added | The heading already says it; links to the full category | 2 | Proposed |
| Solution pages | (none) | Breadcrumb "Solutions / [name]"; "See work" jumps to the projects; "Other solutions" / "All solutions" with the other four | Contextual internal links per brief Phase 2 | 2 | Proposed |
| Solution pages, CTA | "Start Project" | "Start a project" | Same action name everywhere | 2 | Proposed |
| AI Development intro image | (none) | Pantry app screen, alt "Pantry mobile app home screen showing Pantry Health, recipes you can make now, and a grocery list" | Shows a real AI product from the case studies | 2 | Proposed |
| `/case-studies` | Category index list | "Browse by service" with tabs (All plus six services and counts); status "All 25 case studies across 6 services." or the service's intro and "[Service] case studies page"; "Skip the gallery to the list" | Grid is the main way to browse (brief Phase 3) | 3 | Proposed |
| `/case-studies` dome | Region label "Every project, as a gallery" | Removed (dome hidden from assistive tech; the grid lists every project) | Accessibility | 3 | Proposed |
| Case studies | "Case study" kicker; "OUTCOME"; "Next project"; "Start Project" | Breadcrumb "Case studies / [Service] / [Client]"; "Outcome"; "More [service] work" + "View all"; "Next case study"; shared "Ready to get started?" + "Start a project" | No all-caps; one action name; contextual links | 3 | Proposed |
| Category pages | (none) | Plain list of every project with its service under the ring | Every project reachable without the ring | 3 | Proposed |
