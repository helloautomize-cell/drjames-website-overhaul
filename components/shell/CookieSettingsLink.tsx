"use client";

import { openConsentSettings } from "@/lib/consent";

/** Footer button that reopens the cookie banner. */
export function CookieSettingsLink() {
  return (
    <button className="flink" type="button" onClick={openConsentSettings}>
      Cookie settings
    </button>
  );
}
