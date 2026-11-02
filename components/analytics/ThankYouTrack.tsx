"use client";

import { useEffect } from "react";
import { pageType, track } from "@/lib/analytics";

/** Fires the conversion once — this page is only reached on form success. */
export function ThankYouTrack() {
  useEffect(() => {
    track("generate_lead", { page_type: pageType() });
  }, []);
  return null;
}
