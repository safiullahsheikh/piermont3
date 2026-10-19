import Image from "next/image";
import type { Metadata } from "next";
import { pageMeta } from "../site";
import { FLOW } from "./flow";

export const metadata: Metadata = pageMeta({
  title: "Our Design & Development Process",
  description:
    "How Piermont Studios takes a project from brief to launch: discovery, strategy, design, build and growth, with clear steps and no surprises.",
  path: "/process",
});


const PRINCIPLES = [
  {
    tag: "TRANSPARENT",
    title: "No black boxes",
    body: "You always know where things stand. Milestones, blockers and the next decisions are out in the open.",
  },
  {
    tag: "COLLABORATIVE",
    title: "Built beside you",
    body: "Feedback comes back fast. We work like part of your team rather than an outside supplier.",
  },
  {
    tag: "MEASURABLE",
    title: "Outcomes over output",
    body: "Every phase ties back to your goals, so the work is judged by results rather than a list of files.",
  },
] as const;

export default function ProcessPage() {
  return (
    <>
      <main id="main">
        <section className="proc-hero hero-bg relative overflow-hidden">
          <div className="proc-hero-inner">
            <p
              className="proc-kicker"
              data-reveal
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              How we work
            </p>
            <div
              className="proc-rule"
              data-reveal
              style={{ ["--reveal-delay" as string]: "140ms" }}
            >
              <span className="proc-rule-accent" />
              <span className="proc-rule-rest" />
            </div>
            <h1
              className="proc-title"
              data-reveal="scale"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              PROCESS
            </h1>
            <p
              className="proc-lead"
              data-reveal
              style={{ ["--reveal-delay" as string]: "280ms" }}
            >
              A clear path from the first conversation to a live product, and
              the growth that comes after.
            </p>
          </div>
        </section>

        <section className="proc-intro">
          <div className="proc-intro-inner">
            <div className="proc-intro-copy" data-reveal="left">
              <p className="proc-label">
                The flow
              </p>
              <h2 className="proc-intro-heading">
                Six phases. One continuous partnership.
              </h2>
              <p className="proc-intro-text">
                We don’t disappear between kickoff and launch. Each phase has a
                purpose, a set of outputs and a decision point, so the project
                keeps moving and nothing ships by accident.
              </p>
            </div>
            <ol className="proc-overview" data-reveal-stagger data-reveal>
              {FLOW.map((item) => (
                <li key={item.step} className="proc-overview-item" data-reveal-child>
                  <a href={`#phase-${item.step}`}>
                    <span className="proc-overview-step">{item.step}</span>
                    <span className="proc-overview-phase">{item.phase}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {FLOW.map((item, index) => {
          const reverse = index % 2 === 1;
          return (
            <section
              key={item.step}
              id={`phase-${item.step}`}
              className={`proc-phase ${reverse ? "proc-phase-alt" : ""}`}
            >
              <div className={`proc-phase-inner ${reverse ? "is-reverse" : ""}`}>
                <div
                  className="proc-phase-copy"
                  data-reveal={reverse ? "right" : "left"}
                >
                  <p className={`proc-label ${reverse ? "" : "proc-label-dark"}`}>
                    Phase {item.step}
                  </p>
                  <p className="proc-phase-name">{item.phase}</p>
                  <h2 className="proc-phase-title">{item.title}</h2>
                  <p className="proc-phase-summary">{item.summary}</p>
                  <p className="proc-phase-duration">
                    Typical timeline · <strong>{item.duration}</strong>
                  </p>

                  <div className="proc-phase-lists">
                    <div>
                      <h3 className="proc-list-heading">What we do</h3>
                      <ul className="proc-list">
                        {item.activities.map((activity) => (
                          <li key={activity}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="proc-list-heading">You walk away with</h3>
                      <ul className="proc-list">
                        {item.deliverables.map((deliverable) => (
                          <li key={deliverable}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className="proc-phase-media"
                  data-reveal={reverse ? "left" : "right"}
                  style={{ ["--reveal-delay" as string]: "100ms" }}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 960px) 100vw, 48vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <span className="proc-phase-badge" aria-hidden="true">
                    {item.step}
                  </span>
                </div>
              </div>
            </section>
          );
        })}

        <section className="proc-principles">
          <div className="proc-principles-inner">
            <p className="proc-section-eyebrow" data-reveal>
              How we collaborate
            </p>
            <h2
              className="proc-section-title"
              data-reveal
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              The rules that keep the flow honest
            </h2>
            <div className="proc-principles-grid" data-reveal-stagger data-reveal>
              {PRINCIPLES.map((item) => (
                <article key={item.tag} className="proc-principle" data-reveal-child>
                  <p className="proc-principle-tag">{item.tag}</p>
                  <span className="proc-principle-accent" />
                  <h3 className="proc-principle-title">{item.title}</h3>
                  <p className="proc-principle-body">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="proc-cta" data-reveal="scale">
          <div className="proc-cta-inner">
            <h2 className="proc-cta-heading">
              Ready to start
              <br />
              the first phase?
            </h2>
            <a href="/contact" className="proc-cta-button">
              Start Project
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
