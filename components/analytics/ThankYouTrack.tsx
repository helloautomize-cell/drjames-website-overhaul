"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires the conversion once — this page is only reached on form success. */
export function ThankYouTrack() {
  useEffect(() => {
    track("appointment_submit", {
      form_name: "appointment_form",
      page_path: window.location.pathname,
    });
  }, []);
  return null;
}
