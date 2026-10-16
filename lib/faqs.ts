import type { Faq } from "@/lib/content";

export const FAQS: Faq[] = [
  {
    q: "How do I book an appointment?",
    a: "Three ways: the form on the contact page, a WhatsApp message, or a call to +968 9751 0975. A request is confirmed when the practice replies with your exact time, usually within our reply window.",
  },
  {
    q: "What are the consultation hours?",
    a: "Saturday to Thursday, 9 am to 1 pm and 5 to 9 pm, with the clinic closed on Fridays. Consultations are by appointment. Public holiday timings may differ.",
  },
  {
    q: "Do I need a referral to see Dr. James?",
    a: "No. You can book directly. A referral from another doctor is welcome if you have one, but it is not required for a consultation.",
  },
  {
    q: "Can I book for a parent or a child?",
    a: "Yes. Family members often book for parents and children. For patients under 18, a parent or guardian fills the form and comes to the visit. For older parents, whoever helps them day to day is welcome to join the consultation.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Bring all your medicines or clear photos of the boxes, any older lab reports and scans, and home readings like sugar or blood pressure diaries. If blood tests may be needed, ask when booking whether to come fasting.",
  },
  {
    q: "Does Dr. James do home visits or online consultations?",
    a: "[CONFIRM: teleconsultation and home visits]. For now, appointments are at Badr Al Samaa Royal Hospital. Follow-up questions between visits can often be handled on WhatsApp or phone.",
  },
  {
    q: "Which insurance do you accept?",
    a: "[CONFIRM: insurance arrangements]. Insurance handling depends on the hospital's billing desk; bring your card and check when you book.",
  },
  {
    q: "How much is a consultation?",
    a: "Fees are handled by the hospital's billing desk rather than this website. Ask about the current consultation fee when you book [CONFIRM: fee display].",
  },
  {
    q: "I have diabetes and blood pressure. Can one doctor manage both?",
    a: "Yes, that is exactly what an internist is for. Dr. James manages related conditions together, so your sugar, pressure, cholesterol and kidneys are treated as one plan rather than separate problems.",
  },
  {
    q: "What languages does Dr. James speak?",
    a: "[CONFIRM: languages]. If you are worried about explaining symptoms in English, mention it when you book and we will help.",
  },
  {
    q: "How do I get my test results?",
    a: "Results are explained at your review visit or, when suitable, sent by message. Every result comes with an explanation of what it means and what, if anything, changes in your plan.",
  },
  {
    q: "Is my information private?",
    a: "Yes. Enquiries go only to the practice, and the website collects the minimum needed to answer you. The privacy policy explains what is stored and for how long, and analytics run only with your consent.",
  },
];

/** FAQs still pending a client confirm are hidden in production builds. */
export function visibleFaqs(faqs: Faq[] = FAQS): Faq[] {
  if (process.env.NEXT_PUBLIC_SHOW_CONFIRM !== "0") return faqs;
  return faqs.filter((f) => !f.a.includes("[CONFIRM"));
}
