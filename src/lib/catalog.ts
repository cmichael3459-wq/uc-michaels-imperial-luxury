export const COLLECTION_SLUGS = [
  "residences",
  "automobiles",
  "timepieces",
  "jewelry",
  "fragrance",
] as const;

export type CollectionSlug = (typeof COLLECTION_SLUGS)[number];

export type OfferType = "sale" | "rent" | "short-let" | "swap";

export type Listing = {
  id: string;
  collection: CollectionSlug;
  title: string;
  subtitle: string;
  location?: string;
  offer: OfferType;
  price: string;
  priceNote?: string;
  image: string;
  specs: { label: string; value: string }[];
  description: string;
  featured?: boolean;
};

export type CollectionMeta = {
  slug: CollectionSlug;
  label: string;
  kicker: string;
  headline: string;
  lede: string;
  image: string;
  offers: OfferType[];
};

export const OFFER_LABEL: Record<OfferType, string> = {
  sale: "Sale",
  rent: "Rent",
  "short-let": "Short let",
  swap: "Swap",
};

export const COLLECTIONS: CollectionMeta[] = [
  {
    slug: "residences",
    label: "Residences",
    kicker: "Sale · Rent · Short let",
    headline: "Apartments held to a private standard.",
    lede: "Penthouses, duplexes, and villas across Lagos — for purchase, annual rent, or short let. Viewings are arranged privately.",
    image: "/images/apt-banana.jpg",
    offers: ["sale", "rent", "short-let"],
  },
  {
    slug: "automobiles",
    label: "Automobiles",
    kicker: "Sale · Rent · Swap",
    headline: "Cars sourced, prepared, and placed.",
    lede: "Sale, chauffeur-ready rentals, and discreet swaps. Every car is inspected before it is offered.",
    image: "/images/car-g63.jpg",
    offers: ["sale", "rent", "swap"],
  },
  {
    slug: "timepieces",
    label: "Timepieces",
    kicker: "Sale",
    headline: "Watches, authenticated and ready.",
    lede: "Current stock turns quickly. Enquire for papers, condition, and a private viewing on WhatsApp.",
    image: "/images/hero.jpg",
    offers: ["sale"],
  },
  {
    slug: "jewelry",
    label: "Jewelry",
    kicker: "Sale",
    headline: "Pieces for the vault and the evening.",
    lede: "Gold, diamonds, and coloured stones. Each piece is photographed and described before it leaves the desk.",
    image: "/images/apt-ikoyi.jpg",
    offers: ["sale"],
  },
  {
    slug: "fragrance",
    label: "Fragrance",
    kicker: "Sale",
    headline: "Niche and house scents, in stock.",
    lede: "A rotating cabinet of luxury perfume — original, sealed, and dispatched after confirmation on WhatsApp.",
    image: "/images/apt-villa.jpg",
    offers: ["sale"],
  },
];

