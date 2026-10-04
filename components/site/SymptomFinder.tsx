"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { symptoms } from "@/lib/symptoms";
import { allConditions, conditionUrl } from "@/lib/conditions";
import { site } from "@/lib/site-config";

const FinderCtx = createContext<{ openFinder: () => void }>({ openFinder: () => {} });
export const useFinder = () => useContext(FinderCtx);

const titleOf = (slug: string) => allConditions.find((c) => c.slug === slug)?.title ?? slug;

/** Symptom finder dialog + provider. Opens from the header, curtain, dock and the "/" key. */
export function FinderProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const router = useRouter();
  const listId = "finder-list";
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const v = q.trim().toLowerCase();
    return symptoms
      .filter((s) => !v || s.phrase.toLowerCase().includes(v) || titleOf(s.slug).toLowerCase().includes(v))
      .slice(0, 7);
  }, [q]);

  const openFinder = useCallback(() => {
    setQ("");
    setSel(0);
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

  const go = (slug: string) => {
    setOpen(false);
    router.push(conditionUrl(slug));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = results.length;
    if (e.key === "ArrowDown" && n) {
      e.preventDefault();
      setSel((sel + 1) % n);
    } else if (e.key === "ArrowUp" && n) {
      e.preventDefault();
      setSel((sel - 1 + n) % n);
    } else if (e.key === "Enter" && results[sel]) {
      e.preventDefault();
      go(results[sel].slug);
    }
  };

  return (
    <FinderCtx.Provider value={{ openFinder }}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="x-scrim" />
          <Dialog.Content
            className="x-fpanel"
            aria-describedby={undefined}
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              inputRef.current?.focus();
            }}
          >
            <Dialog.Title className="sr-only">Find care by symptom</Dialog.Title>
            <div className="x-fin">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Tired all the time, high sugar…"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={results[sel] ? `finder-opt-${sel}` : undefined}
                aria-label="Describe what you feel"
                autoComplete="off"
              />
              <kbd>Esc</kbd>
            </div>
            <ul className="x-fres" id={listId} role="listbox" aria-label="Matching conditions">
              {results.length ? (
                results.map((r, i) => (
                  <li
                    key={r.phrase}
                    id={`finder-opt-${i}`}
                    role="option"
                    aria-selected={i === sel}
                    className={i === sel ? "x-on" : ""}
                    onMouseEnter={() => setSel(i)}
                    onClick={() => go(r.slug)}
                  >
                    <span>{r.phrase}</span>
                    <small>{titleOf(r.slug)} →</small>
                  </li>
                ))
              ) : (
                <li role="presentation">
                  <span>No match yet. Try a simpler word, or call {site.phoneDisplay}.</span>
                </li>
              )}
            </ul>
            <p className="x-fnote">
              <b>Chest pain, sudden breathlessness or weakness on one side? Call {site.emergency} now.</b>
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </FinderCtx.Provider>
  );
}
