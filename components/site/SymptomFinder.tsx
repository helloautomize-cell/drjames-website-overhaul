"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

// the dialog (radix + symptom data) stays out of the boot bundle; it loads on
// first open or on pointerenter/focus of a finder trigger
const FinderPanel = dynamic(() => import("./FinderPanel"), { ssr: false });

const FinderCtx = createContext<{ openFinder: (preset?: unknown) => void; preloadFinder: () => void }>({
  openFinder: () => {},
  preloadFinder: () => {},
});
export const useFinder = () => useContext(FinderCtx);

/** Provides openFinder() to header, curtain, dock and the "/" key. */
export function FinderProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState("");
  const [load, setLoad] = useState(false);

  const preloadFinder = useCallback(() => {
    setLoad(true);
    void import("./FinderPanel");
  }, []);

  const openFinder = useCallback((p?: unknown) => {
    setPreset(typeof p === "string" ? p : "");
    setLoad(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      if (el instanceof HTMLElement && el.matches("input, textarea, select, [contenteditable]")) return;
      e.preventDefault();
      openFinder();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openFinder]);

  return (
    <FinderCtx.Provider value={{ openFinder, preloadFinder }}>
      {children}
      {load ? <FinderPanel open={open} onOpenChange={setOpen} preset={preset} /> : null}
    </FinderCtx.Provider>
  );
}
