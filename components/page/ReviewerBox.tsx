import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { fmtDateLong } from "@/lib/library";

/**
 * Medical reviewer box required on every medical page (section 6.3).
 * The "Last reviewed" line renders only once the doctor has signed off.
 */
export function ReviewerBox({ lastReviewed }: { lastReviewed: string | null }) {
  const reviewed = fmtDateLong(lastReviewed);
  return (
    <div className="revbox">
      <Image
        src="/images/doctor/d04-headshot-400sq.jpg"
        alt=""
        width={72}
        height={72}
      />
      <div className="who">
        <b>
          Medically reviewed by <Link href={site.profileUrl}>{site.name}</Link>
        </b>
        <small>
          {site.title}, {site.hospital}
        </small>
        <small>
          {reviewed ? (
            <>
              Last reviewed <span className="num">{reviewed}</span>
              {" · "}
            </>
          ) : null}
          <Link className="link" href="/editorial-policy/">
            Editorial and medical review policy
          </Link>
        </small>
      </div>
    </div>
  );
}
