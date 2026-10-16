import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "../../site";
import { HeroHeader } from "../../components/HeroHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { LazyVideo } from "../../components/LazyVideo";
import { PROJECTS, getProject } from "../projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMeta({
    title:
      `${project.client} Case Study: ${project.service}`.length > 42
        ? `${project.client} Case Study`
        : `${project.client} Case Study: ${project.service}`,
    description: project.intro,
    path: `/work/${project.slug}`,
    image: project.image,
  });
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const outcome = project.sections.at(-1)!;
  const steps = project.sections.slice(0, -1);

  return (
    <>
      <main id="main">
        <section className="about-hero hero-bg relative overflow-hidden">
          <HeroHeader tone="light" />
          <div className="about-hero-inner">
            <p className="about-kicker" data-reveal>
              Case study
            </p>
            <div className="about-rule" data-reveal>
              <span className="about-rule-accent" />
              <span className="about-rule-rest" />
            </div>
            <h1 className="work-title" data-reveal="scale">
              {project.client}
            </h1>
            <p className="about-lead" data-reveal>
              “{project.tagline}”
            </p>
            <dl className="work-meta" data-reveal>
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
          </div>
        </section>

        <section className="work-media">
          <div className="work-media-inner" data-reveal="scale">
            {project.video ? (
              <LazyVideo
                src={project.video}
                poster={project.image}
                className="work-media-img object-cover"
                style={{
                  width: `min(100%, calc(80svh * ${project.width} / ${project.height}))`,
                  aspectRatio: `${project.width} / ${project.height}`,
                }}
              />
            ) : (
              <Image
                src={project.image}
                alt={project.alt}
                width={project.width}
                height={project.height}
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="work-media-img"
                priority
              />
            )}
          </div>
        </section>

        <section className="work-story">
          <div className="work-story-inner">
            <p className="about-label" data-reveal>
              The challenge
            </p>
            <p className="work-intro" data-reveal>
              {project.intro}
            </p>

            <ol className="work-steps">
              {steps.map((step, i) => (
                <li key={step.title} className="work-step" data-reveal>
                  <span className="work-step-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="work-step-title">{step.title}</h2>
                  <p className="work-step-body">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="work-outcome">
          <div className="work-outcome-inner" data-reveal>
            <p className="about-section-eyebrow">OUTCOME</p>
            <h2 className="work-outcome-title">{outcome.title}</h2>
            <p className="work-outcome-body">{outcome.body}</p>
          </div>
        </section>

        <section className="work-next">
          <Link href={`/work/${next.slug}`} className="work-next-link">
            <span className="work-next-label">Next project</span>
            <span className="work-next-name">{next.client}</span>
            <span className="work-next-service">{next.service}</span>
          </Link>
        </section>

        <section className="about-cta" data-reveal="scale">
          <div className="about-cta-inner">
            <h2 className="about-cta-heading">
              Ready to get
              <br />
              started?
            </h2>
            <Link href="/contact" className="about-cta-button">
              Start Project
            </Link>
          </div>
        </section>
      </main>

      <div data-reveal="fade">
        <SiteFooter />
      </div>
    </>
  );
}
