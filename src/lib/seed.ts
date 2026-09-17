import { db } from "@/db";
import { businesses, type NewBusinessRow } from "@/db/schema";
import { BUSINESS_SEED } from "@/data/businesses";
import { CATEGORY_MAP, slugify } from "@/data/taxonomy";
import type { BusinessSeed } from "@/lib/types";
import { sql } from "drizzle-orm";

export function seedToRow(seed: BusinessSeed, index: number): NewBusinessRow {
  const category = CATEGORY_MAP[seed.category];
  const searchText = [
    seed.name,
    seed.tagline,
    seed.description,
    category?.name,
    seed.subcategory,
    seed.country,
    seed.city,
    seed.neighborhood,
    seed.websiteStyle,
    ...seed.services.map((s) => `${s.name} ${s.description ?? ""}`),
    ...(seed.highlights ?? []).map((h) => h.title),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    subcategory: seed.subcategory,
    country: seed.country,
    countrySlug: slugify(seed.country),
    city: seed.city,
    citySlug: slugify(seed.city),
    neighborhood: seed.neighborhood ?? null,
    neighborhoodSlug: seed.neighborhood ? slugify(seed.neighborhood) : null,
    address: seed.address ?? null,
    international: seed.international ?? false,
    tagline: seed.tagline,
    description: seed.description,
    services: seed.services,
    highlights: seed.highlights ?? [],
    menu: seed.menu ?? null,
    contact: seed.contact ?? {},
    officialWebsite: seed.officialWebsite ?? null,
    socials: seed.socials ?? {},
    imagery: seed.imagery,
    theme: seed.theme,
    websiteStyle: seed.websiteStyle,
    sections: null,
    featured: seed.featured ?? false,
    prospectingPriority: seed.prospectingPriority ?? "medium",
    lastResearched: seed.lastResearched,
    sources: seed.sources,
    conceptStatus: "published",
    searchText,
    sortOrder: index,
    updatedAt: new Date(),
  };
}

/** Upsert every seed record. Safe to run repeatedly. */
export async function syncSeed(): Promise<number> {
  const rows = BUSINESS_SEED.map(seedToRow);
  const chunk = 25;
  for (let i = 0; i < rows.length; i += chunk) {
    const slice = rows.slice(i, i + chunk);
    await db
      .insert(businesses)
      .values(slice)
      .onConflictDoUpdate({
        target: businesses.slug,
        set: {
          name: sql`excluded.name`,
          category: sql`excluded.category`,
          subcategory: sql`excluded.subcategory`,
          country: sql`excluded.country`,
          countrySlug: sql`excluded.country_slug`,
          city: sql`excluded.city`,
          citySlug: sql`excluded.city_slug`,
          neighborhood: sql`excluded.neighborhood`,
          neighborhoodSlug: sql`excluded.neighborhood_slug`,
          address: sql`excluded.address`,
          international: sql`excluded.international`,
          tagline: sql`excluded.tagline`,
          description: sql`excluded.description`,
          services: sql`excluded.services`,
          highlights: sql`excluded.highlights`,
          menu: sql`excluded.menu`,
          contact: sql`excluded.contact`,
          officialWebsite: sql`excluded.official_website`,
          socials: sql`excluded.socials`,
          imagery: sql`excluded.imagery`,
          theme: sql`excluded.theme`,
          websiteStyle: sql`excluded.website_style`,
          featured: sql`excluded.featured`,
          prospectingPriority: sql`excluded.prospecting_priority`,
          lastResearched: sql`excluded.last_researched`,
          sources: sql`excluded.sources`,
          searchText: sql`excluded.search_text`,
          sortOrder: sql`excluded.sort_order`,
          updatedAt: sql`now()`,
        },
      });
  }
  return rows.length;
}

let ensured: Promise<void> | null = null;

/** Bootstraps the catalogue on first request if the table is empty. */
export function ensureSeeded(): Promise<void> {
  if (!ensured) {
    ensured = (async () => {
      try {
        const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(businesses);
        if (Number(count) === 0) await syncSeed();
      } catch (error) {
        ensured = null;
        throw error;
      }
    })();
  }
  return ensured;
}
