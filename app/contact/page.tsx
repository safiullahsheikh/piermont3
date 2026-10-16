import type { Metadata } from "next";
import { EMAIL, PHONE, pageMeta } from "../site";
import { ContactSection } from "../components/ContactSection";

export const metadata: Metadata = pageMeta({
  title: "Contact Us for a Project Quote",
  description:
    "Request a quote from Piermont Studios for branding, website design, UI/UX, marketing or video. Offices in Sheridan, Wyoming and London.",
  path: "/contact",
});

const DETAILS = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    label: "Phone",
    value: PHONE.display,
    href: PHONE.href,
  },
  {
    label: "Hours",
    value: "Mon-Fri, 9am-6pm",
    href: null,
  },
] as const;

const OFFICES = [
  {
    country: "USA",
    address: "30 N Gould St, Ste R, Sheridan, WY 82801",
  },
  {
    country: "UK",
    address: "66 Paul Street, London EC2A 4NA",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <main id="main">
        <div className="contact-page-top relative">
          <ContactSection headingLevel="h1" />
        </div>

        <section className="contact-page-details">
          <div className="contact-page-details-inner">
            <div data-reveal>
              <p className="contact-page-eyebrow">
                Direct lines
              </p>
              <h2 className="contact-page-heading">Talk to the studio</h2>
            </div>

            <div
              className="contact-page-channels"
              data-reveal-stagger
              data-reveal
            >
              {DETAILS.map((item) => (
                <div key={item.label} className="contact-page-channel" data-reveal-child>
                  <p className="contact-page-channel-label">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="contact-page-channel-value">
                      {item.value}
                    </a>
                  ) : (
                    <p className="contact-page-channel-value">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="contact-page-offices" data-reveal>
              <p className="contact-page-eyebrow">
                Locations
              </p>
              <div className="contact-page-office-grid" data-reveal-stagger data-reveal>
                {OFFICES.map((office) => (
                  <article key={office.country} className="contact-page-office" data-reveal-child>
                    <h3 className="contact-page-office-country">{office.country}</h3>
                    <p className="contact-page-office-address">{office.address}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
