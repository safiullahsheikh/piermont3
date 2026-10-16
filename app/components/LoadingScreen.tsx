"use client";

import { useEffect, useState } from "react";

const KEY = "piermont-loaded";

/** Runs before paint: returning visitors (same session) and reduced motion skip the loader. */
export const LOADER_SCRIPT = `try{var d=document.documentElement;if(sessionStorage.getItem("${KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("loader-seen");else d.classList.add("loader-playing")}catch(e){document.documentElement.classList.add("loader-seen")}`;

const GREETINGS = [
  { text: "Hello", lang: "en" },
  { text: "Hola", lang: "es" },
  { text: "Bonjour", lang: "fr" },
  { text: "مرحبا", lang: "ar", dir: "rtl" },
  { text: "你好", lang: "zh" },
] as const;

/**
 * 3s intro: the logo writes itself in, the greeting cycles through five
 * languages, then the curtain lifts. All motion is CSS so it starts on first
 * paint, before hydration.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  const finish = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const root = document.documentElement;
    root.classList.remove("loader-playing");
    root.classList.add("loader-seen");
    setDone(true);
  };

  useEffect(() => {
    // Already hidden by CSS for returning visitors.
    if (document.documentElement.classList.contains("loader-seen")) return;
    // Safety net in case animationend never fires (tab hidden, etc.).
    const t = window.setTimeout(finish, 3600);
    return () => window.clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div
      className="loader"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.animationName === "loader-lift") finish();
      }}
    >
      <div className="loader-stage">
        {/* eslint-disable-next-line @next/next/no-img-element -- must paint before hydration */}
        <img src="/FooterLogo.png" alt="" className="loader-logo" width={480} height={200} />
        <div className="loader-greeting">
          {GREETINGS.map((g, i) => (
            <span
              key={g.lang}
              lang={g.lang}
              dir={"dir" in g ? g.dir : undefined}
              className="loader-word"
              style={{ ["--i" as string]: i }}
            >
              {g.text}
            </span>
          ))}
        </div>
        <span className="loader-line" />
      </div>
    </div>
  );
}
