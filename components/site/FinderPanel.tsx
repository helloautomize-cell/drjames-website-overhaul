"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { symptoms } from "@/lib/symptoms";
import { allConditions, conditionUrl } from "@/lib/conditions";
import { site } from "@/lib/site-config";

const titleOf = (slug: string) => allConditions.find((c) => c.slug === slug)?.title ?? slug;

/** Symptom finder dialog — loaded on demand by FinderProvider, never at boot. */
export default function FinderPanel({
  open,
  onOpenChange,
  preset,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preset: string;
}) {
  const [q, setQ] = useState(preset);
  const [sel, setSel] = useState(0);
  const router = useRouter();
  const listId = "finder-list";
  const inputRef = useRef<HTMLInputElement>(null);

  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setQ(preset);
      setSel(0);
    }
  }

  const results = useMemo(() => {
    const v = q.trim().toLowerCase();
    return symptoms
      .filter((s) => !v || s.phrase.toLowerCase().includes(v) || titleOf(s.slug).toLowerCase().includes(v))
      .slice(0, 7);
  }, [q]);

  const go = (slug: string) => {
    onOpenChange(false);
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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
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
          <ul className="x-fres" id={listId} role="listbox" aria-label="Matching areas of expertise">
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
            <b>Chest pain, sudden breathlessness or weakness on one side? Go to the nearest emergency department now.</b>
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
