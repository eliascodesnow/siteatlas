import Link from "next/link";
import { Suspense } from "react";
import { EditorialGrid } from "@/components/platform/EditorialGrid";
import { EmptyState } from "@/components/platform/EmptyState";
import { FilterBar, type FilterOption } from "@/components/platform/FilterBar";
import { CATEGORY_MAP, WEBSITE_STYLES } from "@/data/taxonomy";
import { categoryCounts, listBusinesses, locationCounts, styleCounts, type CatalogueFilters } from "@/lib/queries";
import type { CategorySlug } from "@/lib/types";

export type SearchParamsMap = Record<string, string | string[] | undefined>;

const PAGE_SIZE = 28;

export function readFilters(sp: SearchParamsMap, fixed: CatalogueFilters = {}): CatalogueFilters {
  const pick = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  return {
    q: pick("q"),
    category: fixed.category ?? pick("category"),
    country: fixed.country ?? pick("country"),
    city: fixed.city ?? pick("city"),
    neighborhood: fixed.neighborhood ?? pick("neighborhood"),
    style: fixed.style ?? pick("style"),
    international: pick("international") === "1" ? true : undefined,
    ...fixed,
  };
}

export function readPage(sp: SearchParamsMap): number {
  const n = Number(typeof sp.page === "string" ? sp.page : 1);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}

async function buildFacets() {
  const [cats, locs, styles] = await Promise.all([categoryCounts(), locationCounts(), styleCounts()]);
  const categories: FilterOption[] = cats
    .map((c) => ({ value: c.key, label: CATEGORY_MAP[c.key as CategorySlug]?.name ?? c.key, count: c.count }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const countryMap = new Map<string, FilterOption>();
  const cityMap = new Map<string, FilterOption>();
  const hoodMap = new Map<string, FilterOption>();
  for (const l of locs) {
    const c = countryMap.get(l.countrySlug) ?? { value: l.countrySlug, label: l.country, count: 0 };
    c.count = (c.count ?? 0) + l.count;
    countryMap.set(l.countrySlug, c);
    const ci = cityMap.get(l.citySlug) ?? { value: l.citySlug, label: l.city, count: 0, parent: l.countrySlug };
    ci.count = (ci.count ?? 0) + l.count;
    cityMap.set(l.citySlug, ci);
    if (l.neighborhoodSlug && l.neighborhood) {
      const key = `${l.citySlug}/${l.neighborhoodSlug}`;
      const n = hoodMap.get(key) ?? { value: l.neighborhoodSlug, label: l.neighborhood, count: 0, parent: l.citySlug };
      n.count = (n.count ?? 0) + l.count;
      hoodMap.set(key, n);
    }
  }
  const byLabel = (a: FilterOption, b: FilterOption) => a.label.localeCompare(b.label);
  const styleOpts: FilterOption[] = styles
    .map((s) => ({ value: s.key, label: WEBSITE_STYLES.find((w) => w.slug === s.key)?.name ?? s.key, count: s.count }))
    .sort(byLabel);
  return {
    categories,
    countries: [...countryMap.values()].sort((a, b) => (b.count ?? 0) - (a.count ?? 0)),
    cities: [...cityMap.values()].sort((a, b) => (b.count ?? 0) - (a.count ?? 0)),
    neighborhoods: [...hoodMap.values()].sort(byLabel),
    styles: styleOpts,
  };
}

interface CatalogueBrowserProps {
  filters: CatalogueFilters;
  page?: number;
  searchParams?: SearchParamsMap;
  hide?: ("category" | "country" | "city" | "neighborhood" | "style")[];
  emptyTitle?: string;
  emptyBody?: string;
}

export async function CatalogueBrowser({
  filters,
  page = 1,
  searchParams = {},
  hide,
  emptyTitle = "Nothing here yet.",
  emptyBody = "Try clearing a filter or exploring another category.",
}: CatalogueBrowserProps) {
  const [items, facets] = await Promise.all([listBusinesses(filters), buildFacets()]);
  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const slice = items.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const pageHref = (n: number) => {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(searchParams)) if (typeof v === "string" && k !== "page") qs.set(k, v);
    if (n > 1) qs.set("page", String(n));
    const s = qs.toString();
    return s ? `?${s}` : "?";
  };

  return (
    <div className="container-wide">
      <Suspense fallback={<div className="h-20 border-y border-line" />}>
        <FilterBar {...facets} total={items.length} hide={hide} lockedCountry={filters.country} lockedCity={filters.city} />
      </Suspense>
      <div className="py-12 lg:py-16">
        {items.length === 0 ? (
          <EmptyState title={emptyTitle} body={emptyBody} action={{ href: "/explore", label: "Browse all concepts" }} />
        ) : (
          <EditorialGrid items={slice} offset={(current - 1) * PAGE_SIZE} />
        )}
        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-16 flex items-center justify-between border-t border-line pt-6 text-sm">
            {current > 1 ? <Link href={pageHref(current - 1)} className="link-underline">← Previous</Link> : <span />}
            <span className="text-mute">
              Page {current} of {pages}
            </span>
            {current < pages ? <Link href={pageHref(current + 1)} className="link-underline">Next →</Link> : <span />}
          </nav>
        )}
      </div>
    </div>
  );
}
