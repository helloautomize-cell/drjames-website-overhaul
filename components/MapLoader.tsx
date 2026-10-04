"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site-config";
import { Icon } from "@/lib/icons";

const MAPS_EMBED =
  "https://www.google.com/maps?q=Badr%20Al%20Samaa%20Royal%20Hospital%20Al%20Ghubrah%20Muscat&output=embed";

/**
 * Click-to-load Google Map: a static hospital card until the visitor
 * asks for the map, so no Google requests fire before the click.
 */
export function MapLoader() {
  const [show, setShow] = useState(false);
  return (
    <figure className="cmap">
      {show ? (
        <iframe
          title={`Map: ${site.address.hospital}`}
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, position: "absolute", inset: 0, width: "100%", height: "100%" }}
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src="/images/doctor/dr-james-portrait.jpg"
            alt="Badr Al Samaa Royal Hospital lobby"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <figcaption>
            <span>{site.address.hospital}</span>
            <button type="button" className="btn btn-s" onClick={() => setShow(true)}>
              <Icon name="pin" size={16} /> Show map
            </button>
          </figcaption>
        </>
      )}
    </figure>
  );
}
