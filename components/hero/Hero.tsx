import Image from "next/image";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Icon } from "@/lib/icons";
import { BookButton } from "@/components/BookButton";
import { CredentialCube } from "@/components/hero/CredentialCube";

/**
 * Hero v3: deep navy ground (the only dark surface), ECG line and arches
 * drawn once on load, copy column left, credential cube right.
 * Mobile keeps eyebrow, H1, cube, the booking row and one short line
 * above the fold.
 */
export function Hero() {
  return (
    <div className="hx">
      <svg
        className="hx-bg"
        viewBox="0 0 1200 680"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M760 680V360a260 260 0 0 1 520 0v320"
          fill="none"
          stroke="rgba(255,255,255,.06)"
          strokeWidth="2"
        />
        <path
          d="M700 680V330a320 320 0 0 1 640 0v350"
          fill="none"
          stroke="rgba(255,255,255,.035)"
          strokeWidth="2"
        />
        <path
          className="ecg"
          d="M0 600H520l16-30 20 62 22-104 24 132 18-60h100l12-18 14 18H1200"
          fill="none"
          stroke="#C29A5B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="hx-copy">
        <span className="hx-name">{site.name}</span>
        <span className="hx-eyebrow">Internal Medicine and Diabetes · Muscat, Oman</span>
        <h1>
          Many conditions.
          <br />
          One <em>clear</em> plan.
        </h1>
        <p className="hx-sub">
          Head of Internal Medicine at Badr Al Samaa Royal Hospital. Diabetes, blood
          pressure, heart risk, lungs, kidneys and liver, looked after together by one
          senior physician.
        </p>
        <p className="hx-short">
          Internal medicine and diabetes care at Badr Al Samaa Royal Hospital, Muscat.
        </p>
        <div className="hx-cta">
          <BookButton onDark adaptive />
          <a className="btn ghost-dark long" href={site.phoneTel}>
            Call {site.phoneDisplay}
          </a>
          <a
            className="btn ghost-dark wa-h"
            href={whatsappLink()}
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={20} />
            <span>WhatsApp</span>
          </a>
          <a
            className="btn ghost-dark icon-btn call"
            href={site.phoneTel}
            aria-label={`Call ${site.phoneDisplay}`}
          >
            <Icon name="phone" size={20} />
          </a>
        </div>
        <div className="hx-facts">
          <span>
            <b>{site.yearsInMedicine}+</b>years in medicine
          </span>
          <span>
            <b>{site.yearsInOman}</b>years in Oman
          </span>
          <span>
            <b>2</b>UK diabetes qualifications
          </span>
        </div>
        <div className="hx-chip">
          <Image
            src="/images/doctor/dr-james-avatar.jpg"
            alt=""
            width={42}
            height={42}
          />
          <span>
            <b>Physician-led care</b>
            <small>Dr. James Kumar Pallivathukkal, MD (Internal Medicine)</small>
          </span>
        </div>
      </div>
      <div className="hx-stage">
        <CredentialCube />
      </div>
    </div>
  );
}
