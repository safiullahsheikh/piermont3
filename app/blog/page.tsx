import type { Metadata } from "next";
import { pageMeta } from "../site";
import { PageShell } from "../components/PageShell";
import { StoriesSection } from "../components/StoriesSection";

export const metadata: Metadata = pageMeta({
  title: "Blog: Branding, Design & Marketing",
  description:
    "Notes on branding, website design, UI/UX, marketing and video from the Piermont Studios team, drawn from real client work.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <PageShell kicker="Blog" title="Stories" bare>
      <StoriesSection all />
    </PageShell>
  );
}
