import { site } from "@/lib/site-config";
import { footerNav } from "@/lib/nav";
import { LogoHorizontal } from "@/components/brand/Logo";
import { Confirm } from "@/components/Confirm";
import { CookieSettingsLink } from "@/components/shell/CookieSettingsLink";

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="fcol main">
        <LogoHorizontal white />
        <p>
          {site.address.hospital},<br />
          {site.address.street}, {site.address.city}, {site.address.country}
        </p>
        <p className="fh">
          <span>Consultations</span>
          {site.hoursShort} <Confirm />
        </p>
        <p className="fh">
          <span>Phone and WhatsApp</span>
          {site.phoneDisplay}
        </p>
        <p className="fem">Medical emergency? Call {site.emergency}</p>
      </div>
      <div className="fcol">
        <b>Conditions</b>
        {footerNav.conditions.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
      <div className="fcol">
        <b>Patients</b>
        {footerNav.patients.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
      <div className="fcol">
        <b>Legal</b>
        {footerNav.legal.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
        <CookieSettingsLink />
      </div>
      <div className="fbase">
        © {new Date().getFullYear()} {site.name}. Health information on this site is for
        education and does not replace a consultation.
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
