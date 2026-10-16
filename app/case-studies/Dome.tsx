"use client";

import dynamic from "next/dynamic";
import { useDeviceTier } from "../motion/tier";
import { PROJECTS } from "../work/projects";

const DomeGallery = dynamic(() => import("../vendor/react-bits/DomeGallery"), { ssr: false });

// 640 px versions from the image optimiser instead of 25 full-size PNGs.
const IMAGES = PROJECTS.map((p) => ({
  src: `/_next/image?url=${encodeURIComponent(p.image)}&w=640&q=75`,
  alt: `${p.client}: ${p.alt}`,
}));

/**
 * All 25 projects on a full-screen globe. Scrolling through the section turns it a full 360
 * (CSS scroll timeline drives --dg-spin); dragging turns it too; select a tile to bring it close.
 */
export function Dome() {
  const tier = useDeviceTier();
  if (tier === "low") return null;
  return (
    <section className="pm-dome" aria-label="Every project, as a gallery">
      <div className="pm-dome__stage">
        <DomeGallery
          images={IMAGES}
          grayscale={false}
          overlayBlurColor="#040a17"
          fit={0.62}
          minRadius={520}
          segments={30}
          imageBorderRadius="14px"
          openedImageBorderRadius="14px"
          openedImageWidth="min(70vw, 720px)"
          openedImageHeight="min(56vh, 460px)"
        />
        <p className="pm-dome__hint" aria-hidden="true">
          Scroll or drag to turn
        </p>
      </div>
    </section>
  );
}
