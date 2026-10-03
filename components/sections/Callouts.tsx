import { Icon } from "@/lib/icons";
import { Confirm } from "@/components/Confirm";

/** Emergency, info and warning callouts for medical pages. */
export function Callouts() {
  return (
    <>
      <div className="callout em">
        <Icon name="alert" size={22} />
        <p>
          <b>When to get help straight away.</b> Call 9999 or go to the nearest emergency
          department if you have chest pain or pressure, sudden breathlessness, fainting,
          weakness on one side of the body, slurred speech, confusion, a seizure, or very
          high or very low sugar with drowsiness.
        </p>
      </div>
      <div className="callout info">
        <Icon name="info" size={22} />
        <p>
          <b>Medically reviewed by</b> Dr. James Kumar Pallivathukkal, MD (Internal
          Medicine) · Oman MOH licence <Confirm /> · Last reviewed{" "}
          <Confirm>[CONFIRM: sign-off date]</Confirm>
        </p>
      </div>
      <div className="callout warn">
        <Icon name="info" size={22} />
        <p>
          <b>Tip.</b> You do not need to fast for an HbA1c test. It shows your average
          sugar over the last two to three months.
        </p>
      </div>
    </>
  );
}
