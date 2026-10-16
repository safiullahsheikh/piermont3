import Image from "next/image";
import type { Metadata } from "next";
import { pageMeta } from "../site";

export const metadata: Metadata = pageMeta({
  title: "Our Design & Development Process",
  description:
    "How Piermont Studios takes a project from brief to launch: discovery, strategy, design, build and growth, with clear steps and no surprises.",
  path: "/process",
});

const FLOW = [
  {
    step: "01",
    phase: "Discover",
    title: "Understand the real problem",
    summary:
      "We start by listening. Your goals, your audience, your limits and what a good result looks like, all before anything gets designed.",
    duration: "1 to 2 weeks",
    image: "/process/phase1.jpg",
    imageAlt: "Poster reading Your Mind Creates Problems That Don’t Exist, Rule your mind or it will rule you",
    activities: [
      "Stakeholder kickoff and alignment",
      "Audience and competitor scan",
      "Audit of current brand and product",
      "Success metrics and constraints map",
    ],
    deliverables: [
      "Discovery brief",
      "Opportunity map",
      "Project roadmap outline",
    ],
  },
  {
    step: "02",
    phase: "Define",
    title: "Shape the direction",
    summary:
      "What we learn turns into a plan: how you position yourself, what you say, how the site is organised and how it will be built.",
    duration: "1 to 2 weeks",
    image: "/process/phase2.jpg",
    imageAlt: "A paintbrush painting a winding road through a dark landscape",
    activities: [
      "Positioning and messaging framework",
      "IA and user journey mapping",
      "Technical approach and stack decisions",
      "Scope lock and milestone plan",
    ],
    deliverables: [
      "Strategy deck",
      "Sitemap / flows",
      "Build plan with milestones",
    ],
  },
  {
    step: "03",
    phase: "Design",
    title: "Design the experience",
    summary:
      "The plan becomes real screens and a real identity. Layouts, a design system and clickable prototypes you can try before we write any code.",
    duration: "2 to 4 weeks",
    image: "/process/phase3.jpg",
    imageAlt: "Tiny figures on ladders building a shopping app screen on a giant phone",
    activities: [
      "Visual direction and mood exploration",
      "High-fidelity UI across key screens",
      "Design system foundations",
      "Interactive prototypes and review cycles",
    ],
    deliverables: [
      "Approved UI designs",
      "Component library starter",
      "Prototype for stakeholder sign-off",
    ],
  },
  {
    step: "04",
    phase: "Build",
    title: "Engineer what we designed",
    summary:
      "We build the designs into a fast, accessible product with clean code, integrations that work and a CMS your team can run.",
    duration: "3 to 6 weeks",
    image: "/process/phase4.jpg",
    imageAlt: "Coding poster with streams of code spiralling into a black hole",
    activities: [
      "Frontend implementation and motion",
      "CMS / headless content setup",
      "Integrations and custom features",
      "QA across devices and breakpoints",
    ],
    deliverables: [
      "Staging environment",
      "Production-ready build",
      "Handoff docs and training",
    ],
  },
  {
    step: "05",
    phase: "Launch",
    title: "Ship with confidence",
    summary:
      "Launch day is planned and calm. SEO basics, analytics, speed checks and a clear switchover plan are all sorted beforehand.",
    duration: "1 week",
    image: "/process/phase5.jpg",
    imageAlt: "A king chess piece on a chessboard with the words the Ruler",
    activities: [
      "Performance and accessibility pass",
      "Analytics and conversion tracking",
      "SEO metadata and redirects",
      "Launch checklist and cutover",
    ],
    deliverables: [
      "Live production site",
      "Launch report",
      "Post-launch support window",
    ],
  },
  {
    step: "06",
    phase: "Grow",
    title: "Iterate on what works",
    summary:
      "Launch is the start. We look at the data, fix what isn't working and keep releasing improvements.",
    duration: "Ongoing",
    image: "/service-seo.png",
    imageAlt: "Growth, analytics, and iteration planning",
    activities: [
      "Performance and funnel review",
      "A/B and content experiments",
      "Feature and page expansions",
      "Retainer or sprint-based support",
    ],
    deliverables: [
      "Monthly insights summary",
      "Prioritized backlog",
      "Continuous release cadence",
    ],
  },
] as const;

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
