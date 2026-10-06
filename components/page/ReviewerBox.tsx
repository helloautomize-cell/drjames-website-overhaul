import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { Confirm } from "@/components/Confirm";

/**
 * Medical reviewer box required on every medical page (section 6.3).
 * The last-reviewed date stays [CONFIRM] until the doctor signs off.
 */
export function ReviewerBox({ lastReviewed }: { lastReviewed: string }) {
  const confirm = lastReviewed.includes("[CONFIRM]");
  return (
    <div className="revbox">
      <Image
        src="/images/doctor/d04-headshot-400sq.jpg"
        alt=""
        width={72}
        height={72}
      />
      <div className="who">
        <b>Medically reviewed by {site.name}</b>
        <small>
          {site.title}, {site.hospital}
        </small>
        <small>
          Last reviewed{" "}
          {confirm ? <Confirm>{lastReviewed}</Confirm> : <span className="num">{lastReviewed}</span>} ·{" "}
          <Link className="link" href="/editorial-policy/">
            Editorial and medical review policy
          </Link>
        </small>
      </div>
    </div>
  );
}
