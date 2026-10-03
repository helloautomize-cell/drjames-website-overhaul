import Image from "next/image";
import { site } from "@/lib/site-config";
import { LogoMark } from "@/components/brand/Logo";
import { Icon } from "@/lib/icons";
import { Confirm } from "@/components/Confirm";

/**
 * Phone frame: mobile dark hero with the mini cube, the fixed action bar,
 * and the full-screen menu sheet. Below 1024px the action bar shows on
 * every page; the sheet has collapsed groups and a fixed Book/Call footer.
 */
export function PhoneDemo() {
  return (
    <div className="phonewrap">
      <div className="phone">
        <div className="scr">
          <div className="mh">
            <LogoMark />
            <Icon name="menu" size={26} />
          </div>
          <div className="mhero dark">
            <span className="eyebrow">Internal medicine · Muscat</span>
            <b>
              Many conditions. One <em className="acc">clear</em> plan.
            </b>
            <div className="mcube">
              <span className="mf">
                <Image
                  src="/images/doctor/dr-james-hero.png"
                  alt=""
                  width={419}
                  height={716}
                />
              </span>
              <span className="ms" />
              <span className="mt" />
            </div>
          </div>
        </div>
        <div className="bar" role="group" aria-label="Quick actions">
          <button type="button">
            <Icon name="calendar" size={22} />
            Book Now
          </button>
          <button type="button">
            <Icon name="phone" size={22} />
            Call Now
          </button>
          <button type="button">
            <Icon name="whatsapp" size={22} />
            WhatsApp
          </button>
        </div>
      </div>
      <div className="phone">
        <div className="msheet">
          <div className="mh">
            <LogoMark />
            <span className="x" aria-hidden="true">
              ✕
            </span>
          </div>
          <details className="acc-g">
            <summary>Conditions</summary>
            <a href="#">Diabetes and prediabetes</a>
            <a href="#">High blood pressure</a>
            <a href="#">Thyroid disorders</a>
          </details>
          <details className="acc-g">
            <summary>Your visit</summary>
            <a href="#">Plan your visit</a>
            <a href="#">Book an appointment</a>
          </details>
          <a className="acc-l" href="#">
            About Dr. James
          </a>
          <a className="acc-l" href="#">
            Health Library
          </a>
          <a className="acc-l" href="#">
            Contact
          </a>
          <div className="mfoot">
            <a className="btn btn-p" href="#">
              Book
            </a>
            <a className="btn btn-s" href="#">
              Call
            </a>
            <small>{site.hoursShort}</small>
          </div>
        </div>
      </div>
      <div className="specs">
        <p>
          <b>Book Now</b> opens the appointment form (<code>/contact/#book</code>).
        </p>
        <p>
          <b>Call Now</b> opens a sheet with {site.phoneDisplay} and the hospital
          switchboard <Confirm />.
        </p>
        <p>
          <b>WhatsApp</b> opens a chat with {site.phoneDisplay} and a message built from
          the page: &quot;Hello Dr. James, I would like to book a consultation about
          Diabetes and prediabetes. My name is &quot;.
        </p>
        <p>
          Teal to navy gradient at 92% under glass, 64px tall buttons, 16px top corners,
          safe-area padding. Hidden while typing in a form and on the thank-you page. On
          desktop it becomes the solid WhatsApp-green button at the bottom right of this
          page.
        </p>
      </div>
    </div>
  );
}

/** Floating WhatsApp button shown on desktop only. */
export function FloatingWhatsApp() {
  return (
    <a className="wa" href="#" aria-label="Chat on WhatsApp">
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
