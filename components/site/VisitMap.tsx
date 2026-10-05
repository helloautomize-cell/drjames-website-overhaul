import { site } from "@/lib/site-config";

const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.4917790524355!2d58.408220574786995!3d23.58668969504272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91ff0015d4d2e3%3A0x95427a33e24d773b!2zQmFkciBBbCBTYW1hYSBSb3lhbCBIb3NwaXRhbCDZhdiz2KrYtNmB2Ykg2KjYr9ixINin2YTYs9mF2KfYoSDYp9mE2YXZhNmD2Yo!5e0!3m2!1sen!2sin!4v1791136832601!5m2!1sen!2sin";

/** Google Maps figure shared by the home Visit band and the Your visit page. */
export function VisitMap() {
  return (
    <figure className="vb-map">
      <iframe
        title={`Map: ${site.address.hospital}`}
        src={MAPS_EMBED}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="vb-frame"
      />
      <a className="vb-open" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
        Open in Google Maps <span aria-hidden="true">↗</span>
      </a>
    </figure>
  );
}
