import Link from "next/link";
import { Photo } from "@/components/platform/Photo";
import { poolImage } from "@/data/images";
import { CATEGORY_MAP } from "@/data/taxonomy";
import type { BusinessSummary } from "@/lib/types";

export type CardVariant = "feature" | "tall" | "standard" | "compact" | "row";

interface BusinessCardProps {
  business: BusinessSummary;
  variant?: CardVariant;
  priority?: boolean;
  index?: number;
}

export function locationLabel(b: Pick<BusinessSummary, "city" | "neighborhood" | "country" | "international">): string {
  const place = b.neighborhood ? `${b.neighborhood}, ${b.city}` : b.city;
  return b.international ? `${place}, ${b.country}` : place;
}

export function BusinessCard({ business, variant = "standard", priority = false, index = 0 }: BusinessCardProps) {
  const img = poolImage(business.imagery.pool, business.imagery.hero);
  const category = CATEGORY_MAP[business.category]?.name ?? business.category;
  const href = `/business/${business.slug}`;
  const alt = `${img.alt} — illustrative image for the ${business.name} concept`;

  if (variant === "row") {
    return (
      <Link href={href} className="group grid grid-cols-[6rem_1fr] items-center gap-5 border-b border-line py-5 sm:grid-cols-[9rem_1fr_auto] sm:gap-8">
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
          <Photo id={img.id} alt={alt} sizes="(min-width:640px) 144px, 96px" width={480} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]" />
        </div>
        <div className="min-w-0">
          <p className="eyebrow text-mute">{category} · {locationLabel(business)}</p>
          <h3 className="mt-1.5 font-serif text-2xl leading-tight">{business.name}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-mute">{business.tagline}</p>
        </div>
        <span className="hidden text-sm text-mute group-hover:text-ink sm:inline">View concept →</span>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
          <Photo id={img.id} alt={alt} sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw" width={800} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]" />
        </div>
        <div className="mt-3">
          <h3 className="text-[0.95rem] font-medium leading-snug">{business.name}</h3>
          <p className="mt-0.5 text-xs text-mute">{category} · {business.city}</p>
        </div>
      </Link>
    );
  }

  const aspect = variant === "feature" ? "aspect-[4/5] sm:aspect-[16/10]" : variant === "tall" ? "aspect-[3/4]" : "aspect-[4/3]";
  const sizes =
    variant === "feature"
      ? "(min-width:1024px) 66vw, 100vw"
      : variant === "tall"
        ? "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw";

  return (
    <Link href={href} className="group block">
      <div className={`relative ${aspect} overflow-hidden bg-paper-2`}>
        <Photo id={img.id} alt={alt} sizes={sizes} priority={priority} width={variant === "feature" ? 1800 : 1000} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]" />
        {variant === "feature" && (
          <span className="absolute left-4 top-4 bg-paper px-2.5 py-1 text-[0.65rem] tracking-[0.14em] uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className={`flex items-start justify-between gap-4 ${variant === "feature" ? "mt-5" : "mt-4"}`}>
        <div className="min-w-0">
          <p className="eyebrow text-mute">{category} · {locationLabel(business)}</p>
          <h3 className={`mt-2 font-serif leading-[1.05] ${variant === "feature" ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl"}`}>{business.name}</h3>
          {variant !== "tall" && <p className="mt-2 line-clamp-2 max-w-md text-sm text-mute">{business.tagline}</p>}
        </div>
        <span className="mt-1 hidden shrink-0 text-sm text-mute transition-colors group-hover:text-ink sm:inline">View concept →</span>
      </div>
    </Link>
  );
}
