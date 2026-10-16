"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EMAIL, PHONE } from "../site";
import { Arrow } from "./Arrow";
import { SoundToggle } from "./SoundToggle";

/** Inline desktop navigation. */
const PRIMARY = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Full menu: every top-level page. The main menu on mobile. */
const MENU = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="pm-logo" aria-label="Piermont Studios home" onClick={onClick}>
      <Image src="/FooterLogo.png" alt="" width={480} height={200} sizes="120px" priority />
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  // Over the home hero the bar is clear so the footage runs edge to edge.
  const [clear, setClear] = useState(true);
  const home = pathname === "/";

  useEffect(() => {
    if (!home) return;
    const update = () => setClear(window.scrollY < window.innerHeight * 0.6);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [home]);

  const openMenu = () => {
    menuRef.current?.showModal();
    closeRef.current?.focus();
    setOpen(true);
  };
  // The dialog's close event resets `open`, and the browser returns focus to the trigger.
  const closeMenu = () => menuRef.current?.close();

  // Back/forward while the menu is open still lands on a usable page.
  useEffect(() => {
    menuRef.current?.close();
  }, [pathname]);

  return (
    <>
      <header className="pm-header" data-clear={(home && clear) || undefined}>
        <Logo />
        <nav className="pm-header__nav" aria-label="Primary">
          <ul>
            {PRIMARY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="pm-link"
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pm-header__actions">
          <SoundToggle className="pm-header__sound" />
          <Link href="/contact" className="pm-button pm-header__cta">
            Start a project
            <Arrow />
          </Link>
          <button
            type="button"
            className="pm-header__toggle"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="pm-menu"
            onClick={openMenu}
          >
            Menu
          </button>
        </div>
      </header>

      <dialog
        id="pm-menu"
        ref={menuRef}
        className="pm-menu"
        aria-label="Site menu"
        onClose={() => setOpen(false)}
      >
        <div className="pm-menu__top">
          <Logo onClick={closeMenu} />
          <button ref={closeRef} type="button" className="pm-header__toggle" onClick={closeMenu}>
            Close
          </button>
        </div>
        <nav aria-label="Site">
          <ul className="pm-menu__list">
            {MENU.map((item, i) => (
              <li key={item.href} style={{ ["--i" as string]: i }}>
                <Link
                  href={item.href}
                  className="pm-menu__link"
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pm-menu__foot">
          <Link href="/contact" className="pm-button" onClick={closeMenu}>
            Start a project
            <Arrow />
          </Link>
          <a href={`mailto:${EMAIL}`} className="pm-link">
            {EMAIL}
          </a>
          <a href={PHONE.href} className="pm-link">
            {PHONE.display}
          </a>
        </div>
      </dialog>
    </>
  );
}
