"use client";

import { useId, useState } from "react";

const LINE_ONE = "We Strategize Build";
const LINE_TWO = "and Promote";

export function GlitchHeadline() {
  const [hovered, setHovered] = useState(false);
  const uid = useId().replace(/:/g, "");
  const filterId = `liquid-filter-${uid}`;

  return (
    <h1
      className={`anim-title liquid-headline relative pt-20 text-[2rem] xl:pt-12 text-center xl:text-[clamp(2.05rem,5.3vw,3.55rem)] font-normal leading-[1.08] tracking-[-0.04em] text-black ${hovered ? "is-liquid" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={hovered ? { filter: `url(#${filterId})` } : undefined}
    >
      <svg className="liquid-svg-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.04"
              numOctaves="2"
              seed="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="5s"
                values="0.01 0.03;0.025 0.06;0.01 0.03"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={18}
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                dur="5s"
                values="12;22;14;20;12"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <span className="sr-only">
        {LINE_ONE} {LINE_TWO}
      </span>
      <span aria-hidden="true" className="relative mx-auto block max-w-full text-balance">
        {LINE_ONE}
      </span>
      <span aria-hidden="true" className="mt-[0.02em] block">
        {LINE_TWO}
      </span>
    </h1>
  );
}
