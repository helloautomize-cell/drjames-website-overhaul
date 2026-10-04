import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { BookPill } from "@/components/site/BookPill";
import { LiveStatus } from "@/components/site/LiveStatus";
import { HeroVisual } from "@/components/home/HeroVisual";

const delay = (s: number) => ({ animationDelay: `${s}s` });

/** Home hero on pearl: promise, lede, CTAs, portrait panel with pillar card, proof strip. */
export function Hero() {
  return (
    <section className="x-hero" aria-labelledby="hero-h">
      <div className="container">
        <div className="x-hgrid">
          <div>
            <div className="x-mstat">
              <LiveStatus className="x-mst" />
            </div>
            <div className="eyebrow x-in" style={delay(0.05)}>
              Specialist Internist · Muscat, Oman
            </div>
            <h1 id="hero-h" className="x-h1">
              <span className="x-ln" style={{ ["--i" as string]: 0 }}>
                <span>A physician </span>
              </span>
              <span className="x-ln" style={{ ["--i" as string]: 1 }}>
                <span>who sees the </span>
              </span>
              <span className="x-ln" style={{ ["--i" as string]: 2 }}>
                <span>
                  <em>whole picture.</em>
                </span>
              </span>
            </h1>
            <p className="x-lede x-in" style={delay(0.24)}>
              Comprehensive internal medicine for long-term health. Diabetes, heart and kidney risk,
              lungs and complex adult conditions, looked after together by one senior specialist.
            </p>
            <div className="x-ctas x-in" style={delay(0.34)}>
              <BookPill large />
              <a className="x-btn2" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
                </svg>
                Message on WhatsApp
              </a>
            </div>
            <p className="x-where x-in" style={delay(0.42)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8C6A33" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                At {site.hospital}, Al Ghubrah
              </a>
            </p>
          </div>
          <HeroVisual />
        </div>

        <div className="x-proof" role="group" aria-label="Training and experience">
          <div>
            <b>{site.yearsInMedicine}</b>
            <span>years in medicine, {site.yearsInOman} of them in Oman</span>
          </div>
          <div>
            <b>MD</b>
            <span>Internal Medicine, Manipal, 2007</span>
          </div>
          <div>
            <b>MSc</b>
            <span>Diabetes, University of South Wales, and PG Diploma, Cardiff University</span>
          </div>
          <div>
            <b>ICU</b>
            <span>Led intensive care and COVID‑19 operations across three hospitals</span>
          </div>
        </div>
      </div>
    </section>
  );
}
