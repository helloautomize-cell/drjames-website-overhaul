import { Icon } from "@/lib/icons";
import { CopyButton } from "@/components/site/CopyButton";

/**
 * Byline share controls: WhatsApp opens a chat picker with the heading + URL
 * (no phone number), "Copy link" uses the clipboard (CopyButton shows
 * "Copied" for 2s, aria-live).
 */
export function GuideShare({ title, url }: { title: string; url: string }) {
  const wa = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  return (
    <span className="gd-share">
      <a className="gd-share-b" href={wa} target="_blank" rel="noopener noreferrer">
        <Icon name="whatsapp" size={16} />
        WhatsApp
      </a>
      <CopyButton value={url} label="Copy link" />
    </span>
  );
}
