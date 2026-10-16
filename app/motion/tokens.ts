// Motion tokens (brief 4.1). CSS mirrors these in app/styles/tokens.css.

/** Seconds, as GSAP expects. */
export const dur = {
  micro: 0.15,
  short: 0.3,
  medium: 0.6,
  long: 1.2,
  cinematic: 2.8,
} as const;

export const ease = {
  out: "expo.out",
  inOut: "power2.inOut",
  /** Registered in ./gsap: a slow settle with a slight overshoot, like an object finding its depth. */
  buoyant: "buoyant",
  drift: "sine.inOut",
} as const;

export const stagger = {
  text: 0.06,
  cards: 0.08,
} as const;
