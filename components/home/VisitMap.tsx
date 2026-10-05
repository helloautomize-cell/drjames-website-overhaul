"use client";

import { useState } from "react";
import { site } from "@/lib/site-config";
import { Icon } from "@/lib/icons";
import { track } from "@/lib/analytics";

const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.4917790524355!2d58.408220574786995!3d23.58668969504272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91ff0015d4d2e3%3A0x95427a33e24d773b!2zQmFkciBBbCBTYW1hYSBSb3lhbCBIb3NwaXRhbCDZhdiz2KrYtNmB2Ykg2KjYr9ixINin2YTYs9mF2KfYoSDYp9mE2YXZhNmD2Yo!5e0!3m2!1sen!2sin!4v1791136832601!5m2!1sen!2sin";

/** Designed map card: click loads the real Google Maps embed for the hospital. */
export function VisitMap() {
  const [show, setShow] = useState(false);
  return (
    <figure className="vb-map">
      {show ? (
        <iframe
          title={`Map: ${site.address.hospital}`}
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="vb-frame"
        />
      ) : (
        <>
          <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="500" height="400" fill="var(--night)" />
            <path d="M0 0 H500 V86 Q390 108 320 92 Q230 72 150 96 Q70 118 0 100 Z" fill="rgba(29,107,114,.28)" />
            <path d="M0 96 Q70 114 150 92 Q230 68 320 88 Q390 104 500 82" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="1.2" />
            <path d="M-20 340 Q120 300 240 330 T520 310" fill="none" stroke="rgba(194,154,91,.12)" strokeWidth="1" />
            <path d="M-20 370 Q140 340 260 365 T520 345" fill="none" stroke="rgba(194,154,91,.12)" strokeWidth="1" />
            <path d="M60 400 Q90 260 210 240 Q330 222 360 130" fill="none" stroke="rgba(194,154,91,.12)" strokeWidth="1" />
            {Array.from({ length: 7 }, (_, r) =>
              Array.from({ length: 9 }, (_, c) => (
                <circle key={`${r}-${c}`} cx={36 + c * 54} cy={140 + r * 40} r="1.4" fill="rgba(255,255,255,.07)" />
              )),
            )}
            <path d="M0 190 Q160 175 300 195 T500 180" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="1.4" />
            <path d="M0 258 Q180 240 330 262 T500 250" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="1.4" />
            <path d="M120 400 Q140 300 210 250 Q280 200 290 100" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="3.2" />
            <path d="M340 400 Q330 310 370 250 Q410 190 405 120" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="1.4" />
            <path d="M500 330 Q420 320 340 340 Q240 368 140 350" fill="none" stroke="rgba(217,183,126,.35)" strokeWidth="1.4" />
          </svg>
          <span className="vb-sea">Gulf of Oman</span>
          <span className="vb-loc">Al Ghubrah · Muscat</span>
          <span className="vb-pin" aria-hidden="true">
            <span className="vb-halo" />
            <span className="vb-halo vb-halo2" />
            <span className="vb-pt" />
          </span>
          <span className="vb-tag" aria-hidden="true">
            <b>Badr Al Samaa</b>
            <span>Royal Hospital, Al Ghubrah</span>
          </span>
          <button
            type="button"
            className="vb-show"
            onClick={() => {
              track("map_load");
              setShow(true);
            }}
          >
            <Icon name="pin" size={15} strokeWidth={1.75} /> Show map
          </button>
        </>
      )}
      <a
        className="vb-open"
        href={site.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Open in Google Maps <span aria-hidden="true">↗</span>
      </a>
    </figure>
  );
}
