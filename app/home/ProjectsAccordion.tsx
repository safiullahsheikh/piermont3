"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Arrow } from "../components/Arrow";
import { FootageSection } from "../components/Footage";
import { gsap, useGSAP } from "../motion/gsap";
import { PROJECTS, projectHref } from "../work/projects";

// Production shows the first ten on the home page.
const FEATURED = PROJECTS.slice(0, 10);

/**
 * Chapter 02, Exploration. Ten projects as a large accordion over the diver footage:
 * the panel under the pointer (or with focus) opens, the rest stay as slivers of
 * image. On touch the first tap opens a panel and the second follows the link.
 */
export function ProjectsAccordion() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".pm-acc",
          {
            rotationX: 18,
            y: 80,
            transformPerspective: 1600,
            transformOrigin: "50% 100%",
          },
          {
            rotationX: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".pm-acc",
              start: "top bottom",
              end: "top 45%",
              scrub: 0.6,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <FootageSection
      name="diver"
      mode="scrub"
      className="pm-projects-ch"
      aria-labelledby="pm-projects-title"
    >
      <div ref={ref} className="pm-acc-wrap">
        <header className="pm-acc__head">
          <h2 id="pm-projects-title" className="pm-acc__title">
            Projects <span className="pm-acc__count">{PROJECTS.length}</span>
          </h2>
          <p className="pm-acc__lead">
            Brands, products and campaigns we’ve shaped.
          </p>
          <Link href="/case-studies" className="pm-link">
            All case studies
          </Link>
        </header>
        <ol className="pm-acc">
          {FEATURED.map((p, i) => (
            <li
              key={p.slug}
              className="pm-acc__item"
              data-active={i === active || undefined}
            >
              <Link
                href={projectHref(p)}
                className="pm-acc__link"
                onPointerEnter={(e) =>
                  e.pointerType === "mouse" && setActive(i)
                }
                onFocus={() => setActive(i)}
                onClick={(e) => {
                  if (i === active) return;
                  e.preventDefault();
                  setActive(i);
                }}
              >
                <Image
                  src={p.image}
                  alt=""
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="pm-acc__img"
                  style={{ objectPosition: p.focus }}
                />
                <span className="pm-acc__tab" aria-hidden="true">
                  {p.client}
                </span>
                <span className="pm-acc__info">
                  <span className="pm-acc__meta">
                    <span aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p.group.toLowerCase()}
                  </span>
                  <span className="pm-acc__client">
                    {p.client}
                    <Arrow />
                  </span>
                  <span className="pm-acc__service">
                    {p.service}, {p.category}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Link href="/case-studies" className="pm-button pm-acc__end">
          See all {PROJECTS.length} case studies
          <Arrow />
        </Link>
      </div>
    </FootageSection>
  );
}
