"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { projectHref, type Project } from "../work/projects";
import { Arrow } from "./Arrow";

// A ring needs enough cards to close; short lists repeat (repeats are hidden from assistive tech).
const MIN_SLOTS = 8;
// Degrees of turn per pixel dragged.
const DRAG = 0.22;

/** Projects on a 3D ring: drag or swipe sideways, use the arrows, or Tab through the cards. */
export function ProjectRing({ projects }: { projects: Project[] }) {
  const reps = Math.ceil(MIN_SLOTS / projects.length);
  const slots = Array.from({ length: projects.length * reps }, (_, i) => projects[i % projects.length]);
  const n = slots.length;
  const step = 360 / n;

  // `turn` counts steps without wrapping, so the ring always takes the short way round.
  const [turn, setTurn] = useState(0);
  const [drag, setDrag] = useState(0);
  const start = useRef<{ x: number; moved: boolean } | null>(null);
  const moved = useRef(false);

  const front = (((turn - Math.round(drag / step)) % n) + n) % n;
  const current = slots[front];

  // Nearest turn that puts slot i in front.
  const turnTo = (i: number) => setTurn((t) => t + ((((i - t) % n) + n + n / 2) % n) - n / 2);

  return (
    <div className="pm-ring" style={{ "--n": n } as CSSProperties}>
      <div
        className="pm-ring__stage"
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          start.current = { x: e.clientX, moved: false };
          moved.current = false;
        }}
        onPointerMove={(e) => {
          const s = start.current;
          if (!s) return;
          const dx = e.clientX - s.x;
          if (!s.moved && Math.abs(dx) > 6) {
            s.moved = moved.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
          }
          if (s.moved) setDrag(dx * DRAG);
        }}
        onPointerUp={() => {
          if (start.current?.moved) {
            setTurn((t) => t - Math.round(drag / step));
            setDrag(0);
          }
          start.current = null;
        }}
        onPointerCancel={() => {
          start.current = null;
          setDrag(0);
        }}
        // A drag that ends on a card is not a click.
        onClickCapture={(e) => {
          if (moved.current) e.preventDefault();
          moved.current = false;
        }}
      >
        <ul
          className={drag ? "pm-ring__track is-dragging" : "pm-ring__track"}
          style={{ "--a": `${-turn * step + drag}deg` } as CSSProperties}
        >
          {slots.map((p, i) => {
            const repeat = i >= projects.length;
            return (
              <li
                key={i}
                className="pm-ring__card"
                style={{ "--i": i } as CSSProperties}
                data-front={i === front || undefined}
                aria-hidden={repeat || undefined}
              >
                <Link
                  href={projectHref(p)}
                  tabIndex={repeat ? -1 : undefined}
                  draggable={false}
                  onFocus={() => turnTo(i)}
                >
                  <Image src={p.image} alt={repeat ? "" : p.alt} fill sizes="(max-width: 768px) 70vw, 26rem" style={{ objectPosition: p.focus }} draggable={false} />
                  <span className="pm-ring__name">{p.client}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="pm-ring__controls">
        <button type="button" className="pm-ring__arrow" aria-label="Previous project" onClick={() => setTurn((t) => t - 1)}>
          <Arrow />
        </button>
        <p className="pm-ring__caption" aria-live="polite">
          <span className="pm-ring__client">{current.client}</span>
          <span className="pm-ring__service">{current.service}</span>
        </p>
        <button type="button" className="pm-ring__arrow" aria-label="Next project" onClick={() => setTurn((t) => t + 1)}>
          <Arrow />
        </button>
      </div>
    </div>
  );
}
