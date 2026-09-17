import type { BusinessRow } from "@/db/schema";
import { poolSize } from "@/data/images";
import type { BlueprintKey, BusinessHighlight, SectionConfig } from "@/lib/types";

/**
 * Blueprints turn a business record into an ordered list of sections.
 * Section *order* and *variants* differ per blueprint so two businesses in the
 * same category still read differently; the components are shared.
 * A row can also carry hand-authored `sections` in the DB, which win.
 */

type Ctx = {
  b: BusinessRow;
  hero: number;
  /** n gallery indices that avoid the hero image */
  gal: (n: number, skip?: number) => number[];
  place: string;
  items: (fallbackTitle?: string) => BusinessHighlight[];
};

function ctx(b: BusinessRow): Ctx {
  const size = poolSize(b.imagery.pool);
  const hero = b.imagery.hero % size;
  const gal = (n: number, skip = 0) => {
    const out: number[] = [];
    let i = hero + 1 + skip;
    while (out.length < n && out.length < size - 1) {
      const idx = i % size;
      if (idx !== hero) out.push(idx);
      i++;
    }
    return out;
  };
  const place = b.neighborhood ? `${b.neighborhood}, ${b.city}` : b.city;
  const items = () => (b.highlights.length ? b.highlights : b.services.slice(0, 4).map((s, i) => ({ title: s.name, description: s.description, image: gal(4)[i] })));
  return { b, hero, gal, place, items };
}

const firstName = (name: string) => name.split(/\s|&/)[0];

const CONTACT_HEADINGS: Record<string, string> = {
  booking: "Book a visit",
  reserve: "Reserve a table",
  enquire: "Make an enquiry",
  visit: "Visit us",
  order: "Place an order",
  consult: "Start a conversation",
};

