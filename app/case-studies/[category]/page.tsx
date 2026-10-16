import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "../../site";
import { PageShell } from "../../components/PageShell";
import { WorkGrid } from "../../components/WorkGrid";
import { CATEGORIES, PROJECTS } from "../../work/projects";

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
    <PageShell kicker="Case studies" title={category.title}>
      <section className="sol-work" id="work">
        <div className="sol-work-inner">
          {projects.length ? (
            <WorkGrid projects={projects} />
          ) : (
            <p className="sol-work-heading" data-reveal>
              New {category.title.toLowerCase()} work is on the way.
            </p>
          )}
        </div>
      </section>
    </PageShell>
  );
}
