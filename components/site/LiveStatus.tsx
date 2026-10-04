"use client";

import { useEffect, useState } from "react";
import { clinicStatus, STATUS_SIZER, type ClinicStatus } from "@/lib/status";

/**
 * Live clinic status in Muscat time. Rendered after hydration; an invisible
 * sizer reserves the widest text so nothing shifts when it appears.
 */
export function LiveStatus({ className = "x-status" }: { className?: string }) {
  const [s, setS] = useState<ClinicStatus | null>(null);
  useEffect(() => {
    const tick = () => setS(clinicStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`${className}${s && !s.open ? " x-closed" : ""}`}>
      <span className="x-dot" aria-hidden="true" />
      <span className="x-st-wrap">
        <span className="x-st-size" aria-hidden="true">
          {STATUS_SIZER}
        </span>
        <span className="x-st-t" aria-live="off">
          {s?.text ?? ""}
        </span>
      </span>
    </span>
  );
}
