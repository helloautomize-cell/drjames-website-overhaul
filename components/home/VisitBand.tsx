import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { site } from "@/lib/site-config";
import { Confirm } from "@/components/Confirm";
import { LiveStatus } from "@/components/site/LiveStatus";
import { VisitMap } from "@/components/site/VisitMap";
import { whatsappLink } from "@/lib/whatsapp";

const Ic = ({ children }: { children: ReactNode }) => (
  <span className="ic" aria-hidden="true">
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 20 20">
      {children}
    </svg>
  </span>
);

/** Plan your visit: address/hours/phone card beside a click-to-load map facade. */
export function VisitBand() {
  return (
    <section className="sec" aria-labelledby="vb-h">
      <div className="container">
        <div className="sec-h">
          <span className="eyebrow">Plan your visit</span>
          <h2 id="vb-h">
            {site.hospital}, <em className="acc">Al Ghubrah</em>
          </h2>
        </div>
        <div className="visit">
          <div className="vcard">
            <div className="vrow">
              <Ic>
                <path d="M10 18s6-5.4 6-10a6 6 0 0 0-12 0c0 4.6 6 10 6 10Z" />
                <circle cx="10" cy="8" r="2" />
              </Ic>
              <div>
                <b>Address</b>
                <span>
                  {site.address.hospital}, {site.address.street}, {site.address.city} ·{" "}
                  {site.address.plusCode}
                </span>
              </div>
            </div>
            <div className="vrow">
              <Ic>
                <circle cx="10" cy="10" r="8" />
                <path d="M10 5v5l3 2" />
              </Ic>
              <div>
                <b>Hours</b>
                <div className="hours">
                  {site.hoursRows.map((r) => (
                    <Fragment key={r.days}>
                      <span>{r.days}</span>
                      <span className={r.closed ? "off" : undefined}>{r.times}</span>
                    </Fragment>
                  ))}
                </div>
                <LiveStatus className="x-status vb-live" />
              </div>
            </div>
            <div className="vrow">
              <Ic>
                <path d="M4 3h3l2 5-2 1a11 11 0 0 0 4 4l1-2 5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 2 5a2 2 0 0 1 2-2Z" />
              </Ic>
              <div>
                <b>Call or WhatsApp</b>
                <span>
                  <a className="lnk" href={site.phoneTel}>
                    {site.phoneDisplay}
                  </a>
                </span>
              </div>
            </div>
            <div className="vrow">
              <Ic>
                <path d="M7 3v5L3 16a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-4-8V3M6 3h8" />
              </Ic>
              <div>
                <b>On site</b>
                <span>
                  Tests, imaging and pharmacy at the hospital{" "}
                  <Confirm>[CONFIRM: which facilities]</Confirm>
                </span>
              </div>
            </div>
            <div className="btnrow" style={{ marginTop: 18 }}>
              <Link className="btn btn-p" href={site.bookUrl} data-ga="appointment">
                Book a consultation
              </Link>
              <a
                className="btn btn-o"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1f7a4d" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
          <VisitMap />
        </div>
      </div>
    </section>
  );
}
