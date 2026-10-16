"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const noopSubscribe = () => () => {};

/** true after hydration, false during SSR - lets us portal into document.body safely. */
function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
] as const;

function MenuLink({
  href,
  label,
  index,
  open,
  onNavigate,
}: {
  href: string;
  label: string;
  index: number;
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <a
      href={href}
      className="site-menu-link"
      style={{
        ["--menu-delay" as string]: open
          ? `${90 + index * 60}ms`
          : `${(LINKS.length - 1 - index) * 45}ms`,
      }}
      onClick={onNavigate}
    >
      <span className="site-menu-link-label">{label}</span>
    </a>
  );
}

export function HeroHeader({
  tone = "light",
  showLogo = true,
}: {
  tone?: "light" | "dark";
  showLogo?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const mounted = useIsClient();
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isDark = tone === "dark";
  const chrome =
    "site-header-chrome text-[15px] font-normal tracking-[-0.01em] transition-opacity";

  useEffect(() => {
    if (!open) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    const trigger = openBtnRef.current;
    return () => {
      trigger?.focus({ preventScroll: true });
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const menu = (
    <div
      id="site-menu"
      className={`site-menu ${open ? "is-open" : ""}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div className="site-menu-top">
        <a
          href="/contact"
          className="site-menu-chrome"
          onClick={() => setOpen(false)}
        >
          Let&apos;s Talk
        </a>
        <button
          ref={closeBtnRef}
          type="button"
          className="site-menu-chrome"
          onClick={() => setOpen(false)}
        >
          Close Menu
        </button>
      </div>

      <nav className="site-menu-nav" aria-label="Full menu">
        {LINKS.map((link, i) => (
          <MenuLink
            key={link.href}
            href={link.href}
            label={link.label}
            index={i}
            open={open}
            onNavigate={() => setOpen(false)}
          />
        ))}
      </nav>

      <div className="site-menu-footer">
        <a
          href="/contact"
          className="site-menu-cta"
          onClick={() => setOpen(false)}
        >
          Start Project
        </a>
        <Link
          href="/"
          className="site-menu-brand"
          aria-label="Piermont Studios home"
          onClick={() => setOpen(false)}
        >
          <img
            src="/FooterLogo.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="site-menu-footer-logo"
          />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`site-header anim-nav absolute inset-x-0 top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 pt-4 pb-1 sm:px-10 sm:pt-5 sm:pb-1 md:px-14 lg:px-16${isDark ? " is-dark" : ""}`}
      >
        <a href="/contact" className={`${chrome} justify-self-start`}>
          Let&apos;s Talk
        </a>
        {showLogo ? (
          <Link
            href="/"
            className="site-logo justify-self-center"
            aria-label="Piermont Studios home"
          >
            <img
              src="/MainLogo.png"
              alt=""
              className={`main-logo-nav${isDark ? " is-on-dark" : ""}`}
            />
          </Link>
        ) : (
          <span className="justify-self-center" aria-hidden="true" />
        )}
        <button
          ref={openBtnRef}
          type="button"
          className={`cursor-pointer justify-self-end border-0 bg-transparent p-0 ${chrome}`}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          Open Menu
        </button>
      </header>

      {mounted ? createPortal(menu, document.body) : null}
    </>
  );
}
