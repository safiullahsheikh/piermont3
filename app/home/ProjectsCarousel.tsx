"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Arrow } from "../components/Arrow";
import { WorkGrid } from "../components/WorkGrid";
import { useDeviceTier } from "../motion/tier";
import { PROJECTS, projectHref } from "../work/projects";

const FlexCarousel = dynamic(() => import("../vendor/react-bits/FlexCarousel"), { ssr: false });

// Production shows the first ten on the home page.
const FEATURED = PROJECTS.slice(0, 10);
const ITEMS = FEATURED.map((p) => ({
  src: `/_next/image?url=${encodeURIComponent(p.image)}&w=1080&q=75`,
  alt: p.alt,
  title: p.client,
  subtitle: p.service,
}));

/**
 * Chapter 02, Exploration. Ten projects on the React Bits FlexCarousel over the diver footage (page.tsx):
 * drag, wheel or arrow keys to bend through them, click to bring one close. The link under it
 * follows the project in front. Low-power devices get the plain grid.
 */
export function ProjectsCarousel() {
  const tier = useDeviceTier();
  const [active, setActive] = useState(0);
  const current = FEATURED[active];

  return (
    <section aria-labelledby="pm-projects-title" className={tier === "low" ? "pm-acc-wrap" : "pm-acc-wrap is-carousel"}>
        <header className="pm-acc__head">
          <h2 id="pm-projects-title" className="pm-acc__title">
            Projects <span className="pm-acc__count">{PROJECTS.length}</span>
          </h2>
          <p className="pm-acc__lead">Brands, products and campaigns we’ve shaped.</p>
          <Link href="/case-studies" className="pm-link">
            All case studies
          </Link>
        </header>
        {tier === "low" ? (
          <WorkGrid projects={FEATURED} />
        ) : (
          <>
            <div className="pm-flex">
              <FlexCarousel
                items={ITEMS}
                ariaLabel="Featured projects"
                onChange={(i) => setActive(i)}
                preset="liquid"
                intro="rise"
                cardHeight={0.5}
                gap={12}
                squeeze={0.2}
                focusOnClick
                captions
                fit="natural"
                radius={0}
                lensWidth={0.74}
                lensHeight={1.18}
                tilt={62}
                roundness={1}
                bend={0.34}
                reach={0.38}
                curl="twist"
                dispersion={0.45}
                liquid={0}
                followCursor={false}
                autoplay={false}
                interval={4}
                // Off: the vertical wheel scrolls the page. Drag, sideways swipe, arrow keys or a click move it.
                captureWheel={false}
              />
            </div>
          </>
        )}
        <div className="pm-flex__foot">
          {tier !== "low" && (
            <Link href={projectHref(current)} className="pm-link">
              View {current.client}
            </Link>
          )}
          <Link href="/case-studies" className="pm-button">
            See all {PROJECTS.length} case studies
            <Arrow />
          </Link>
        </div>
    </section>
  );
}
