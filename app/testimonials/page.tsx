import Image from "next/image";
import type { Metadata } from "next";
import { pageMeta } from "../site";
import { HeroHeader } from "../components/HeroHeader";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = pageMeta({
  title: "Client Testimonials",
  description:
    "What clients say about working with Piermont Studios on strategy, design and builds that land.",
  path: "/testimonials",
});

const TESTIMONIALS = [
  {
    quote:
      "Under the leadership of Giacomo Troncon, we developed a unique visual identity that truly captures our brand's essence and stands out in a crowded market.",
    name: "Nathalie C.",
    company: "Justement.co",
    role: "Founder",
    avatar: "/testimonial-1.png",
  },
  {
    quote:
      "We've been partnering since 2013 on graphic materials for Tribal Show and Opus Ancient Arts. The collaboration has always been seamless and inspiring.",
    name: "Julie A.",
    company: "Gus Adler & Filles",
    role: "Creative Director",
    avatar: "/testimonial-2.png",
  },
  {
    quote:
      "I warmly recommend MP for overseeing the development of our foundation materials. Thoughtful, precise, and always aligned with our values.",
    name: "Mathilde T.",
    company: "Fondation Marc Ladreit de Lacharrière",
    role: "Program Lead",
    avatar: "/testimonial-3.png",
  },
  {
    quote:
      "They turned complex ideas into a clear brand system. Communication stayed sharp from strategy through to the final deliverables.",
    name: "Thomas R.",
    company: "Atelier Nord",
    role: "Brand Manager",
    avatar: "/testimonial-4.png",
  },
  {
    quote:
      "The website launch felt effortless on our side. Fast, polished, and exactly the tone we needed for our next chapter.",
    name: "Elena M.",
    company: "Studio Vale",
    role: "CEO",
    avatar: "/testimonial-1.png",
  },
  {
    quote:
      "From first workshop to live product, they stayed close to the brief and pushed the craft further than we expected.",
    name: "Daniel K.",
    company: "Northline",
    role: "Product Lead",
    avatar: "/testimonial-2.png",
  },
] as const;

const HIGHLIGHTS = [
  { value: "50+", label: "Projects delivered" },
  { value: "4.9", label: "Average client rating" },
  { value: "12+", label: "Years of partnership" },
] as const;

function Stars() {
  return (
    <div className="tm-stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2.5l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 17.8 5.9 20.5 7.3 14l-5-4.6 6.7-.7L12 2.5z"
          />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <main id="main">
        <section className="tm-hero hero-bg relative overflow-hidden">
          <HeroHeader tone="light" />
          <div className="tm-hero-inner">
            <p
              className="tm-kicker"
              data-reveal
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              Social proof
            </p>
            <div
              className="tm-rule"
              data-reveal
              style={{ ["--reveal-delay" as string]: "140ms" }}
            >
              <span className="tm-rule-accent" />
              <span className="tm-rule-rest" />
            </div>
            <h1
              className="tm-title"
              data-reveal="scale"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              TESTIMONIALS
            </h1>
            <p
              className="tm-lead"
              data-reveal
              style={{ ["--reveal-delay" as string]: "280ms" }}
            >
              What the brands we work with say about us, in their own words.
              Clear work, good communication and results that last.
            </p>
          </div>
        </section>

        <section className="tm-highlights">
          <div className="tm-highlights-inner" data-reveal-stagger data-reveal>
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="tm-highlight" data-reveal-child>
                <p className="tm-highlight-value">{item.value}</p>
                <p className="tm-highlight-label">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tm-grid-section">
          <div className="tm-grid-inner">
            <p className="tm-section-eyebrow" data-reveal>
              Client stories
            </p>
            <h2
              className="tm-section-title"
              data-reveal
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              What working together feels like
            </h2>
            <div className="tm-grid" data-reveal-stagger data-reveal>
              {TESTIMONIALS.map((item) => (
                <article key={item.name + item.company} className="tm-card" data-reveal-child>
                  <Stars />
                  <p className="tm-quote">{item.quote}</p>
                  <div className="tm-author">
                    <Image
                      src={item.avatar}
                      alt={`${item.name}, ${item.role} at ${item.company}`}
                      width={56}
                      height={56}
                      className="tm-avatar"
                    />
                    <div>
                      <p className="tm-name">{item.name}</p>
                      <p className="tm-meta">
                        {item.role} · {item.company}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tm-cta" data-reveal="scale">
          <div className="tm-cta-inner">
            <h2 className="tm-cta-heading">
              Want results
              <br />
              like these?
            </h2>
            <a href="/contact" className="tm-cta-button">
              Start Project
            </a>
          </div>
        </section>
      </main>

      <div data-reveal="fade">
        <SiteFooter />
      </div>
    </>
  );
}
