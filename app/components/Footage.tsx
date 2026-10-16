"use client";

import { type ComponentProps, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../motion/gsap";
import { useDeviceTier, useReducedMotion } from "../motion/tier";

type Props = ComponentProps<"section"> & {
  /** Clip in public/footage: `<name>-l|p.mp4` and `.webp` posters. */
  name: "hero" | "diver" | "reef" | "ascent";
  /** loop: ambient, plays while on screen. scrub: the clip's time follows scroll position. */
  mode: "loop" | "scrub";
  priority?: boolean;
};

/**
 * A chapter with footage behind it. The footage sits in a sticky, screen-sized stage
 * so it stays put while the chapter's content scrolls over it. The poster paints
 * first (and is all that low-tier devices and reduced motion ever get); the video
 * streams in after first paint, one screen before the chapter arrives.
 */
export function FootageSection({ name, mode, priority, className = "", children, ...rest }: Props) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const tier = useDeviceTier();
  const reduced = useReducedMotion();
  const live = tier !== "low" && !reduced;

  useGSAP(
    () => {
      const v = video.current;
      const s = section.current;
      if (!live || !v || !s) return;
      let loaded = false;
      const load = () => {
        if (loaded) return;
        loaded = true;
        v.src = `/footage/${name}-${innerHeight > innerWidth ? "p" : "l"}.mp4`;
        v.load();
      };
      v.addEventListener("loadeddata", () => v.classList.add("is-ready"), { once: true });
      const range = { trigger: s, start: "top bottom", end: "bottom top" };

      if (mode === "loop") {
        ScrollTrigger.create({
          ...range,
          onToggle: (st) => {
            if (!st.isActive) return v.pause();
            load();
            v.play().catch(() => {});
          },
        });
        return;
      }

      // Scrub: ease the playhead towards the scroll position rather than jumping, and
      // never queue a seek while one is still decoding.
      let want = 0;
      let at = 0;
      let ready = false;
      v.addEventListener(
        "loadedmetadata",
        () => {
          ready = true;
          // iOS only paints seeked frames once the element has played.
          v.play().then(() => v.pause(), () => {});
        },
        { once: true },
      );
      const tick = () => {
        if (!ready || v.seeking) return;
        at += (want - at) * 0.14;
        if (Math.abs(v.currentTime - at) > 1 / 60) v.currentTime = at;
      };
      ScrollTrigger.create({ trigger: s, start: "top 250%", once: true, onEnter: load });
      ScrollTrigger.create({
        ...range,
        onUpdate: (st) => {
          want = st.progress * (v.duration || 0);
        },
        onToggle: (st) => (st.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
      });
      return () => gsap.ticker.remove(tick);
    },
    { scope: section, dependencies: [live] },
  );

  return (
    <section ref={section} className={`pm-chapter pm-chapter--${name} ${className}`} {...rest}>
      <div className="pm-chapter__stage" aria-hidden="true">
        <picture>
          <source media="(orientation: portrait)" srcSet={`/footage/${name}-p.webp`} />
          <img
            src={`/footage/${name}-l.webp`}
            alt=""
            className="pm-chapter__poster"
            fetchPriority={priority ? "high" : "auto"}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        </picture>
        {live && (
          <video
            ref={video}
            className="pm-chapter__video"
            muted
            playsInline
            loop={mode === "loop"}
            preload="none"
          />
        )}
        <div className="pm-chapter__shade" />
      </div>
      <div className="pm-chapter__body">{children}</div>
    </section>
  );
}
