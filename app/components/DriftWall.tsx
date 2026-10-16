"use client";

import { type ReactNode, useEffect, useRef } from "react";

const GAP = 72; // px between marks in a lane
const SPEEDS = [34, 26, 42]; // px/s per lane, so lanes slide past each other
const CRAWL = 0.12; // speed factor under the pointer

/**
 * Logo wall that drifts right and changes lanes: each mark is tracked on its own,
 * and one that leaves the right edge is dealt into whichever lane has the most room
 * on the left, so no row repeats and nothing overlaps. A pointer slows the wall to a
 * crawl. Written for this site after the behaviour of Driftwall (21st.dev, MIT);
 * that source needs an API key, so none of it is copied here.
 * Static wrapped row until JavaScript runs, and for reduced motion.
 */
export function DriftWall({ items, label }: { items: { key: string; node: ReactNode }[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const wall = ref.current;
    if (!wall || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(wall.children) as HTMLElement[];
    const lanes = SPEEDS.length;
    wall.classList.add("is-drifting");
    let width = wall.clientWidth;
    const marks = els.map((el, i) => ({ el, w: el.offsetWidth, lane: i % lanes, x: 0 }));
    // Deal the marks across each lane, the first ones already on screen.
    const cursor = new Array(lanes).fill(width);
    marks.forEach((m) => {
      cursor[m.lane] -= m.w + GAP + (m.lane * 40);
      m.x = cursor[m.lane];
    });

    let factor = 1;
    let goal = 1;
    let last = performance.now();
    let raf = 0;
    let visible = false;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      factor += (goal - factor) * (1 - Math.exp(-dt / 0.25));
      for (const m of marks) {
        m.x += SPEEDS[m.lane] * factor * dt;
        if (m.x > width) {
          // Re-enter in the lane whose leftmost mark has drifted furthest right.
          const room = (lane: number) => Math.min(width, ...marks.filter((o) => o !== m && o.lane === lane).map((o) => o.x));
          const lane = [...Array(lanes).keys()].filter((l) => l !== m.lane).reduce((a, b) => (room(b) > room(a) ? b : a));
          m.lane = lane;
          m.x = Math.min(room(lane) - GAP - m.w, -m.w);
        }
        m.el.style.transform = `translate3d(${m.x.toFixed(1)}px, ${m.lane * 100}%, 0)`;
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(wall);
    const ro = new ResizeObserver(() => (width = wall.clientWidth));
    ro.observe(wall);
    const slow = () => (goal = CRAWL);
    const go = () => (goal = 1);
    wall.addEventListener("pointerenter", slow);
    wall.addEventListener("pointerleave", go);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wall.removeEventListener("pointerenter", slow);
      wall.removeEventListener("pointerleave", go);
      wall.classList.remove("is-drifting");
      els.forEach((el) => (el.style.transform = ""));
    };
  }, []);

  return (
    <ul ref={ref} className="pm-drift" aria-label={label} style={{ ["--lanes" as string]: SPEEDS.length }}>
      {items.map((it) => (
        <li key={it.key} className="pm-drift__mark">
          {it.node}
        </li>
      ))}
    </ul>
  );
}
