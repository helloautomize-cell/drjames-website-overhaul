import { Confirm } from "@/components/Confirm";

const RE = /(\[CONFIRM[^\]]*\])/g;

/** Renders text, turning [CONFIRM ...] spans into Confirm chips. */
export function ConfirmText({ text }: { text: string }) {
  const parts = text.split(RE);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[CONFIRM") ? <Confirm key={i}>{p}</Confirm> : <span key={i}>{p}</span>,
      )}
    </>
  );
}
