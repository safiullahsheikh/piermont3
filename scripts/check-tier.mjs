// Runnable check for the device-tier decision: `node scripts/check-tier.mjs` (Node 23.6+ strips the TS types).
import assert from "node:assert/strict";
import { pickTier } from "../app/motion/tier.ts";

const desktop = {
  reducedMotion: false, saveData: false, effectiveType: "4g", webgl2: true, softwareRenderer: false,
  maxTexture: 16384, memoryGb: 8, cores: 8, shortSide: 1080,
};
assert.equal(pickTier(desktop), "high");
assert.equal(pickTier({ ...desktop, cores: 4 }), "medium"); // e.g. an i7-8650U laptop
assert.equal(pickTier({ ...desktop, shortSide: 390 }), "medium"); // phone
assert.equal(pickTier({ ...desktop, reducedMotion: true }), "low");
assert.equal(pickTier({ ...desktop, saveData: true }), "low");
assert.equal(pickTier({ ...desktop, effectiveType: "slow-2g" }), "low");
assert.equal(pickTier({ ...desktop, webgl2: false }), "low");
assert.equal(pickTier({ ...desktop, softwareRenderer: true }), "low");
assert.equal(pickTier({ ...desktop, reducedMotion: true, forced: "high" }), "high"); // ?tier= override
assert.equal(pickTier({ ...desktop, forced: "bogus" }), "high");
console.log("pickTier: all checks passed");