const BLUEPRINTS: Record<BlueprintKey, (c: Ctx) => SectionConfig[]> = {
  "restaurant-signature": ({ b, hero, gal, place, items }) => [
    { type: "hero", variant: "full", eyebrow: place, headline: b.tagline, sub: b.description, image: hero, cta: "Reserve a table", secondary: "See the menu" },
    { type: "collection", id: "signatures", eyebrow: "Signatures", heading: "What the kitchen is known for", variant: "editorial", items: items() },
    { type: "intro", id: "about", eyebrow: "The room", heading: `About ${firstName(b.name)}`, body: b.description, image: gal(1, 3)[0], variant: "image-right" },
    ...(b.menu ? [{ type: "menu", id: "menu", heading: "Menu", groups: b.menu, note: "Illustrative concept menu — final content supplied by the restaurant." } as SectionConfig] : []),
    { type: "gallery", id: "atmosphere", heading: "Atmosphere", variant: "strip", images: gal(4) },
    { type: "contact", id: "reserve", heading: CONTACT_HEADINGS.reserve, body: "Tables for two to twenty. For larger parties, message us and we will arrange the space.", variant: "split", label: "Reservations" },
  ],
  "restaurant-story": ({ b, hero, gal, place, items }) => [
    { type: "hero", variant: "split", eyebrow: place, headline: b.tagline, sub: b.description, image: hero, cta: "See the menu", secondary: "Find us" },
    { type: "statement", text: b.description, tone: "accent" },
    ...(b.menu ? [{ type: "menu", id: "menu", heading: "The menu", groups: b.menu, note: "Illustrative concept menu — final content supplied by the restaurant." } as SectionConfig] : [{ type: "collection", id: "menu", heading: "On the table", variant: "rows", items: items() } as SectionConfig]),
    { type: "gallery", id: "gallery", variant: "duo", images: gal(2) },
    { type: "services", id: "visit", heading: "Good to know", variant: "columns", items: b.services },
    { type: "contact", id: "find-us", heading: CONTACT_HEADINGS.visit, variant: "minimal", label: "Location & hours" },
  ],
  cafe: ({ b, hero, gal, place, items }) => [
    { type: "hero", variant: "stacked", eyebrow: place, headline: b.tagline, sub: b.description, image: hero, cta: "Find us", secondary: "Menu" },
    { type: "collection", id: "menu", eyebrow: "On the bar", heading: "What we pour and plate", variant: "grid", items: items() },
    ...(b.menu ? [{ type: "menu", id: "full-menu", heading: "Menu", groups: b.menu, note: "Illustrative concept menu." } as SectionConfig] : []),
    { type: "intro", id: "about", eyebrow: "The space", heading: `Inside ${firstName(b.name)}`, body: b.description, image: gal(1, 1)[0], variant: "image-left" },
    { type: "gallery", id: "gallery", variant: "masonry", images: gal(5) },
    { type: "contact", id: "find-us", heading: CONTACT_HEADINGS.visit, variant: "split", label: "Location & hours" },
  ],
  bakery: ({ b, hero, gal, place, items }) => [
    { type: "hero", variant: "type", eyebrow: place, headline: b.tagline, sub: b.description, image: hero, cta: "Order", secondary: "What we bake" },
    { type: "collection", id: "bakes", eyebrow: "From the oven", heading: "Baked daily", variant: "grid", items: items() },
    { type: "intro", id: "about", eyebrow: "Our craft", heading: "Made by hand, early every morning", body: b.description, image: gal(1, 2)[0], variant: "image-right" },
    { type: "services", id: "orders", heading: "Orders & occasions", variant: "list", items: b.services },
    { type: "gallery", id: "gallery", variant: "strip", images: gal(4) },
    { type: "contact", id: "order", heading: CONTACT_HEADINGS.order, body: "Custom cakes and large orders need a little notice — message us with the date and we will confirm.", variant: "split", label: "Orders" },
  ],
  barber: ({ b, hero, gal, place, items }) => [
    { type: "hero", variant: "full", eyebrow: place, headline: b.tagline, sub: b.description, image: hero, cta: "Book a chair", secondary: "Services" },
    { type: "services", id: "services", eyebrow: "Services", heading: "Cuts, fades, beards", variant: "numbered", items: b.services },
    { type: "gallery", id: "lookbook", heading: "Lookbook", variant: "grid", images: gal(4) },
    { type: "intro", id: "about", eyebrow: "The shop", heading: `Inside ${firstName(b.name)}`, body: b.description, image: gal(1, 4)[0], variant: "image-left" },
    { type: "collection", id: "signatures", heading: "Signatures", variant: "rows", items: items() },
    { type: "contact", id: "book", heading: CONTACT_HEADINGS.booking, body: "Walk-ins when there is a free chair; bookings guarantee your slot.", variant: "dark", label: "Bookings" },
  ],
  salon: ({ b, hero, gal, place, items }) => [
    { type: "hero", variant: "split", eyebrow: place, headline: b.tagline, sub: b.description, image: hero, cta: "Book an appointment", secondary: "Services" },
    { type: "services", id: "services", eyebrow: "Services", heading: "Hair, nails, skin", variant: "columns", items: b.services },
    { type: "statement", text: b.tagline, image: gal(1, 1)[0], tone: "light" },
    { type: "collection", id: "signatures", eyebrow: "Signatures", heading: "Most requested", variant: "editorial", items: items() },
    { type: "gallery", id: "gallery", variant: "masonry", images: gal(5) },
    { type: "contact", id: "book", heading: CONTACT_HEADINGS.booking, variant: "split", label: "Appointments" },
  ],
  "beauty-brand": ({ b, hero, gal, items }) => [
    { type: "hero", variant: "split", eyebrow: `${b.subcategory} · ${b.city}`, headline: b.tagline, sub: b.description, image: hero, cta: "Shop the range", secondary: "Our story" },
    { type: "collection", id: "shop", eyebrow: "Shop", heading: "The range", variant: "grid", items: items() },
    { type: "intro", id: "story", eyebrow: "Our story", heading: `Why ${firstName(b.name)} exists`, body: b.description, image: gal(1, 2)[0], variant: "image-right" },
    { type: "statement", text: b.tagline, tone: "accent" },
    { type: "services", id: "how-to-buy", heading: "How to buy", variant: "grid", items: b.services },
    { type: "contact", id: "stockists", heading: "Stockists & wholesale", body: "For retail partnerships, salon supply or bulk orders, get in touch.", variant: "minimal", label: "Trade" },
  ],
  hotel: ({ b, hero, gal, place, items }) => [
    { type: "hero", variant: "full", eyebrow: place, headline: b.tagline, sub: b.description, image: hero, cta: "Check availability", secondary: "Rooms & suites" },
    { type: "intro", id: "about", eyebrow: "Welcome", heading: `Staying at ${firstName(b.name)}`, body: b.description, variant: "wide" },
    { type: "collection", id: "rooms", eyebrow: "Stay", heading: "Rooms, dining and more", variant: "editorial", items: items() },
    { type: "services", id: "amenities", heading: "Amenities", variant: "grid", items: b.services },
    { type: "gallery", id: "gallery", variant: "masonry", images: gal(5) },
    { type: "contact", id: "book", heading: "Enquire about a stay", body: "Send dates and party size — we reply with availability and rates.", variant: "split", label: "Reservations" },
  ],
  lodge: ({ b, hero, gal, place, items }) => [
    { type: "hero", variant: "full", eyebrow: place, headline: b.tagline, image: hero, cta: "Plan a stay", secondary: "Experiences" },
    { type: "statement", text: b.description, tone: "dark" },
    { type: "collection", id: "experiences", eyebrow: "Experiences", heading: "Days here", variant: "wide", items: items() },
    { type: "services", id: "stay", heading: "The stay", variant: "list", items: b.services },
    { type: "gallery", id: "gallery", variant: "duo", images: gal(2, 2) },
    { type: "contact", id: "book", heading: "Plan a stay", variant: "dark", label: "Enquiries" },
  ],
  "realestate-agency": ({ b, hero, gal, items }) => [
    { type: "hero", variant: "type", eyebrow: b.city, headline: b.tagline, sub: b.description, image: hero, cta: "Enquire", secondary: "Listings" },
    { type: "collection", id: "listings", eyebrow: "Listings", heading: "Find a place", variant: "grid", items: items(), intro: "Illustrative listing categories — a live site would pull from the agency's inventory." },
    { type: "services", id: "services", heading: "What we do", variant: "columns", items: b.services },
    { type: "statement", text: b.tagline, image: gal(1, 2)[0], tone: "light" },
    { type: "contact", id: "enquire", heading: CONTACT_HEADINGS.enquire, body: "Tell us what you are looking for — area, budget, timing — and an agent will respond.", variant: "minimal", label: "Enquiries" },
  ],
  developer: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "full", eyebrow: b.city, headline: b.tagline, sub: b.description, image: hero, cta: "Book a site visit", secondary: "Projects" },
    { type: "intro", id: "featured", eyebrow: "Featured", heading: items()[0]?.title ?? b.name, body: items()[0]?.description ?? b.description, image: gal(1)[0], variant: "image-left" },
    { type: "collection", id: "projects", eyebrow: "Projects", heading: "Current developments", variant: "rows", items: items().slice(1).length ? items().slice(1) : items() },
    { type: "services", id: "process", heading: "How buying works", variant: "numbered", items: b.services },
    { type: "contact", id: "visit", heading: "Book a site visit", variant: "split", label: "Sales" },
  ],
  retail: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "split", eyebrow: b.neighborhood ? `${b.neighborhood}, ${b.city}` : b.city, headline: b.tagline, sub: b.description, image: hero, cta: "Shop", secondary: "Visit the store" },
    { type: "collection", id: "shop", eyebrow: "Shop", heading: "Browse by category", variant: "grid", items: items() },
    { type: "intro", id: "about", eyebrow: "About", heading: `The ${firstName(b.name)} story`, body: b.description, image: gal(1, 2)[0], variant: "image-right" },
    { type: "gallery", id: "gallery", variant: "strip", images: gal(4) },
    { type: "services", id: "services", heading: "Services", variant: "list", items: b.services },
    { type: "contact", id: "visit", heading: CONTACT_HEADINGS.visit, variant: "split", label: "Store" },
  ],
  fashion: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "stacked", eyebrow: b.city, headline: b.tagline, image: hero, cta: "View the collection", secondary: "About" },
    { type: "collection", id: "collection", heading: "Collection", variant: "editorial", items: items() },
    { type: "statement", text: b.description, tone: "light" },
    { type: "gallery", id: "lookbook", heading: "Lookbook", variant: "masonry", images: gal(5) },
    { type: "services", id: "services", heading: "Services", variant: "columns", items: b.services },
    { type: "contact", id: "contact", heading: "Enquiries & stockists", variant: "minimal", label: "Contact" },
  ],
  "auto-dealer": ({ b, hero, gal, items }) => [
    { type: "hero", variant: "full", eyebrow: b.city, headline: b.tagline, sub: b.description, image: hero, cta: "Enquire about a vehicle", secondary: "Inventory" },
    { type: "collection", id: "inventory", eyebrow: "Inventory", heading: "Browse by type", variant: "grid", items: items(), intro: "Illustrative inventory categories — a live site would list current stock." },
    { type: "services", id: "services", heading: "Buying with us", variant: "numbered", items: b.services },
    { type: "gallery", id: "gallery", variant: "duo", images: gal(2, 1) },
    { type: "contact", id: "enquire", heading: CONTACT_HEADINGS.enquire, body: "Tell us the model, budget and whether you need financing or a trade-in.", variant: "dark", label: "Sales" },
  ],
  "auto-service": ({ b, hero, gal, items }) => [
    { type: "hero", variant: "split", eyebrow: b.city, headline: b.tagline, sub: b.description, image: hero, cta: "Book a service", secondary: "Services" },
    { type: "services", id: "services", eyebrow: "Services", heading: "What we do", variant: "grid", items: b.services },
    { type: "intro", id: "about", eyebrow: "Workshop", heading: `Inside ${firstName(b.name)}`, body: b.description, image: gal(1, 1)[0], variant: "image-left" },
    { type: "collection", id: "highlights", heading: "Start here", variant: "rows", items: items() },
    { type: "gallery", id: "gallery", variant: "strip", images: gal(4) },
    { type: "contact", id: "book", heading: "Book a service", body: "Share your vehicle and what it needs — we confirm a slot and an estimate.", variant: "split", label: "Bookings" },
  ],
  gym: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "full", eyebrow: b.city, headline: b.tagline, sub: b.description, image: hero, cta: "Start training", secondary: "Programmes" },
    { type: "collection", id: "programmes", eyebrow: "Programmes", heading: "Train your way", variant: "rows", items: items() },
    { type: "statement", text: b.tagline, tone: "accent" },
    { type: "services", id: "membership", heading: "What is included", variant: "grid", items: b.services },
    { type: "gallery", id: "gallery", variant: "grid", images: gal(4) },
    { type: "contact", id: "join", heading: "Start training", body: "Ask about memberships, trial sessions and class timetables.", variant: "dark", label: "Membership" },
  ],
  wellness: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "split", eyebrow: b.city, headline: b.tagline, sub: b.description, image: hero, cta: "Join a class", secondary: "What we offer" },
    { type: "services", id: "offer", eyebrow: "Offer", heading: "Classes, training, community", variant: "list", items: b.services },
    { type: "intro", id: "about", eyebrow: "About", heading: `About ${firstName(b.name)}`, body: b.description, image: gal(1)[0], variant: "image-right" },
    { type: "collection", id: "schedule", heading: "Where to start", variant: "grid", items: items() },
    { type: "contact", id: "join", heading: "Join a class", variant: "split", label: "Classes" },
  ],
  professional: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "type", eyebrow: b.city, headline: b.tagline, sub: b.description, image: hero, cta: "Start a conversation", secondary: "Practice areas" },
    { type: "services", id: "practice", eyebrow: "Practice areas", heading: "How we help", variant: "columns", items: b.services },
    { type: "intro", id: "firm", eyebrow: "The firm", heading: `About ${b.name}`, body: b.description, image: gal(1, 1)[0], variant: "image-left" },
    { type: "collection", id: "focus", heading: "Focus", variant: "rows", items: items() },
    { type: "contact", id: "contact", heading: CONTACT_HEADINGS.consult, body: "Outline your matter in a few lines. We respond with next steps and who you would work with.", variant: "minimal", label: "New enquiries" },
  ],
  architecture: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "full", eyebrow: b.city, headline: b.name, sub: b.tagline, image: hero, cta: "Discuss a project", secondary: "Work" },
    { type: "intro", id: "featured", eyebrow: "Selected work", heading: items()[0]?.title ?? "Work", body: b.description, image: gal(1)[0], variant: "image-right" },
    { type: "collection", id: "work", heading: "Work", variant: "editorial", items: items() },
    { type: "services", id: "studio", eyebrow: "Studio", heading: "Capabilities", variant: "list", items: b.services },
    { type: "gallery", id: "gallery", variant: "duo", images: gal(2, 3) },
    { type: "contact", id: "contact", heading: "Discuss a project", variant: "minimal", label: "Studio" },
  ],
  tech: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "type", eyebrow: `${b.subcategory} · ${b.city}`, headline: b.tagline, sub: b.description, image: hero, cta: "Talk to us", secondary: "What we do" },
    { type: "services", id: "services", eyebrow: "What we do", heading: "Capabilities", variant: "grid", items: b.services },
    { type: "collection", id: "platforms", heading: "Where to start", variant: "rows", items: items() },
    { type: "intro", id: "about", eyebrow: "About", heading: `About ${firstName(b.name)}`, body: b.description, image: gal(1, 1)[0], variant: "image-left" },
    { type: "statement", text: b.tagline, tone: "dark" },
    { type: "contact", id: "contact", heading: "Talk to us", variant: "minimal", label: "Enquiries" },
  ],
  travel: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "full", eyebrow: b.city, headline: b.tagline, sub: b.description, image: hero, cta: "Plan a trip", secondary: "Destinations" },
    { type: "collection", id: "destinations", eyebrow: "Destinations", heading: "Where we go", variant: "editorial", items: items(), intro: "Illustrative itineraries — a live site would carry current departures and pricing." },
    { type: "services", id: "how", heading: "How it works", variant: "numbered", items: b.services },
    { type: "gallery", id: "gallery", variant: "masonry", images: gal(5) },
    { type: "statement", text: b.description, image: gal(1, 5)[0], tone: "light" },
    { type: "contact", id: "plan", heading: "Plan a trip", body: "Tell us when, who is travelling and what you want to see. We come back with an itinerary.", variant: "split", label: "Enquiries" },
  ],
  education: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "split", eyebrow: b.neighborhood ? `${b.neighborhood}, ${b.city}` : b.city, headline: b.tagline, sub: b.description, image: hero, cta: "Enquire about admission", secondary: "Programmes" },
    { type: "collection", id: "programmes", eyebrow: "Programmes", heading: "What you can study", variant: "rows", items: items() },
    { type: "intro", id: "about", eyebrow: "About", heading: `About ${firstName(b.name)}`, body: b.description, image: gal(1, 1)[0], variant: "image-right" },
    { type: "services", id: "support", heading: "Beyond the classroom", variant: "grid", items: b.services },
    {
      type: "faq",
      id: "faq",
      heading: "Common questions",
      items: [
        { q: "How do I apply?", a: "Send an enquiry with the programme you are interested in and we will share the steps, intake dates and requirements." },
        { q: "Can I visit before enrolling?", a: "Yes — tours and information sessions can be arranged on request." },
        { q: "Are there payment plans?", a: "Ask when you enquire; options depend on the programme." },
      ],
    },
    { type: "contact", id: "admissions", heading: "Admissions", variant: "split", label: "Admissions" },
  ],
  creative: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "full", eyebrow: b.city, headline: b.name, sub: b.tagline, image: hero, cta: "Enquire", secondary: "Work" },
    { type: "gallery", id: "work", variant: "masonry", images: gal(5) },
    { type: "collection", id: "portfolio", heading: "Work", variant: "grid", items: items() },
    { type: "services", id: "services", heading: "Services", variant: "list", items: b.services },
    { type: "intro", id: "about", eyebrow: "About", heading: `About ${firstName(b.name)}`, body: b.description, variant: "text" },
    { type: "contact", id: "enquire", heading: "Check a date", body: "Share the date, location and what you need covered.", variant: "dark", label: "Bookings" },
  ],
  construction: ({ b, hero, gal, items }) => [
    { type: "hero", variant: "full", eyebrow: b.city, headline: b.tagline, sub: b.description, image: hero, cta: "Request a quote", secondary: "Projects" },
    { type: "collection", id: "projects", eyebrow: "Projects", heading: "What we build", variant: "wide", items: items() },
    { type: "services", id: "capabilities", heading: "Capabilities", variant: "numbered", items: b.services },
    { type: "intro", id: "about", eyebrow: "Company", heading: `About ${b.name}`, body: b.description, image: gal(1, 2)[0], variant: "image-left" },
    { type: "contact", id: "quote", heading: "Request a quote", body: "Describe the project, location and timeline. We respond with a scope and next steps.", variant: "split", label: "Enquiries" },
  ],
};

