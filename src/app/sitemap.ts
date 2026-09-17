import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/taxonomy";
import { allSlugs, locationCounts } from "@/lib/queries";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, locs] = await Promise.all([allSlugs(), locationCounts()]);
  const staticRoutes = ["", "/explore", "/categories", "/locations", "/about", "/contact"].map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const categoryRoutes = CATEGORIES.map((c) => ({ url: `${SITE_URL}/categories/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.6 }));
  const locationSet = new Set<string>();
  for (const l of locs) {
    locationSet.add(`/locations/${l.countrySlug}`);
    locationSet.add(`/locations/${l.countrySlug}/${l.citySlug}`);
    if (l.neighborhoodSlug) locationSet.add(`/locations/${l.countrySlug}/${l.citySlug}/${l.neighborhoodSlug}`);
  }
  const locationRoutes = [...locationSet].map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly" as const, priority: 0.5 }));
  const businessRoutes = slugs.map((s) => ({ url: `${SITE_URL}/business/${s.slug}`, lastModified: s.updatedAt, changeFrequency: "monthly" as const, priority: 0.8 }));
  return [...staticRoutes, ...categoryRoutes, ...locationRoutes, ...businessRoutes];
}
