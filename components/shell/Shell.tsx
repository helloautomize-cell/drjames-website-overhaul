import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/lib/site-config";
import { utilityLinks } from "@/lib/nav";
import { LogoHorizontal } from "@/components/brand/Logo";
import { Icon } from "@/lib/icons";
import { BookButton } from "@/components/BookButton";

/** Thin white utility bar: hours and quick links. */
export function UtilityBar() {
  return (
    <div className="ubar">
      <span className="hide-s">
        {utilityLinks.map((l, i) => (
          <span key={l.href}>
            {i > 0 && "· "}
            <a href={l.href}>{l.label}</a>
          </span>
        ))}
      </span>
      <span>
        <Icon name="clock" size={16} />
        {site.hoursShort}
      </span>
      <span>
        <a href={site.phoneTel}>{site.phoneDisplay}</a>
      </span>
    </div>
  );
}

/** Sticky white header: horizontal logo, menus, two-part Book button. */
export function SiteHeader() {
  return (
    <div className="hdr">
      <LogoHorizontal style={{ flex: "none" }} />
      <nav aria-label="Main">
        <span>Conditions ▾</span>
        <span>Your visit ▾</span>
        <span>About Dr. James</span>
        <span>Health Library</span>
      </nav>
      <BookButton />
    </div>
  );
}

const MM_COLS = [
  {
    h: "Diabetes and metabolism",
    links: ["Diabetes and prediabetes", "High cholesterol", "Weight management", "Thyroid disorders"],
  },
  {
    h: "Heart, lungs and sleep",
    links: ["High blood pressure", "Heart risk assessment", "Asthma and breathing", "Sleep apnea"],
  },
  {
    h: "Kidney, liver and more",
    links: ["Kidney problems", "Fatty liver", "Care for older adults", "Preventive check-ups"],
  },
];

/** The compact Conditions dropdown panel with the doctor card column. */
export function MegaMenuDemo() {
  return (
    <div className="mm-demo">
      <div className="mm-panel" style={{ "--cols": 3 } as CSSProperties}>
        {MM_COLS.map((c) => (
          <div className="mm-col" key={c.h}>
            <span className="mm-h">{c.h}</span>
            {c.links.map((l) => (
              <a href="#" key={l}>
                {l}
              </a>
            ))}
          </div>
        ))}
        <div className="mm-doc">
          <Image
            src="/images/doctor/d04-headshot-160sq.jpg"
            alt=""
            width={48}
            height={48}
          />
          <b>Dr. James</b>
          <span>Internal Medicine and Diabetes</span>
          <a className="link" href={site.profileUrl}>
            View profile <Icon name="arrow" size={14} strokeWidth={2.2} />
          </a>
        </div>
      </div>
      <p className="spec">
        Conditions dropdown: solid white panel (98%), 16px radius, explicit grid{" "}
        <code>repeat(3,minmax(170px,auto)) 220px</code>, small uppercase column heads, a
        doctor card in its own column. Hover intent 120ms; keyboard and Esc work.
      </p>
    </div>
  );
}

export function Breadcrumbs() {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <a href="#">Home</a>
      <span>/</span>
      <a href="#">Conditions</a>
      <span>/</span>
      <b>Diabetes and prediabetes</b>
    </nav>
  );
}
