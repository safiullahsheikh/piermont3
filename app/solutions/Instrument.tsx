"use client";

import { useReducedMotion } from "framer-motion";
import { LazyVideo } from "../components/LazyVideo";
import { Spotlight } from "../vendor/21st/spotlight";
import { Tilt } from "../vendor/21st/tilt";

const SPRING = { stiffness: 26.7, damping: 4.1, mass: 0.2 };

// The production feed on /solutions/social-media-design; the middle phone plays, the rest are stills.
const FEED = [
  { name: "Murder Of Crows", poster: "/projects/videdit1.png" },
  { name: "City Eyes", poster: "/projects/videdit2.png" },
  { name: "Giant Steps", poster: "/projects/videdit3.png", video: "/projects/videdit3.mp4" },
  { name: "Times Square Switch", poster: "/projects/videdit4.png" },
  { name: "The Getaway", poster: "/projects/marketing1.png" },
];

// The production type specimen on /solutions/branding.
const SWATCHES = [
  { name: "Signal", hex: "#FF4F1F" },
  { name: "Ink", hex: "#141414" },
  { name: "Paper", hex: "#F4EFE6" },
  { name: "Sage", hex: "#A9B8A0" },
  { name: "Sand", hex: "#D9C3A0" },
];

function Body({ slug }: { slug: string }) {
  switch (slug) {
    case "website-development":
      return (
        <div className="pm-instr__browser">
          <p className="pm-instr__bar">
            <i />
            <i />
            <i />
            <span>piermontstudios.com/your-next-site</span>
          </p>
          <LazyVideo src="/projects/augen.mp4" poster="/projects/augen.png" className="pm-instr__fill" />
        </div>
      );
    case "social-media-design":
      return (
        <div className="pm-instr__feed">
          {FEED.map((f) => (
            <figure key={f.name} className="pm-instr__phone">
              {f.video ? (
                <LazyVideo src={f.video} poster={f.poster} className="pm-instr__fill" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- decorative still inside a mockup
                <img src={f.poster} alt="" className="pm-instr__fill" loading="lazy" decoding="async" />
              )}
              <figcaption>
                <span>@yourbrand</span>
                {f.name}
              </figcaption>
            </figure>
          ))}
        </div>
      );
    case "ad-campaigns":
      return (
        <div className="pm-instr__ad">
          <p className="pm-instr__ad-head">
            <i />
            <span>
              Your brand
              <small>Sponsored</small>
            </span>
          </p>
          <div className="pm-instr__ad-media">
            <LazyVideo src="/projects/marketing1.mp4" poster="/projects/marketing1.png" className="pm-instr__fill" />
          </div>
          <p className="pm-instr__ad-foot">
            Shop the collection
            <span>Shop now</span>
          </p>
        </div>
      );
    case "ai-development":
      return (
        <div className="pm-instr__ai">
          <p className="pm-instr__prompt">
            <span className="pm-instr__spark">✦</span>
            <span className="pm-instr__typed">Summarise this week’s orders by region</span>
            <span className="pm-instr__send">↑</span>
          </p>
          <span className="pm-instr__line" />
          <span className="pm-instr__line" />
          <span className="pm-instr__line" />
          <p className="pm-instr__chips">
            <span>Automate</span>
            <span>Summarise</span>
            <span>Assist</span>
            <span>Predict</span>
          </p>
        </div>
      );
    case "branding":
      return (
        <div className="pm-instr__specimen">
          <p className="pm-instr__spec-head">
            <span>Type specimen</span>
            <span>01 / 05</span>
          </p>
          <p className="pm-instr__aa">Aa</p>
          <p className="pm-instr__spec-faces">
            <span>Display · Serif</span>
            <span>Text · Sans</span>
          </p>
          <ul className="pm-instr__swatches">
            {SWATCHES.map((s) => (
              <li key={s.name} style={{ background: s.hex }}>
                <span>{s.name}</span>
                <span>{s.hex}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

/**
 * Each solution's signature object (the production hero visuals, relit underwater). It stands in
 * for the brief's Spline icon: it tilts toward the cursor with a glare that follows it, using the
 * 21st.dev Tilt and Spotlight pairing from their demo (rotation 6, stiffness 26.7, damping 4.1).
 * Reduced motion: still. Decorative: the page says it in words.
 */
export function Instrument({ slug }: { slug: string }) {
  const still = useReducedMotion();
  const body = (
    <div className="pm-instr__body">
      <Body slug={slug} />
    </div>
  );
  return (
    <div className="pm-instr" aria-hidden="true">
      {still ? (
        body
      ) : (
        <Tilt rotationFactor={6} isRevese springOptions={SPRING} className="pm-instr__tilt">
          <Spotlight className="z-10 from-white/40 via-white/15 to-white/5 blur-2xl" size={248} springOptions={SPRING} />
          {body}
        </Tilt>
      )}
    </div>
  );
}
