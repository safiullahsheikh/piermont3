"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EMAIL, PHONE } from "../site";
import FlowingMenu from "../vendor/react-bits/FlowingMenu";
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

/** Full menu: every top-level page. The main menu on mobile. Images show in the flowing band on hover. */
const MENU = [
  { label: "Home", href: "/", image: "/media/pier-lamps.webp" },
  { label: "Solutions", href: "/solutions", image: "/footage/reef-l.webp" },
  {
    label: "Case studies",
    href: "/case-studies",
    image: "/footage/diver-l.webp",
  },
  { label: "About", href: "/about", image: "/media/pier-dusk.webp" },
  { label: "Process", href: "/process", image: "/footage/hero-l.webp" },
  {
    label: "Testimonials",
    href: "/testimonials",
    image: "/footage/ascent-l.webp",
  },
  { label: "Blog", href: "/blog", image: "/footage/loader-l.webp" },
  { label: "Contact", href: "/contact", image: "/media/freediver.webp" },
] as const;

const FLOW_ITEMS = MENU.map((m) => ({
  text: m.label,
  link: m.href,
  image: m.image,
}));

function isCurrent(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      className="pm-logo"
      aria-label="Piermont Studios home"
      onClick={onClick}
    >
      <Image
        src="/FooterLogo.png"
        alt=""
        width={480}
        height={200}
        sizes="120px"
        priority
      />
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  // Each opening mounts a fresh menu so its intro plays; it stays mounted while the curtain closes.
  const [opened, setOpened] = useState(0);
  // Over the home hero the bottom bar is clear so the footage runs edge to edge.
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
    setOpened((n) => n + 1);
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
                  aria-current={
                    isCurrent(pathname, item.href) ? "page" : undefined
                  }
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
        {opened > 0 && (
          <FlowingMenu
            key={opened}
            items={FLOW_ITEMS}
            activeIndex={MENU.findIndex((m) => isCurrent(pathname, m.href))}
            onItemClick={(item, _i, e) => {
              if (
                e.button !== 0 ||
                e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey
              )
                return;
              e.preventDefault();
              router.push(item.link!);
              closeMenu();
            }}
            ariaLabel="Site"
            align="left"
            speed={48}
            textColor="var(--pm-foam)"
            bgColor="transparent"
            marqueeBgColor="var(--pm-foam)"
            marqueeTextColor="var(--pm-abyss)"
            borderColor="var(--pm-hairline)"
            className="pm-menu__flow"
          />
        )}
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
        <div className="pm-menu__bar">
          <Logo onClick={closeMenu} />
          <SoundToggle className="pm-menu__sound" />
          <button
            ref={closeRef}
            type="button"
            className="pm-header__toggle"
            onClick={closeMenu}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
