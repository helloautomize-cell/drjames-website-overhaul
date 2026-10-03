import type { ReactNode } from "react";
import { Icon, type IconName } from "@/lib/icons";
import { Confirm } from "@/components/Confirm";
import { AutoRow } from "@/components/AutoRow";

const CARDS: { icon: IconName; title: string; body: ReactNode }[] = [
  {
    icon: "clock",
    title: "23 years as a physician",
    body: "In practice since 2002, including 15 years caring for patients in Oman.",
  },
  {
    icon: "drop",
    title: "Further training in diabetes",
    body: "Postgraduate Diploma (Cardiff University) and MSc in Diabetes (University of South Wales).",
  },
  {
    icon: "pulse",
    title: "Hospital and ICU experience",
    body: "Years of OPD, ward, emergency and intensive care work, including ICU and ER lead roles.",
  },
  {
    icon: "shield",
    title: "Quality and patient safety",
    body: "Head of Quality Control. Member of the Ethics, Infection Control and Pharmacy committees.",
  },
  {
    icon: "book",
    title: "Prevention and education",
    body: "Runs health awareness programmes and checks heart, kidney and liver risk early.",
  },
  {
    icon: "message",
    title: "Results in plain words",
    body: (
      <>
        Every report explained before you leave. Languages: <Confirm />.
      </>
    ),
  },
];

/** Six glass "Why Dr. James" cards over a teal tint; swipe row on mobile. */
export function WhyCards() {
  return (
    <div className="bgsoft">
      <AutoRow id="whycards" className="cards swipe" mobileOnly>
        {CARDS.map((c) => (
          <div className="gcard" key={c.title}>
            <span className="i">
              <Icon name={c.icon} size={26} strokeWidth={1.6} />
            </span>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </div>
        ))}
      </AutoRow>
    </div>
  );
}
