import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/platform/EmptyState";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { LOCATION_TREE } from "@/data/taxonomy";
import { locationCounts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Locations",
  description: "Explore website concepts by location — Nairobi neighbourhoods, Kenyan cities and a few international benchmarks.",
  alternates: { canonical: "/locations" },
};

export default async function LocationsPage() {
  const locs = await locationCounts();
  const countryTotals = new Map<string, number>();
  const cityTotals = new Map<string, number>();
  const hoodTotals = new Map<string, number>();
  for (const l of locs) {
    countryTotals.set(l.countrySlug, (countryTotals.get(l.countrySlug) ?? 0) + l.count);
    cityTotals.set(`${l.countrySlug}/${l.citySlug}`, (cityTotals.get(`${l.countrySlug}/${l.citySlug}`) ?? 0) + l.count);
    if (l.neighborhoodSlug) hoodTotals.set(`${l.countrySlug}/${l.citySlug}/${l.neighborhoodSlug}`, (hoodTotals.get(`${l.countrySlug}/${l.citySlug}/${l.neighborhoodSlug}`) ?? 0) + l.count);
  }

  return (
    <PlatformShell>
      <PageIntro eyebrow="Locations" title="Where the businesses are." body="Only places with published concepts are listed." />
      <section className="container-wide space-y-20 pb-24">
        {LOCATION_TREE.filter((c) => countryTotals.has(c.slug)).map((country) => (
          <div key={country.slug} className="grid gap-8 border-t border-line pt-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link href={`/locations/${country.slug}`} className="group inline-flex items-baseline gap-3">
                <h2 className="display-2 transition-colors group-hover:text-mute">{country.name}</h2>
                <span className="text-sm text-mute">{countryTotals.get(country.slug)}</span>
              </Link>
            </div>
            <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              {(country.children ?? [])
                .filter((city) => cityTotals.has(`${country.slug}/${city.slug}`))
                .map((city) => {
                  const hoods = (city.children ?? []).filter((h) => hoodTotals.has(`${country.slug}/${city.slug}/${h.slug}`));
                  return (
                    <li key={city.slug}>
                      <Link href={`/locations/${country.slug}/${city.slug}`} className="group inline-flex items-baseline gap-2">
                        <span className="font-serif text-2xl transition-colors group-hover:text-mute sm:text-3xl">{city.name}</span>
                        <span className="text-xs text-mute">{cityTotals.get(`${country.slug}/${city.slug}`)}</span>
                      </Link>
                      {hoods.length > 0 && (
                        <ul className="mt-3 space-y-1.5 text-sm">
                          {hoods.map((h) => (
                            <li key={h.slug}>
                              <Link href={`/locations/${country.slug}/${city.slug}/${h.slug}`} className="text-mute hover:text-ink">
                                {h.name} <span className="text-mute-2">{hoodTotals.get(`${country.slug}/${city.slug}/${h.slug}`)}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </section>
    </PlatformShell>
  );
}
