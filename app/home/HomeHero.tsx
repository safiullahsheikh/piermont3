"use client";

import Link from "next/link";
import { useRef } from "react";
import { Arrow } from "../components/Arrow";
import { FootageSection } from "../components/Footage";
import { gsap, useGSAP } from "../motion/gsap";

/**
 * Chapter 01, Surface. Dark water on a seamless loop. Scrolling sinks the camera:
 * the water drifts down and swells (it is further away than the type), the headline
 * rises faster and dissolves, and the shade deepens towards the next chapter.
 */
export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });
        tl.to(".pm-chapter__stage", { yPercent: 28, scale: 1.18 }, 0)
          // Fades to the abyss by the end, meeting the diver chapter's dark top edge without a seam.
          .to(".pm-chapter__stage", { opacity: 0, ease: "power1.in" }, 0)
          .to(".pm-chapter__shade", { opacity: 1 }, 0)
          .to(".pm-hero__line", { yPercent: -60, opacity: 0, stagger: 0.08 }, 0)
          .to(".pm-hero__foot", { y: -60, opacity: 0 }, 0);
        // Entrance: the two lines surface from below the waterline of their own mask.
        gsap.from(".pm-hero__line > span", {
          yPercent: 110,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.12,
          delay: document.documentElement.classList.contains("loader-playing") ? 4 : 0.2,
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <FootageSection name="hero" mode="loop" priority className="pm-hero" aria-labelledby="pm-hero-title">
        <div className="pm-hero__inner">
          <h1 id="pm-hero-title" className="pm-hero__title">
            <span className="pm-hero__line">
              <span>Brands, websites &amp; ads</span>
            </span>
            <span className="pm-hero__line">
              <span>built to grow.</span>
            </span>
          </h1>
          <div className="pm-hero__foot">
            <Link href="/contact" className="pm-button">
              Start a project
              <Arrow />
            </Link>
            <span className="pm-hero__cue" aria-hidden="true" />
          </div>
        </div>
      </FootageSection>
    </div>
  );
}
