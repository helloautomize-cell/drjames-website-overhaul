import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { MapLoader } from "@/components/MapLoader";
import { site } from "@/lib/site-config";
import { reasonFromParam } from "@/lib/booking-context";
import { whatsappLink } from "@/lib/whatsapp";
import { Icon } from "@/lib/icons";
import {
  pageMeta,
  JsonLd,
  breadcrumbNode,
  medicalWebPageNode,
  physicianNode,
  hospitalNode,
  medicalClinicNode,
  websiteNode,
} from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "Contact and book an appointment",
  "Book a consultation with Dr. James at Badr Al Samaa Royal Hospital, Al Ghubrah Street, Muscat. By WhatsApp, phone +968 9751 0975, or the form.",
  "/contact/",
);

const crumbs = [{ label: "Home", href: "/" }, { label: "Contact" }];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const reason = reasonFromParam(typeof sp.reason === "string" ? sp.reason : undefined);
  const sourcePage = reason ? `/contact/?reason=${encodeURIComponent(reason)}` : "/contact/";
  return (
    <main id="main">
      <JsonLd
        graph={[
          websiteNode,
          physicianNode,
          hospitalNode,
          medicalClinicNode,
          medicalWebPageNode("/contact/", "Contact and book an appointment", undefined, "[CONFIRM]"),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        title="Contact and book an appointment"
        img={{
          src: "/images/doctor/d07-welcome-1200w.jpg",
          alt: "Dr. James welcoming patients at the hospital reception",
          width: 1800,
          height: 1200,
        }}
        intro={
          <>
            Fill in the short form below to book your consultation, or message us on{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            or call <a href={site.phoneTel}>{site.phoneDisplay}</a>.
          </>
        }
      />
      <div className="container">
        <div className="pg-grid contact-grid">
          <div className="main">
            <section className="page-sec" style={{ paddingTop: 0, borderTop: 0 }}>
              <h2>Request an appointment</h2>
              <p className="sec-sub">
                Tell us the basics and we will confirm your slot by WhatsApp or phone. No
                account needed. Please don&rsquo;t include medical details in the form.
              </p>
              <BookingForm defaultReason={reason} sourcePage={sourcePage} />
            </section>
          </div>
          <aside className="pg-aside">
            <div className="info-cards" style={{ gridTemplateColumns: "1fr", marginTop: 0 }}>
              <div className="info-card contact-doc">
                <Image
                  src="/images/doctor/d04-headshot-400sq.jpg"
                  alt="Dr. James Kumar Pallivathukkal, specialist internist"
                  width={72}
                  height={72}
                />
                <b>{site.name}</b>
                <p>{site.title}</p>
              </div>
              <div className="info-card">
                <span className="ic">
                  <Icon name="pin" size={22} />
                </span>
                <b>Visit us</b>
                <p>
                  {site.address.hospital}
                  <br />
                  {site.address.street}, {site.address.city}, {site.address.country}
                  <br />
                  Plus code {site.address.plusCode}
                </p>
                <a className="link" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Get directions
                </a>
              </div>
              <div className="info-card">
                <span className="ic">
                  <Icon name="phone" size={22} />
                </span>
                <b>Phone and WhatsApp</b>
                <p>
                  <a href={site.phoneTel}>{site.phoneDisplay}</a>
                </p>
                <a className="link" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  Message on WhatsApp
                </a>
              </div>
              <div className="info-card">
                <span className="ic">
                  <Icon name="clock" size={22} />
                </span>
                <b>Consultation hours</b>
                <p>
                  {site.hours}
                  <br />
                  {site.hoursClosed}
                </p>
              </div>
            </div>
          </aside>
        </div>
        <section className="page-sec">
          <h2>Find us on the map</h2>
          <p className="sec-sub">
            The map loads only when you ask for it, so no data is shared with Google until
            then.
          </p>
          <MapLoader />
        </section>
      </div>
    </main>
  );
}
