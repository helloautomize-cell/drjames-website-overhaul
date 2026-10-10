"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site-config";

/**
 * Click-to-load map: a static snapshot with actions until the user asks for
 * the live map — no Maps script or iframe on the page before then.
 */
export function MapFacade({ embedSrc }: { embedSrc: string }) {
  const [live, setLive] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (live) frameRef.current?.focus();
  }, [live]);

  if (live) {
    return (
      <iframe
        ref={frameRef}
        className="map-fac-frame"
        title={`Map: ${site.address.hospital}`}
        src={embedSrc}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        tabIndex={-1}
      />
    );
  }

  return (
    <>
      <Image
        src="/images/visit/map-static.webp"
        alt={`Map showing ${site.address.hospital}, ${site.address.street}`}
        fill
        sizes="(max-width: 900px) calc(100vw - 32px), 600px"
        style={{ objectFit: "cover" }}
      />
      <div className="map-fac-acts">
        <button type="button" className="btn btn-p btn-sm" onClick={() => setLive(true)}>
          Show interactive map
        </button>
        <a className="btn btn-o btn-sm" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
          Open in Google Maps
        </a>
      </div>
    </>
  );
}
