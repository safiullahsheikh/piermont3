import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkGrid } from "../../components/WorkGrid";
import { CtaBand } from "../../components/CtaBand";
import { Reveal } from "../../motion/Reveal";
import { pageMeta } from "../../site";
import { CATEGORIES, PROJECTS } from "../../work/projects";
import { CategoryNav } from "../CategoryNav";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[category]">): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  const names = PROJECTS.filter((p) => p.group === category.group)
    .slice(0, 4)
    .map((p) => p.client)
    .join(", ");
  return pageMeta({
    title: `${category.title} Case Studies`,
    description: `${category.title} case studies from Piermont Studios, including ${names}. See the brief, the process and the result for each client.`,
    path: `/case-studies/${category.slug}`,
  });
}

export default async function CategoryPage({
  params,
}: PageProps<"/case-studies/[category]">) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  const projects = PROJECTS.filter((p) => p.group === category.group);

  return (
    <main id="main" className="pm-page">
      <Reveal className="pm-page__inner">
        <p className="pm-label">Case studies</p>
        <h1 className="pm-page__title">
          {category.title} <span className="pm-page__title-tail">case studies</span>
        </h1>
        <p className="pm-page__lead">{category.intro}</p>
        <CategoryNav current={category.slug} />
        <section aria-labelledby="projects-heading" className="pm-projects" data-reveal="fade">
          <h2 id="projects-heading" className="pm-label">
            Projects <span className="pm-filter__count">{projects.length}</span>
          </h2>
          <WorkGrid projects={projects} />
        </section>
      </Reveal>
      <CtaBand />
    </main>
  );
}
