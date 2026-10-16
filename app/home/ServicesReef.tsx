"use client";

import Link from "next/link";
import { type KeyboardEvent, useRef, useState } from "react";
import { Arrow } from "../components/Arrow";
import { FootageSection } from "../components/Footage";
import { gsap, ScrollTrigger, useGSAP } from "../motion/gsap";
import { useDeviceTier } from "../motion/tier";
import { SOLUTIONS } from "../solutions/solutions";
import { SERVICES } from "./services";

const STEP = 24; // degrees between options on the drum
const LAST = SERVICES.length - 1;

/**
 * Chapter 03, The reef. On large screens the six services sit on an option wheel:
 * scrolling turns the drum and the service facing you opens beside it. Clicking an
 * option or using the arrow keys scrolls to it, so scroll stays the one source of
 * truth. Elsewhere the services are glass panels that tip up out of the water.
 * Then the five solutions.
 */
export function ServicesReef() {
  const ref = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const trigger = useRef<ScrollTrigger | null>(null);
  const tier = useDeviceTier();
  const [wheel, setWheel] = useState(false);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (tier === "low") return;
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          setWheel(true);
          const root = ref.current!;
          const drum = root.querySelector<HTMLElement>(".pm-wheel__drum")!;
          const opts = gsap.utils.toArray<HTMLElement>(".pm-wheel__opt", root);
          trigger.current = ScrollTrigger.create({
            trigger: root.querySelector(".pm-svc"),
            pin: true,
            start: "top top",
            end: () => `+=${innerHeight * LAST * 0.7}`,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (st) => {
              const turn = st.progress * LAST;
              drum.style.transform = `translateZ(-15rem) rotateX(${turn * STEP}deg)`;
              opts.forEach(
                (o, i) =>
                  (o.style.opacity = String(
                    Math.max(0.08, 1 - Math.abs(i - turn) * 0.38),
                  )),
              );
              setActive(Math.round(turn));
            },
          });
          return () => {
            setWheel(false);
            trigger.current = null;
          };
        },
      );
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils
            .toArray<HTMLElement>(".pm-service", ref.current)
            .forEach((el) => {
              gsap.fromTo(
                el,
                {
                  rotationX: 16,
                  y: 90,
                  transformPerspective: 1400,
                  transformOrigin: "50% 100%",
                },
                {
                  rotationX: 0,
                  y: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "top 62%",
                    scrub: 0.6,
                  },
                },
              );
            });
        },
      );
    },
    { scope: ref, dependencies: [tier] },
  );

  const go = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    window.scrollTo({
      top: st.start + (i / LAST) * (st.end - st.start) + 1,
      behavior: "smooth",
    });
  };

  const onKey = (e: KeyboardEvent) => {
    const to = {
      ArrowDown: active + 1,
      ArrowUp: active - 1,
      Home: 0,
      End: LAST,
    }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const i = Math.max(0, Math.min(LAST, to));
    tabs.current[i]?.focus();
    go(i);
  };

  return (
    <FootageSection
      name="reef"
      mode="scrub"
      className="pm-reef"
      aria-labelledby="pm-services-title"
    >
      <div ref={ref} className="pm-reef__inner">
        <header className="pm-reef__head">
          <p className="pm-label">Services</p>
          <h2 id="pm-services-title" className="pm-reef__title">
            What we do best, and what your next project needs most.
          </h2>
        </header>
        <div className={`pm-svc${wheel ? " is-wheel" : ""}`}>
          {/* Hidden by CSS unless the wheel is on; it must exist before GSAP measures it. */}
          <div
            className="pm-wheel"
            role="tablist"
            aria-label="Services"
            aria-orientation="vertical"
            onKeyDown={onKey}
          >
            <div className="pm-wheel__drum">
              {SERVICES.map((s, i) => (
                <button
                  key={s.title}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`pm-svc-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls={`pm-svc-${i}`}
                  tabIndex={i === active ? 0 : -1}
                  className="pm-wheel__opt"
                  style={{ ["--i" as string]: i }}
                  onClick={() => go(i)}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
          <ol className="pm-services" role={wheel ? "none" : undefined}>
            {SERVICES.map((s, i) => (
              <li
                key={s.title}
                className="pm-service"
                {...(wheel && {
                  id: `pm-svc-${i}`,
                  role: "tabpanel",
                  "aria-labelledby": `pm-svc-tab-${i}`,
                  "data-active": i === active || undefined,
                })}
              >
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
        </div>

        <section className="pm-build" aria-labelledby="pm-build-title">
          <header className="pm-build__head">
            <p className="pm-label">Solutions</p>
            <h2 id="pm-build-title" className="pm-reef__title">
              What we build
            </h2>
            <p className="pm-page__lead">
              Five ways we help brands grow, each with its own team, process and
              track record.
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
