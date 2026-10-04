"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { site } from "@/lib/site-config";
import { mainNav, megaMenu, visitMenu } from "@/lib/nav";
import { conditionGroups } from "@/lib/conditions";
import { LogoHorizontal, LogoMark } from "@/components/brand/Logo";
import { Icon } from "@/lib/icons";
import { BookButton } from "@/components/BookButton";

const OPEN_INTENT = 120;
const CLOSE_GRACE = 250;

/** One nav item that owns a dropdown panel. */
function NavDrop({
  label,
  panelId,
  open,
  onOpen,
  onClose,
  children,
  mega = false,
}: {
  label: string;
  panelId: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
  mega?: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const openT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (openT.current) clearTimeout(openT.current);
    if (closeT.current) clearTimeout(closeT.current);
  };

  const intentOpen = () => {
    clear();
    openT.current = setTimeout(onOpen, OPEN_INTENT);
  };
  const graceClose = () => {
    clear();
    closeT.current = setTimeout(onClose, CLOSE_GRACE);
  };
  const stay = () => {
    clear();
  };

  return (
    <div
      ref={itemRef}
      className={`nav-item${mega ? " mega" : ""}${open ? " open" : ""}`}
      onMouseEnter={intentOpen}
      onMouseLeave={graceClose}
      onBlur={(e) => {
        if (!itemRef.current?.contains(e.relatedTarget as Node)) onClose();
      }}
    >
      <button
        ref={btnRef}
        type="button"
        className="nav-btn"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => (open ? onClose() : onOpen())}
        onFocus={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            e.stopPropagation();
            onClose();
            btnRef.current?.focus();
          }
          if (e.key === "ArrowDown" && !open) onOpen();
        }}
      >
        {label}
        <Icon name="chevron" size={14} strokeWidth={2.4} />
      </button>
      <div
        id={panelId}
        className={mega ? "nav-panel mega" : "nav-panel"}
        role="region"
        aria-label={`${label} menu`}
        hidden={!open}
        onMouseEnter={stay}
        onMouseLeave={graceClose}
      >
        {children}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      const btn = document.querySelector<HTMLElement>(".nav-item.open .nav-btn");
      btn?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".nav-item")) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [openMenu]);

  const close = () => setOpenMenu(null);

  return (
    <header className="site-head">
      <div className="container">
        <div className="hdr">
          <Link href="/" className="logo-link">
            <LogoHorizontal style={{ flex: "none" }} />
          </Link>
          <nav aria-label="Main">
            <NavDrop
              label="Conditions"
              panelId="menu-conditions"
              open={openMenu === "conditions"}
              onOpen={() => setOpenMenu("conditions")}
              onClose={close}
              mega
            >
              <div className="mm-panel" style={{ "--cols": 3 } as CSSProperties}>
                {megaMenu.map((c) => (
                  <div className="mm-col" key={c.h}>
                    <span className="mm-h">{c.h}</span>
                    {c.links.map((l) => (
                      <Link href={l.href} key={l.href} onClick={close}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="mm-doc">
                  <Image
                    src="/images/doctor/dr-james-avatar.jpg"
                    alt=""
                    width={48}
                    height={48}
                  />
                  <b>Dr. James</b>
                  <span>Internal Medicine and Diabetes</span>
                  <Link className="link" href={site.profileUrl} onClick={close}>
                    View profile <Icon name="arrow" size={14} strokeWidth={2.2} />
                  </Link>
                  <Link className="link" href={site.conditionsUrl} onClick={close}>
                    All conditions <Icon name="arrow" size={14} strokeWidth={2.2} />
                  </Link>
                </div>
              </div>
            </NavDrop>
            <NavDrop
              label="Your visit"
              panelId="menu-visit"
              open={openMenu === "visit"}
              onOpen={() => setOpenMenu("visit")}
              onClose={close}
            >
              <div className="dd-panel">
                {visitMenu.map((l) => (
                  <Link href={l.href} key={l.href} onClick={close}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </NavDrop>
            {mainNav.slice(2).map((l) => (
              <Link className="nav-l" href={l.href} key={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hdr-r">
            <BookButton />
            <button
              type="button"
              className="mtrigger"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Icon name="menu" size={26} />
            </button>
          </div>
        </div>
      </div>

      <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Content className="mnav" aria-label="Menu" aria-describedby={undefined}>
            <div className="msheet">
              <div className="mh">
                <LogoMark />
                <Dialog.Close asChild>
                  <button className="xbtn" type="button" aria-label="Close menu">
                    <span className="x" aria-hidden="true">
                      ✕
                    </span>
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <details className="acc-g">
                <summary>Conditions</summary>
                {conditionGroups.flatMap((g) =>
                  g.conditions.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/conditions/${c.slug}/`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {c.title}
                    </Link>
                  )),
                )}
                <Link href={site.conditionsUrl} onClick={() => setMobileOpen(false)}>
                  All conditions
                </Link>
              </details>
              <details className="acc-g">
                <summary>Your visit</summary>
                {visitMenu.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
                    {l.label}
                  </Link>
                ))}
              </details>
              <Link className="acc-l" href={site.profileUrl} onClick={() => setMobileOpen(false)}>
                About Dr. James
              </Link>
              <Link className="acc-l" href={site.libraryUrl} onClick={() => setMobileOpen(false)}>
                Health Library
              </Link>
              <Link className="acc-l" href="/contact/" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
              <div className="mfoot">
                <Link
                  className="btn btn-p"
                  href={site.bookUrl}
                  onClick={() => setMobileOpen(false)}
                >
                  Book
                </Link>
                <a className="btn btn-s" href={site.phoneTel}>
                  Call
                </a>
                <small>{site.hoursShort}</small>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
