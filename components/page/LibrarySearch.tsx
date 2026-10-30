"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/lib/icons";
import { CONTOURS } from "@/lib/contours";

/** Display-ready card data, precomputed on the server (mirrors ClCard). */
export interface SearchGuide {
  href: string;
  heading: string;
  img: string | null;
  imgAlt: string;
  imgFocus: string;
  icon: IconName;
  topicLabel: string;
  meta: string;
  q: string;
  draft: boolean;
}

const CARD_SIZES = "(max-width: 699px) 94vw, (max-width: 1099px) 30vw, 220px";

/**
 * Live search over the library. While a query is active the cluster layout
 * is hidden and matching guides are portaled into the empty #hl-results
 * shell as a plain card grid — nothing about the results is in the initial
 * HTML, so no cover image fetches until someone actually searches.
 * Clearing the search restores the cluster view. "/" focuses the field;
 * Enter jumps to the results. Without JS the input is inert and the full
 * cluster layout stays visible.
 */
export function LibrarySearch({ items }: { items: SearchGuide[] }) {
  const ref = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const matches = needle ? items.filter((i) => i.q.includes(needle)) : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA");
      if (e.key === "/" && !typing) {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const clusters = document.getElementById("hl-clusters");
    const results = document.getElementById("hl-results");
    const empty = document.getElementById("hl-empty");
    if (clusters) clusters.hidden = !!needle;
    if (results) results.hidden = !needle;
    if (empty) empty.hidden = !(needle && matches.length === 0);
  }, [needle, matches.length]);

  const target = needle
    ? typeof document !== "undefined"
      ? document.getElementById("hl-results")
      : null
    : null;

  return (
    <>
      <form
        className="hl-search"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          document.getElementById("hl-results")?.scrollIntoView({ block: "start" });
        }}
      >
        <span className="hl-search-ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M16.5 16.5L21 21" />
          </svg>
        </span>
        <input
          ref={ref}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search guides"
          aria-label="Search guides"
          aria-controls="hl-results"
        />
        <kbd aria-hidden="true">/</kbd>
      </form>
      {target &&
        createPortal(
          <div className="cl-grid">
            {matches.map((g) => (
              <Link key={g.href} className="cl-card" href={g.href}>
                <span className="cl-card-img">
                  <span className="gd-cover">
                    {g.img ? (
                      <Image
                        src={g.img}
                        alt={g.imgAlt}
                        fill
                        sizes={CARD_SIZES}
                        quality={80}
                        style={{ objectFit: "cover", objectPosition: g.imgFocus }}
                      />
                    ) : (
                      <span className="gd-cover-fb" aria-hidden="true">
                        <svg
                          className="gd-cover-lines"
                          viewBox="0 0 800 280"
                          preserveAspectRatio="xMidYMid slice"
                          aria-hidden="true"
                          focusable="false"
                        >
                          {CONTOURS.map((c, i) => (
                            <path key={i} d={c.d} />
                          ))}
                        </svg>
                        <span className="gd-cover-badge">
                          <Icon name={g.icon} size={40} />
                        </span>
                        <span className="gd-cover-topic">{g.topicLabel}</span>
                      </span>
                    )}
                  </span>
                  {g.draft && <span className="draft-chip">Draft</span>}
                </span>
                <span className="cl-card-body">
                  <b>{g.heading}</b>
                  <span className="cl-card-meta">{g.meta}</span>
                </span>
              </Link>
            ))}
          </div>,
          target,
        )}
    </>
  );
}
