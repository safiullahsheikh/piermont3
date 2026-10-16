import type { Metadata } from "next";
import { pageMeta } from "../site";
import { PageShell } from "../components/PageShell";
import { ServicesSection } from "../components/ServicesSection";

export const metadata: Metadata = pageMeta({
  title: "Branding, Design and Marketing Services",
  description:
    "Brand identity, strategy, website design and development, UI/UX, AI systems, SEO, performance marketing and video editing from Piermont Studios.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PageShell kicker="Services" title="What we do" bare>
      <ServicesSection />
    </PageShell>
  );
}
