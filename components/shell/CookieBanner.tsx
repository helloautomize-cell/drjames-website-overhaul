"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  readConsent,
  writeConsent,
} from "@/lib/consent";

const subscribeConsent = (cb: () => void) => {
  window.addEventListener(CONSENT_EVENT, cb);
  return () => window.removeEventListener(CONSENT_EVENT, cb);
};
const serverConsent = () => null as ReturnType<typeof readConsent>;

/**
 * Cookie banner: glass card bottom-left on desktop, above the action
 * bar on phones. Shows only until the visitor chooses; the footer
 * "Cookie settings" link reopens it.
 */
export function CookieBanner() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, serverConsent);
  const [reopen, setReopen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  const onOpen = useCallback(() => {
    setAnalytics(readConsent()?.analytics ?? false);
    setSettings(true);
    setReopen(true);
  }, []);

  useEffect(() => {
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, [onOpen]);

  const show = reopen || consent === null;
  if (!show) return null;

  const choose = (allow: boolean) => {
    writeConsent(allow);
    setReopen(false);
  };

  return (
    <div className="cookie-live" role="dialog" aria-label="Cookie choices">
      <div className="cookie">
        <b>Cookies on this site</b>
        <p>
          We use essential cookies to run the site. With your permission we also
          use analytics to improve it. No ads, no health data.
        </p>
        {settings ? (
          <label className="consent-row">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
            <span>Allow anonymous analytics</span>
          </label>
        ) : null}
        <div className="btns">
          {settings ? (
            <button className="btn btn-p" type="button" onClick={() => choose(analytics)}>
              Save choices
            </button>
          ) : (
            <>
              <button className="btn btn-p" type="button" onClick={() => choose(true)}>
                Accept
              </button>
              <button className="btn btn-s" type="button" onClick={() => choose(false)}>
                Decline
              </button>
              <button className="link as-btn" type="button" onClick={() => setSettings(true)}>
                Settings
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
