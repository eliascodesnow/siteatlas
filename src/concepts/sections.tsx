import { Photo } from "@/components/platform/Photo";
import { Reveal } from "@/components/platform/Reveal";
import { TrackedLink } from "@/components/platform/TrackedLink";
import { poolImage } from "@/data/images";
import type { BusinessRow } from "@/db/schema";
import type { BusinessHighlight, BusinessService, MenuGroup, SectionConfig } from "@/lib/types";
import { businessConceptMessage, whatsappLink } from "@/lib/whatsapp";

type Ctx = { b: BusinessRow; contactId: string; secondaryId?: string };

const Img = ({ b, index, sizes, priority, className = "", width }: { b: BusinessRow; index: number; sizes: string; priority?: boolean; className?: string; width?: number }) => {
  const img = poolImage(b.imagery.pool, index);
  return <Photo id={img.id} alt={`${img.alt} (illustrative stock image)`} sizes={sizes} priority={priority} className={className} width={width} />;
};

/* ------------------------------------------------------------------ Hero */
export function Hero({ s, ctx }: { s: Extract<SectionConfig, { type: "hero" }>; ctx: Ctx }) {
  const { b, contactId, secondaryId } = ctx;
  const primary = (
    <a href={`#${contactId}`} className="c-btn">
      {s.cta ?? "Get in touch"}
    </a>
  );
  const secondary = s.secondary && secondaryId ? (
    <a href={`#${secondaryId}`} className="c-btn-ghost">
      {s.secondary}
    </a>
  ) : null;

  if (s.variant === "full") {
    return (
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden" aria-label="Introduction">
        <div className="absolute inset-0">
          <Img b={b} index={s.image} sizes="100vw" priority width={2000} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" aria-hidden />
        </div>
        <div className="relative z-10 w-full px-5 pb-12 pt-40 text-white sm:px-8 sm:pb-16 lg:px-14 lg:pb-20">
          <div className="max-w-4xl">
            {s.eyebrow && <p className="c-eyebrow !text-white/70">{s.eyebrow}</p>}
            <h1 className="c-display mt-4 text-[clamp(2.5rem,7.5vw,6.5rem)]">{s.headline}</h1>
            {s.sub && <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{s.sub}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`#${contactId}`} className="inline-flex items-center bg-white px-6 py-4 text-sm font-semibold text-black transition-opacity hover:opacity-90" style={{ borderRadius: "var(--c-radius)" }}>
                {s.cta ?? "Get in touch"}
              </a>
              {s.secondary && secondaryId && (
                <a href={`#${secondaryId}`} className="inline-flex items-center border border-white/60 px-6 py-4 text-sm font-medium text-white transition-colors hover:border-white" style={{ borderRadius: "var(--c-radius)" }}>
                  {s.secondary}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (s.variant === "split") {
    return (
      <section className="grid lg:min-h-[85svh] lg:grid-cols-2" aria-label="Introduction">
        <div className="order-2 flex flex-col justify-center px-5 py-14 sm:px-8 lg:order-1 lg:px-14 lg:py-24">
          {s.eyebrow && <p className="c-eyebrow">{s.eyebrow}</p>}
          <h1 className="c-display mt-5 text-[clamp(2.4rem,5.2vw,4.75rem)]">{s.headline}</h1>
          {s.sub && <p className="mt-6 max-w-md text-base leading-relaxed sm:text-lg" style={{ color: "var(--c-muted)" }}>{s.sub}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            {primary}
            {secondary}
          </div>
        </div>
        <div className="relative order-1 aspect-[4/3] lg:order-2 lg:aspect-auto">
          <Img b={b} index={s.image} sizes="(min-width:1024px) 50vw, 100vw" priority />
        </div>
      </section>
    );
  }

  if (s.variant === "stacked") {
    return (
      <section aria-label="Introduction">
        <div className="px-5 pb-8 pt-14 sm:px-8 lg:px-14 lg:pb-12 lg:pt-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              {s.eyebrow && <p className="c-eyebrow">{s.eyebrow}</p>}
              <h1 className="c-display mt-5 text-[clamp(2.75rem,8vw,7.5rem)]">{s.headline}</h1>
            </div>
            <div className="max-w-sm lg:pb-2">
              {s.sub && <p className="text-base leading-relaxed" style={{ color: "var(--c-muted)" }}>{s.sub}</p>}
              <div className="mt-6 flex flex-wrap gap-3">
                {primary}
                {secondary}
              </div>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
          <Img b={b} index={s.image} sizes="100vw" priority width={2000} />
        </div>
      </section>
    );
  }

  // type-led
  return (
    <section className="px-5 pt-14 sm:px-8 lg:px-14 lg:pt-24" aria-label="Introduction">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {s.eyebrow && <p className="c-eyebrow">{s.eyebrow}</p>}
          <h1 className="c-display mt-5 text-[clamp(2.5rem,6.5vw,6rem)]">{s.headline}</h1>
        </div>
        <div className="flex flex-col justify-end lg:col-span-4">
          {s.sub && <p className="text-base leading-relaxed sm:text-lg" style={{ color: "var(--c-muted)" }}>{s.sub}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            {primary}
            {secondary}
          </div>
        </div>
      </div>
      <div className="relative mt-12 aspect-[4/3] sm:aspect-[16/8] lg:mt-16">
        <Img b={b} index={s.image} sizes="100vw" priority width={2000} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Intro */
export function Intro({ s, ctx }: { s: Extract<SectionConfig, { type: "intro" }>; ctx: Ctx }) {
  const { b } = ctx;
  const variant = s.variant ?? (s.image !== undefined ? "image-right" : "text");
  if (variant === "wide" || variant === "text" || s.image === undefined) {
    return (
      <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
        <Reveal className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {s.eyebrow && <p className="c-eyebrow">{s.eyebrow}</p>}
            <h2 className="c-display mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)]">{s.heading}</h2>
          </div>
          <p className="text-lg leading-relaxed lg:col-span-7 lg:col-start-6 lg:text-xl" style={{ color: "var(--c-muted)" }}>
            {s.body}
          </p>
        </Reveal>
      </section>
    );
  }
  const imageLeft = variant === "image-left";
  return (
    <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className={`relative aspect-[4/5] lg:col-span-6 ${imageLeft ? "lg:order-1" : "lg:order-2"}`}>
          <Img b={b} index={s.image} sizes="(min-width:1024px) 50vw, 100vw" />
        </Reveal>
        <Reveal className={`lg:col-span-5 ${imageLeft ? "lg:order-2 lg:col-start-8" : "lg:order-1"}`}>
          {s.eyebrow && <p className="c-eyebrow">{s.eyebrow}</p>}
          <h2 className="c-display mt-4 text-[clamp(1.9rem,3.6vw,3.25rem)]">{s.heading}</h2>
          <p className="mt-6 text-base leading-relaxed sm:text-lg" style={{ color: "var(--c-muted)" }}>
            {s.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Services */
export function Services({ s }: { s: Extract<SectionConfig, { type: "services" }> }) {
  const items: BusinessService[] = s.items;
  const head = (
    <div className="max-w-2xl">
      {s.eyebrow && <p className="c-eyebrow">{s.eyebrow}</p>}
      <h2 className="c-display mt-4 text-[clamp(1.9rem,3.6vw,3.25rem)]">{s.heading}</h2>
    </div>
  );
  if (s.variant === "numbered") {
    return (
      <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
        {head}
        <ol className="mt-12 border-t" style={{ borderColor: "var(--c-line)" }}>
          {items.map((it, i) => (
            <li key={it.name} className="grid grid-cols-[3rem_1fr] gap-4 border-b py-6 sm:grid-cols-[4rem_1fr_1fr] sm:gap-8" style={{ borderColor: "var(--c-line)" }}>
              <span className="text-sm" style={{ color: "var(--c-muted)" }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="c-display text-2xl sm:text-3xl">{it.name}</h3>
              {it.description && <p className="col-start-2 text-sm leading-relaxed sm:col-start-3 sm:text-base" style={{ color: "var(--c-muted)" }}>{it.description}</p>}
            </li>
          ))}
        </ol>
      </section>
    );
  }
  if (s.variant === "list") {
    return (
      <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">{head}</div>
          <ul className="border-t lg:col-span-7 lg:col-start-6" style={{ borderColor: "var(--c-line)" }}>
            {items.map((it) => (
              <li key={it.name} className="flex flex-col gap-1 border-b py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8" style={{ borderColor: "var(--c-line)" }}>
                <h3 className="text-lg font-medium">{it.name}</h3>
                {it.description && <p className="text-sm sm:max-w-xs sm:text-right" style={{ color: "var(--c-muted)" }}>{it.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  if (s.variant === "columns") {
    return (
      <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
        {head}
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.name} className="border-t pt-5" style={{ borderColor: "var(--c-fg)" }}>
              <h3 className="c-display text-xl sm:text-2xl">{it.name}</h3>
              {it.description && <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{it.description}</p>}
            </div>
          ))}
        </div>
      </section>
    );
  }
  // grid – surface tiles
  return (
    <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
      {head}
      <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--c-line)" }}>
        {items.map((it) => (
          <div key={it.name} className="p-6 sm:p-8" style={{ background: "var(--c-bg)" }}>
            <h3 className="text-lg font-semibold">{it.name}</h3>
            {it.description && <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{it.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Menu */
export function Menu({ s }: { s: Extract<SectionConfig, { type: "menu" }> }) {
  const groups: MenuGroup[] = s.groups;
  return (
    <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32" style={{ background: "var(--c-surface)" }}>
      <div className="mx-auto max-w-4xl">
        <h2 className="c-display text-center text-[clamp(2rem,4vw,3.5rem)]">{s.heading}</h2>
        <div className="mt-14 grid gap-14 sm:grid-cols-2 sm:gap-x-16">
          {groups.map((g) => (
            <div key={g.name}>
              <h3 className="c-eyebrow border-b pb-3" style={{ borderColor: "var(--c-fg)", color: "var(--c-fg)" }}>{g.name}</h3>
              <ul className="mt-4 space-y-4">
                {g.items.map((it) => (
                  <li key={it.name}>
                    <p className="c-display text-xl">{it.name}</p>
                    {it.description && <p className="mt-0.5 text-sm" style={{ color: "var(--c-muted)" }}>{it.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {s.note && <p className="mt-14 text-center text-xs" style={{ color: "var(--c-muted)" }}>{s.note}</p>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Collection */
export function Collection({ s, ctx }: { s: Extract<SectionConfig, { type: "collection" }>; ctx: Ctx }) {
  const { b } = ctx;
  const items: BusinessHighlight[] = s.items;
  const head = (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        {s.eyebrow && <p className="c-eyebrow">{s.eyebrow}</p>}
        <h2 className="c-display mt-4 text-[clamp(1.9rem,3.6vw,3.25rem)]">{s.heading}</h2>
      </div>
      {s.intro && <p className="max-w-xs text-xs" style={{ color: "var(--c-muted)" }}>{s.intro}</p>}
    </div>
  );
  const Card = ({ it, aspect, sizes }: { it: BusinessHighlight; aspect: string; sizes: string }) => (
    <div className="group">
      {it.image !== undefined && (
        <div className={`relative overflow-hidden ${aspect}`}>
          <Img b={b} index={it.image} sizes={sizes} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]" width={1000} />
        </div>
      )}
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="c-display text-xl sm:text-2xl">{it.title}</h3>
        {it.meta && <span className="shrink-0 text-xs" style={{ color: "var(--c-muted)" }}>{it.meta}</span>}
      </div>
      {it.description && <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{it.description}</p>}
    </div>
  );

  if (s.variant === "rows") {
    return (
      <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
        {head}
        <ul className="mt-12 border-t" style={{ borderColor: "var(--c-line)" }}>
          {items.map((it) => (
            <li key={it.title} className="grid grid-cols-[5rem_1fr] items-center gap-5 border-b py-5 sm:grid-cols-[8rem_1fr_auto] sm:gap-8" style={{ borderColor: "var(--c-line)" }}>
              <div className="relative aspect-[4/3] overflow-hidden">{it.image !== undefined && <Img b={b} index={it.image} sizes="128px" width={400} />}</div>
              <div>
                <h3 className="c-display text-xl sm:text-2xl">{it.title}</h3>
                {it.description && <p className="mt-1 text-sm" style={{ color: "var(--c-muted)" }}>{it.description}</p>}
              </div>
              {it.meta && <span className="col-start-2 text-xs sm:col-start-3" style={{ color: "var(--c-muted)" }}>{it.meta}</span>}
            </li>
          ))}
        </ul>
      </section>
    );
  }
  if (s.variant === "editorial") {
    return (
      <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
        {head}
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          {items.map((it, i) => {
            const layout = [
              { span: "lg:col-span-7", aspect: "aspect-[4/3]", sizes: "(min-width:1024px) 58vw, 100vw" },
              { span: "lg:col-span-5 lg:pt-24", aspect: "aspect-[4/5]", sizes: "(min-width:1024px) 41vw, 100vw" },
              { span: "lg:col-span-5", aspect: "aspect-[1/1]", sizes: "(min-width:1024px) 41vw, 100vw" },
              { span: "lg:col-span-7 lg:pt-16", aspect: "aspect-[16/10]", sizes: "(min-width:1024px) 58vw, 100vw" },
            ][i % 4];
            return (
              <Reveal key={it.title} className={layout.span}>
                <Card it={it} aspect={layout.aspect} sizes={layout.sizes} />
              </Reveal>
            );
          })}
        </div>
      </section>
    );
  }
  if (s.variant === "wide") {
    return (
      <section id={s.id} className="py-20 lg:py-32">
        <div className="px-5 sm:px-8 lg:px-14">{head}</div>
        <div className="no-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto px-5 sm:px-8 lg:px-14">
          {items.map((it) => (
            <div key={it.title} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[32vw]">
              <Card it={it} aspect="aspect-[4/5]" sizes="(min-width:1024px) 32vw, 78vw" />
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
      {head}
      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <Reveal key={it.title}>
            <Card it={it} aspect="aspect-[4/5]" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Gallery */
export function Gallery({ s, ctx }: { s: Extract<SectionConfig, { type: "gallery" }>; ctx: Ctx }) {
  const { b } = ctx;
  const imgs = s.images;
  const heading = s.heading && (
    <div className="px-5 sm:px-8 lg:px-14">
      <h2 className="c-display text-[clamp(1.9rem,3.6vw,3.25rem)]">{s.heading}</h2>
    </div>
  );
  if (s.variant === "strip") {
    return (
      <section id={s.id} className="py-10 lg:py-16">
        {heading}
        <div className="no-scrollbar mt-8 flex snap-x gap-3 overflow-x-auto px-5 sm:px-8 lg:px-14">
          {imgs.map((i, k) => (
            <div key={k} className="relative aspect-[4/5] w-[70vw] shrink-0 snap-start sm:w-[38vw] lg:w-[24vw]">
              <Img b={b} index={i} sizes="(min-width:1024px) 24vw, 70vw" width={900} />
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (s.variant === "duo") {
    return (
      <section id={s.id} className="grid gap-3 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:px-14 lg:py-16">
        <div className="relative aspect-[4/3] lg:col-span-7">{imgs[0] !== undefined && <Img b={b} index={imgs[0]} sizes="(min-width:1024px) 58vw, 100vw" />}</div>
        <div className="relative aspect-[4/3] lg:col-span-5 lg:mt-24 lg:aspect-[4/5]">{imgs[1] !== undefined && <Img b={b} index={imgs[1]} sizes="(min-width:1024px) 41vw, 100vw" />}</div>
      </section>
    );
  }
  if (s.variant === "masonry") {
    const spans = ["lg:col-span-5 aspect-[4/5]", "lg:col-span-7 aspect-[16/10]", "lg:col-span-4 aspect-[1/1]", "lg:col-span-4 aspect-[1/1] lg:mt-12", "lg:col-span-4 aspect-[1/1]"];
    return (
      <section id={s.id} className="py-10 lg:py-16">
        {heading}
        <div className="mt-8 grid grid-cols-2 gap-3 px-5 sm:px-8 lg:grid-cols-12 lg:px-14">
          {imgs.map((i, k) => (
            <Reveal key={k} className={`relative ${spans[k % spans.length]} ${k === 1 ? "col-span-2 lg:col-span-7" : ""}`}>
              <Img b={b} index={i} sizes="(min-width:1024px) 40vw, 50vw" width={1000} />
            </Reveal>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section id={s.id} className="py-10 lg:py-16">
      {heading}
      <div className="mt-8 grid grid-cols-2 gap-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-14">
        {imgs.map((i, k) => (
          <div key={k} className="relative aspect-[3/4]">
            <Img b={b} index={i} sizes="(min-width:1024px) 25vw, 50vw" width={800} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Statement */
export function Statement({ s, ctx }: { s: Extract<SectionConfig, { type: "statement" }>; ctx: Ctx }) {
  const { b } = ctx;
  const tone = s.tone ?? "light";
  const style =
    tone === "dark"
      ? { background: "var(--c-fg)", color: "var(--c-bg)" }
      : tone === "accent"
        ? { background: "var(--c-accent)", color: "var(--c-on-accent)" }
        : { background: "var(--c-surface)", color: "var(--c-fg)" };
  return (
    <section className="grid lg:grid-cols-12" style={style}>
      <div className={`flex items-center px-5 py-20 sm:px-8 lg:px-14 lg:py-32 ${s.image !== undefined ? "lg:col-span-7" : "lg:col-span-12"}`}>
        <p className="c-display max-w-4xl text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.15]">{s.text}</p>
      </div>
      {s.image !== undefined && (
        <div className="relative aspect-[4/3] lg:col-span-5 lg:aspect-auto">
          <Img b={b} index={s.image} sizes="(min-width:1024px) 41vw, 100vw" />
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------- FAQ */
export function Faq({ s }: { s: Extract<SectionConfig, { type: "faq" }> }) {
  return (
    <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
      <div className="grid gap-10 lg:grid-cols-12">
        <h2 className="c-display text-[clamp(1.9rem,3.6vw,3.25rem)] lg:col-span-4">{s.heading}</h2>
        <div className="border-t lg:col-span-7 lg:col-start-6" style={{ borderColor: "var(--c-line)" }}>
          {s.items.map((it) => (
            <details key={it.q} className="group border-b" style={{ borderColor: "var(--c-line)" }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {it.q}
                <span className="text-xl transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="pb-6 text-base leading-relaxed" style={{ color: "var(--c-muted)" }}>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Contact */
export function Contact({ s, ctx }: { s: Extract<SectionConfig, { type: "contact" }>; ctx: Ctx }) {
  const { b } = ctx;
  const maps = b.contact.mapsQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.contact.mapsQuery)}` : null;
  const place = [b.address, b.neighborhood, b.city, b.country].filter(Boolean).join(", ");
  const dark = s.variant === "dark";
  const style = dark ? { background: "var(--c-fg)", color: "var(--c-bg)" } : s.variant === "split" ? { background: "var(--c-surface)" } : undefined;
  const muted = dark ? { color: "color-mix(in srgb, var(--c-bg) 65%, transparent)" } : { color: "var(--c-muted)" };
  const line = dark ? "color-mix(in srgb, var(--c-bg) 20%, transparent)" : "var(--c-line)";

  return (
    <section id={s.id} className="px-5 py-20 sm:px-8 lg:px-14 lg:py-32" style={style}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {s.label && <p className="c-eyebrow" style={muted}>{s.label}</p>}
          <h2 className="c-display mt-4 text-[clamp(2rem,4.2vw,3.75rem)]">{s.heading}</h2>
          {s.body && <p className="mt-6 max-w-md text-base leading-relaxed" style={muted}>{s.body}</p>}
          <dl className="mt-10 space-y-5 text-sm">
            <div className="border-t pt-4" style={{ borderColor: line }}>
              <dt className="c-eyebrow" style={muted}>Location</dt>
              <dd className="mt-2">{place}</dd>
              {maps && (
                <dd className="mt-1">
                  <a href={maps} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={muted}>
                    Open in Google Maps ↗
                  </a>
                </dd>
              )}
            </div>
            {b.officialWebsite && (
              <div className="border-t pt-4" style={{ borderColor: line }}>
                <dt className="c-eyebrow" style={muted}>Official website</dt>
                <dd className="mt-2">
                  <TrackedLink href={b.officialWebsite} external event="outbound_click" props={{ business: b.slug, target: "official_website" }} className="underline underline-offset-4">
                    {b.officialWebsite.replace(/^https?:\/\/(www\.)?/, "")} ↗
                  </TrackedLink>
                </dd>
              </div>
            )}
            {b.contact.hours && (
              <div className="border-t pt-4" style={{ borderColor: line }}>
                <dt className="c-eyebrow" style={muted}>Hours</dt>
                <dd className="mt-2">{b.contact.hours}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Enquiry panel – in the live build this posts to the business. Here it routes the lead to Kinetix Africa, transparently. */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="border p-6 sm:p-8" style={{ borderColor: line }}>
            <p className="c-eyebrow" style={muted}>Enquiry form · concept</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2" aria-hidden>
              {["Name", "Phone or email"].map((f) => (
                <div key={f} className="border-b pb-2 text-sm" style={{ borderColor: line, ...muted }}>{f}</div>
              ))}
              <div className="border-b pb-2 text-sm sm:col-span-2" style={{ borderColor: line, ...muted }}>Message</div>
            </div>
            <p className="mt-6 text-sm leading-relaxed" style={muted}>
              On the live site this form would reach {b.name} directly. This is a concept by Kinetix Africa — if you want this website for your own business, start here:
            </p>
            <TrackedLink
              href={whatsappLink(businessConceptMessage(b.name))}
              external
              event="business_cta_click"
              props={{ business: b.slug, placement: "concept_contact" }}
              className="c-btn mt-6"
              style={dark ? { background: "var(--c-bg)", color: "var(--c-fg)" } : undefined}
            >
              Get this website
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Renderer */
export function renderSection(s: SectionConfig, ctx: Ctx, key: number) {
  switch (s.type) {
    case "hero":
      return <Hero key={key} s={s} ctx={ctx} />;
    case "intro":
      return <Intro key={key} s={s} ctx={ctx} />;
    case "services":
      return <Services key={key} s={s} />;
    case "menu":
      return <Menu key={key} s={s} />;
    case "collection":
      return <Collection key={key} s={s} ctx={ctx} />;
    case "gallery":
      return <Gallery key={key} s={s} ctx={ctx} />;
    case "statement":
      return <Statement key={key} s={s} ctx={ctx} />;
    case "faq":
      return <Faq key={key} s={s} />;
    case "contact":
      return <Contact key={key} s={s} ctx={ctx} />;
    default:
      return null;
  }
}
