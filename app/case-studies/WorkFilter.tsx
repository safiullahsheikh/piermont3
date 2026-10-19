"use client";

import Link from "next/link";
import { Fragment, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import AnimatedBackground from "../vendor/21st/animated-background";
import { AnimatedGroup } from "../vendor/21st/animated-group";

export type FilterTab = { id: string; label: string; count: number; intro?: string; href?: string };
export type FilterItem = { key: string; group: string; card: ReactNode };

// The 21st.dev AnimatedBackground tabs spring and AnimatedGroup image-grid variants, as in their demos.
const PILL = { type: "spring", bounce: 0.2, duration: 0.6 } as const;
const GRID = {
  container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } },
  item: {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, type: "spring", bounce: 0.3 } },
  },
} as const;

/**
 * Service tabs over the project grid. The pill slides between tabs; after a change the cards
 * rise in. The first render is the plain grid (all projects), so it works before and without JS.
 */
export function WorkFilter({ tabs, items }: { tabs: FilterTab[]; items: FilterItem[] }) {
  const [active, setActive] = useState("all");
  const [changed, setChanged] = useState(false);
  const still = useReducedMotion();
  const list = useRef<HTMLDivElement>(null);
  const tab = tabs.find((t) => t.id === active)!;
  const cards = items
    .filter((i) => active === "all" || i.group === active)
    .map((i) => <Fragment key={i.key}>{i.card}</Fragment>);

  // Arrow keys, Home and End move between tabs (WAI-ARIA tabs, automatic activation).
  const onKey = (e: KeyboardEvent) => {
    const btns = [...list.current!.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const i = btns.indexOf(document.activeElement as HTMLButtonElement);
    const to = ({ ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: btns.length - 1 } as Record<string, number>)[e.key];
    if (i < 0 || to === undefined) return;
    e.preventDefault();
    const next = btns[(to + btns.length) % btns.length];
    next.focus();
    next.click();
  };

  return (
    <>
      <div ref={list} role="tablist" aria-label="Filter by service" className="pm-tabs" onKeyDown={onKey}>
        <AnimatedBackground
          defaultValue="all"
          className="pm-tabs__pill"
          transition={PILL}
          onValueChange={(id) => {
            if (id && id !== active) {
              setActive(id);
              setChanged(true);
            }
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              data-id={t.id}
              type="button"
              role="tab"
              id={`pm-tab-${t.id}`}
              aria-controls="pm-work-panel"
              tabIndex={t.id === active ? 0 : -1}
              className="pm-tabs__tab"
            >
              {t.label}
              <span className="pm-tabs__count">{t.count}</span>
            </button>
          ))}
        </AnimatedBackground>
      </div>

      <div id="pm-work-panel" role="tabpanel" aria-labelledby={`pm-tab-${active}`} className="pm-work-panel">
        <p className="pm-work-panel__status" aria-live="polite">
          {tab.intro ?? `All ${items.length} case studies across ${tabs.length - 1} services.`}
          {tab.href && (
            <>
              {" "}
              <Link href={tab.href} className="pm-link">
                {tab.label} case studies page
              </Link>
            </>
          )}
        </p>
        {changed && !still ? (
          <AnimatedGroup key={active} className="pm-work-grid" variants={GRID}>
            {cards}
          </AnimatedGroup>
        ) : (
          <div className="pm-work-grid">{cards}</div>
        )}
      </div>
    </>
  );
}
