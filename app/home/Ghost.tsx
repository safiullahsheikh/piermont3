"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useDeviceTier, useReducedMotion } from "../motion/tier";

const GhostCursor = dynamic(() => import("../vendor/react-bits/GhostCursor"), { ssr: false });

const FINE = "(pointer: fine)";
const subscribe = (cb: () => void) => {
  const mq = matchMedia(FINE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Glowing trail after the pointer, like bioluminescence. Mouse and trackpad only; loads after first paint. */
export function Ghost() {
  const tier = useDeviceTier();
  const reduced = useReducedMotion();
  const fine = useSyncExternalStore(subscribe, () => matchMedia(FINE).matches, () => false);
  if (!fine || reduced || tier === "low") return null;
  return (
    <div className="pm-ghost" aria-hidden="true">
      <GhostCursor color="#7fa6ff" brightness={0.9} size={70} trailLength={40} bloomStrength={0.5} mixBlendMode="screen" clickPuff={false} zIndex={1} />
    </div>
  );
}
