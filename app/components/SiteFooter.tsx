import Link from "next/link";
import { EMAIL, PHONE, REVIEWS, SOCIALS } from "../site";
import { FooterLogoLiquid } from "./FooterLogoLiquid";
import { CATEGORIES } from "../work/projects";
import { SOLUTIONS as SOLUTION_PAGES } from "../solutions/solutions";

const COMPANY = [
  { label: "About us", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contacts", href: "/contact" },
  { label: "Process", href: "/process" },
] as const;

const SOLUTIONS = SOLUTION_PAGES.map((s) => ({
  label: s.label,
  href: `/solutions/${s.slug}`,
}));

const RESOURCES = [
  { label: "Blogs", href: "/blog" },
  { label: "Work", href: "/projects" },
] as const;

const CASE_STUDIES = CATEGORIES.map((c) => ({
  label: c.title,
  href: `/case-studies/${c.slug}`,
}));

const LOCATIONS = [
  {
    country: "USA",
    address: "30 N Gould St, Ste R, Sheridan, WY 82801, United States",
  },
  {
    country: "UK",
    address: "66 Paul Street, London EC2A 4NA, United Kingdom",
  },
] as const;

function ShowMore({ href }: { href: string }) {
  return (
    <Link href={href} className="footer-show-more">
      Show more
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <path
          d="M3 4.5 L6 7.5 L9 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}

function Achievements() {
  return (
    <div className="footer-achievements">
      <img
        src="/OtherAssets/ClutchandGoogle.png"
        alt="Clutch Top 1000 Companies and Google 5 Star Customer Rating"
        className="footer-clutch-google"
        loading="lazy"
        decoding="async"
      />
      <img
        src="/OtherAssets/Trustpilot.png"
        alt="Trustpilot rating"
        className="footer-trustpilot"
        loading="lazy"
        decoding="async"
      />
      <ul className="footer-reviews">
        {REVIEWS.map((r) => {
          const icon = (
            <img src={r.icon} alt="" width={28} height={28} loading="lazy" decoding="async" />
          );
          return (
            <li key={r.label}>
              {r.href ? (
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Piermont Studios on ${r.label}`}
                  title={r.label}
                >
                  {icon}
                </a>
              ) : (
                <span title={r.label}>{icon}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer-inner">
        <div className="footer-top">
          <div className="footer-col">
            <p className="footer-col-title">Achievements</p>
            <Achievements />
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Company</p>
            <ul className="footer-links">
              {COMPANY.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Solutions</p>
            <ul className="footer-links">
              {SOLUTIONS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <ShowMore href="/services" />
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Resources</p>
            <ul className="footer-links">
              {RESOURCES.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Case studies</p>
            <ul className="footer-links">
              {CASE_STUDIES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <ShowMore href="/projects" />
          </div>
        </div>

        <div className="footer-block">
          <p className="footer-block-label">
            Locations
          </p>
          <div className="footer-locations">
            {LOCATIONS.map((loc) => (
              <div key={loc.country} className="footer-location">
                <p className="footer-country">{loc.country}</p>
                <p className="footer-address">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-block">
          <p className="footer-block-label">
            Contact
          </p>
          <div className="footer-contact-lines">
            <a href={PHONE.href} className="footer-contact-line">
              {PHONE.display}
            </a>
            <a href={`mailto:${EMAIL}`} className="footer-contact-line">
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            Copyright © 2026 Piermont. All rights reserved
          </p>
          <div className="footer-socials">
            <span className="footer-socials-label">Socials:</span>
            {SOCIALS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <FooterLogoLiquid />
      </div>
    </footer>
  );
}
