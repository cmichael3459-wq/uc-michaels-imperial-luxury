export const SITE = {
  name: "UC.MICHAELS IMPERIAL LUXURY",
  shortName: "UC.MICHAELS",
  tagline: "Private access to exceptional living.",
  city: "Lagos",
  hours: "Daily, 9:00–21:00 WAT",
  phones: [
    { display: "0814 533 7125", tel: "+2348145337125", raw: "08145337125" },
    { display: "0813 269 2045", tel: "+2348132692045", raw: "08132692045" },
  ],
  whatsapp: {
    e164: "2348145337125",
    display: "0814 533 7125",
  },
  tiktokNote: "New pieces are published on TikTok. Enquire on WhatsApp to reserve.",
} as const;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${SITE.whatsapp.e164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function defaultEnquiry(piece?: string) {
  if (piece) {
    return `Hello UC.MICHAELS, I am enquiring about ${piece}. Please share availability and next steps.`;
  }
  return "Hello UC.MICHAELS, I would like to enquire about a piece in the collection.";
}
