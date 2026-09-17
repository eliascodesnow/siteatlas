"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { track } from "@/lib/analytics";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  /** parent slug (country for cities, city for neighbourhoods) */
  parent?: string;
}

interface FilterBarProps {
  categories: FilterOption[];
  countries: FilterOption[];
  cities: FilterOption[];
  neighborhoods: FilterOption[];
  styles: FilterOption[];
  total: number;
  /** hide controls that are fixed by the page (e.g. category page) */
  hide?: ("category" | "country" | "city" | "neighborhood" | "style")[];
  /** scope options when the page itself fixes a location */
  lockedCountry?: string;
  lockedCity?: string;
}

/** URL-driven filters. Every control changes the query string and re-renders the server list. */
export function FilterBar({ categories, countries, cities, neighborhoods, styles, total, hide = [], lockedCountry, lockedCity }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const current = {
    category: params.get("category") ?? "",
    country: params.get("country") ?? "",
    city: params.get("city") ?? "",
    neighborhood: params.get("neighborhood") ?? "",
    style: params.get("style") ?? "",
  };
  const active = Object.values(current).filter(Boolean).length;

  function update(key: keyof typeof current, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === "country") {
      next.delete("city");
      next.delete("neighborhood");
    }
    if (key === "city") next.delete("neighborhood");
    track("filter_apply", { filter: key, value: value || "all" });
    const qs = next.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  const countryScope = current.country || lockedCountry;
  const cityScope = current.city || lockedCity;
  const visibleCities = countryScope ? cities.filter((c) => c.parent === countryScope) : cities;
  const visibleNeighborhoods = cityScope ? neighborhoods.filter((n) => n.parent === cityScope) : [];

  return (
    <div className="border-y border-line py-4" aria-busy={pending}>
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
        {!hide.includes("category") && <Select label="Category" value={current.category} onChange={(v) => update("category", v)} options={categories} />}
        {!hide.includes("country") && <Select label="Country" value={current.country} onChange={(v) => update("country", v)} options={countries} />}
        {!hide.includes("city") && <Select label="City" value={current.city} onChange={(v) => update("city", v)} options={visibleCities} />}
        {!hide.includes("neighborhood") && visibleNeighborhoods.length > 0 && (
          <Select label="Neighbourhood" value={current.neighborhood} onChange={(v) => update("neighborhood", v)} options={visibleNeighborhoods} />
        )}
        {!hide.includes("style") && <Select label="Website style" value={current.style} onChange={(v) => update("style", v)} options={styles} />}
        <div className="ml-auto flex items-center gap-4 text-sm text-mute">
          <span aria-live="polite">
            {total} concept{total === 1 ? "" : "s"}
          </span>
          {active > 0 && (
            <button type="button" onClick={() => startTransition(() => router.replace(pathname, { scroll: false }))} className="link-underline text-ink">
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const CHEVRON =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' fill='none' stroke='%23141412' stroke-width='1.2'/></svg>\")";

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: FilterOption[] }) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="eyebrow text-mute">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[10rem] appearance-none border-b border-line bg-transparent py-1.5 pr-6 text-sm focus:border-ink focus:outline-none"
        style={{ backgroundImage: CHEVRON, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.25rem center" }}
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
            {typeof o.count === "number" ? ` (${o.count})` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
