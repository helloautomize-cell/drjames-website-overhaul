import { site } from "@/lib/site-config";
import { MapFacade } from "@/components/site/MapFacade";

const MAPS_EMBED =
  "https://www.google.com/maps?q=Badr%20Al%20Samaa%20Royal%20Hospital%20Al%20Ghubrah%20Muscat&output=embed";

/** Static map + click-to-load live map of the hospital. */
export function MapLoader() {
  return (
    <figure className="cmap" aria-label={`Map showing ${site.address.hospital}, Al Ghubrah`}>
      <MapFacade embedSrc={MAPS_EMBED} />
    </figure>
  );
}
