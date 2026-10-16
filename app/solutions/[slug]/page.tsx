import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "../../site";
import { PROJECTS } from "../../work/projects";
import { LazyVideo } from "../../components/LazyVideo";
import { SOLUTIONS, getSolution } from "../solutions";
import { WorkGrid } from "../../components/WorkGrid";

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  if (!solution) return {};
  return pageMeta({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage({
  params,
}: PageProps<"/solutions/[slug]">) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();
  const work = PROJECTS.filter((p) => p.group === solution.group).slice(0, 6);
  const featured = work.find((p) => p.video);

  return (
    <>
      <main id="main">
        <section className="sol-hero hero-bg relative overflow-hidden">
          <div className="sol-hero-inner">
            <p
              className="sol-kicker"
              data-reveal
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              Solutions
            </p>
            <div
              className="sol-rule"
              data-reveal
              style={{ ["--reveal-delay" as string]: "140ms" }}
            >
              <span className="sol-rule-accent" />
              <span className="sol-rule-rest" />
            </div>
            <h1
              className="sol-title"
              data-reveal="scale"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              {solution.titleLines.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p
              className="sol-lead"
              data-reveal
              style={{ ["--reveal-delay" as string]: "280ms" }}
            >
              {solution.lead}
            </p>
            <div
              className="sol-hero-actions"
              data-reveal
              style={{ ["--reveal-delay" as string]: "360ms" }}
            >
              <a href="/contact" className="sol-btn sol-btn-primary">
                Start Project
              </a>
              <a href="#work" className="sol-btn sol-btn-ghost">
                See work
              </a>
            </div>
          </div>
        </section>

        <section className="sol-showcase" aria-label={`${solution.label} showcase`}>
          <div className="sol-showcase-media" data-reveal="scale">
            <Image
              src={solution.showcase.src}
              alt={solution.showcase.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="sol-showcase-veil" aria-hidden="true" />
          </div>
        </section>

        <section className="sol-intro">
          <div className="sol-intro-inner">
            <div className="sol-intro-copy" data-reveal="left">
              <p className="sol-label">
                What we build
              </p>
              <h2 className="sol-intro-heading">
                {solution.introHeading}
              </h2>
              {solution.introText.map((text) => (
                <p key={text} className="sol-intro-text">
                  {text}
                </p>
              ))}
            </div>
            <div
              className="sol-intro-media"
              data-reveal="right"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              {solution.introImage ? (
                <Image
                  src={solution.introImage.src}
                  alt={solution.introImage.alt}
                  fill
                  sizes="(max-width: 960px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : featured ? (
                <LazyVideo
                  src={featured.video!}
                  poster={featured.image}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </section>

        <section className="sol-capabilities">
          <div className="sol-capabilities-inner">
            <p className="sol-section-eyebrow" data-reveal>
              Capabilities
            </p>
            <h2
              className="sol-section-title"
              data-reveal
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              {solution.capabilitiesTitle}
            </h2>
            <div className="sol-capabilities-grid" data-reveal-stagger data-reveal>
              {solution.capabilities.map((item) => (
                <article key={item.tag} className="sol-capability" data-reveal-child>
                  <p className="sol-capability-tag">{item.tag}</p>
                  <span className="sol-capability-accent" />
                  <h3 className="sol-capability-title">{item.title}</h3>
                  <p className="sol-capability-body">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sol-process">
          <div className="sol-process-inner">
            <p className="sol-label sol-label-light" data-reveal>
              How we ship
            </p>
            <h2
              className="sol-process-heading"
              data-reveal
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              {solution.processTitle}
            </h2>
            <div className="sol-process-grid" data-reveal-stagger data-reveal>
              {solution.process.map((item, i) => (
                <article key={item.title} className="sol-process-card" data-reveal-child>
                  <span className="sol-process-step">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="sol-process-title">{item.title}</h3>
                  <p className="sol-process-text">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sol-deliverables">
          <div className="sol-deliverables-inner">
            <div className="sol-deliverables-head" data-reveal>
              <p className="sol-section-eyebrow">In every build</p>
              <h2 className="sol-section-title">What you walk away with</h2>
            </div>
            <ul className="sol-deliverables-list" data-reveal-stagger data-reveal>
              {solution.deliverables.map((item) => (
                <li key={item} className="sol-deliverable" data-reveal-child>
                  <span className="sol-deliverable-mark" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sol-work" id="work">
          <div className="sol-work-inner">
            <p className="sol-label sol-label-light" data-reveal>
              Selected work
            </p>
            <h2
              className="sol-work-heading"
              data-reveal
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              {solution.workHeading}
            </h2>
            <WorkGrid projects={work} />
          </div>
        </section>

        <section className="sol-cta" data-reveal="scale">
          <div className="sol-cta-inner">
            <h2 className="sol-cta-heading">
              {solution.ctaLines[0]}
              <br />
              {solution.ctaLines[1]}
            </h2>
            <a href="/contact" className="sol-btn sol-btn-primary sol-btn-lg">
              Start Project
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
