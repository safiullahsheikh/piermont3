import Image from "next/image";
import Link from "next/link";
import { EMAIL, PHONE, REVIEWS, SOCIALS } from "../site";
import { CATEGORIES } from "../work/projects";
import { SOLUTIONS } from "../solutions/solutions";
import { Arrow } from "./Arrow";
import { FooterLogoLiquid } from "./FooterLogoLiquid";

// Links and wording match the production footer exactly (protected content).
const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Contacts", href: "/contact" },
      { label: "Process", href: "/process" },
    ],
  },
  {
    title: "Solutions",
    href: "/solutions",
    links: SOLUTIONS.map((s) => ({ label: s.label, href: `/solutions/${s.slug}` })),
  },
  {
    title: "Resources",
    links: [
      { label: "Blogs", href: "/blog" },
      { label: "Work", href: "/case-studies" },
    ],
  },
  {
    title: "Case studies",
    href: "/case-studies",
    links: CATEGORIES.map((c) => ({ label: c.title, href: `/case-studies/${c.slug}` })),
  },
];

const LOCATIONS = [
  { country: "USA", address: "30 N Gould St, Ste R, Sheridan, WY 82801, United States" },
  { country: "UK", address: "66 Paul Street, London EC2A 4NA, United Kingdom" },
] as const;

export function SiteFooter() {
  return (
    <footer className="pm-footer">
      <div className="pm-footer__inner">
        <div className="pm-footer__lead">
          <p className="pm-footer__tagline">Brands, websites &amp; ads built to grow.</p>
          <Link href="/contact" className="pm-button">
            Start a project
            <Arrow />
          </Link>
        </div>

        <div className="pm-footer__columns">
          {COLUMNS.map((col) => (
            <div key={col.title} className="pm-footer__col">
              <p className="pm-label">
                {col.href ? (
                  <Link href={col.href} className="pm-link">
                    {col.title}
                  </Link>
                ) : (
                  col.title
                )}
              </p>
              <ul>
                {col.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="pm-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {col.href ? (
                <Link href={col.href} className="pm-footer__more pm-link">
                  Show more
                </Link>
              ) : null}
            </div>
          ))}
        </div>

        <div className="pm-footer__facts">
          <div>
            <p className="pm-label">Locations</p>
            <div className="pm-footer__locations">
              {LOCATIONS.map((loc) => (
                <div key={loc.country}>
                  <p className="pm-footer__country">{loc.country}</p>
                  <p className="pm-footer__address">{loc.address}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="pm-label">Contact</p>
            <p className="pm-footer__contact">
              <a href={PHONE.href} className="pm-link">
                {PHONE.display}
              </a>
              <a href={`mailto:${EMAIL}`} className="pm-link">
                {EMAIL}
              </a>
            </p>
          </div>
          <div>
            <p className="pm-label">Reviewed on</p>
            <ul className="pm-footer__reviews">
              {REVIEWS.map((r) => {
                const icon = <Image src={r.icon} alt={r.label} width={28} height={28} />;
                return (
                  <li key={r.label}>
                    {r.href ? (
                      <a href={r.href} target="_blank" rel="noopener noreferrer">
                        {icon}
                      </a>
                    ) : (
                      icon
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="pm-footer__bottom">
          <p>
            Copyright © {new Date().getFullYear()} Piermont Studios Limited - All Rights Reserved
          </p>
          <p className="pm-footer__socials">
            <span>Socials:</span>
            {SOCIALS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pm-link"
              >
                {item.label}
              </a>
            ))}
          </p>
        </div>

        <FooterLogoLiquid />
      </div>
    </footer>
  );
}
