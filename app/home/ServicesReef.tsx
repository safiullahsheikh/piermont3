"use client";

import Link from "next/link";
import { useRef } from "react";
import { Arrow } from "../components/Arrow";
import { FootageSection } from "../components/Footage";
import { gsap, useGSAP } from "../motion/gsap";
import { SOLUTIONS } from "../solutions/solutions";
import { SERVICES } from "./services";

/**
 * Chapter 03, The reef. Services as glass panels over the reef; each panel tips up
 * out of the water (rotateX) as it scrolls into place. Then the five solutions.
 */
export function ServicesReef() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".pm-service", ref.current).forEach((el) => {
          gsap.fromTo(
            el,
            { rotationX: 16, y: 90, transformPerspective: 1400, transformOrigin: "50% 100%" },
            {
              rotationX: 0,
              y: 0,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "top 62%", scrub: 0.6 },
            },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <FootageSection name="reef" mode="scrub" className="pm-reef" aria-labelledby="pm-services-title">
      <div ref={ref} className="pm-reef__inner">
        <header className="pm-reef__head">
          <p className="pm-label">Services</p>
          <h2 id="pm-services-title" className="pm-reef__title">
            What we do best, and what your next project needs most.
          </h2>
        </header>
        <ol className="pm-services">
          {SERVICES.map((s) => (
            <li key={s.title} className="pm-service">
              <p className="pm-service__meta">
                <span>{s.tag.toLowerCase()}</span>
                <span aria-hidden="true">{s.index}</span>
              </p>
              <h3 className="pm-service__title">{s.title}</h3>
              <p className="pm-service__desc">{s.description}</p>
              <ul className="pm-service__items">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <section className="pm-build" aria-labelledby="pm-build-title">
          <header className="pm-build__head">
            <p className="pm-label">Solutions</p>
            <h2 id="pm-build-title" className="pm-reef__title">
              What we build
            </h2>
            <p className="pm-page__lead">
              Five ways we help brands grow, each with its own team, process and track record.
            </p>
            <Link href="/solutions" className="pm-link">
              All solutions
            </Link>
          </header>
          <ol className="pm-index">
            {SOLUTIONS.map((s, i) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}`} className="pm-index__link">
                  <span className="pm-index__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pm-index__name">{s.label}</span>
                  <span className="pm-index__desc">{s.summary}</span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </FootageSection>
  );
}
