"use client";

import { useCallback, useRef, useState } from "react";

const PAGE = 12;

/**
 * "Show more guides" — reveals the next 12 rows (server-rendered but hidden
 * behind data-extra) and mirrors the page number into ?page=n so the view is
 * shareable. Real /health-library/page/n/ routes exist for crawlers.
 */
export function LibraryMore() {
  const [page, setPage] = useState(1);
  const [done, setDone] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  const reveal = useCallback(() => {
    const hidden = document.querySelectorAll<HTMLElement>(".hl-row[data-extra]");
    hidden.forEach((r, i) => {
      if (i < PAGE) {
        r.removeAttribute("data-extra");
        r.hidden = false;
      }
    });
    const next = page + 1;
    setPage(next);
    if (hidden.length <= PAGE) setDone(true);
    try {
      const u = new URL(window.location.href);
      u.searchParams.set("page", String(next));
      window.history.replaceState(null, "", u);
    } catch {
      /* non-critical */
    }
  }, [page]);

  if (done) return null;
  return (
    <button id="hl-more" ref={btn} type="button" className="cx-btn cx-btn-o hl-more" onClick={reveal}>
      Show more guides
    </button>
  );
}
