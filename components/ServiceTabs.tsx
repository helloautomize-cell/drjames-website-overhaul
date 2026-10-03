"use client";

import { useState } from "react";
import { conditionGroups } from "@/lib/conditions";
import { Icon } from "@/lib/icons";
import { Badge } from "@/components/Badge";
import { AutoRow } from "@/components/AutoRow";

/**
 * Service tabs + free-standing medallion cards on a soft living glow.
 * The row auto-moves and pauses on hover or touch (AutoRow).
 */
export function ServiceTabs() {
  const [active, setActive] = useState(0);
  const group = conditionGroups[active];

  return (
    <>
      <div className="tabs" role="tablist">
        {conditionGroups.map((g, i) => (
          <button
            key={g.id}
            className="tab"
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
          >
            {g.label}
          </button>
        ))}
      </div>
      <p style={{ margin: 0, color: "var(--ink-2)" }}>{group.intro}</p>
      <div className="washsvc">
        <AutoRow id="arches" className="sgrow">
          {group.conditions.map((c) => (
            <a className={`sgc g${group.blobVariant}`} href="#" key={c.slug}
               onClick={(e) => e.preventDefault()}>
              <div className="halo">
                <span className="blob a" />
                <span className="blob b" />
                <span className="badge">
                  <span className="coin">
                    <Badge icon={c.icon} />
                  </span>
                </span>
              </div>
              <b>{c.title}</b>
              <span className="d">{c.line}</span>
              <span className="more">
                Learn more <Icon name="arrow" size={16} strokeWidth={2.2} />
              </span>
            </a>
          ))}
        </AutoRow>
      </div>
    </>
  );
}
