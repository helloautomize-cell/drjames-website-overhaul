const PANELS: { title: string; items: string[] }[] = [
  {
    title: "Documents and reports",
    items: [
      "All your medicines, or a clear photo of the boxes",
      "Older lab reports, scans and discharge summaries",
      "Sugar or blood pressure diaries, if you keep them",
      "Insurance card, if you plan to use it",
    ],
  },
  {
    title: "If blood tests may be needed",
    items: [
      "Ask when you book whether to come fasting",
      "Fasting usually means water only for 8 to 12 hours",
      // Wording to be approved by Dr. James.
      "If you take insulin or diabetes tablets, ask before you fast or skip a dose",
    ],
  },
];

/** "What to bring" panels: plain text lists. */
export function VisitChecklist() {
  return (
    <div className="yv-panels">
      {PANELS.map((p) => (
        <section key={p.title} className="yv-panel" aria-label={p.title}>
          <h3>{p.title}</h3>
          <ul>
            {p.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
