"use client";

import Link from "next/link";
import { useId, useState } from "react";

export function FooterLogoLiquid() {
  const [hovered, setHovered] = useState(false);
  const uid = useId().replace(/:/g, "");
  const filterId = `footer-liquid-${uid}`;

  return (
    <Link
      href="/"
      aria-label="Piermont Studios home"
      className={`footer-watermark ${hovered ? "is-liquid" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg className="liquid-svg-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id={filterId}
            x="-20%"
            y="-30%"
            width="140%"
            height="160%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.035"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="2.6s"
                values="0.009 0.028;0.024 0.055;0.009 0.028"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={20}
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                dur="2.6s"
                values="10;24;14;22;10"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <img
        src="/FooterLogo.png"
        alt=""
        className="footer-watermark-logo"
        style={hovered ? { filter: `url(#${filterId})` } : undefined}
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    </Link>
  );
}
