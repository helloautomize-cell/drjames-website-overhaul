"use client";

import { useEffect, useRef, useState } from "react";

/** Small text button that copies a value and shows "Copied" briefly. */
export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => {
    if (t.current) clearTimeout(t.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      t.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; leave the label as is */
    }
  }

  return (
    <button type="button" className="copybtn" onClick={copy} aria-live="polite">
      {copied ? "Copied" : label}
    </button>
  );
}
