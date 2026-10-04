/**
 * Patient quotes migrated from the old drjamesp.com (client override of the
 * no-testimonials rule — all eight kept at the client's request, verbatim).
 * Still subject to Dr. James's page sign-off before launch.
 */

export interface Testimonial {
  name: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Vinod B",
    quote:
      "Dr. James treated me with genuine care and kindness. He listened patiently, made me feel comfortable, and provided excellent treatment. Truly grateful for his personal and professional approach. Highly recommended!",
  },
  {
    name: "Praveen R.S",
    quote:
      "Very good Doctor and timely advice on changes to be done in medicine intake and lifestyle changes for better health. Had a compassionate approach towards each patients and conveying messages in a peaceful manner.",
  },
  {
    name: "Ahmed Al Owasi",
    quote:
      "Excellent hospital, highly recommended! Dr. James was very professional, knowledgeable, and caring. He took the time to explain everything clearly and made the whole experience very comfortable. Truly outstanding service!",
  },
  {
    name: "Shilpa Viraj",
    quote:
      "Dr James is an empathetic and experienced doctor, who goes above and beyond to make sure his patients are met with the best possible treatment and aftercare. He's a patient and kind person which makes him an excellent physician.",
  },
  {
    name: "Sarah Mathew",
    quote:
      "Dr. James provided exceptional care with clear explanations and great attention. I felt safe and well supported throughout my treatment.",
  },
  {
    name: "Ahmed Khan",
    quote:
      "Highly professional and compassionate doctor. His diagnosis was accurate and treatment plan was very effective.",
  },
  {
    name: "Meera Nair",
    quote:
      "One of the most experienced physicians I have consulted. He listens carefully and truly understands patient concerns.",
  },
  {
    name: "John Mathews",
    quote:
      "Excellent medical expertise combined with kind communication. Truly a trusted doctor for all health needs.",
  },
];
