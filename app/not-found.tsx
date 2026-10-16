import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "./components/Arrow";
import { SOLUTIONS } from "./solutions/solutions";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Piermont Studios" },
  description: "The page you were looking for doesn’t exist or has moved.",
};

const ROUTES = [
  { href: "/", name: "Home", note: "Start from the top" },
  { href: "/case-studies", name: "Case studies", note: "See the work" },
  { href: "/solutions", name: "Solutions", note: "What we build" },
  { href: "/contact", name: "Contact", note: "Talk to the studio" },
] as const;

export default function NotFound() {
  return (
    <main id="main" className="pm-page">
      <div className="pm-page__inner">
        <p className="pm-label">Error 404</p>
        <h1 className="pm-page__title">This page took a different route.</h1>
        <p className="pm-page__lead">
          The link may be old, or the page has moved. Here are the best places to pick things back
          up.
        </p>
        <ul className="pm-index">
          {ROUTES.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="pm-index__link pm-index__link--plain">
                <span className="pm-index__name">{r.name}</span>
                <span className="pm-index__desc">{r.note}</span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
        <div className="pm-page__aside">
          <p>
            Or jump straight to{" "}
            {SOLUTIONS.map((s, i) => (
              <span key={s.slug}>
                <Link href={`/solutions/${s.slug}`} className="pm-link">
                  {s.label}
                </Link>
                {i < SOLUTIONS.length - 2 ? ", " : i === SOLUTIONS.length - 2 ? " or " : "."}
              </span>
            ))}
          </p>
        </div>
      </div>
    </main>
  );
}
