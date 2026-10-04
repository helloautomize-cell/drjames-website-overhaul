"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires the lead event once — this page is only reached on form success. */
export function ThankYouTrack() {
  useEffect(() => {
    track("generate_lead", { form_type: "appointment" });
  }, []);
  return null;
}
