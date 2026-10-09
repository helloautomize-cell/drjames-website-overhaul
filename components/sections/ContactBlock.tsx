import { site } from "@/lib/site-config";
import { Icon } from "@/lib/icons";
import { MapLoader } from "@/components/MapLoader";

/** Contact block: one address everywhere, hours, click-to-load map, map. */
export function ContactBlock() {
  return (
    <>
      <div className="contact">
        <div className="cinfo">
          <div className="crow">
            <Icon name="pin" size={22} />
            <div>
              <b>{site.address.hospital}</b>
              <span>
                {site.address.street},<br />
                {site.address.city}, {site.address.country}
              </span>
            </div>
          </div>
          <div className="crow">
            <Icon name="clock" size={22} />
            <div>
              <b>Consultations</b>
              <span>
                Calls and WhatsApp by appointment only. {site.hoursShort}
              </span>
            </div>
          </div>
          <div className="crow">
            <Icon name="phone" size={22} />
            <div>
              <b>Phone and WhatsApp</b>
              <span>{site.phoneDisplay}</span>
            </div>
          </div>
          <div className="crow">
            <Icon name="mail" size={22} />
            <div>
              <b>Email</b>
              <span>{site.emailDisplay}</span>
            </div>
          </div>
          <div className="btns">
            <a className="btn btn-p" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions
            </a>
            <a className="gchip" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" size={18} />
              See us on Google Maps
            </a>
          </div>
        </div>
        <MapLoader />
      </div>
    </>
  );
}
