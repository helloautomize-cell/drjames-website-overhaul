import { site } from "@/lib/site-config";

const MAPS_EMBED =
  "https://www.google.com/maps?q=Badr%20Al%20Samaa%20Royal%20Hospital%20Al%20Ghubrah%20Muscat&output=embed";

/** Live Google map of the hospital. */
export function MapLoader() {
  return (
    <figure className="cmap">
      <iframe
        title={`Map: ${site.address.hospital}`}
        src={MAPS_EMBED}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0, position: "absolute", inset: 0, width: "100%", height: "100%" }}
        allowFullScreen
      />
    </figure>
  );
}
