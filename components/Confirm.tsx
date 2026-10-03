/**
 * [CONFIRM] chip for facts still open with the client.
 * Shown in development only; `npm run launch-check` fails while any remain.
 */
import type { ReactNode } from "react";

export function Confirm({ children }: { children?: ReactNode }) {
  return <span className="confirm">{children ?? "[CONFIRM]"}</span>;
}
