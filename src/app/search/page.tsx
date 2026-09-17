import type { Metadata } from "next";
import Link from "next/link";
import { BusinessCard } from "@/components/platform/BusinessCard";
import { EmptyState } from "@/components/platform/EmptyState";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { SearchForm } from "@/components/platform/SearchForm";
import { CATEGORIES } from "@/data/taxonomy";
import { searchBusinesses } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search concepts",
  description: "Search SiteAtlas by business name, industry, city, neighbourhood or service.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const term = q.trim();
  const results = term ? await searchBusinesses(term) : [];

  return (
    <PlatformShell>
      <section className="container-wide pt-12 sm:pt-16 lg:pt-24">
        <p className="eyebrow text-mute">Search</p>
        <div className="mt-6 max-w-4xl">
          <SearchForm initial={term} large autoFocus={!term} />
        </div>
        <p className="mt-4 text-sm text-mute">Business name, industry, city, neighbourhood or service — for example “barber Westlands” or “hotel Diani”.</p>
      </section>

      <section className="container-wide py-12 lg:py-16">
        {!term ? (
          <div>
            <p className="eyebrow text-mute">Or start with an industry</p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="link-underline font-serif text-2xl">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            title={`No concepts for “${term}”.`}
            body="Try a broader term — an industry like “salon”, a city like “Mombasa”, or a neighbourhood like “Karen”."
            action={{ href: "/explore", label: "Browse all concepts" }}
          />
        ) : (
          <>
            <p className="text-sm text-mute" aria-live="polite">
              {results.length} concept{results.length === 1 ? "" : "s"} for “{term}”
            </p>
            <div className="mt-4 border-t border-line">
              {results.map((b) => (
                <BusinessCard key={b.slug} business={b} variant="row" />
              ))}
            </div>
          </>
        )}
      </section>
    </PlatformShell>
  );
}
