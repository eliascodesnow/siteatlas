import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogueBrowser, readFilters, readPage, type SearchParamsMap } from "@/components/platform/CatalogueBrowser";
import { PageIntro } from "@/components/platform/EmptyState";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { TrackView } from "@/components/platform/TrackedLink";
import { findLocation } from "@/data/taxonomy";
import { locationCounts } from "@/lib/queries";

export const dynamic = "force-dynamic";

type Params = { path: string[] };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { path } = await params;
  const found = findLocation(path);
  if (!found) return { title: "Location not found" };
  const names = found.trail.map((n) => n.name).reverse();
  return {
    title: `${names.join(", ")} website concepts`,
    description: `Independent website concepts for real businesses in ${names.join(", ")}, by Kinetix Africa.`,
    alternates: { canonical: `/locations/${path.join("/")}` },
  };
}

export default async function LocationPage({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<SearchParamsMap> }) {
  const { path } = await params;
  if (path.length > 3) notFound();
  const found = findLocation(path);
  if (!found) notFound();
  const [country, city, hood] = path;
  const sp = await searchParams;
  const fixed = { country, ...(city ? { city } : {}), ...(hood ? { neighborhood: hood } : {}) };
  const filters = readFilters(sp, fixed);

  const locs = await locationCounts();
  const children = (found.node.children ?? []).filter((child) =>
    locs.some((l) => (path.length === 1 ? l.countrySlug === country && l.citySlug === child.slug : l.citySlug === city && l.neighborhoodSlug === child.slug)),
  );
  const hide: ("country" | "city" | "neighborhood")[] = ["country"];
  if (city) hide.push("city");
  if (hood) hide.push("neighborhood");

  return (
    <PlatformShell>
      <TrackView event="location_view" props={{ location: path.join("/") }} />
      <PageIntro eyebrow={found.trail.length > 1 ? found.trail.slice(0, -1).map((n) => n.name).join(" · ") : "Country"} title={found.node.name}>
        {children.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {children.map((c) => (
              <li key={c.slug}>
                <Link href={`/locations/${[...path, c.slug].join("/")}`} className="link-underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <nav aria-label="Breadcrumb" className="mt-6 text-xs text-mute">
          <ol className="flex flex-wrap gap-2">
            <li><Link href="/locations" className="hover:text-ink">Locations</Link></li>
            {found.trail.map((n, i) => (
              <li key={n.slug} className="flex gap-2">
                <span aria-hidden>/</span>
                {i === found.trail.length - 1 ? <span aria-current="page">{n.name}</span> : <Link href={`/locations/${path.slice(0, i + 1).join("/")}`} className="hover:text-ink">{n.name}</Link>}
              </li>
            ))}
          </ol>
        </nav>
      </PageIntro>
      <CatalogueBrowser filters={filters} page={readPage(sp)} searchParams={sp} hide={hide} emptyTitle="No concepts here yet." emptyBody="We have not published a concept in this location. Try the parent location or another city." />
    </PlatformShell>
  );
}
