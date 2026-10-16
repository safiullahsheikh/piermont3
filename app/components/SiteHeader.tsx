"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EMAIL, PHONE } from "../site";
import FlowingMenu from "../vendor/react-bits/FlowingMenu";
import { Arrow } from "./Arrow";
import { SoundToggle } from "./SoundToggle";

/** Menu: every top-level page, in a small panel above the pill. Images show in the flowing band on hover. */
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

/** Three lines; as `x` the outer two cross and the middle one fades. */
function Burger({ x = false }: { x?: boolean }) {
  return (
    <span className={x ? "pm-burger is-x" : "pm-burger"} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
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
      {/* Floating pill, lower middle: logo, sound, menu. */}
      <header className="pm-header pm-pill">
        <Logo />
        <SoundToggle className="pm-pill__sound" />
        <button
          type="button"
          className="pm-header__toggle"
          aria-label="Menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="pm-menu"
          onClick={openMenu}
        >
          <Burger />
        </button>
      </header>

      <dialog
        id="pm-menu"
        ref={menuRef}
        className="pm-menu"
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        // A click on the clear layer around the panel closes the menu.
        onClick={(e) => e.target === e.currentTarget && closeMenu()}
      >
        <div className="pm-menu__panel">
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
        </div>
        {/* The same pill, in the same place, so it stays put while the menu rises behind it. */}
        <div className="pm-pill">
          <Logo onClick={closeMenu} />
          <SoundToggle className="pm-pill__sound" />
          <button
            ref={closeRef}
            type="button"
            className="pm-header__toggle"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <Burger x />
          </button>
        </div>
      </dialog>
    </>
  );
}
