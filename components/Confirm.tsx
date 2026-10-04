/**
 * [CONFIRM] chip for facts still open with the client.
 * Rendered in dev and preview builds only (hidden when VERCEL_ENV is production);
 * `npm run launch-check` fails while any remain.
 */
import type { ReactNode } from "react";

export function Confirm({ children }: { children?: ReactNode }) {
  if (process.env.NEXT_PUBLIC_SHOW_CONFIRM === "0") return null;
  return <span className="confirm">{children ?? "[CONFIRM]"}</span>;
}
