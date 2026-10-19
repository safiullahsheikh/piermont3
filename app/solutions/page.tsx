import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "../components/CtaBand";
import { FootageSection } from "../components/Footage";
import { SERVICES } from "../home/services";
import { Reveal } from "../motion/Reveal";
import { FLOW } from "../process/flow";
import { pageMeta } from "../site";
import { TextEffect } from "../vendor/21st/text-effect";
import { CATEGORIES, PROJECTS } from "../work/projects";
import { SOLUTIONS } from "./solutions";

export const metadata: Metadata = pageMeta({
  title: "Solutions: Web, Social, Ads, AI and Branding",
  description:
    "Website development, social media design, ad campaigns, AI development and branding from Piermont Studios. Pick a solution to see how we work.",
  path: "/solutions",
});

/**
 * The offering as one system: five solutions (each with the problem it answers and its proof),
 * the six disciplines behind all of them, and the one process they share. The reef footage is
 * chapter 02, the shallows.
 */
export default function SolutionsPage() {
  return (
    <main id="main" className="pm-sols">
      <FootageSection name="reef" mode="loop" className="pm-sols-hero">
        <div className="pm-sols-hero__inner">
          <p className="pm-label">Solutions</p>
          <TextEffect as="h1" per="word" preset="blur" className="pm-page__title">
            What we build
          </TextEffect>
          <p className="pm-page__lead">
            Five ways we help brands grow, each with its own team, process and track record. Pick one
            to see how it works.
          </p>
        </div>
      </FootageSection>

      <Reveal className="pm-sols__body">
        <ol className="pm-sols-list" aria-label="Solutions">
          {SOLUTIONS.map((s, i) => {
            const work = PROJECTS.filter((p) => p.group === s.group);
            const category = CATEGORIES.find((c) => c.group === s.group)!;
            return (
              <li key={s.slug} className="pm-sols-item" data-solution={s.slug} data-reveal="fade">
                <span className="pm-sols-item__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pm-sols-item__copy">
                  <p className="pm-sols-item__problem">{s.problem}</p>
                  <h2 className="pm-sols-item__name">
                    <Link href={`/solutions/${s.slug}`}>{s.label}</Link>
                  </h2>
                  <p className="pm-sols-item__summary">{s.summary}</p>
                  <p className="pm-sols-item__links">
                    <Link href={`/case-studies/${category.slug}`} className="pm-link">
                      {work.length} case studies
                    </Link>
                  </p>
                </div>
                <div className="pm-sols-item__proof" aria-hidden="true">
                  {work.slice(0, 3).map((p) => (
                    <Image
                      key={p.slug}
                      src={p.image}
                      alt=""
                      width={p.width}
                      height={p.height}
                      sizes="(min-width: 1024px) 12vw, 30vw"
                      style={{ objectPosition: p.focus }}
                    />
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <section className="pm-sols-team" aria-labelledby="pm-sols-team">
          <p className="pm-label">The team</p>
          <h2 id="pm-sols-team" className="pm-sol__h2" data-reveal="heading">
            The disciplines we bring
          </h2>
          <ul className="pm-sols-team__list">
            {SERVICES.map((s) => (
              <li key={s.title} data-reveal="fade">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="pm-sols-flow" aria-labelledby="pm-sols-flow">
          <header className="pm-sol-work__head">
            <div>
              <p className="pm-label">How we work</p>
              <h2 id="pm-sols-flow" className="pm-sol__h2" data-reveal="heading">
                Six phases, one team, no surprises.
              </h2>
            </div>
            <Link href="/process" className="pm-link">
              Our process
            </Link>
          </header>
          <ol className="pm-sols-flow__list">
            {FLOW.map((f) => (
              <li key={f.step} data-reveal="fade">
                <span className="pm-sol-steps__num" aria-hidden="true">
                  {f.step}
                </span>
                <h3>{f.phase}</h3>
                <p>{f.title}</p>
                <p className="pm-sols-flow__time">{f.duration}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="pm-page__aside" data-reveal="fade">
          <p>
            Not sure which you need?{" "}
            <Link href="/contact" className="pm-link">
              Tell us about the project and we’ll point you the right way.
            </Link>
          </p>
        </div>
      </Reveal>
      <CtaBand />
    </main>
  );
}
