import { site } from "@/lib/site-config";

const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.4917790524355!2d58.408220574786995!3d23.58668969504272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91ff0015d4d2e3%3A0x95427a33e24d773b!2zQmFkciBBbCBTYW1hYSBSb3lhbCBIb3NwaXRhbCDZhdiz2KrYtNmB2Ykg2KjYr9ixINin2YTYs9mF2KfYoSDYp9mE2YXZhNmD2Yo!5e0!3m2!1sen!2sin!4v1791136832601!5m2!1sen!2sin";

/** Live Google map of the hospital, with a directions shortcut. */
export function VisitMap() {
  return (
    <div className="vmap" role="group" aria-label={`Map showing ${site.address.hospital}, Al Ghubrah`}>
      <iframe
        title={`Map: ${site.address.hospital}`}
        src={MAPS_EMBED}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div className="vmap-acts">
        <a
          className="btn btn-p btn-sm"
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </a>
      </div>
    </div>
  );
}
