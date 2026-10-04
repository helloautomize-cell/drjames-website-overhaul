import { Icon } from "@/lib/icons";

const EM_HEADING = "when-to-get-help-straight-away";

/**
 * Renders markdown-produced HTML. If the last h2 is the emergency
 * section, it is lifted into a red callout instead of a plain section.
 */
export function ArticleBody({ html }: { html: string }) {
  const marker = `<h2 id="${EM_HEADING}">`;
  const idx = html.indexOf(marker);
  if (idx === -1) {
    return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
  }
  const normal = html.slice(0, idx);
  const em = html.slice(idx + marker.length);
  const closeTag = "</h2>";
  const endH = em.indexOf(closeTag);
  const emTitle = em.slice(0, endH);
  const emBody = em.slice(endH + closeTag.length);
  return (
    <>
      <div className="prose" dangerouslySetInnerHTML={{ __html: normal }} />
      <div className="callout em em-block">
        <Icon name="alert" size={24} />
        <div>
          <h2>{emTitle}</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: emBody }} />
        </div>
      </div>
    </>
  );
}
