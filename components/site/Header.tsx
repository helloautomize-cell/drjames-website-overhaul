"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { site } from "@/lib/site-config";
import { conditionGroups, allConditions, conditionUrl } from "@/lib/conditions";
import { whatsappLink } from "@/lib/whatsapp";
import { LogoMark } from "@/components/brand/Logo";
import { Badge } from "@/components/Badge";
import { Star8 } from "@/components/site/Star8";
import { BookPill } from "@/components/site/BookPill";
import { LiveStatus } from "@/components/site/LiveStatus";
import { useFinder } from "@/components/site/SymptomFinder";
import type { ReadNext } from "@/lib/read-next";

const OPEN_INTENT = 120;
const CLOSE_GRACE = 220;

const NAV = [
  { label: "Your visit", href: site.visitUrl, tag: "02" },
  { label: "About Dr. James", href: site.profileUrl, tag: "03" },
  { label: "Health Library", href: site.libraryUrl, tag: "04" },
];

function WaGlyph({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

/** Concierge rail, floating-capsule bar, night-curtain Conditions menu and mobile sheet. */
export function Header({ readNext }: { readNext: Record<string, ReadNext> }) {
  const pathname = usePathname();
  const { openFinder } = useFinder();
  const [scrolled, setScrolled] = useState(false);
  const [curtain, setCurtain] = useState(false);
  const [group, setGroup] = useState(0);
  const [sheet, setSheet] = useState(false);
  const hdrRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLSpanElement>(null);
  const trigRef = useRef<HTMLButtonElement>(null);
  const openT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ticking = false;
    const run = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progRef.current) progRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(run);
      }
    };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const hdr = hdrRef.current;
    if (!hdr) return;
    const els = document.querySelectorAll<HTMLElement>('[data-header="dark"]');
    const live = new Set<Element>();
    const apply = () => {
      hdr.dataset.theme = live.size ? "dark" : "light";
    };
    apply();
    if (!els.length) return;
    let io: IntersectionObserver | undefined;
    const build = () => {
      io?.disconnect();
      live.clear();
      const y = 44;
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? live.add(e.target) : live.delete(e.target)));
          apply();
        },
        { rootMargin: `-${y}px 0px -${Math.max(0, window.innerHeight - y - 1)}px 0px` },
      );
      els.forEach((el) => io!.observe(el));
    };
    build();
    window.addEventListener("resize", build);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", build);
    };
  }, [pathname]);

  const clear = () => {
    if (openT.current) clearTimeout(openT.current);
    if (closeT.current) clearTimeout(closeT.current);
  };
  const intentOpen = () => {
    clear();
    openT.current = setTimeout(() => setCurtain(true), OPEN_INTENT);
  };
  const graceClose = () => {
    clear();
    closeT.current = setTimeout(() => setCurtain(false), CLOSE_GRACE);
  };
  const stay = () => clear();
  const closeNow = useCallback(() => {
    if (openT.current) clearTimeout(openT.current);
    if (closeT.current) clearTimeout(closeT.current);
    setCurtain(false);
  }, []);

  const [seen, setSeen] = useState(pathname);
  if (seen !== pathname) {
    setSeen(pathname);
    setCurtain(false);
    setSheet(false);
  }

  useEffect(() => {
    if (!curtain) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCurtain(false);
        trigRef.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".x-nav")) setCurtain(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [curtain]);

  const g = conditionGroups[group];
  const here = (href: string) => (pathname?.startsWith(href.replace(/\/$/, "")) ? "page" : undefined);

  return (
    <>
      <div className={`x-cscrim${curtain ? " x-on" : ""}`} aria-hidden="true" onClick={closeNow} />
      <div ref={hdrRef} className={`x-hdr${scrolled ? " x-scrolled" : ""}${curtain ? " x-cur" : ""}`} data-theme="light">
        <div className="x-rail">
          <span className="x-loc">
            <Star8 />
            {site.hospital} · Al Ghubrah, Muscat
          </span>
          <LiveStatus />
          <span className="x-em">
            Medical emergency? <a href={`tel:${site.emergency}`}>Call {site.emergency}</a>
          </span>
        </div>
        <div className="x-bar">
          <Link className="x-logo" href="/">
            <span className="x-mk" aria-hidden="true">
              <LogoMark className="x-mk-l" title="" style={{ ["--logo-ground" as string]: "#F3F5F1" }} />
              <LogoMark className="x-mk-d" white title="" style={{ ["--logo-ground" as string]: "#0A1C2E" }} />
            </span>
            <span className="x-wm">
              <b className="x-full">DR. JAMES PALLIVATHUKKAL</b>
              <b className="x-short">DR. JAMES</b>
              <small className="x-full">INTERNAL MEDICINE · DIABETES</small>
              <small className="x-short">PALLIVATHUKKAL</small>
            </span>
          </Link>

          <nav className="x-nav" aria-label="Main">
            <div className="x-citem" onMouseEnter={intentOpen} onMouseLeave={graceClose}>
              <button
                ref={trigRef}
                type="button"
                className="x-nl"
                aria-expanded={curtain}
                aria-controls="x-curtain"
                aria-current={here(site.conditionsUrl)}
                onClick={() => (curtain ? closeNow() : setCurtain(true))}
              >
                Conditions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                id="x-curtain"
                className={`x-curtain${curtain ? " x-open" : ""}`}
                role="region"
                aria-label="Conditions menu"
                onMouseEnter={stay}
                onMouseLeave={graceClose}
              >
                <div className="x-cgrid">
                  <ul className="x-ctabs">
                    {conditionGroups.map((cg, i) => {
                      const words = cg.label.split(" ");
                      const last = words.pop();
                      return (
                        <li key={cg.id}>
                          <button
                            type="button"
                            className={i === group ? "x-sel" : ""}
                            aria-pressed={i === group}
                            onMouseEnter={() => setGroup(i)}
                            onFocus={() => setGroup(i)}
                            onClick={() => setGroup(i)}
                          >
                            <i>0{i + 1}</i>
                            <span>
                              {words.join(" ")} <em>{last}</em>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="x-clist" key={g.id}>
                    {g.conditions.map((c, i) => (
                      <li key={c.slug} style={{ animationDelay: `${i * 45}ms` }}>
                        <Link href={conditionUrl(c.slug)} onClick={closeNow}>
                          <b>{c.title}</b>
                          <span>{c.line}</span>
                          <svg className="x-go" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                    {g.conditions.length < 4 && readNext[g.id] ? (
                      <li className="x-next" style={{ animationDelay: `${g.conditions.length * 45}ms` }}>
                        <Link href={`${site.libraryUrl}${readNext[g.id].slug}/`} onClick={closeNow}>
                          <small>Read next</small>
                          <b>{readNext[g.id].title}</b>
                          <svg className="x-go" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                  <div className="x-cprev">
                    <Badge icon={g.icon} size={64} />
                    <h3>{g.label}</h3>
                    <p>{g.intro}</p>
                    <Link className="x-all" href={site.conditionsUrl} onClick={closeNow}>
                      See all {allConditions.length} conditions →
                    </Link>
                  </div>
                </div>
                <div className="x-cfoot">
                  <span>Not sure which page fits? Describe what you feel instead.</span>
                  <button
                    type="button"
                    onClick={() => {
                      closeNow();
                      openFinder();
                    }}
                  >
                    Find care by symptom
                  </button>
                </div>
              </div>
            </div>
            {NAV.map((n) => (
              <Link key={n.href} className="x-nl" href={n.href} aria-current={here(n.href)}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="x-tools">
            <button type="button" className="x-find" onClick={openFinder} aria-label="Find care by symptom">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <span>What brings you in?</span>
              <kbd>/</kbd>
            </button>
            <a className="x-wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${site.phoneDisplay}`}>
              <WaGlyph />
            </a>
            <BookPill />
          </div>

          <Dialog.Root open={sheet} onOpenChange={setSheet}>
            <Dialog.Trigger asChild>
              <button type="button" className="x-menu-btn">
                <i />
                Menu
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content className="x-sheet" aria-describedby={undefined}>
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Dialog.Close asChild>
                  <button type="button" className="x-menu-btn x-close">
                    Close
                  </button>
                </Dialog.Close>
                <nav aria-label="Menu">
                  {[{ label: "Conditions", href: site.conditionsUrl, tag: "01" }, ...NAV, { label: "Contact", href: site.contactUrl, tag: "05" }].map((n, i) => (
                    <Link key={n.href} href={n.href} onClick={() => setSheet(false)} style={{ animationDelay: `${120 + i * 50}ms` }}>
                      {n.label}
                      <small>{n.tag}</small>
                    </Link>
                  ))}
                </nav>
                <div className="x-sf">
                  <span>{site.hoursShort}</span>
                  <a href={site.phoneTel}>{site.phoneDisplay}</a>
                  <span className="x-em">
                    Medical emergency? <a href={`tel:${site.emergency}`}>Call {site.emergency}</a>
                  </span>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <span className="x-prog" ref={progRef} />
        </div>
      </div>
      <div className="x-hdr-spacer" aria-hidden="true" />
    </>
  );
}
