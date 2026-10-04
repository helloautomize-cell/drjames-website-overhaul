/**
 * Maps each service slug to an illustrated badge asset.
 * Until the client supplies the 18 illustrated PNG badges, every slug maps to
 * the placeholder medallion badge rendered by <ServiceBadge>. When the PNGs
 * arrive they drop into public/images/badges/<slug>.webp and this map points
 * at them, no component changes needed.
 */
export const badgeFiles: Record<string, string> = {
  diabetes: "/images/badges/diabetes.webp",
  cholesterol: "/images/badges/cholesterol.webp",
  weight: "/images/badges/weight.webp",
  thyroid: "/images/badges/thyroid.webp",
  "blood-pressure": "/images/badges/blood-pressure.webp",
  "heart-risk": "/images/badges/heart-risk.webp",
  asthma: "/images/badges/asthma.webp",
  chest: "/images/badges/chest.webp",
  sleep: "/images/badges/sleep.webp",
  allergy: "/images/badges/allergy.webp",
  fever: "/images/badges/fever.webp",
  kidney: "/images/badges/kidney.webp",
  liver: "/images/badges/liver.webp",
  digestion: "/images/badges/digestion.webp",
  "elderly-care": "/images/badges/elderly-care.webp",
  checkup: "/images/badges/checkup.webp",
  joint: "/images/badges/joint.webp",
  anaemia: "/images/badges/anaemia.webp",
};

export const badgePrompt =
  "Circular medical service badge, clean line-art illustration of [SUBJECT], gradient strokes from deep teal #1D6B72 to navy #0E2F52, with small soft sand-gold #C9A46A plus-sign sparkles, centred on a plain off-white background #F6FAFA, no text, no logos, no brand names, no red cross, flat premium style, 1024x1024.";
