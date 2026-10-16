import type { Metadata } from "next";
import { ContactSection } from "./components/ContactSection";
import { FootageSection } from "./components/Footage";
import { StoriesSection } from "./components/StoriesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { DepthGauge } from "./home/DepthGauge";
import { HomeHero } from "./home/HomeHero";
import { ProjectsCarousel } from "./home/ProjectsCarousel";
import { ServicesReef } from "./home/ServicesReef";
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
      <main id="main" className="pm-home">
        <HomeHero />
        <ProjectsCarousel />
        <ServicesReef />
        <div className="pm-home__proof">
          <TestimonialsSection />
          <StoriesSection />
        </div>
        <FootageSection name="ascent" mode="scrub" className="pm-ascent">
          <ContactSection />
        </FootageSection>
        <DepthGauge />
      </main>
    </>
  );
}
