"use client";

/**
 * Consent store. One localStorage record holds the visitor's choices;
 * analytics (Phase 5) only loads after `analytics: true`.
 * `CONSENT_OPEN_EVENT` lets any link (e.g. footer "Cookie settings")
 * reopen the banner. `CONSENT_EVENT` fires after every change.
 * The parsed value is cached so useSyncExternalStore snapshots stay stable.
 */

export interface ConsentState {
  analytics: boolean;
  ts: number;
}

const KEY = "dj-consent-v1";
export const CONSENT_EVENT = "dj:consent-changed";
export const CONSENT_OPEN_EVENT = "dj:consent-open";

let cached: ConsentState | null | undefined;

function parse(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return typeof parsed.analytics === "boolean"
      ? { analytics: parsed.analytics, ts: parsed.ts ?? 0 }
      : null;
  } catch {
    return null;
  }
}

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  if (cached === undefined) cached = parse(window.localStorage.getItem(KEY));
  return cached;
}

export function writeConsent(analytics: boolean) {
  const state: ConsentState = { analytics, ts: Date.now() };
  window.localStorage.setItem(KEY, JSON.stringify(state));
  cached = state;
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
  return state;
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/** Current analytics consent — the Phase 5 loaders must gate on this. */
export function analyticsAllowed() {
  return readConsent()?.analytics === true;
}
