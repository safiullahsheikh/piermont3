import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "../components/Arrow";
import { CtaBand } from "../components/CtaBand";
import { Reveal } from "../motion/Reveal";
import { pageMeta } from "../site";
import { CATEGORIES, PROJECTS } from "../work/projects";
import { CategoryNav } from "./CategoryNav";

export const metadata: Metadata = pageMeta({
  title: "Case Studies by Service",
  description:
    "Browse Piermont Studios case studies by service: website design, UI/UX, product development, branding, digital marketing and video editing.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <main id="main" className="pm-page">
      <Reveal className="pm-page__inner">
        <p className="pm-label">Our work</p>
        <h1 className="pm-page__title">Case studies</h1>
        <p className="pm-page__lead">
          {PROJECTS.length} projects across {CATEGORIES.length} services. Pick a discipline to see
          the brief, the process and the result for each client.
        </p>
        <CategoryNav />
        <ol className="pm-index">
          {CATEGORIES.map((c, i) => {
            const projects = PROJECTS.filter((p) => p.group === c.group);
            return (
              <li key={c.slug} data-reveal="fade">
                <Link href={`/case-studies/${c.slug}`} className="pm-index__link">
                  <span className="pm-index__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pm-index__name">{c.title}</span>
                  <span className="pm-index__desc">
                    {projects.length} case studies ·{" "}
                    {projects
                      .slice(0, 3)
                      .map((p) => p.client)
                      .join(", ")}
                  </span>
                  <Arrow />
                </Link>
              </li>
            );
          })}
        </ol>
      </Reveal>
      <CtaBand />
    </main>
  );
}
