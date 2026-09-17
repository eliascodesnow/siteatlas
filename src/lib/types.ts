export type CategorySlug =
  | "food-and-dining"
  | "beauty"
  | "barbers"
  | "hospitality"
  | "real-estate"
  | "retail"
  | "automotive"
  | "health-and-wellness"
  | "professional-services"
  | "creative"
  | "travel"
  | "education"
  | "technology"
  | "home-and-construction";

export type WebsiteStyle =
  | "minimal"
  | "editorial"
  | "luxury"
  | "bold"
  | "corporate"
  | "modern"
  | "dark"
  | "e-commerce"
  | "service"
  | "photography-led";

export type PaletteKey =
  | "paper"
  | "ink"
  | "charcoal-brass"
  | "forest"
  | "terracotta"
  | "sand"
  | "olive"
  | "slate"
  | "wine"
  | "ocean"
  | "blush"
  | "stone"
  | "midnight"
  | "espresso"
  | "clay"
  | "mint";

export type FontKey =
  | "editorial-serif"
  | "grotesk"
  | "condensed"
  | "garamond"
  | "geometric"
  | "humanist"
  | "modern-serif";

export type BlueprintKey =
  | "restaurant-signature"
  | "restaurant-story"
  | "cafe"
  | "bakery"
  | "barber"
  | "salon"
  | "beauty-brand"
  | "hotel"
  | "lodge"
  | "realestate-agency"
  | "developer"
  | "retail"
  | "fashion"
  | "auto-dealer"
  | "auto-service"
  | "gym"
  | "wellness"
  | "professional"
  | "architecture"
  | "tech"
  | "travel"
  | "education"
  | "creative"
  | "construction";

export interface BusinessService {
  name: string;
  description?: string;
}

export interface BusinessHighlight {
  title: string;
  meta?: string;
  description?: string;
  /** index into the imagery pool; optional */
  image?: number;
}

export interface MenuGroup {
  name: string;
  items: { name: string; description?: string }[];
}

export interface BusinessContact {
  phone?: string;
  email?: string;
  mapsQuery?: string;
  hours?: string;
}

export interface BusinessSocials {
  instagram?: string;
  facebook?: string;
  x?: string;
  tiktok?: string;
  linkedin?: string;
}

export interface BusinessImagery {
  /** key into the image pool library */
  pool: string;
  /** which image in the pool becomes the hero */
  hero: number;
  /** optional explicit gallery order (indices into pool) */
  gallery?: number[];
}

export interface BusinessTheme {
  palette: PaletteKey;
  font: FontKey;
  blueprint: BlueprintKey;
  /** navigation treatment inside the concept */
  nav?: "bar" | "centered" | "minimal";
  radius?: "none" | "sm";
}

export type SectionConfig =
  | { type: "hero"; variant: "full" | "split" | "stacked" | "type"; eyebrow?: string; headline: string; sub?: string; image: number; cta?: string; secondary?: string }
  | { type: "intro"; id?: string; eyebrow?: string; heading: string; body: string; image?: number; variant?: "text" | "image-left" | "image-right" | "wide" }
  | { type: "services"; id?: string; eyebrow?: string; heading: string; variant: "list" | "grid" | "columns" | "numbered"; items: BusinessService[]; note?: string }
  | { type: "menu"; id?: string; heading: string; groups: MenuGroup[]; note?: string }
  | { type: "collection"; id?: string; eyebrow?: string; heading: string; variant: "grid" | "editorial" | "rows" | "wide"; items: BusinessHighlight[]; intro?: string }
  | { type: "gallery"; id?: string; heading?: string; variant: "masonry" | "strip" | "grid" | "duo"; images: number[] }
  | { type: "statement"; text: string; image?: number; tone?: "dark" | "light" | "accent" }
  | { type: "faq"; id?: string; heading: string; items: { q: string; a: string }[] }
  | { type: "contact"; id?: string; heading: string; body?: string; variant: "split" | "dark" | "minimal"; label?: string };

export interface BusinessSeed {
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  country: string;
  city: string;
  neighborhood?: string;
  address?: string;
  international?: boolean;
  tagline: string;
  description: string;
  services: BusinessService[];
  highlights?: BusinessHighlight[];
  menu?: MenuGroup[];
  contact?: BusinessContact;
  officialWebsite?: string;
  socials?: BusinessSocials;
  imagery: BusinessImagery;
  theme: BusinessTheme;
  websiteStyle: WebsiteStyle;
  featured?: boolean;
  prospectingPriority?: "high" | "medium" | "low";
  lastResearched: string;
  sources: string[];
}

export interface BusinessSummary {
  id: number;
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  country: string;
  countrySlug: string;
  city: string;
  citySlug: string;
  neighborhood: string | null;
  neighborhoodSlug: string | null;
  international: boolean;
  tagline: string;
  websiteStyle: string;
  imagery: BusinessImagery;
  featured: boolean;
}
