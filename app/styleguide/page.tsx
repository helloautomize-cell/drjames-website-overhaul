import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { Icon, iconPaths, type IconName } from "@/lib/icons";
import {
  LogoHorizontal,
  LogoMark,
  LogoMarkSimple,
  LogoStacked,
} from "@/components/brand/Logo";
import { BookButton } from "@/components/BookButton";
import { Badge } from "@/components/Badge";
import { Confirm } from "@/components/Confirm";
import { Hero } from "@/components/hero/Hero";
import {
  UtilityBar,
  SiteHeader,
  MegaMenuDemo,
  Breadcrumbs,
} from "@/components/shell/Shell";
import { ConcernPills } from "@/components/sections/ConcernPills";
import { WhyCards } from "@/components/sections/WhyCards";
import { ServiceTabs } from "@/components/ServiceTabs";
import { StepTracker } from "@/components/StepTracker";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { ConditionsMarquee } from "@/components/sections/Marquee";
import { LibraryCarousel } from "@/components/LibraryCarousel";
import { libraryArticles } from "@/lib/library-articles";
import { Faq } from "@/components/sections/Faq";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { BookingFormDemo } from "@/components/sections/BookingForm";
import { Callouts } from "@/components/sections/Callouts";
import { SiteFooter, CookieDemo } from "@/components/sections/SiteFooter";
import { PhoneDemo, FloatingWhatsApp } from "@/components/mobile/PhoneDemo";

export const metadata: Metadata = {
  title: "Design system and components",
  description: "Living style guide for the Dr. James Pallivathukkal website.",
  robots: { index: false, follow: false },
};

