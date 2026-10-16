import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "../components/Arrow";
import { CtaBand } from "../components/CtaBand";
import { Reveal } from "../motion/Reveal";
import { pageMeta } from "../site";
import { SOLUTIONS } from "./solutions";

export const metadata: Metadata = pageMeta({
  title: "Solutions: Web, Social, Ads, AI and Branding",
  description:
    "Website development, social media design, ad campaigns, AI development and branding from Piermont Studios. Pick a solution to see how we work.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <main id="main" className="pm-page">
      <Reveal className="pm-page__inner">
        <p className="pm-label">Solutions</p>
        <h1 className="pm-page__title">What we build</h1>
        <p className="pm-page__lead">
          Five ways we help brands grow, each with its own team, process and track record. Pick one
          to see how it works.
        </p>
        <ol className="pm-index">
          {SOLUTIONS.map((s, i) => (
            <li key={s.slug} data-reveal="fade">
              <Link href={`/solutions/${s.slug}`} className="pm-index__link">
                <span className="pm-index__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pm-index__name">{s.label}</span>
                <span className="pm-index__desc">{s.summary}</span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ol>
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
