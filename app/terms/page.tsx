import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "../components/LegalPage";
import { EMAIL, pageMeta } from "../site";

export const metadata: Metadata = pageMeta({
  title: "Terms of use",
  description:
    "The terms for using piermontstudios.com: who runs the site, who owns its content, links, acceptable use and how to contact Piermont Studios.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated={{ label: "16 October 2026", iso: "2026-10-16" }}
      lead="The terms for using piermontstudios.com."
    >
      <h2>About these terms</h2>
      <p>This website is run by Piermont Studios Limited. By using it you accept these terms.</p>

      <h2>Our content</h2>
      <p>
        The site’s design, text, images and code belong to Piermont Studios Limited or are used with permission. Work
        shown in case studies belongs to the clients it was made for, and brand names and logos are trademarks of their
        owners. You’re welcome to view and share our pages; please ask before copying or reusing anything.
      </p>

      <h2>Information on the site</h2>
      <p>
        We work to keep the site accurate and current, but it is provided as is. Nothing on it is an offer of services;
        projects are agreed separately, in writing.
      </p>

      <h2>Links to other sites</h2>
      <p>Links to other websites are there for convenience. We’re not responsible for their content.</p>

      <h2>Using the site</h2>
      <p>
        Please don’t try to break, overload or get unauthorised access to the site, or send automated messages through
        the contact form.
      </p>

      <h2>Liability</h2>
      <p>As far as the law allows, we’re not liable for any loss that comes from using this website.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. How we handle personal information is in
        our <Link href="/privacy">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
