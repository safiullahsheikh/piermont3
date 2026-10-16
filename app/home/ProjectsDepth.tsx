"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Arrow } from "../components/Arrow";
import { FootageSection } from "../components/Footage";
import { gsap, ScrollTrigger, useGSAP } from "../motion/gsap";
import { useDeviceTier, useReducedMotion } from "../motion/tier";
import { PROJECTS, projectHref } from "../work/projects";

// Production shows the first ten on the home page.
const FEATURED = PROJECTS.slice(0, 10);
const GAP = 1100; // px between cards along the z axis
const FOG = 2800; // how far ahead a card starts to emerge from the dark

/**
 * Chapter 02, Exploration. The diver swims towards you while you swim through the
 * work: ten cards hang at increasing depth in a perspective corridor and scrolling
 * moves the camera forward through them. Phones, low-tier devices and reduced motion
 * get the same cards as a plain list.
 */
export function ProjectsDepth() {
  const ref = useRef<HTMLDivElement>(null);
  const tier = useDeviceTier();
  const reduced = useReducedMotion();
  const deep = tier !== "low" && !reduced;

  useGSAP(
    () => {
      if (!deep) return;
      gsap.matchMedia().add("(min-width: 768px)", () => {
        const root = ref.current!;
        const pin = root.querySelector<HTMLElement>(".pm-depth__pin")!;
        const cards = gsap.utils.toArray<HTMLElement>(".pm-depth__card", root);
        const travel = (cards.length - 1) * GAP + 500;
        root.classList.add("is-3d");

        cards.forEach((card, i) => {
          const side = i % 2 ? 1 : -1;
          gsap.set(card, {
            xPercent: -50 + side * 62,
            yPercent: -50 + (i % 3 === 1 ? -12 : 10),
            rotationY: -side * 9,
          });
        });
        const place = (z: number) =>
          cards.forEach((card, i) => {
            const d = z - i * GAP; // 0 = at the screen; negative = further in
            const o = d > 0 ? 1 - d / 320 : 1 + d / FOG;
            gsap.set(card, { z: d, autoAlpha: Math.max(0, Math.min(1, o)) });
            card.style.pointerEvents = o > 0.55 ? "auto" : "none";
          });

        const cam = { z: 0 };
        place(0);
        const tween = gsap.to(cam, {
          z: travel,
          ease: "none",
          onUpdate: () => place(cam.z),
          scrollTrigger: {
            trigger: pin,
            pin: true,
            start: "top top",
            end: () => `+=${innerHeight * cards.length * 0.55}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // Keyboard: focusing a card scrolls the camera to it.
        const onFocus = (e: FocusEvent) => {
          const i = cards.findIndex((c) => c.contains(e.target as Node));
          const st = tween.scrollTrigger as ScrollTrigger;
          if (i < 0 || !st) return;
          window.scrollTo({ top: st.start + ((i * GAP) / travel) * (st.end - st.start), behavior: "instant" });
        };
        root.addEventListener("focusin", onFocus);
        return () => {
          root.removeEventListener("focusin", onFocus);
          root.classList.remove("is-3d");
        };
      });
    },
    { scope: ref, dependencies: [deep] },
  );

  return (
    <FootageSection name="diver" mode="scrub" className="pm-projects-ch" aria-labelledby="pm-projects-title">
      <div ref={ref} className="pm-depth">
        <div className="pm-depth__pin">
          <header className="pm-depth__head">
            <h2 id="pm-projects-title" className="pm-depth__title">
              Projects <span className="pm-depth__count">{PROJECTS.length}</span>
            </h2>
            <p className="pm-depth__lead">
              Brands, products and campaigns we’ve shaped. Scroll to move through the work.
            </p>
            <Link href="/case-studies" className="pm-link pm-depth__all">
              All case studies
            </Link>
          </header>
          <ol className="pm-depth__scene">
            {FEATURED.map((p, i) => (
              <li key={p.slug} className="pm-depth__card">
                <Link href={projectHref(p)} className="pm-depth__link">
                  <span className="pm-depth__media">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      width={p.width}
                      height={p.height}
                      sizes="(min-width: 768px) 40vw, 100vw"
                      style={{ objectPosition: p.focus }}
                    />
                  </span>
                  <span className="pm-depth__meta">
                    <span className="pm-depth__num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pm-depth__group">{p.group.toLowerCase()}</span>
                  </span>
                  <span className="pm-depth__client">{p.client}</span>
                  <span className="pm-depth__service">
                    {p.service}, {p.category}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/case-studies" className="pm-button pm-depth__end">
            See all {PROJECTS.length} case studies
            <Arrow />
          </Link>
        </div>
      </div>
    </FootageSection>
  );
}
