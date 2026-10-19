import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Arrow } from "../../../components/Arrow";
import { CtaBand } from "../../../components/CtaBand";
import { LazyVideo } from "../../../components/LazyVideo";
import { WorkGrid, morphName } from "../../../components/WorkGrid";
import { Reveal } from "../../../motion/Reveal";
import { pageMeta } from "../../../site";
import { TextEffect } from "../../../vendor/21st/text-effect";
import { PROJECTS, categoryOf, getProject, projectHref } from "../../../work/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    category: categoryOf(project).slug,
    slug: project.slug,
  }));
}

/** The project, only when it is requested under its own category. */
async function resolve(params: PageProps<"/case-studies/[category]/[slug]">["params"]) {
  const { category, slug } = await params;
  const project = getProject(slug);
  return project && categoryOf(project).slug === category ? project : undefined;
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[category]/[slug]">): Promise<Metadata> {
  const project = await resolve(params);
  if (!project) return {};
  return pageMeta({
    title:
      `${project.client} Case Study: ${project.service}`.length > 42
        ? `${project.client} Case Study`
        : `${project.client} Case Study: ${project.service}`,
    description: project.intro,
    path: projectHref(project),
    image: project.image,
  });
}

/**
 * One case study, the same frame for all 25: who and what, the work itself (its card morphs into
 * it), the challenge, the steps in order, the outcome, more from the same service, the next one.
 */
export default async function CaseStudyPage({
  params,
}: PageProps<"/case-studies/[category]/[slug]">) {
  const project = await resolve(params);
  if (!project) notFound();

  const category = categoryOf(project);
  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const outcome = project.sections.at(-1)!;
  const steps = project.sections.slice(0, -1);
  const more = PROJECTS.filter((p) => p.group === project.group && p !== project).slice(0, 3);

  return (
    <main id="main" className="pm-case">
      <header className="pm-case__hero">
        <nav aria-label="Breadcrumb" className="pm-crumbs">
          <Link href="/case-studies">Case studies</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/case-studies/${category.slug}`}>{category.title}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.client}</span>
        </nav>
        <TextEffect as="h1" per="word" preset="blur" className="pm-case__title">
          {project.client}
        </TextEffect>
        <p className="pm-case__tagline">“{project.tagline}”</p>
        <dl className="pm-case__meta">
          <div>
            <dt>Client</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Service</dt>
            <dd>{project.service}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>
        </dl>
      </header>

      <ViewTransition name={morphName(project)} share="pm-morph" default="none">
        <div
          className="pm-case__media"
          style={{
            aspectRatio: `${project.width} / ${project.height}`,
            width: `min(100%, calc(78svh * ${project.width} / ${project.height}))`,
          }}
        >
          {project.video ? (
            <LazyVideo src={project.video} poster={project.image} className="pm-case__fill" />
          ) : (
            <Image src={project.image} alt={project.alt} fill sizes="(max-width: 1200px) 100vw, 1200px" priority />
          )}
        </div>
      </ViewTransition>

      <Reveal className="pm-case__body">
        <section className="pm-case__brief" aria-labelledby="pm-case-challenge">
          <h2 id="pm-case-challenge" className="pm-label">
            The challenge
          </h2>
          <p className="pm-case__intro" data-reveal="fade">
            {project.intro}
          </p>
        </section>

        <ol className="pm-case__steps">
          {steps.map((step, i) => (
            <li key={step.title} data-reveal="fade">
              <span className="pm-case__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <section className="pm-case__outcome" aria-labelledby="pm-case-outcome">
          <p className="pm-label">Outcome</p>
          <h2 id="pm-case-outcome" data-reveal="heading">
            {outcome.title}
          </h2>
          <p data-reveal="fade">{outcome.body}</p>
        </section>

        {more.length > 0 && (
          <section className="pm-case__more" aria-labelledby="pm-case-more">
            <header className="pm-sol-work__head">
              <h2 id="pm-case-more" className="pm-work__h2">
                More {category.title.toLowerCase()} work
              </h2>
              <Link href={`/case-studies/${category.slug}`} className="pm-link">
                View all
              </Link>
            </header>
            <WorkGrid projects={more} />
          </section>
        )}

        <Link href={projectHref(next)} className="pm-case__next">
          <span className="pm-label">Next case study</span>
          <span className="pm-case__next-name">{next.client}</span>
          <span className="pm-case__next-service">{next.service}</span>
          <Arrow />
        </Link>
      </Reveal>
      <CtaBand />
    </main>
  );
}
