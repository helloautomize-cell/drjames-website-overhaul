const FAQS: [string, string][] = [
  [
    "Where does Dr. James see patients?",
    "At Badr Al Samaa Royal Hospital, Al Ghubrah Street, Muscat. Book by WhatsApp or phone on +968 9751 0975, or use the form on this site.",
  ],
  [
    "Do I need to fast before my visit?",
    "Not for the consultation. Some blood tests, such as fasting sugar or cholesterol, need 8 to 10 hours without food. We tell you when you book if your tests need fasting. Water is fine.",
  ],
  [
    "What should I bring to my first visit?",
    "Your old prescriptions, recent reports, the medicines you take (or photos of the packs), and your sugar diary or meter if you have diabetes.",
  ],
  [
    "Can Dr. James look after several conditions at once?",
    "Yes. An internal medicine physician looks at diabetes, blood pressure, cholesterol, kidneys, liver and lungs together, so your medicines and tests work as one plan.",
  ],
];

/** Native accordions; all answer text is in the HTML for search. */
export function Faq() {
  return (
    <div className="faq">
      {FAQS.map(([q, a], i) => (
        <details key={q} open={i === 0}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
