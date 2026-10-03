"use client";

/** Booking form demo: field styles, consent box and the under-18 guardian rule. */
export function BookingFormDemo() {
  return (
    <form
      className="bform"
      noValidate
      onSubmit={(e) => e.preventDefault()}
      aria-label="Appointment request (style guide demo)"
    >
      <div className="f">
        <label htmlFor="f-name">Patient name</label>
        <input id="f-name" autoComplete="name" placeholder="Full name" />
      </div>
      <div className="f">
        <label htmlFor="f-mob">Mobile number</label>
        <div className="pre">
          <span>+968</span>
          <input id="f-mob" inputMode="tel" placeholder="9XXX XXXX" />
        </div>
      </div>
      <div className="f half">
        <label htmlFor="f-age">Age</label>
        <div className="pre">
          <input id="f-age" inputMode="numeric" placeholder="45" />
          <select id="f-ageu" aria-label="Age unit">
            <option>Years</option>
            <option>Months</option>
          </select>
        </div>
      </div>
      <div className="f half">
        <label htmlFor="f-reason">Reason for visit</label>
        <select id="f-reason">
          <option>Diabetes or high sugar</option>
          <option>Blood pressure or heart</option>
          <option>Breathing or chest</option>
          <option>Check-up</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="f half">
        <label htmlFor="f-date">Preferred date</label>
        <input id="f-date" type="date" />
      </div>
      <div className="f half">
        <label htmlFor="f-time">Time of day</label>
        <select id="f-time">
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
      </div>
      <label className="chk" htmlFor="f-u18">
        <input type="checkbox" id="f-u18" /> The patient is under 18 (a parent or
        guardian must fill this form)
      </label>
      <label className="chk" htmlFor="f-consent">
        <input type="checkbox" id="f-consent" /> I agree that Dr. James&apos;s team may
        contact me about this appointment. <a href="#">Privacy policy</a>
      </label>
      <p className="fnote">
        Please do not include detailed medical information in this form. You can share it
        at your consultation.
      </p>
      <button className="btn btn-p" type="submit">
        Request appointment
      </button>
    </form>
  );
}
