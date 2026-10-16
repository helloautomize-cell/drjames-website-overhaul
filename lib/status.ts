import { fmtHour, site } from "./site-config";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export interface ClinicStatus {
  open: boolean;
  text: string;
}

/** Longest possible status text; used to reserve width so nothing shifts. */
export const STATUS_SIZER = "Next consultations Wednesday from 9 am";

/** Live clinic status in Asia/Muscat time, computed from site.sessions. */
export function clinicStatus(now: Date = new Date()): ClinicStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  const day = SHORT.indexOf(get("weekday"));
  const mins = (Number(get("hour")) % 24) * 60 + Number(get("minute"));

  const today = site.sessions[day] ?? [];
  const cur = today.find(([o, c]) => mins >= o * 60 && mins < c * 60);
  if (cur) return { open: true, text: `Consulting today until ${fmtHour(cur[1])}` };
  const later = today.find(([o]) => mins < o * 60);
  if (later) {
    return { open: false, text: `Next consultations today from ${fmtHour(later[0])}` };
  }

  let d = (day + 1) % 7;
  while (!(site.sessions[d] ?? []).length) d = (d + 1) % 7;
  const name = d === (day + 1) % 7 ? "tomorrow" : DAYS[d];
  return {
    open: false,
    text: `Next consultations ${name} from ${fmtHour(site.sessions[d][0][0])}`,
  };
}
