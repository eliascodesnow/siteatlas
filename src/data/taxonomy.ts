import type { CategorySlug, WebsiteStyle } from "@/lib/types";

export interface CategoryDef {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  pool: string;
}

export const CATEGORIES: CategoryDef[] = [
  { slug: "food-and-dining", name: "Food & Dining", short: "Dining", description: "Restaurants, cafés, bakeries and food brands.", pool: "restaurant" },
  { slug: "beauty", name: "Beauty", short: "Beauty", description: "Salons, spas, skincare and beauty brands.", pool: "salon" },
  { slug: "barbers", name: "Barbers", short: "Barbers", description: "Barbershops and men's grooming.", pool: "barber" },
  { slug: "hospitality", name: "Hospitality", short: "Hotels", description: "Hotels, resorts, lodges and serviced residences.", pool: "hotel" },
  { slug: "real-estate", name: "Real Estate", short: "Property", description: "Agencies, developers and property investment.", pool: "property" },
  { slug: "retail", name: "Retail", short: "Retail", description: "Fashion, crafts, sportswear and specialty stores.", pool: "fashion" },
  { slug: "automotive", name: "Automotive", short: "Automotive", description: "Dealers, tyre and service centres, marketplaces.", pool: "auto" },
  { slug: "health-and-wellness", name: "Health & Wellness", short: "Wellness", description: "Gyms, yoga and fitness studios.", pool: "gym" },
  { slug: "professional-services", name: "Professional Services", short: "Professional", description: "Law, accounting, architecture and advisory.", pool: "office" },
  { slug: "creative", name: "Creative & Events", short: "Creative", description: "Photography, events and productions.", pool: "photography" },
  { slug: "travel", name: "Travel & Tourism", short: "Travel", description: "Safari operators and travel companies.", pool: "safari" },
  { slug: "education", name: "Education", short: "Education", description: "Schools, academies and training institutes.", pool: "education" },
  { slug: "technology", name: "Technology", short: "Technology", description: "Software, digital agencies, hosting and security.", pool: "tech" },
  { slug: "home-and-construction", name: "Home & Construction", short: "Construction", description: "Contractors, building products and landscaping.", pool: "construction" },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c])) as Record<CategorySlug, CategoryDef>;

export const WEBSITE_STYLES: { slug: WebsiteStyle; name: string }[] = [
  { slug: "minimal", name: "Minimal" },
  { slug: "editorial", name: "Editorial" },
  { slug: "luxury", name: "Luxury" },
  { slug: "bold", name: "Bold" },
  { slug: "corporate", name: "Corporate" },
  { slug: "modern", name: "Modern" },
  { slug: "dark", name: "Dark" },
  { slug: "e-commerce", name: "E-commerce" },
  { slug: "service", name: "Service" },
  { slug: "photography-led", name: "Photography-led" },
];

/** Canonical location tree. Only nodes with businesses are surfaced in the UI. */
export interface LocationNode {
  slug: string;
  name: string;
  children?: LocationNode[];
}

export const LOCATION_TREE: LocationNode[] = [
  {
    slug: "kenya",
    name: "Kenya",
    children: [
      {
        slug: "nairobi",
        name: "Nairobi",
        children: [
          "Westlands", "CBD", "Kilimani", "Karen", "Lavington", "Kileleshwa", "Parklands", "Gigiri", "Runda",
          "South B", "South C", "Lang'ata", "Ngong Road", "Eastleigh", "Kasarani", "Roysambu", "Embakasi",
          "Riverside", "Spring Valley", "Loresho", "Kitisuru", "Upper Hill", "Mombasa Road",
        ].map((n) => ({ slug: slugify(n), name: n })),
      },
      { slug: "kiambu", name: "Kiambu", children: ["Ruiru", "Thika", "Kiambu Town", "Limuru", "Kikuyu"].map((n) => ({ slug: slugify(n), name: n })) },
      { slug: "mombasa", name: "Mombasa", children: ["Nyali", "Mombasa Island", "Bamburi", "Bombolulu"].map((n) => ({ slug: slugify(n), name: n })) },
      { slug: "kisumu", name: "Kisumu", children: [{ slug: "dunga", name: "Dunga" }] },
      { slug: "nakuru", name: "Nakuru" },
      { slug: "eldoret", name: "Eldoret" },
      { slug: "machakos", name: "Machakos", children: [{ slug: "athi-river", name: "Athi River" }] },
      { slug: "naivasha", name: "Naivasha" },
      { slug: "nanyuki", name: "Nanyuki" },
      { slug: "malindi", name: "Malindi" },
      { slug: "diani", name: "Diani" },
    ],
  },
  { slug: "united-kingdom", name: "United Kingdom", children: [{ slug: "london", name: "London", children: ["Shoreditch", "Covent Garden", "Dalston"].map((n) => ({ slug: slugify(n), name: n })) }] },
  { slug: "united-states", name: "United States", children: [{ slug: "new-york", name: "New York", children: [{ slug: "east-village", name: "East Village" }] }, { slug: "san-francisco", name: "San Francisco", children: [{ slug: "mission-district", name: "Mission District" }] }, { slug: "los-angeles", name: "Los Angeles" }] },
  { slug: "south-africa", name: "South Africa", children: [{ slug: "johannesburg", name: "Johannesburg", children: [{ slug: "sandton", name: "Sandton" }] }] },
];

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findLocation(path: string[]): { node: LocationNode; trail: LocationNode[] } | null {
  let level = LOCATION_TREE;
  const trail: LocationNode[] = [];
  for (const seg of path) {
    const node = level.find((n) => n.slug === seg);
    if (!node) return null;
    trail.push(node);
    level = node.children ?? [];
  }
  const node = trail[trail.length - 1];
  return node ? { node, trail } : null;
}
