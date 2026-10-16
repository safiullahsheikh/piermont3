"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "./gsap";
import { dur, ease, stagger } from "./tokens";

/**
 * Section entrance (brief 4.6), once per element:
 * [data-reveal="heading"] rises line by line behind a mask, [data-reveal="fade"] fades up.
 * Only elements still below the fold animate, so the first paint never flickers,
 * and content is fully visible without JavaScript. Reduced motion: nothing moves.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.9;
        const pick = (kind: string) =>
          Array.from(root.querySelectorAll<HTMLElement>(`[data-reveal="${kind}"]`)).filter(belowFold);

        for (const el of pick("heading")) {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: dur.long,
                ease: ease.out,
                stagger: stagger.text,
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              }),
          });
        }
        for (const el of pick("fade")) {
          gsap.from(el, {
            autoAlpha: 0,
            y: 24,
            duration: dur.medium,
            ease: ease.out,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        }
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
