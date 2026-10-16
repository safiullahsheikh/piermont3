"use client";

import { useSyncExternalStore } from "react";

/**
 * Device tiers (brief 4.9).
 * high: full real-time scene and light bloom. medium: real-time, lighter assets, no post.
 * low: pre-rendered video and posters, no WebGL.
 * Force one for testing with ?tier=high|medium|low.
 */
export type Tier = "high" | "medium" | "low";

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

const REDUCED = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(REDUCED).matches;
}

/** Pure decision, kept separate from browser probing so it can be checked without a browser. */
export function pickTier(s: {
  forced?: string | null;
  reducedMotion: boolean;
  saveData: boolean;
  effectiveType?: string;
  webgl2: boolean;
  softwareRenderer: boolean;
  maxTexture: number;
  memoryGb: number;
  cores: number;
  shortSide: number;
}): Tier {
  if (s.forced === "high" || s.forced === "medium" || s.forced === "low") return s.forced;
  if (s.reducedMotion || s.saveData || /(^|-)2g$/.test(s.effectiveType ?? "")) return "low";
  if (!s.webgl2 || s.softwareRenderer) return "low";
  if (s.memoryGb >= 8 && s.cores >= 8 && s.maxTexture >= 8192 && s.shortSide >= 768) return "high";
  return "medium";
}

function probe(): Tier {
  const nav = navigator as NavigatorHints;
  let webgl2 = false;
  let softwareRenderer = false;
  let maxTexture = 0;
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    if (gl) {
      webgl2 = true;
      maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
      softwareRenderer = /swiftshader|llvmpipe|software|basic render/i.test(renderer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    // No WebGL: low tier.
  }
  return pickTier({
    forced: new URLSearchParams(location.search).get("tier"),
    reducedMotion: prefersReducedMotion(),
    saveData: Boolean(nav.connection?.saveData),
    effectiveType: nav.connection?.effectiveType,
    webgl2,
    softwareRenderer,
    maxTexture,
    memoryGb: nav.deviceMemory ?? 4,
    cores: navigator.hardwareConcurrency ?? 4,
    shortSide: Math.min(screen.width, screen.height),
  });
}

let cached: Tier | null = null;

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  const update = () => {
    cached = null;
    onChange();
  };
  mq.addEventListener("change", update);
  return () => mq.removeEventListener("change", update);
}

/** Server and first paint render the static tier; the real tier follows after hydration. */
export function useDeviceTier(): Tier {
  return useSyncExternalStore(
    subscribe,
    () => (cached ??= probe()),
    () => "low",
  );
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    prefersReducedMotion,
    () => false,
  );
}