export const LISTINGS: Listing[] = [
  {
    id: "banana-penthouse",
    collection: "residences",
    title: "Banana Island waterfront penthouse",
    subtitle: "Four bedrooms · private lift",
    location: "Banana Island, Ikoyi",
    offer: "sale",
    price: "₦1.85bn",
    priceNote: "Title documented · viewing by appointment",
    image: "/images/apt-banana.jpg",
    featured: true,
    specs: [
      { label: "Beds", value: "4" },
      { label: "Baths", value: "5" },
      { label: "Parking", value: "3" },
      { label: "Type", value: "Penthouse" },
    ],
    description:
      "A full-floor waterfront penthouse with a piano salon, pale stone floors, and an uninterrupted view of the lagoon. Staff quarters, a private lift, and a covered terrace. Offered for sale to a single principal.",
  },
  {
    id: "ikoyi-duplex",
    collection: "residences",
    title: "Parkview double-height duplex",
    subtitle: "Five bedrooms · gated street",
    location: "Parkview, Ikoyi",
    offer: "rent",
    price: "₦48m",
    priceNote: "Per annum · two-year term preferred",
    image: "/images/apt-ikoyi.jpg",
    featured: true,
    specs: [
      { label: "Beds", value: "5" },
      { label: "Baths", value: "6" },
      { label: "Parking", value: "4" },
      { label: "Type", value: "Duplex" },
    ],
    description:
      "A double-height living hall, floating stair, and a quiet garden at the rear. Fitted kitchen, generator, and borehole. Available for annual rent to a family or corporate principal.",
  },
  {
    id: "vi-shortlet",
    collection: "residences",
    title: "Victoria Island sky suite",
    subtitle: "Three bedrooms · hotel service",
    location: "Victoria Island",
    offer: "short-let",
    price: "₦350,000",
    priceNote: "Per night · three-night minimum",
    image: "/images/apt-vi.jpg",
    featured: true,
    specs: [
      { label: "Beds", value: "3" },
      { label: "Baths", value: "3" },
      { label: "Guests", value: "6" },
      { label: "Type", value: "Short let" },
    ],
    description:
      "A quiet short-let with hotel linen, a king suite, and a skyline at dusk. Housekeeping on request, secure parking, and 24-hour access. Suited to executives and private stays.",
  },
  {
    id: "lekki-terrace",
    collection: "residences",
    title: "Lekki Phase 1 terrace house",
    subtitle: "Four bedrooms · fitted",
    location: "Lekki Phase 1",
    offer: "sale",
    price: "₦420m",
    image: "/images/apt-lekki.jpg",
    specs: [
      { label: "Beds", value: "4" },
      { label: "Baths", value: "5" },
      { label: "Parking", value: "2" },
      { label: "Type", value: "Terrace" },
    ],
    description:
      "A dark-stone terrace on a quiet inner street, warm at dusk, with a landscaped forecourt. Fitted wardrobes, a family kitchen, and a roof terrace. Clean title, ready for occupation.",
  },
  {
    id: "eko-atlantic",
    collection: "residences",
    title: "Eko Atlantic glass residence",
    subtitle: "Three bedrooms · ocean line",
    location: "Eko Atlantic City",
    offer: "short-let",
    price: "₦280,000",
    priceNote: "Per night · weekly rate on request",
    image: "/images/apt-eko.jpg",
    specs: [
      { label: "Beds", value: "3" },
      { label: "Baths", value: "3" },
      { label: "Guests", value: "5" },
      { label: "Type", value: "Apartment" },
    ],
    description:
      "A high-floor apartment on the ocean line: oak, pale concrete, and a long dining table facing the water. Concierge building, gym, and secure parking. Offered as a short let.",
  },
  {
    id: "magodo-villa",
    collection: "residences",
    title: "Magodo pool villa",
    subtitle: "Six bedrooms · private pool",
    location: "Magodo GRA",
    offer: "rent",
    price: "₦22m",
    priceNote: "Per annum",
    image: "/images/apt-villa.jpg",
    specs: [
      { label: "Beds", value: "6" },
      { label: "Baths", value: "7" },
      { label: "Parking", value: "5" },
      { label: "Type", value: "Villa" },
    ],
    description:
      "A family villa with a still private pool, tropical planting, and a stone terrace. Boys’ quarters, a large kitchen, and a generator house. Offered for annual rent.",
  },
  {
    id: "g63-amg",
    collection: "automobiles",
    title: "Mercedes-AMG G 63",
    subtitle: "Matte black · 2023",
    location: "Lagos",
    offer: "sale",
    price: "₦285m",
    priceNote: "Duty paid · full service history",
    image: "/images/car-g63.jpg",
    featured: true,
    specs: [
      { label: "Year", value: "2023" },
      { label: "Colour", value: "Matte black" },
      { label: "Km", value: "14,200" },
      { label: "Drive", value: "Automatic" },
    ],
    description:
      "A matte-black G 63, duty paid, with a clean interior and a documented service book. Private inspection in Lagos. Trade-ins considered on WhatsApp.",
  },
  {
    id: "range-rover",
    collection: "automobiles",
    title: "Range Rover Autobiography",
    subtitle: "Champagne · chauffeur ready",
    location: "Lagos",
    offer: "rent",
    price: "₦1.2m",
    priceNote: "Per day · with driver on request",
    image: "/images/car-rr.jpg",
    featured: true,
    specs: [
      { label: "Year", value: "2024" },
      { label: "Colour", value: "Champagne" },
      { label: "Seats", value: "5" },
      { label: "Drive", value: "Automatic" },
    ],
    description:
      "A champagne Autobiography for airport runs, weddings, and private weeks in the city. Self-drive or with a chauffeur. Weekly and monthly rates on enquiry.",
  },
  {
    id: "porsche-911",
    collection: "automobiles",
    title: "Porsche 911 Carrera",
    subtitle: "Midnight blue · swap considered",
    location: "Lagos",
    offer: "swap",
    price: "₦195m",
    priceNote: "Sale or swap against a G-Wagen / Range Rover",
    image: "/images/car-porsche.jpg",
    featured: true,
    specs: [
      { label: "Year", value: "2022" },
      { label: "Colour", value: "Midnight blue" },
      { label: "Km", value: "9,800" },
      { label: "Drive", value: "PDK" },
    ],
    description:
      "A low-kilometre 911 in midnight blue. Offered for sale, or as a swap against a late G-Wagen or Range Rover of comparable standing. Inspection by appointment.",
  },
  {
    id: "datejust-41",
    collection: "timepieces",
    title: "Rolex Datejust 41",
    subtitle: "Steel and champagne gold",
    offer: "sale",
    price: "₦18.5m",
    priceNote: "Box and papers",
    image: "/images/hero.jpg",
    featured: true,
    specs: [
      { label: "Case", value: "41mm" },
      { label: "Metal", value: "Oystersteel & gold" },
      { label: "Dial", value: "Champagne" },
      { label: "Condition", value: "Unworn" },
    ],
    description:
      "Datejust 41 with a champagne dial, fluted bezel, and Jubilee bracelet. Unworn, complete with inner box, outer box, and papers. Private viewing in Lagos.",
  },
  {
    id: "seamaster",
    collection: "timepieces",
    title: "Omega Seamaster Diver 300M",
    subtitle: "Blue ceramic bezel",
    offer: "sale",
    price: "₦6.8m",
    image: "/images/apt-eko.jpg",
    specs: [
      { label: "Case", value: "42mm" },
      { label: "Metal", value: "Steel" },
      { label: "Dial", value: "Blue" },
      { label: "Condition", value: "Mint" },
    ],
    description:
      "A blue Seamaster Diver 300M, mint, with box and papers. Authenticated before it is offered. Same-day viewing available on WhatsApp.",
  },
  {
    id: "santos",
    collection: "timepieces",
    title: "Cartier Santos de Cartier",
    subtitle: "Medium · steel",
    offer: "sale",
    price: "₦12.4m",
    image: "/images/apt-ikoyi.jpg",
    specs: [
      { label: "Case", value: "Medium" },
      { label: "Metal", value: "Steel" },
      { label: "Dial", value: "Silver" },
      { label: "Condition", value: "Excellent" },
    ],
    description:
      "Santos de Cartier, medium, silver dial, steel bracelet with the quick-switch leather. Excellent condition, full set. A quiet daily piece.",
  },
  {
    id: "royal-oak",
    collection: "timepieces",
    title: "Audemars Piguet Royal Oak",
    subtitle: "Selfwinding · 41mm",
    offer: "sale",
    price: "₦78m",
    priceNote: "On request · serious enquiries",
    image: "/images/hero.jpg",
    specs: [
      { label: "Case", value: "41mm" },
      { label: "Metal", value: "Steel" },
      { label: "Dial", value: "Blue tapisserie" },
      { label: "Condition", value: "Excellent" },
    ],
    description:
      "A steel Royal Oak 41, blue tapisserie, full set. Held for a private client conversation — not a walk-up sale. Enquire with proof of funds on WhatsApp.",
  },
  {
    id: "tennis-necklace",
    collection: "jewelry",
    title: "Diamond tennis necklace",
    subtitle: "Round brilliant · 18k white gold",
    offer: "sale",
    price: "₦24m",
    image: "/images/apt-banana.jpg",
    featured: true,
    specs: [
      { label: "Metal", value: "18k white gold" },
      { label: "Stones", value: "Diamonds" },
      { label: "Length", value: "42cm" },
      { label: "Cert", value: "Available" },
    ],
    description:
      "A continuous line of round brilliants on 18k white gold. Certificate on file. Tried on by appointment; not posted before payment is confirmed.",
  },
  {
    id: "cuban-bracelet",
    collection: "jewelry",
    title: "Cuban link bracelet",
    subtitle: "Solid 18k yellow gold",
    offer: "sale",
    price: "₦9.6m",
    image: "/images/apt-lekki.jpg",
    specs: [
      { label: "Metal", value: "18k yellow gold" },
      { label: "Weight", value: "86g" },
      { label: "Width", value: "10mm" },
      { label: "Clasp", value: "Box" },
    ],
    description:
      "A solid 18k Cuban link, 86 grams, box clasp with figure-eight. Weighed in front of the buyer. Other weights available on request.",
  },
  {
    id: "emerald-earrings",
    collection: "jewelry",
    title: "Emerald and diamond earrings",
    subtitle: "Drop · 18k yellow gold",
    offer: "sale",
    price: "₦7.2m",
    image: "/images/apt-ikoyi.jpg",
    specs: [
      { label: "Metal", value: "18k yellow gold" },
      { label: "Stones", value: "Emerald, diamond" },
      { label: "Style", value: "Drop" },
      { label: "Backs", value: "Omega" },
    ],
    description:
      "Colombian-colour emerald drops with a diamond halo, omega backs. A pair for evening. Private viewing with a loupe on request.",
  },
  {
    id: "solitaire",
    collection: "jewelry",
    title: "Solitaire ring",
    subtitle: "Round brilliant · platinum",
    offer: "sale",
    price: "₦31m",
    priceNote: "Certificate included",
    image: "/images/apt-banana.jpg",
    specs: [
      { label: "Metal", value: "Platinum" },
      { label: "Centre", value: "2.01ct" },
      { label: "Colour", value: "F" },
      { label: "Clarity", value: "VS1" },
    ],
    description:
      "A 2.01 carat round brilliant, F/VS1, platinum four-claw. Laboratory certificate travels with the ring. Resizing arranged after sale.",
  },
  {
    id: "oud-wood",
    collection: "fragrance",
    title: "Tom Ford Oud Wood",
    subtitle: "Eau de parfum · 100ml",
    offer: "sale",
    price: "₦420,000",
    image: "/images/apt-villa.jpg",
    specs: [
      { label: "Size", value: "100ml" },
      { label: "Type", value: "Eau de parfum" },
      { label: "Notes", value: "Oud, rosewood, sandalwood" },
      { label: "Seal", value: "Factory" },
    ],
    description:
      "Factory-sealed Oud Wood 100ml. Dispatched after WhatsApp confirmation, or collected at a private hand-over in Lagos.",
  },
  {
    id: "baccarat",
    collection: "fragrance",
    title: "Maison Francis Kurkdjian Baccarat Rouge 540",
    subtitle: "Eau de parfum · 70ml",
    offer: "sale",
    price: "₦780,000",
    image: "/images/apt-vi.jpg",
    featured: true,
    specs: [
      { label: "Size", value: "70ml" },
      { label: "Type", value: "Eau de parfum" },
      { label: "Notes", value: "Saffron, amberwood, cedar" },
      { label: "Seal", value: "Factory" },
    ],
    description:
      "Baccarat Rouge 540, 70ml, sealed. One of the pieces that leaves the cabinet the same day it is listed. Enquire to hold.",
  },
  {
    id: "aventus",
    collection: "fragrance",
    title: "Creed Aventus",
    subtitle: "Eau de parfum · 100ml",
    offer: "sale",
    price: "₦650,000",
    image: "/images/hero.jpg",
    specs: [
      { label: "Size", value: "100ml" },
      { label: "Type", value: "Eau de parfum" },
      { label: "Notes", value: "Pineapple, birch, musk" },
      { label: "Seal", value: "Factory" },
    ],
    description:
      "Aventus 100ml, batch photographed on request. Original, sealed, and not a tester. Lagos hand-over or dispatch.",
  },
  {
    id: "layton",
    collection: "fragrance",
    title: "Parfums de Marly Layton",
    subtitle: "Eau de parfum · 125ml",
    offer: "sale",
    price: "₦390,000",
    image: "/images/apt-villa.jpg",
    specs: [
      { label: "Size", value: "125ml" },
      { label: "Type", value: "Eau de parfum" },
      { label: "Notes", value: "Apple, vanilla, cardamom" },
      { label: "Seal", value: "Factory" },
    ],
    description:
      "Layton 125ml, sealed. A cabinet staple. Ask for the current batch photo before you pay.",
  },
];

export function getCollection(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function listingsFor(slug: CollectionSlug, offer?: OfferType | "all") {
  return LISTINGS.filter((item) => {
    if (item.collection !== slug) return false;
    if (!offer || offer === "all") return true;
    return item.offer === offer;
  });
}

export function getListing(id: string) {
  return LISTINGS.find((item) => item.id === id);
}

export function featuredListings() {
  return LISTINGS.filter((item) => item.featured);
}

export function relatedListings(listing: Listing, limit = 3) {
  return LISTINGS.filter(
    (item) => item.collection === listing.collection && item.id !== listing.id,
  ).slice(0, limit);
}
