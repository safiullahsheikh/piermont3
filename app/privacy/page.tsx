import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "../components/LegalPage";
import { EMAIL, PHONE, pageMeta } from "../site";

export const metadata: Metadata = pageMeta({
  title: "Privacy policy",
  description:
    "How Piermont Studios Limited handles the information you share through piermontstudios.com: what we collect, why, who processes it and your rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated={{ label: "16 October 2026", iso: "2026-10-16" }}
      lead="How Piermont Studios Limited handles the information you share through this website."
    >
      <h2>Who we are</h2>
      <p>
        Piermont Studios Limited runs this website. Our offices are at 30 N Gould St, Ste R, Sheridan, WY 82801, United
        States, and 66 Paul Street, London EC2A 4NA, United Kingdom. You can reach us at{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or <a href={PHONE.href}>{PHONE.display}</a>.
      </p>

      <h2>What we collect</h2>
      <p>
        Only what you send us through the contact form: your name, email address, phone number if you give it, your
        project details, and the services and budget you select.
      </p>

      <h2>How we use it</h2>
      <p>To reply to your enquiry and talk about your project. We don’t sell it or use it for advertising.</p>

      <h2>Who processes it</h2>
      <p>
        Cloudflare hosts this website and runs Turnstile, the check on the contact form that keeps out spam. Resend
        delivers your message to our inbox by email.
      </p>

      <h2>Cookies and storage</h2>
      <p>
        Your browser remembers your cookie choice, and whether you have already seen the opening animation this visit.
        Analytics cookies are set only if you choose Accept; choose Decline and none are set. Turnstile may store what it
        needs to tell people from bots.
      </p>

      <h2>How long we keep it</h2>
      <p>As long as we need it to answer your enquiry and, if we work together, to run the project.</p>

      <h2>Your rights</h2>
      <p>
        Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> to ask what we hold about you, or to have it corrected or deleted.
        In the UK you can also complain to the Information Commissioner’s Office at{" "}
        <a href="https://ico.org.uk" rel="noopener noreferrer" target="_blank">
          ico.org.uk
        </a>
        .
      </p>

      <h2>Changes</h2>
      <p>
        If anything changes we’ll update this page and the date above. See also our{" "}
        <Link href="/terms">terms of use</Link>.
      </p>
    </LegalPage>
  );
}
