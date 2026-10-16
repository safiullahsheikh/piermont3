"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { hasCookieConsent, subscribeConsent } from "./CookieBanner";

// Google Analytics 4. Set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXX) at build time; without it nothing loads.
const ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Loads only after the visitor chooses Accept in the cookie banner. */
export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, hasCookieConsent, () => false);
  if (!ID || !consent) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ID}`} strategy="afterInteractive" />
      <Script id="pm-ga" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${ID}");`}
      </Script>
    </>
  );
}
