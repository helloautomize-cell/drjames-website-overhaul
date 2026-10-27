import Link from "next/link";
import { site } from "@/lib/site-config";
import { Icon } from "@/lib/icons";
import { footerNav } from "@/lib/nav";
import { LogoHorizontal } from "@/components/brand/Logo";
import { CookieSettingsLink } from "@/components/shell/CookieSettingsLink";

export function SiteFooter() {
  return (
    <footer className="foot" data-header="dark">
      <div className="fcol main">
        <LogoHorizontal white />
        <p>
          {site.address.hospital},<br />
          {site.address.street}, {site.address.city}, {site.address.country}
        </p>
        <p className="fh">
          <span>Consultations</span>
          Calls and WhatsApp by appointment only. {site.hoursShort}
        </p>
        <p className="fh">
          <span>Phone and WhatsApp</span>
          {site.phoneDisplay}
        </p>
        <div className="fh">
          <span>Follow</span>
          <div className="soc soc-icons">
            {site.social.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={`Dr. James on ${s.label} (opens in a new tab)`}
              >
                <Icon name={s.id} size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="fcol">
        <b>Areas of Expertise</b>
        {footerNav.conditions.map((l) => (
          <Link key={l.label} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="fcol">
        <b>Patients</b>
        {footerNav.patients.map((l) => (
          <Link key={l.label} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="fcol">
        <b>Legal</b>
        {footerNav.legal.map((l) => (
          <Link key={l.label} href={l.href}>
            {l.label}
          </Link>
        ))}
        <CookieSettingsLink />
      </div>
      <div className="fbase">
        © {new Date().getFullYear()} {site.name}. Health information on this site is for
        education and does not replace a consultation.
        <p className="fcredit">
          Built &amp; Marketed by{" "}
          <a
            href="https://www.automizemedialabs.com/"
            target="_blank"
            rel="noopener nofollow"
          >
            Automize Media Labs
          </a>
        </p>
      </div>
    </footer>
  );
}

export function CookieDemo() {
  return (
    <div className="cookie-demo">
      <div className="cookie" role="dialog" aria-label="Cookie choices">
        <b>Cookies on this site</b>
        <p>
          We use essential cookies to run the site. With your permission we also use
          analytics to improve it. No ads, no health data.
        </p>
        <div className="btns">
          <button className="btn btn-p" type="button">
            Accept
          </button>
          <button className="btn btn-s" type="button">
            Decline
          </button>
          <a className="link" href="#">
            Settings
          </a>
        </div>
      </div>
      <p className="spec">
        Small glass card, bottom left on desktop, above the mobile bar on phones.
        Analytics load only after Accept.
      </p>
    </div>
  );
}
