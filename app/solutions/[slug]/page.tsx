import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Arrow } from "../../components/Arrow";
import { LazyVideo } from "../../components/LazyVideo";
import { WorkGrid } from "../../components/WorkGrid";
import { Reveal } from "../../motion/Reveal";
import { Spotlight } from "../../vendor/21st/spotlight";
import { TextEffect } from "../../vendor/21st/text-effect";
import { pageMeta } from "../../site";
import { CATEGORIES, PROJECTS } from "../../work/projects";
import { Instrument } from "../Instrument";
import { SOLUTIONS, getSolution } from "../solutions";

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  if (!solution) return {};
  return pageMeta({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: `/solutions/${solution.slug}`,
  });
}

/**
 * One template for all five solutions, in production's order: hero with the solution's own
 * object, what we build, capabilities, how we ship, deliverables, recent work, call to action and
 * the other solutions. Each page is lit in its own colour (solutions.css). No FAQ: none exist yet.
 */
export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();
  const work = PROJECTS.filter((p) => p.group === solution.group);
  const category = CATEGORIES.find((c) => c.group === solution.group)!;
  const featured = work.find((p) => p.video);
  const others = SOLUTIONS.filter((s) => s !== solution);

  return (
    <main id="main" className="pm-sol" data-solution={solution.slug}>
      <section className="pm-sol-hero">
        <div className="pm-sol-hero__copy">
          <nav aria-label="Breadcrumb" className="pm-sol-hero__crumbs">
            <Link href="/solutions">Solutions</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{solution.label}</span>
          </nav>
          <TextEffect as="h1" per="word" preset="blur" className="pm-sol-hero__title">
            {solution.title}
          </TextEffect>
          <p className="pm-sol-hero__lead">{solution.lead}</p>
          <p className="pm-sol-hero__actions">
            <Link href="/contact" className="pm-button">
              Start a project
              <Arrow />
            </Link>
            <a href="#work" className="pm-link">
              See work
            </a>
          </p>
        </div>
        <Instrument slug={solution.slug} />
      </section>

      <Reveal className="pm-sol__body">
        <section className="pm-sol-intro" aria-labelledby="pm-sol-intro">
          <div>
            <p className="pm-label">What we build</p>
            <h2 id="pm-sol-intro" className="pm-sol__h2" data-reveal="heading">
              {solution.introHeading}
            </h2>
            {solution.introText.map((text) => (
              <p key={text} className="pm-sol__text" data-reveal="fade">
                {text}
              </p>
            ))}
          </div>
          <div className="pm-sol-intro__media" data-reveal="fade">
            {solution.introImage ? (
              <Image
                src={solution.introImage.src}
                alt={solution.introImage.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            ) : (
              featured && <LazyVideo src={featured.video!} poster={featured.image} className="pm-sol__fill" />
            )}
          </div>
        </section>

        <section className="pm-sol-caps" aria-labelledby="pm-sol-caps">
          <p className="pm-label">Capabilities</p>
          <h2 id="pm-sol-caps" className="pm-sol__h2" data-reveal="heading">
            {solution.capabilitiesTitle}
          </h2>
          <ol className="pm-sol-caps__list">
            {solution.capabilities.map((c, i) => (
              <li key={c.tag} data-reveal="fade">
                {/* A diver's torch: the 21st.dev Spotlight, in this solution's light. */}
                <Spotlight className="from-(--sol-light)/35 via-(--sol-light)/10 to-transparent blur-2xl" size={260} />
                <p className="pm-sol-caps__tag">
                  <span>{c.tag.toLowerCase()}</span>
                  <span aria-hidden="true">/{String(i + 1).padStart(2, "0")}</span>
                </p>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="pm-sol-steps" aria-labelledby="pm-sol-steps">
          <p className="pm-label">How we ship</p>
          <h2 id="pm-sol-steps" className="pm-sol__h2" data-reveal="heading">
            {solution.processTitle}
          </h2>
          <ol className="pm-sol-steps__list">
            {solution.process.map((step, i) => (
              <li key={step.title} data-reveal="fade">
                <span className="pm-sol-steps__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="pm-sol-gets" aria-labelledby="pm-sol-gets">
          <div>
            <p className="pm-label">In every project</p>
            <h2 id="pm-sol-gets" className="pm-sol__h2" data-reveal="heading">
              What you walk away with
            </h2>
          </div>
          <ul className="pm-sol-gets__list">
            {solution.deliverables.map((d) => (
              <li key={d} data-reveal="fade">
                {d}
              </li>
            ))}
          </ul>
        </section>

        <section id="work" className="pm-sol-work" aria-labelledby="pm-sol-work">
          <header className="pm-sol-work__head">
            <h2 id="pm-sol-work" className="pm-sol__h2" data-reveal="heading">
              {solution.workHeading}
            </h2>
            <Link href={`/case-studies/${category.slug}`} className="pm-link">
              View all
            </Link>
          </header>
          <WorkGrid projects={work} />
        </section>

        <section className="pm-sol-cta" aria-labelledby="pm-sol-cta">
          <h2 id="pm-sol-cta" className="pm-cta__title" data-reveal="heading">
            {solution.ctaLines[0]} {solution.ctaLines[1]}
          </h2>
          <Link href="/contact" className="pm-button">
            Start a project
            <Arrow />
          </Link>
        </section>

        <nav className="pm-sol-others" aria-labelledby="pm-sol-others">
          <header className="pm-sol-work__head">
            <h2 id="pm-sol-others" className="pm-label">
              Other solutions
            </h2>
            <Link href="/solutions" className="pm-link">
              All solutions
            </Link>
          </header>
          <ul className="pm-index">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}`} className="pm-index__link pm-index__link--plain">
                  <span className="pm-index__name">{s.label}</span>
                  <span className="pm-index__desc">{s.summary}</span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>
    </main>
  );
}
