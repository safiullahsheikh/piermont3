import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactSection } from "./components/ContactSection";
import { GlitchHeadline } from "./components/GlitchHeadline";
import { HeroComputer } from "./components/HeroComputer";
import { HomeVideo } from "./components/HomeVideo";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { StoriesSection } from "./components/StoriesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { EMAIL, PHONE, SITE_URL, SOCIALS } from "./site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Piermont Studios",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/og.png`,
  description: "We Strategize Build and Promote",
  email: EMAIL,
  telephone: PHONE.e164,
  sameAs: SOCIALS.map((s) => s.href),
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "30 N Gould St, Ste R",
      addressLocality: "Sheridan",
      addressRegion: "WY",
      postalCode: "82801",
      addressCountry: "US",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "66 Paul Street",
      addressLocality: "London",
      postalCode: "EC2A 4NA",
      addressCountry: "GB",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORGANIZATION_LD).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main">
        <section className="hero-bg relative flex h-svh min-h-[34rem] flex-col overflow-hidden">

          <div className="hero-main relative z-10 flex min-h-0 flex-1 flex-col items-center px-5 sm:px-8">
            <div className="hero-headline-wrap shrink-0">
              <GlitchHeadline />
            </div>

            <div className="hero-computer-wrap">
              <HeroComputer />
            </div>
          </div>

          <nav className="anim-bar hero-cta-bar" aria-label="Primary">
            <Link href="/" className="hero-cta-logo" aria-label="Home">
              <Image
                src="/MainLogo.png"
                alt="Piermont Studios"
                width={140}
                height={58}
                priority
                className="hero-cta-logo-img"
              />
            </Link>
            <a href="/contact" className="hero-cta-btn">
              Start Project
            </a>
          </nav>
        </section>

        <HomeVideo />

        <ProjectsSection />
        <ServicesSection />
        <div data-reveal="fade">
          <TestimonialsSection />
        </div>
        <StoriesSection />
        <ContactSection />
      </main>
    </>
  );
}