export function buildSections(b: BusinessRow): SectionConfig[] {
  if (b.sections && b.sections.length) return b.sections;
  const builder = BLUEPRINTS[b.theme.blueprint] ?? BLUEPRINTS.professional;
  return builder(ctx(b));
}

export interface NavItem {
  id: string;
  label: string;
}

const LABELS: Record<string, string> = {
  signatures: "Signatures",
  about: "About",
  menu: "Menu",
  "full-menu": "Full menu",
  atmosphere: "Atmosphere",
  reserve: "Reserve",
  "find-us": "Find us",
  gallery: "Gallery",
  visit: "Visit",
  bakes: "Bakes",
  orders: "Orders",
  order: "Order",
  services: "Services",
  lookbook: "Lookbook",
  book: "Book",
  shop: "Shop",
  story: "Story",
  "how-to-buy": "How to buy",
  stockists: "Stockists",
  rooms: "Rooms",
  amenities: "Amenities",
  experiences: "Experiences",
  stay: "Stay",
  listings: "Listings",
  enquire: "Enquire",
  featured: "Featured",
  projects: "Projects",
  process: "Process",
  collection: "Collection",
  contact: "Contact",
  inventory: "Inventory",
  highlights: "Start here",
  programmes: "Programmes",
  membership: "Membership",
  join: "Join",
  offer: "Offer",
  schedule: "Schedule",
  practice: "Practice",
  firm: "The firm",
  focus: "Focus",
  work: "Work",
  studio: "Studio",
  platforms: "Platforms",
  destinations: "Destinations",
  how: "How it works",
  plan: "Plan",
  support: "Support",
  faq: "FAQ",
  admissions: "Admissions",
  portfolio: "Portfolio",
  capabilities: "Capabilities",
  quote: "Quote",
};

export function navFromSections(sections: SectionConfig[]): NavItem[] {
  const out: NavItem[] = [];
  for (const s of sections) {
    if ("id" in s && s.id && LABELS[s.id]) out.push({ id: s.id, label: LABELS[s.id] });
  }
  // keep the concept nav tight: at most 5 anchors
  if (out.length <= 5) return out;
  const last = out[out.length - 1];
  return [...out.slice(0, 4), last];
}
