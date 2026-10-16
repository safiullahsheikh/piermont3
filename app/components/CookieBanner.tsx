"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const KEY = "piermont-cookie-consent";
const EVENT = "piermont-consent-change";

export function subscribeConsent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

// Fallback when storage is blocked, so the choice still sticks for this visit.
let memoryConsent = "";

function readConsent() {
  try {
    return localStorage.getItem(KEY) ?? memoryConsent;
  } catch {
    return memoryConsent;
  }
}

/** Read this before loading any analytics or marketing script. */
export function hasCookieConsent() {
  return readConsent() === "accepted";
}

export function CookieBanner() {
  // "unset" on the server so nothing renders until we know the stored choice.
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => "unset");

  if (consent !== "") return null;

  const choose = (value: "accepted" | "declined") => {
    memoryConsent = value;
    try {
      localStorage.setItem(KEY, value);
    } catch {
      // Storage blocked: memoryConsent keeps it hidden for this visit.
    }
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <div
      className="pm-consent"
      role="region"
      aria-label="Cookie consent"
    >
      <p>
        We use cookies to improve your experience and understand how the site
        is used. <Link href="/privacy">Privacy policy</Link>
      </p>
      <div className="pm-consent__actions">
        <button
          type="button"
          className="pm-button is-ghost"
          onClick={() => choose("declined")}
        >
          Decline
        </button>
        <button
          type="button"
          className="pm-button"
          onClick={() => choose("accepted")}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
