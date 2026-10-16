"use client";

import dynamic from "next/dynamic";
import { useDeviceTier } from "../motion/tier";
import { PROJECTS } from "../work/projects";

const DomeGallery = dynamic(() => import("../vendor/react-bits/DomeGallery"), { ssr: false });

// Video shapes from ffprobe; every other project video is 1280 x 800.
const SHAPES: Record<string, number> = {
  "/projects/marketing1.mp4": 720 / 1280,
  "/projects/marketing2.mp4": 720 / 1280,
  "/projects/marketing3.mp4": 1280 / 960,
  "/projects/marketing4.mp4": 960 / 1280,
  "/projects/videdit1.mp4": 958 / 1280,
  "/projects/videdit2.mp4": 1280 / 720,
  "/projects/videdit3.mp4": 960 / 1280,
  "/projects/videdit4.mp4": 720 / 1280,
};

// The 25 case studies. Tiles show a 640 px still, play the video under the mouse, and open it at
// its own shape (Pantry has no video, so its image opens).
const ITEMS = PROJECTS.map((p) => ({
  src: `/_next/image?url=${encodeURIComponent(p.image)}&w=640&q=75`,
  alt: `${p.client}: ${p.alt}`,
  video: p.video,
  aspect: p.video ? (SHAPES[p.video] ?? 1280 / 800) : p.width / p.height,
}));

/** All 25 projects on a full-screen globe that turns with the mouse; drag to turn it on touch. */
export function Dome() {
  const tier = useDeviceTier();
  if (tier === "low") return null;
  return (
    <section className="pm-dome" aria-label="Every project, as a gallery">
      <div className="pm-dome__stage">
        <DomeGallery
          images={ITEMS}
          cursorSpin={360}
          // Settings from your reference, 2026-10-16.
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          // Greyscale comes from one blend layer over the tiles (shell.css), not a filter on every tile.
          grayscale={false}
          overlayBlurColor="#040a17"
          imageBorderRadius="14px"
          openedImageBorderRadius="14px"
        />
        <p className="pm-dome__hint" aria-hidden="true">
          Move to turn, click to play
        </p>
      </div>
    </section>
  );
}
