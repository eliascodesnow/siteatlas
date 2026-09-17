import { cache } from "react";
import { and, asc, desc, eq, ilike, ne, or, sql, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { businesses, type BusinessRow } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";
import type { BusinessSummary, CategorySlug } from "@/lib/types";

const summaryColumns = {
  id: businesses.id,
  slug: businesses.slug,
  name: businesses.name,
  category: businesses.category,
  subcategory: businesses.subcategory,
  country: businesses.country,
  countrySlug: businesses.countrySlug,
  city: businesses.city,
  citySlug: businesses.citySlug,
  neighborhood: businesses.neighborhood,
  neighborhoodSlug: businesses.neighborhoodSlug,
  international: businesses.international,
  tagline: businesses.tagline,
  websiteStyle: businesses.websiteStyle,
  imagery: businesses.imagery,
  featured: businesses.featured,
};

type RawSummary = Omit<BusinessSummary, "category"> & { category: string };
const toSummary = (r: RawSummary): BusinessSummary => ({ ...r, category: r.category as CategorySlug });

const published = eq(businesses.conceptStatus, "published");

export interface CatalogueFilters {
  q?: string;
  category?: string;
  country?: string;
  city?: string;
  neighborhood?: string;
  style?: string;
  international?: boolean;
  featured?: boolean;
  limit?: number;
  excludeSlug?: string;
}

function buildWhere(f: CatalogueFilters): SQL | undefined {
  const parts: SQL[] = [published];
  if (f.category) parts.push(eq(businesses.category, f.category));
  if (f.country) parts.push(eq(businesses.countrySlug, f.country));
  if (f.city) parts.push(eq(businesses.citySlug, f.city));
  if (f.neighborhood) parts.push(eq(businesses.neighborhoodSlug, f.neighborhood));
  if (f.style) parts.push(eq(businesses.websiteStyle, f.style));
  if (typeof f.international === "boolean") parts.push(eq(businesses.international, f.international));
  if (typeof f.featured === "boolean") parts.push(eq(businesses.featured, f.featured));
  if (f.excludeSlug) parts.push(ne(businesses.slug, f.excludeSlug));
  if (f.q && f.q.trim()) {
    const terms = f.q.toLowerCase().trim().split(/\s+/).slice(0, 6);
    for (const term of terms) {
      parts.push(ilike(businesses.searchText, `%${term.replace(/[%_]/g, "")}%`));
    }
  }
  return and(...parts);
}

export const listBusinesses = cache(async (filters: CatalogueFilters = {}): Promise<BusinessSummary[]> => {
  await ensureSeeded();
  const rows = await db
    .select(summaryColumns)
    .from(businesses)
    .where(buildWhere(filters))
    .orderBy(desc(businesses.featured), asc(businesses.sortOrder))
    .limit(filters.limit ?? 500);
  return rows.map(toSummary);
});

/** Search: all terms first; if nothing matches, fall back to any-term matches ranked by hits. */
export async function searchBusinesses(q: string): Promise<BusinessSummary[]> {
  const term = q.trim();
  if (!term) return [];
  const strict = await listBusinesses({ q: term });
  if (strict.length) return strict;
  const terms = term.toLowerCase().split(/\s+/).filter((t) => t.length > 1).slice(0, 6);
  if (terms.length < 2) return [];
  // rarer terms are more specific, so they weigh more ("diani" beats "hotel")
  const hits = new Map<string, { b: BusinessSummary; score: number }>();
  const perTerm = await Promise.all(terms.map((t) => listBusinesses({ q: t })));
  perTerm.forEach((matches) => {
    const weight = matches.length ? 1 / matches.length : 0;
    for (const b of matches) {
      const e = hits.get(b.slug) ?? { b, score: 0 };
      e.score += weight;
      hits.set(b.slug, e);
    }
  });
  return [...hits.values()].sort((a, b) => b.score - a.score).map((e) => e.b);
}

export const getBusinessBySlug = cache(async (slug: string): Promise<BusinessRow | null> => {
  await ensureSeeded();
  const [row] = await db.select().from(businesses).where(and(eq(businesses.slug, slug), published)).limit(1);
  return row ?? null;
});

export const getRelatedBusinesses = cache(async (row: BusinessRow, limit = 4): Promise<BusinessSummary[]> => {
  await ensureSeeded();
  const notSelf = ne(businesses.id, row.id);
  const sameCategory = eq(businesses.category, row.category);
  const sameCity = eq(businesses.citySlug, row.citySlug);
  const sameStyle = eq(businesses.websiteStyle, row.websiteStyle);
  const score = sql<number>`(case when ${sameCategory} then 3 else 0 end) + (case when ${sameCity} then 2 else 0 end) + (case when ${sameStyle} then 1 else 0 end)`;
  const rows = await db
    .select(summaryColumns)
    .from(businesses)
    .where(and(published, notSelf, or(sameCategory, sameCity, sameStyle)))
    .orderBy(desc(score), asc(businesses.sortOrder))
    .limit(limit);
  return rows.map(toSummary);
});

export interface FacetCount {
  key: string;
  label: string;
  count: number;
}

export const categoryCounts = cache(async (): Promise<FacetCount[]> => {
  await ensureSeeded();
  const rows = await db
    .select({ key: businesses.category, count: sql<number>`count(*)::int` })
    .from(businesses)
    .where(published)
    .groupBy(businesses.category);
  return rows.map((r) => ({ key: r.key, label: r.key, count: Number(r.count) }));
});

export interface LocationCount {
  countrySlug: string;
  country: string;
  citySlug: string;
  city: string;
  neighborhoodSlug: string | null;
  neighborhood: string | null;
  count: number;
}

export const locationCounts = cache(async (): Promise<LocationCount[]> => {
  await ensureSeeded();
  const rows = await db
    .select({
      countrySlug: businesses.countrySlug,
      country: businesses.country,
      citySlug: businesses.citySlug,
      city: businesses.city,
      neighborhoodSlug: businesses.neighborhoodSlug,
      neighborhood: businesses.neighborhood,
      count: sql<number>`count(*)::int`,
    })
    .from(businesses)
    .where(published)
    .groupBy(
      businesses.countrySlug,
      businesses.country,
      businesses.citySlug,
      businesses.city,
      businesses.neighborhoodSlug,
      businesses.neighborhood,
    );
  return rows.map((r) => ({ ...r, count: Number(r.count) }));
});

export const styleCounts = cache(async (): Promise<FacetCount[]> => {
  await ensureSeeded();
  const rows = await db
    .select({ key: businesses.websiteStyle, count: sql<number>`count(*)::int` })
    .from(businesses)
    .where(published)
    .groupBy(businesses.websiteStyle);
  return rows.map((r) => ({ key: r.key, label: r.key, count: Number(r.count) }));
});

export const allSlugs = cache(async (): Promise<{ slug: string; updatedAt: Date }[]> => {
  await ensureSeeded();
  return db.select({ slug: businesses.slug, updatedAt: businesses.updatedAt }).from(businesses).where(published);
});
