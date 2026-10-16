"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "../components/Arrow";
import { LazyVideo } from "../components/LazyVideo";
import { gsap, ScrollTrigger, useGSAP } from "../motion/gsap";
import { useDeviceTier } from "../motion/tier";
import { useSound } from "../sound/waves";
import { SOLUTIONS } from "../solutions/solutions";
import OptionWheel from "../vendor/react-bits/OptionWheel";
import { SERVICES } from "./services";

const TITLES = SERVICES.map((s) => s.title);
const LAST = SERVICES.length - 1;

/**
 * Chapter 03, services, still over the diver footage (page.tsx). On large screens the six
 * services sit on the React Bits option wheel: it holds still and scrolling turns it;
 * clicking a service or the arrow keys scroll to it. The chosen one opens beside it over its own
 * video. Elsewhere the services are panels, each over its video, that tip up out of the water.
 * Then the five solutions.
 */
export function ServicesReef() {
  const ref = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  // The service the scroll position points at; a change from anywhere else scrolls there.
  const fromScroll = useRef(0);
  const tier = useDeviceTier();
  const sound = useSound();
  const [wheel, setWheel] = useState(false);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(0);

  // The runway grows when the wheel mounts; measure again.
  useEffect(() => ScrollTrigger.refresh(), [wheel]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        setWheel(true);
        // CSS sticky holds the wheel (home.css); this only reads how far through the runway we are.
        trigger.current = ScrollTrigger.create({
          trigger: ref.current!.querySelector(".pm-svc-run"),
          start: "top top",
          end: "bottom bottom",
          onUpdate: (st) => {
            const p = st.progress * LAST;
            fromScroll.current = Math.round(p);
            setPos(Math.round(p * 100) / 100);
          },
        });
        return () => {
          setWheel(false);
          trigger.current = null;
        };
      });
      if (tier === "low") return;
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
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
    { scope: ref, dependencies: [tier] },
  );

  const go = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    window.scrollTo({ top: st.start + (i / LAST) * (st.end - st.start) + 1, behavior: "smooth" });
  };

  return (
    <section className="pm-reef" aria-labelledby="pm-services-title">
      <div ref={ref} className="pm-reef__inner">
        <header className="pm-reef__head">
          <p className="pm-label">Services</p>
          <h2 id="pm-services-title" className="pm-reef__title">
            What we do best, and what your next project needs most.
          </h2>
        </header>
        <div className="pm-svc-run">
        <div className={`pm-svc${wheel ? " is-wheel" : ""}`}>
          {wheel && (
            <OptionWheel
              items={TITLES}
              defaultSelected={0}
              position={pos}
              captureWheel={false}
              onChange={(i) => {
                setActive(i);
                if (i !== fromScroll.current) go(i);
              }}
              ariaLabel="Services"
              textColor="var(--pm-mist)"
              activeColor="var(--pm-foam)"
              side="left"
              fontSize={3}
              spacing={1.4}
              curve={1}
              tilt={6}
              blur={2}
              fade={0.25}
              smoothing={200}
              inset={80}
              loop={false}
              // Scroll turns it now; a drag would fight the scroll.
              draggable={false}
              // The tick follows the site's sound switch: silent unless the visitor turned sound on.
              soundUrl={sound ? "/sounds/click-soft.mp3" : ""}
              soundVolume={0.5}
              className="pm-owheel"
            />
          )}
          <ol className="pm-services">
            {SERVICES.map((s, i) => (
              <li key={s.title} className="pm-service" data-active={(wheel && i === active) || undefined}>
                <div className="pm-service__media" aria-hidden="true">
                  {"image" in s ? (
                    <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" />
                  ) : (
                    // On the wheel only the open card's video decodes; hidden cards still count as on screen.
                    tier !== "low" && (!wheel || i === active) && <LazyVideo src={s.video} className="pm-service__video" />
                  )}
                </div>
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
        </div>

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
    </section>
  );
}
