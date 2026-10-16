import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "../components/Arrow";

export const metadata: Metadata = {
  title: { absolute: "Thank you | Piermont Studios" },
  description: "Your project request has reached Piermont Studios.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <main id="main" className="pm-page">
      <div className="pm-page__inner">
        <h1 className="pm-page__title">Thank you</h1>
        <p className="pm-page__lead">Thanks, we got your request and will be in touch soon.</p>
        <p className="pm-thanks__actions">
          <Link href="/case-studies" className="pm-button">
            See our work
            <Arrow />
          </Link>
          <Link href="/" className="pm-link">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
