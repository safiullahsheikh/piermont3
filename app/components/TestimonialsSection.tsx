import Image from "next/image";

const TESTIMONIALS = [
  {
    quote:
      "Under the leadership of Giacomo Troncon, we developed a unique visual identity that truly captures our brand's essence and stands out in a crowded market.",
    name: "Nathalie C.",
    company: "Justement.co",
    avatar: "/testimonial-1.png",
  },
  {
    quote:
      "We've been partnering since 2013 on graphic materials for Tribal Show and Opus Ancient Arts. The collaboration has always been seamless and inspiring.",
    name: "Julie A.",
    company: "Gus Adler & Filles",
    avatar: "/testimonial-2.png",
  },
  {
    quote:
      "I warmly recommend MP for overseeing the development of our foundation materials. Thoughtful, precise, and always aligned with our values.",
    name: "Mathilde T.",
    company: "Fondation Marc Ladreit de Lacharrière",
    avatar: "/testimonial-3.png",
  },
  {
    quote:
      "They turned complex ideas into a clear brand system. Communication stayed sharp from strategy through to the final deliverables.",
    name: "Thomas R.",
    company: "Atelier Nord",
    avatar: "/testimonial-4.png",
  },
] as const;

function Stars() {
  return (
    <div className="testimonial-stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#e85a3c">
          <path d="M12 2.5l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 17.8 5.9 20.5 7.3 14l-5-4.6 6.7-.7L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  company,
  avatar,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <article className="testimonial-card">
      <Stars />
      <p className="testimonial-quote">{quote}</p>
      <div className="testimonial-author">
        <Image
          src={avatar}
          alt={`${name}, ${company}`}
          width={56}
          height={56}
          className="testimonial-avatar"
        />
        <div>
          <p className="testimonial-name">{name}</p>
          <p className="testimonial-company">{company}</p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      className="testimonials-section"
      aria-label="Testimonials"
    >
      <div className="testimonials-marquee" aria-hidden="true">
        <div className="testimonials-track">
          {loop.map((item, i) => (
            <TestimonialCard key={`${item.name}-${i}`} {...item} />
          ))}
        </div>
      </div>

      {/* Accessible static list for screen readers */}
      <ul className="sr-only">
        {TESTIMONIALS.map((item) => (
          <li key={item.name}>
            {item.quote} {item.name}, {item.company}
          </li>
        ))}
      </ul>
    </section>
  );
}