function SecHead({ eyebrow, children, sub }: { eyebrow: string; children: ReactNode; sub?: string }) {
  return (
    <div className="sec-h">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

const SWATCHES: [string, string, string, string][] = [
  ["#1D6B72", "Primary · logo teal", "#1D6B72 · 6.18:1 with white", "--primary"],
  ["#0E2F52", "Secondary · logo navy", "#0E2F52 · 13.57:1", "--secondary"],
  ["#1A646B", "Teal text", "#1A646B · 6.82:1 · eyebrows", "--primary-500"],
  ["#14545A", "Teal pressed", "#14545A · 8.59:1", "--primary-700"],
  ["#DCEDEE", "Teal tint", "#DCEDEE · tabs, chips, tiles", "--primary-100"],
  ["#F2F8F8", "Teal wash", "#F2F8F8 · section tints", "--primary-50"],
  ["#10243A", "Ink", "#10243A · text · 15.72:1", "--ink"],
  ["#4A5F72", "Ink soft", "#4A5F72 · captions · 6.62:1", "--ink-2"],
  ["#DFE8EA", "Line", "#DFE8EA · borders", "--line"],
  ["#C9A46A", "Frankincense sand", "#C9A46A · decorative only", "--sand"],
  ["#A3BBBF", "Logo silver", "#A3BBBF · decorative only", "--mist"],
  ["#FBF7F0", "Sand wash", "#FBF7F0 · credentials only", "--sand-50"],
  ["#B8322B", "Alert red", "#B8322B · emergency · 5.95:1", "--alert"],
  ["#2F7D5B", "Success", "#2F7D5B · 4.99:1", "--success"],
];

const BADGE_ICONS: IconName[] = [
  "drop", "chol", "tape", "thy", "bp", "heart", "lungs", "chest", "sleep",
  "allergy", "therm", "kidney", "liver", "gut", "elder", "check", "joint", "rbc",
];

export default function Styleguide() {
  return (
    <>
      <main id="main" className="sg-wrap">
        <div className="top">
          <LogoHorizontal />
          <p className="note">
            Design system for drjamesp.com. Every component below is the approved
            production implementation; facts still open with the client are marked{" "}
            <Confirm />.
          </p>
        </div>

        {/* SHELL */}
        <section className="sg-sec">
          <SecHead
            eyebrow="Site shell"
            sub="Thin white utility bar with hours and the Oman emergency line, a sticky white header with the logo, menus and the two-part Book button, the compact dropdown panel and breadcrumbs."
          >
            Utility bar, header and <em className="acc">menu</em>
          </SecHead>
          <div className="shell">
            <UtilityBar />
            <SiteHeader />
          </div>
          <MegaMenuDemo />
          <Breadcrumbs />
        </section>

        {/* HERO */}
        <section className="sg-sec">
          <SecHead
            eyebrow="Hero · v3 · credential cube"
            sub="The cube from option B, rebuilt as a crafted object: four designed faces (portrait, training, experience, leadership), sand hairline frames, glass edges, a reflection and a slow orbit ring on the floor. It turns on its own, can be dragged, and the tabs below jump to any face."
          >
            His career, turned in the <em className="acc">hand</em>
          </SecHead>
          <Hero />
          <div className="bnote" role="note">
            <b className="t">Hero v3 rules</b>
            <ul>
              <li>
                <b>Ground:</b> full-width deep navy (<code>--night</code>), two faint
                arches behind the cube and the logo&apos;s ECG line in sand, drawn once
                on load. The only dark surface on the page.
              </li>
              <li>
                <b>Cube:</b> 360px desktop, 248px mobile. Faces are designed panels, not
                raw photos: frosted navy glass, a sand hairline inset frame, light
                edges. Portrait face first, so his face is what loads and what search
                previews show.
              </li>
              <li>
                <b>Motion:</b> a quarter turn every 4s with a 1.2s ease, an idle float
                of 6px, a sheen across each face as it arrives, a slow sand orbit ring
                on the floor. Pauses on hover, focus, drag and hidden tab. Drag or arrow
                keys turn it. Under reduced motion it stays on the portrait and the
                tabs switch faces without animation.
              </li>
              <li>
                <b>Tabs:</b> four pills under the cube with a sliding indicator; they
                are the accessible way to read every face (each face&apos;s text is
                also in the HTML for search).
              </li>
              <li>
                <b>Left column:</b> name signature, eyebrow, H1, sub, buttons, three
                fact figures and the doctor chip. No floating chips; the cube carries
                the detail.
              </li>
              <li>
                <b>Buttons:</b> Book (two-part) + &quot;Call +968 9751 0975&quot; +
                WhatsApp on desktop. On mobile: Book now + call icon + WhatsApp icon
                in ONE row.
              </li>
              <li>
                <b>Mobile order (390 x 844, all above the fold):</b> eyebrow, H1
                (34px), cube (210px) with tabs, the Book row, one short line. Name
                line, doctor chip and long sub are hidden on mobile; facts follow
                below the fold.
              </li>
              <li>
                <b>Doctor chip:</b> &quot;Physician-led care&quot; with his avatar
                under the facts, desktop only.
              </li>
            </ul>
          </div>
        </section>

        {/* CONCERN PILLS */}
        <section className="sg-sec">
          <SecHead
            eyebrow="Below the hero"
            sub="One row of plain-language pills straight under the hero, so a patient can start from what they feel, not from a specialty name. Swipes sideways on mobile."
          >
            Find care by <em className="acc">concern</em>
          </SecHead>
          <ConcernPills />
        </section>

        {/* PALETTE */}
        <section className="sg-sec">
          <SecHead
            eyebrow="Colour · draft"
            sub="Teal and navy come straight from the Dr. James logo. They read as calm and clinical, and the navy gives the weight of a senior physician. Frankincense sand is the one warm note: a quiet nod to Oman used only in hairlines, seal rings and glows."
          >
            Logo teal to deep <em className="acc">navy</em>
          </SecHead>
          <div className="gradbar">
            <span>Brand gradient</span>
            <span>#1D6B72 to #0E2F52</span>
          </div>
          <div className="swatches">
            {SWATCHES.map(([bg, name, sub, token]) => (
              <div className="sw" key={token}>
                <div
                  style={{
                    background: bg,
                    borderBottom:
                      bg === "#F2F8F8" || bg === "#FBF7F0" ? "1px solid #DFE8EA" : undefined,
                  }}
                />
                <p>
                  <b>{name}</b>
                  <span>{sub}</span>
                  <code>{token}</code>
                </p>
              </div>
            ))}
          </div>
          <div className="tscroll">
            <table className="ct">
              <thead>
                <tr>
                  <th>Text / element</th>
                  <th>On</th>
                  <th>Ratio</th>
                  <th>Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="pv" style={{ color: "#10243A" }}>
                      Ink #10243A
                    </span>
                  </td>
                  <td>White / teal wash / tint</td>
                  <td>15.72 / 14.64 / 13.02</td>
                  <td className="ok">All text</td>
                </tr>
                <tr>
                  <td>
                    <span className="pv" style={{ color: "#4A5F72" }}>
                      Ink soft #4A5F72
                    </span>
                  </td>
                  <td>White / teal tint</td>
                  <td>6.62 / 5.48</td>
                  <td className="ok">Captions, card text</td>
                </tr>
                <tr>
                  <td>
                    <span className="pv" style={{ color: "#1A646B" }}>
                      Teal text #1A646B
                    </span>
                  </td>
                  <td>White / wash / tint</td>
                  <td>6.82 / 6.35 / 5.65</td>
                  <td className="ok">Links, eyebrows, icons</td>
                </tr>
                <tr>
                  <td>
                    <span className="pv" style={{ color: "#1D6B72" }}>
                      Teal #1D6B72
                    </span>
                  </td>
                  <td>White / tint</td>
                  <td>6.18 / 5.12</td>
                  <td className="ok">Outlines, large text</td>
                </tr>
                <tr>
                  <td>
                    <span className="pv" style={{ background: "#1D6B72", color: "#fff" }}>
                      White on teal
                    </span>
                  </td>
                  <td>#1D6B72</td>
                  <td>6.18</td>
                  <td className="ok">Buttons, Book icon</td>
                </tr>
                <tr>
                  <td>
                    <span className="pv" style={{ background: "#0E2F52", color: "#fff" }}>
                      White on navy
                    </span>
                  </td>
                  <td>#0E2F52</td>
                  <td>13.57</td>
                  <td className="ok">Book label, footer</td>
                </tr>
                <tr>
                  <td>
                    <span className="pv" style={{ color: "#B8322B" }}>
                      Alert #B8322B
                    </span>
                  </td>
                  <td>White</td>
                  <td>5.95</td>
                  <td className="ok">Emergency line only</td>
                </tr>
                <tr>
                  <td>
                    <span className="pv" style={{ background: "#C9A46A", color: "#10243A" }}>
                      Sand #C9A46A
                    </span>{" "}
                    ·{" "}
                    <span className="pv" style={{ background: "#A3BBBF", color: "#10243A" }}>
                      Silver #A3BBBF
                    </span>
                  </td>
                  <td>White</td>
                  <td>2.33 / 2.02</td>
                  <td className="no">Never text</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rules">
            <div>
              <h3>Do</h3>
              <ul>
                <li>
                  White page background everywhere; tints only for chips, tabs, washes
                  and glows
                </li>
                <li>One gradient surface per viewport</li>
                <li>
                  Teal text <code>#1A646B</code> for links and eyebrows
                </li>
                <li>Sand only as a hairline, a seal ring, a glow or a badge sparkle</li>
                <li>
                  Red only for &quot;Medical emergency? Call 9999&quot; and the
                  emergency callout
                </li>
              </ul>
            </div>
            <div>
              <h3>Do not</h3>
              <ul>
                <li>
                  Pure black text, or grey text lighter than <code>#4A5F72</code>
                </li>
                <li>Gold or sand text, gold gradients or &quot;luxury&quot; foil effects</li>
                <li>
                  Colours outside this palette (WhatsApp green only on the WhatsApp
                  button)
                </li>
                <li>A red cross or red plus anywhere</li>
                <li>
                  Dark full-width hero panels; the dark arch is the only deep surface
                  in the hero
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* LOGO */}
        <section className="sg-sec">
          <SecHead
            eyebrow="Logo"
            sub="Redrawn as clean SVG from the old AI PNG, with the same arch, eight-point star, rod and serpent, ECG line, leaf and plus. Horizontal in the header (54px tall desktop, 44px mobile), stacked on the cover and About page, white on navy only, and the mark alone for the app icon."
          >
            The arch logo in <em className="acc">use</em>
          </SecHead>
          <div className="logos">
            <figure className="wide">
              <LogoHorizontal />
              <figcaption>Horizontal · header, documents · on white</figcaption>
            </figure>
            <figure>
              <LogoStacked />
              <figcaption>Stacked · cover, About page, print</figcaption>
            </figure>
            <figure className="wide on-navy">
              <LogoHorizontal white />
              <figcaption>White · footer and navy hero only</figcaption>
            </figure>
            <figure className="marks">
              <LogoMark />
              <span className="fav">
                <LogoMarkSimple />
              </span>
              <span className="fav sm">
                <LogoMarkSimple />
              </span>
              <figcaption>Mark · app icon, favicon (32 and 16 px)</figcaption>
            </figure>
          </div>
          <div className="callout info">
            <Icon name="info" size={22} />
            <p>
              <b>For the coding agent:</b> the six source SVGs live in{" "}
              <code>resources/brand/logo/</code> (horizontal, stacked and mark, each
              in colour and white). They are inlined here as React components so the
              wordmark uses Inter Tight from <code>next/font</code>; the white cut-outs
              follow <code>--logo-ground</code>, so set it to the surface colour
              behind the logo. Keep clear space equal to the medallion height on every
              side. Never stretch, recolour, add shadows or place the colour logo on
              navy. The 16px favicon uses a simplified mark (arch, star and rod only,
              shown above for approval). Outline the wordmark text when exporting
              files for print.
            </p>
          </div>
        </section>

        {/* TYPE */}
        <section className="sg-sec">
          <SecHead
            eyebrow="Typography · locked"
            sub="Inter Tight for everything. Newsreader italic for a single accent word in a heading. Body text never drops below 17px."
          >
            Inter Tight, with one <em className="acc">serif accent</em>
          </SecHead>
          <div className="type">
            <div className="row">
              <span className="lab">Display · 64/68 · 700</span>
              <span className="t-display">
                Care that explains <em className="acc">itself</em>
              </span>
            </div>
            <div className="row">
              <span className="lab">H1 · 52/58 · 700</span>
              <span className="t-h1">
                Diabetes and <em className="acc">prediabetes</em>
              </span>
            </div>
            <div className="row">
              <span className="lab">H2 · 40/48 · 650</span>
              <span className="t-h2">Your first visit, step by step</span>
            </div>
            <div className="row">
              <span className="lab">H3 · 22/30 · 600</span>
              <span className="t-h3">What happens at your consultation</span>
            </div>
            <div className="row">
              <span className="lab">Body large · 19/30</span>
              <span className="t-lg">
                Prediabetes means your sugar is higher than normal but not yet in the
                diabetes range. It is a good time to act.
              </span>
            </div>
            <div className="row">
              <span className="lab">Body · 17/28</span>
              <span>
                Bring your old prescriptions, reports and the medicines you take. If
                you have diabetes, bring your sugar diary or meter.
              </span>
            </div>
            <div className="row">
              <span className="lab">Small · 14/20 · 500</span>
              <span className="t-sm">
                Written by Dr. James Kumar Pallivathukkal · 5 min read
              </span>
            </div>
            <div className="row">
              <span className="lab">Eyebrow · 13 · 600</span>
              <span className="eyebrow">03 / How Dr. James can help</span>
            </div>
            <div className="row">
              <span className="lab">Arabic · proposed</span>
              <span className="ar" lang="ar">
                الطب الباطني والسكري
              </span>
            </div>
          </div>
        </section>

        {/* BUTTONS */}
        <section className="sg-sec">
          <SecHead
            eyebrow="Buttons and links"
            sub="The two-part Book button is the main action: teal icon block, navy label, single line. Hover each one."
          >
            Clear actions, gentle <em className="acc">motion</em>
          </SecHead>
          <div className="btns">
            <BookButton />
            <button className="btn btn-p" type="button">
              Book with Dr. James
            </button>
            <a className="btn btn-s" href={site.phoneTel}>
              Call {site.phoneDisplay}
            </a>
            <a className="btn wa-btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp {site.phoneDisplay}
            </a>
            <a className="link" href={site.profileUrl}>
              View profile <Icon name="arrow" size={14} strokeWidth={2.2} />
            </a>
          </div>
          <div className="btns">
            <a className="gchip" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" size={18} />
              See Dr. James on Google Maps
            </a>
            <span style={{ fontSize: 14, color: "var(--ink-2)" }}>
              Google Maps link chip: Visit band, Contact block and footer only. No star
              rating or review count shown.
            </span>
          </div>
        </section>

        {/* WHY CARDS */}
        <section className="sg-sec">
          <SecHead
            eyebrow="01 / Why Dr. James"
            sub="Glass cards over a teal tint with a sand glow, so the blur reads. Facts only, each one verifiable. They lift on hover."
          >
            Experience you can <em className="acc">check</em>
          </SecHead>
          <WhyCards />
        </section>

        {/* SERVICE TABS */}
        <section className="sg-sec">
          <SecHead
            eyebrow="03 / How Dr. James can help"
            sub="Each service is a free-standing medallion badge on a soft living glow, with no card or frame behind it. The bezel carries fine sand ticks like an instrument dial. Hover: the orbit ring spins once, the badge lifts and turns like a coin, and a sheen passes. The row moves on its own and pauses on hover or touch."
          >
            Conditions he looks <em className="acc">after</em>
          </SecHead>
          <ServiceTabs />
        </section>

        {/* STEP TRACKER */}
        <section className="sg-sec">
          <SecHead
            eyebrow="04 / Your first visit"
            sub="On the site this follows your scroll. Here, click a step or scroll the page. Inactive steps stay at 72% opacity so they still pass contrast."
          >
            Your first visit, step by <em className="acc">step</em>
          </SecHead>
          <StepTracker />
        </section>

        {/* DOCTOR CARD */}
        <section className="sg-sec">
          <SecHead
            eyebrow="05 / Meet your doctor"
            sub="One doctor, so one wide feature card, photographed at the hospital. Qualifications, role, experience and languages. No star ratings."
          >
            Meet <em className="acc">Dr. James</em>
          </SecHead>
          <DoctorCard />
          <div className="callout info">
            <Icon name="info" size={22} />
            <p>
              <b>How Dr. James works</b> (his own words from the current site, kept as
              a pull quote on the profile):{" "}
              <em className="acc" style={{ fontSize: "1.15em" }}>
                &quot;Every patient deserves not only the right treatment but also the
                right understanding of their health.&quot;
              </em>
            </p>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="sg-sec">
          <SecHead
            eyebrow="07 / Conditions"
            sub="Two rows of linked condition pills drifting slowly in opposite directions. Pauses on hover, focus and touch; static and wrapped under reduced motion; one row on mobile."
          >
            Conditions Dr. James looks <em className="acc">after</em>
          </SecHead>
          <ConditionsMarquee />
        </section>

        {/* LIBRARY CAROUSEL */}
        <section className="sg-sec">
          <SecHead
            eyebrow="08 / Health Library"
            sub="The three articles already on drjamesp.com, with designed covers instead of stock photos. Side cards fade and tilt; the active dot widens into a pill."
          >
            From the Health <em className="acc">Library</em>
          </SecHead>
          <LibraryCarousel articles={libraryArticles()} />
        </section>

        {/* FAQ */}
        <section className="sg-sec">
          <SecHead
            eyebrow="09 / Quick answers"
            sub="Native accordions (FAQPage JSON-LD), four on the home page with &quot;See all FAQs&quot;. All answer text is in the HTML."
          >
            Questions patients <em className="acc">ask</em>
          </SecHead>
          <Faq />
        </section>

        {/* CONTACT */}
        <section className="sg-sec">
          <SecHead
            eyebrow="Contact block"
            sub="One address everywhere (single NAP source). Hours as stacked rows. Map loads only after a click."
          >
            Visit Dr. James in <em className="acc">Al Ghubrah</em>
          </SecHead>
          <ContactBlock />
        </section>

        {/* FORM */}
        <section className="sg-sec">
          <SecHead
            eyebrow="Appointment form"
            sub="Field styles, the unticked consent box and the under-18 guardian rule. Works without JavaScript; errors show in a summary at the top."
          >
            Booking form, <em className="acc">calm</em> and short
          </SecHead>
          <BookingFormDemo />
        </section>

        {/* CALLOUTS */}
        <section className="sg-sec">
          <SecHead eyebrow="Callouts">Medical page <em className="acc">notices</em></SecHead>
          <Callouts />
          <p style={{ margin: 0, fontSize: 14, color: "var(--ink-2)" }}>
            The yellow <Confirm /> chip shows in development only. It is hidden in
            production, and <code>npm run launch-check</code> fails while any remain.
          </p>
        </section>

        {/* FOOTER + COOKIE */}
        <section className="sg-sec">
          <SecHead eyebrow="Footer and cookie banner">
            The last thing on every <em className="acc">page</em>
          </SecHead>
          <SiteFooter />
          <CookieDemo />
        </section>

        {/* PHOTOS */}
        <section className="sg-sec">
          <SecHead
            eyebrow="Photos from drjamesp.com"
            sub="All Dr. James photos on the live site downloaded fine. The real photos are good but small; the old site's service images are AI stock and stay out."
          >
            What we can use, and what we <em className="acc">need</em>
          </SecHead>
          <div className="photos">
            <figure>
              <div className="ph">
                <Image
                  className="cutout"
                  src="/images/doctor/dr-james-hero.png"
                  alt=""
                  width={419}
                  height={716}
                />
              </div>
              <figcaption>
                <span className="st fix">Use, needs original</span>
                <b>White coat cutout</b>
                Hero portrait. Only 556 x 770 online; ask for the original camera file
                (DSC04990), 2000px+ tall.
              </figcaption>
            </figure>
            <figure>
              <div className="ph">
                <Image
                  src="/images/doctor/dr-james-portrait.jpg"
                  alt=""
                  width={717}
                  height={896}
                />
              </div>
              <figcaption>
                <span className="st use">Use</span>
                <b>Hospital lobby, white coat</b>
                Doctor card and profile hero. 852 x 896; an original would be sharper.
              </figcaption>
            </figure>
            <figure>
              <div className="ph">
                <Image
                  src="/images/doctor/dr-james-certificate.jpg"
                  alt=""
                  width={1037}
                  height={767}
                />
              </div>
              <figcaption>
                <span className="st use">Use</span>
                <b>Certificate, office</b>
                Training and career section. 1037 x 767.
              </figcaption>
            </figure>
            <figure>
              <div className="ph">
                <Image
                  src="/images/clinic/dr-james-consultation.jpg"
                  alt=""
                  width={760}
                  height={496}
                />
              </div>
              <figcaption>
                <span className="st use">Use</span>
                <b>At his desk</b>
                About page or step 3, Consultation. 920 x 601.
              </figcaption>
            </figure>
          </div>
          <div className="rules">
            <div>
              <h3>Keep for About or news only</h3>
              <ul>
                <li>Green shirt cutout (alternate portrait)</li>
                <li>Guinness World Records photos with the adjudicator</li>
                <li>Oman National Day and team photos (staff faces need consent)</li>
                <li>
                  Certificate scans (Cardiff, South Wales, Vinayaka Missions) as
                  evidence, not decoration
                </li>
              </ul>
            </div>
            <div>
              <h3>Do not use</h3>
              <ul>
                <li>
                  Two consultation photos with a patient in frame, unless written
                  consent exists
                </li>
                <li>
                  All 13 AI-generated service images and the four AI medical posters
                </li>
                <li>
                  Theme demo leftovers: stranger &quot;testimonial&quot; headshots, the
                  doctor stock photo, partner and award logos that are not his
                </li>
                <li>
                  Two theme banner images that failed to download from the theme&apos;s
                  demo server (not needed)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* BADGES */}
        <section className="sg-sec">
          <SecHead
            eyebrow="Service badges"
            sub="All 18 badges use the logo's teal and navy with small sand sparkles, so they sit naturally next to the arch logo. Make them in one session with the same settings. The teal line icons on the current site are a good subject list but too thin for this style."
          >
            Badge colours and <em className="acc">prompt</em>
          </SecHead>
          <div className="prompt">
            Circular medical service badge, clean line-art illustration of [SUBJECT],
            gradient strokes from deep teal #1D6B72 to navy #0E2F52, with small soft
            sand-gold #C9A46A plus-sign sparkles, centred on a plain off-white
            background #F6FAFA, no text, no logos, no brand names, no red cross, flat
            premium style, 1024x1024.
          </div>
          <div className="bgrid">
            {BADGE_ICONS.map((k) => (
              <figure key={k}>
                <Badge icon={k} size={96} />
                <figcaption>{k}</figcaption>
              </figure>
            ))}
          </div>
          <h3 className="sub-h">Badge sizes</h3>
          <div className="bsizes">
            {(["sm", "md", "lg"] as const).map((n, i) => {
              const s = [64, 112, 160][i];
              return (
                <figure key={n}>
                  <Badge icon="drop" size={s} />
                  <figcaption>
                    {n} · {s}px
                  </figcaption>
                </figure>
              );
            })}
          </div>
          <h3 className="sub-h">Line icons (UI only, 32px and under, 1.75 stroke)</h3>
          <div className="licons">
            {(Object.keys(iconPaths) as IconName[])
              .filter((k) => BADGE_ICONS.includes(k))
              .map((k) => (
                <figure key={k}>
                  <Icon name={k} size={24} />
                  <figcaption>{k}</figcaption>
                </figure>
              ))}
          </div>
        </section>

        {/* MOBILE */}
        <section className="sg-sec" id="bar">
          <SecHead
            eyebrow="Mobile"
            sub="The fixed action bar shows on every page below 1024px; tap the buttons to feel the pressed state. The menu opens as a full-screen white sheet with collapsed accordion groups and a fixed Book and Call footer."
          >
            Action bar and menu <em className="acc">sheet</em>
          </SecHead>
          <PhoneDemo />
        </section>
      </main>
      <FloatingWhatsApp />
    </>
  );
}
