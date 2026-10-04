import { site } from "./site-config";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export interface ClinicStatus {
  open: boolean;
  text: string;
}

/** Longest possible status text; used to reserve width so nothing shifts. */
export const STATUS_SIZER = "Next consultations Wednesday from 8:30 am";

/** Live clinic status in Asia/Muscat time, computed from the hours in site-config. */
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
  const { open, close, closedDays } = site.schedule;
  const o = open[0] * 60 + open[1];
  const c = close[0] * 60 + close[1];
  const works = (d: number) => !(closedDays as readonly number[]).includes(d);
  if (works(day) && mins >= o && mins < c) return { open: true, text: "Consulting today until 9 pm" };
  if (works(day) && mins < o) return { open: false, text: "Consulting today from 8:30 am" };
  let d = (day + 1) % 7;
  while (!works(d)) d = (d + 1) % 7;
  const name = d === (day + 1) % 7 ? "tomorrow" : DAYS[d];
  return { open: false, text: `Next consultations ${name} from 8:30 am` };
}
