import Link from "next/link";
import { Arrow } from "./Arrow";

/** Closing call to action used at the foot of list pages, as in production. */
export function CtaBand() {
  return (
    <section className="pm-cta" aria-labelledby="pm-cta-title">
      <h2 id="pm-cta-title" className="pm-cta__title">
        Ready to get started?
      </h2>
      <Link href="/contact" className="pm-button">
        Start a project
        <Arrow />
      </Link>
    </section>
  );
}
