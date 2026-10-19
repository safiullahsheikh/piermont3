import type { Metadata } from "next";
import { CtaBand } from "../components/CtaBand";
import { WorkCard } from "../components/WorkGrid";
import { pageMeta } from "../site";
import { TextEffect } from "../vendor/21st/text-effect";
import { CATEGORIES, PROJECTS, categoryOf } from "../work/projects";
import { Dome } from "./Dome";
import { WorkFilter } from "./WorkFilter";

export const metadata: Metadata = pageMeta({
  title: "Case Studies by Service",
  description:
    "Browse Piermont Studios case studies by service: website design, UI/UX, product development, branding, digital marketing and video editing.",
  path: "/case-studies",
});

/** Every case study: the dome to explore, then the grid filtered by service, the main way to browse. */
export default function CaseStudiesPage() {
  const tabs = [
    { id: "all", label: "All", count: PROJECTS.length },
    ...CATEGORIES.map((c) => ({
      id: c.slug,
      label: c.title,
      count: PROJECTS.filter((p) => p.group === c.group).length,
      intro: c.intro,
      href: `/case-studies/${c.slug}`,
    })),
  ];
  const items = PROJECTS.map((p) => ({ key: p.slug, group: categoryOf(p).slug, card: <WorkCard project={p} as="article" /> }));

  return (
    <main id="main" className="pm-page pm-work">
      <header className="pm-page__inner">
        <p className="pm-label">Our work</p>
        <TextEffect as="h1" per="word" preset="blur" className="pm-page__title">
          Case studies
        </TextEffect>
        <p className="pm-page__lead">
          {PROJECTS.length} projects across {CATEGORIES.length} services. Pick one to see the brief, the
          process and the result for each client.
        </p>
        <p className="pm-work__skip">
          <a href="#browse" className="pm-link">
            Skip the gallery to the list
          </a>
        </p>
      </header>
      <Dome />
      <section id="browse" className="pm-page__inner pm-work__browse" aria-labelledby="pm-work-browse">
        <h2 id="pm-work-browse" className="pm-work__h2">
          Browse by service
        </h2>
        <WorkFilter tabs={tabs} items={items} />
      </section>
      <CtaBand />
    </main>
  );
}
