import Link from "next/link";
import type { ReactNode } from "react";
import { HeroHeader } from "./HeroHeader";
import { SiteFooter } from "./SiteFooter";

/** Light hero, page content, Start Project CTA and footer: shared by the list pages. */
export function PageShell({
  kicker,
  title,
  bare = false,
  children,
}: {
  kicker: string;
  title: string;
  /** The content brings its own big title, so keep the hero to the header. */
  bare?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <main id="main">
        <section
          className={`about-hero hero-bg relative overflow-hidden ${bare ? "about-hero-bare" : ""}`}
        >
          <HeroHeader tone="light" />
          <div className="about-hero-inner">
            <p className="about-kicker" data-reveal>
              {kicker}
            </p>
            <div className="about-rule" data-reveal>
              <span className="about-rule-accent" />
              <span className="about-rule-rest" />
            </div>
            <h1 className={bare ? "sr-only" : "work-title"} data-reveal="scale">
              {title}
            </h1>
          </div>
        </section>

        {children}

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
