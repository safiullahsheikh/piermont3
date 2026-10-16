import type { Metadata } from "next";
import { pageMeta } from "../site";
import Link from "next/link";
import { PageShell } from "../components/PageShell";
import { WorkGrid } from "../components/WorkGrid";
import { CATEGORIES, PROJECTS } from "../work/projects";

export const metadata: Metadata = pageMeta({
  title: "Projects and Client Case Studies",
  description:
    "Case studies from Piermont Studios for clients including Boeing, Qatar Airways, Gamma, Rarible and Luma across web design, UI/UX and branding.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <PageShell kicker="Our work" title="Projects">
      {CATEGORIES.map((category) => {
        const projects = PROJECTS.filter((p) => p.group === category.group);
        if (!projects.length) return null;
        return (
          <section key={category.slug} className="sol-work">
            <div className="sol-work-inner">
              <h2 className="sol-work-heading" data-reveal>
                <Link href={`/case-studies/${category.slug}`} className="text-inherit no-underline">
                  {category.title}
                </Link>
              </h2>
              <WorkGrid projects={projects} />
            </div>
          </section>
        );
      })}
    </PageShell>
  );
}
