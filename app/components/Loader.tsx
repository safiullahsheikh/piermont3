"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SoundToggle } from "./SoundToggle";

const KEY = "piermont-loaded";
const noop = () => () => {};

/** Runs before paint: once per session, and never for reduced motion. */
export const LOADER_SCRIPT = `try{var d=document.documentElement;if(sessionStorage.getItem("${KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("loader-seen");else d.classList.add("loader-playing")}catch(e){document.documentElement.classList.add("loader-seen")}`;

// In the order the client asked for.
const WELCOME = [
  { text: "Bienvenidos", lang: "es" },
  { text: "Welcome", lang: "en" },
  { text: "أهلاً وسهلاً", lang: "ar", dir: "rtl" },
  { text: "Bienvenue", lang: "fr" },
  { text: "欢迎", lang: "zh-Hans" },
] as const;

/**
 * Pier footage under the logo, which writes in; "welcome" in five languages; then a
 * ripple opens from the centre and reveals the page. The sequence is CSS so it starts
 * on first paint, before hydration. Click, tap, Escape or any key skips to the ripple.
 */
export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  // Set by LOADER_SCRIPT before paint; false on the server.
  const seen = useSyncExternalStore(
    noop,
    () => document.documentElement.classList.contains("loader-seen"),
    () => false,
  );

  useEffect(() => {
    const root = document.documentElement;
    if (seen) return;
    const finish = () => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      root.classList.remove("loader-playing");
      root.classList.add("loader-seen");
      setDone(true);
    };
    const skip = () => ref.current?.classList.add("is-skipping");
    const onKey = (e: KeyboardEvent) => {
      // Tab, Enter and Space are how the sound switch is reached and pressed.
      if (!["Tab", "Enter", " ", "Shift"].includes(e.key)) skip();
    };
    window.addEventListener("keydown", onKey);
    // Safety net if animationend never fires (background tab, etc.).
    const t = window.setTimeout(finish, 6500);
    const el = ref.current;
    const onEnd = (e: AnimationEvent) => e.target === el && e.animationName.startsWith("pm-loader-") && e.animationName !== "pm-loader-drift" && finish();
    el?.addEventListener("animationend", onEnd);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      el?.removeEventListener("animationend", onEnd);
    };
  }, [seen]);

  if (done || seen) return null;

  return (
    <div ref={ref} className="pm-loader" onClick={() => ref.current?.classList.add("is-skipping")}>
      <div className="pm-loader__stage" aria-hidden="true">
        <video className="pm-loader__video" autoPlay muted loop playsInline poster="/footage/loader-l.webp">
          <source src="/footage/loader-p.mp4" type="video/mp4" media="(orientation: portrait)" />
          <source src="/footage/loader-l.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Water ripple on the logo: strong as it surfaces, calm by the time the words start. SMIL, so it runs before hydration. */}
      <svg className="pm-loader__fx" aria-hidden="true" focusable="false">
        <filter id="pm-ripple" x="-10%" y="-30%" width="120%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.05" numOctaves="2" seed="4" result="water">
            <animate attributeName="baseFrequency" dur="5s" values="0.006 0.05;0.008 0.065;0.006 0.05" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="water" scale="2" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" values="46;2" dur="2.4s" begin="0s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.16 1 0.3 1" />
          </feDisplacementMap>
        </filter>
      </svg>
      <div className="pm-loader__center">
        {/* eslint-disable-next-line @next/next/no-img-element -- must paint before hydration */}
        <img src="/FooterLogo.png" alt="Piermont Studios" className="pm-loader__logo" width={480} height={200} />
        <p className="pm-loader__words">
          <span className="sr-only">Welcome</span>
          {WELCOME.map((w, i) => (
            <span
              key={w.lang}
              lang={w.lang}
              dir={"dir" in w ? w.dir : undefined}
              className="pm-loader__word"
              style={{ ["--i" as string]: i }}
              aria-hidden="true"
            >
              {w.text}
            </span>
          ))}
        </p>
      </div>
      <span className="pm-loader__ring" aria-hidden="true" />
      <SoundToggle className="pm-loader__sound" />
    </div>
  );
}
