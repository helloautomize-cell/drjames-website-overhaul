import { Icon } from "@/lib/icons";

const EM_HEADING = "when-to-get-help-straight-away";

/**
 * Renders markdown-produced HTML. The "When to get help straight away"
 * section (heading up to the next h2) is lifted into a red callout.
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
  const afterH = em.slice(endH + closeTag.length);
  const next = afterH.indexOf("<h2");
  const emBody = next === -1 ? afterH : afterH.slice(0, next);
  const rest = next === -1 ? "" : afterH.slice(next);
  return (
    <>
      <div className="prose" dangerouslySetInnerHTML={{ __html: normal }} />
      <div className="callout em em-block" id={EM_HEADING}>
        <Icon name="alert" size={24} />
        <div>
          <h2>{emTitle}</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: emBody }} />
        </div>
      </div>
      {rest ? <div className="prose" dangerouslySetInnerHTML={{ __html: rest }} /> : null}
    </>
  );
}
