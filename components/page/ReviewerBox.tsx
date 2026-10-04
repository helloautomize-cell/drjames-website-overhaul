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
        src="/images/doctor/dr-james-avatar.jpg"
        alt=""
        width={56}
        height={56}
      />
      <div className="who">
        <b>Medically reviewed by {site.name}</b>
        <small>
          {site.title}, {site.hospital}
        </small>
        <small>
          Last reviewed{" "}
          {confirm ? <Confirm>{lastReviewed}</Confirm> : lastReviewed} ·{" "}
          <Link className="link" href="/editorial-policy/">
            Editorial and medical review policy
          </Link>
        </small>
      </div>
    </div>
  );
}
