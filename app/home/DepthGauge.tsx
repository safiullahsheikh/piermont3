"use client";

import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "../motion/gsap";

const MAX_DEPTH = 40; // metres at the deepest point of the page

/** Diver's depth gauge on the right edge: 0 m at the surface, deepest mid-page, back to 0 m at contact. */
export function DepthGauge() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const value = el.querySelector<HTMLElement>(".pm-gauge__value")!;
    ScrollTrigger.create({
      trigger: el.parentElement,
      start: "top top",
      end: "bottom bottom",
      onToggle: (st) => el.classList.toggle("is-on", st.isActive),
      onUpdate: (st) => {
        const depth = Math.round(MAX_DEPTH * Math.sin(Math.PI * st.progress));
        el.style.setProperty("--p", String(st.progress));
        value.textContent = `${depth} m`;
      },
    });
  });

  return (
    <div ref={ref} className="pm-gauge" aria-hidden="true">
      <span className="pm-gauge__track">
        <span className="pm-gauge__mark" />
      </span>
      <span className="pm-gauge__value">0 m</span>
    </div>
  );
}
