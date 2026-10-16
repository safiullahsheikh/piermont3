"use client";

import { useEffect } from "react";
import { useDeviceTier, useReducedMotion } from "./tier";

/** Publishes the motion state on <html> so CSS and later scenes can read it: data-tier, data-motion. */
export function MotionRoot() {
  const tier = useDeviceTier();
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.tier = tier;
    root.dataset.motion = reduced ? "reduced" : "full";
  }, [tier, reduced]);

  return null;
}
