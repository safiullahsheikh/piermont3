"use client";

// The single place GSAP and its plugins are registered. Import gsap from here, never from "gsap" directly.
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);
  CustomEase.create("buoyant", "M0,0 C0.18,0.62 0.36,1.04 0.6,1.035 0.78,1.03 0.88,1 1,1");
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
