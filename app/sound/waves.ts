"use client";

import { useSyncExternalStore } from "react";

// Gentle sea, synthesised in the browser: brown noise through a low-pass filter whose
// cutoff and level swell on an irregular 7 to 11 s cycle (one swell per wave), left and
// right breaking a moment apart, plus a faint high-passed foam hiss after each crest.
// Nothing to download or license. Off until the visitor turns it on (autoplay rules
// need that click anyway).

const LEVEL = 0.32;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sides: { filter: BiquadFilterNode; gain: GainNode }[] = [];
let foam: GainNode | null = null;
let timer = 0;
let on = false;
const listeners = new Set<() => void>();

function noise(c: AudioContext, seconds: number, brown: boolean) {
  const buffer = c.createBuffer(1, c.sampleRate * seconds, c.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = brown ? last * 3.5 : white;
  }
  return buffer;
}

function loop(c: AudioContext, buffer: AudioBuffer, offset: number) {
  const source = c.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.start(0, offset);
  return source;
}

function build(c: AudioContext) {
  master = c.createGain();
  master.gain.value = 0;
  master.connect(c.destination);

  const brown = noise(c, 9, true);
  sides = [-0.55, 0.55].map((pan, i) => {
    const filter = c.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 380;
    filter.Q.value = 0.3;
    const gain = c.createGain();
    gain.gain.value = 0.18;
    const panner = c.createStereoPanner();
    panner.pan.value = pan;
    // Offset start so the two sides never play the same stretch of noise.
    loop(c, brown, i * 4.1).connect(filter).connect(gain).connect(panner).connect(master!);
    return { filter, gain };
  });

  const hiss = c.createBiquadFilter();
  hiss.type = "highpass";
  hiss.frequency.value = 2600;
  foam = c.createGain();
  foam.gain.value = 0;
  loop(c, noise(c, 5, false), 0).connect(hiss).connect(foam).connect(master);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) void ctx?.suspend();
    else if (on) void ctx?.resume();
  });
}

function swell() {
  if (!ctx || !on || !foam) return;
  const t = ctx.currentTime;
  const period = 7 + Math.random() * 4;
  const rise = period * (0.35 + Math.random() * 0.15);
  const fall = (period - rise) / 3;
  const peak = 0.55 + Math.random() * 0.35;
  sides.forEach(({ filter, gain }, i) => {
    const lag = i * (0.2 + Math.random() * 0.5);
    gain.gain.setTargetAtTime(peak, t + lag, rise / 3);
    filter.frequency.setTargetAtTime(900 + peak * 900, t + lag, rise / 3);
    gain.gain.setTargetAtTime(0.18, t + lag + rise, fall);
    filter.frequency.setTargetAtTime(380, t + lag + rise, fall);
  });
  foam.gain.setTargetAtTime(0.045 * peak, t + rise * 0.9, 0.35);
  foam.gain.setTargetAtTime(0, t + rise + 0.8, 1.2);
  timer = window.setTimeout(swell, period * 1000);
}

export function setSound(next: boolean) {
  on = next;
  listeners.forEach((fn) => fn());
  window.clearTimeout(timer);
  if (next) {
    ctx ??= new AudioContext();
    if (!master) build(ctx);
    void ctx.resume();
    master!.gain.cancelScheduledValues(ctx.currentTime);
    master!.gain.setTargetAtTime(LEVEL, ctx.currentTime, 0.8);
    swell();
  } else if (ctx && master) {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
    window.setTimeout(() => !on && void ctx?.suspend(), 1500);
  }
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function useSound() {
  return useSyncExternalStore(
    subscribe,
    () => on,
    () => false,
  );
}
