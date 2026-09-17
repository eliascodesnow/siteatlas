import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/platform/EmptyState";
import { Photo } from "@/components/platform/Photo";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { poolImage } from "@/data/images";
import { CATEGORIES } from "@/data/taxonomy";
import { categoryCounts, listBusinesses } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categories",
  description: "Website concepts by industry — dining, beauty, barbers, hospitality, property, retail, automotive and more.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const [counts, all] = await Promise.all([categoryCounts(), listBusinesses()]);
  const countMap = new Map(counts.map((c) => [c.key, c.count]));
  const firstIn = (slug: string) => all.find((b) => b.category === slug);

  return (
    <PlatformShell>
      <PageIntro eyebrow="Categories" title="Concepts by industry." body="Each industry gets its own art direction — a barbershop should never look like a law firm." />
      <section className="container-wide pb-20">
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.filter((c) => countMap.has(c.slug)).map((c, i) => {
            const sample = firstIn(c.slug);
            const img = sample ? poolImage(sample.imagery.pool, sample.imagery.hero) : poolImage(c.pool, 0);
            const wide = i % 5 === 0;
            return (
              <li key={c.slug} className={wide ? "sm:col-span-2 lg:col-span-2" : ""}>
                <Link href={`/categories/${c.slug}`} className="group block">
                  <div className={`relative overflow-hidden bg-paper-2 ${wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <Photo id={img.id} alt={`${c.name} concepts`} sizes={wide ? "(min-width:1024px) 66vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"} width={wide ? 1600 : 900} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h2 className="font-serif text-2xl sm:text-3xl">{c.name}</h2>
                    <span className="text-xs text-mute">{countMap.get(c.slug)} concepts</span>
                  </div>
                  <p className="mt-1 text-sm text-mute">{c.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </PlatformShell>
  );
}
