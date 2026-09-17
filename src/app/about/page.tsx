import type { Metadata } from "next";
import Link from "next/link";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { TrackedLink } from "@/components/platform/TrackedLink";
import { generalEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About SiteAtlas",
  description: "SiteAtlas is a project by Kinetix Africa showcasing independent website concepts for real businesses.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PlatformShell>
      <section className="container-wide pt-12 sm:pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-mute">About</p>
            <h1 className="display-2 mt-4">A showroom, not a directory.</h1>
          </div>
        </div>
      </section>

      <section className="container-wide grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="space-y-6 text-base leading-relaxed lg:col-span-6 lg:col-start-1 lg:text-lg">
          <p>
            SiteAtlas is a project by Kinetix Africa. It collects independent website concepts we have designed for real businesses — most of them in Kenya, with a strong focus on Nairobi and other major towns, plus a small number of international brands for range.
          </p>
          <p>
            The idea is simple. Instead of describing what modern web design can do for a business, we show it: a real salon in Kilimani, a real lodge on Lake Victoria, a real garage on Mombasa Road, each given the kind of website we would build if they asked.
          </p>
          <p>
            None of these are official websites. No business has commissioned, approved or endorsed a concept by appearing here. Business facts — names, locations, offerings — are taken from public sources and dated. Menus, listings, room names and similar detail are illustrative concept content. Photography is licensed stock imagery and does not depict the business, its staff or its premises.
          </p>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <dl className="space-y-6 border-t border-line pt-6 text-sm">
            <div>
              <dt className="eyebrow text-mute">Studio</dt>
              <dd className="mt-2">Kinetix Africa</dd>
            </div>
            <div>
              <dt className="eyebrow text-mute">What we build</dt>
              <dd className="mt-2">Business websites, booking and enquiry flows, catalogues and small e-commerce.</dd>
            </div>
            <div>
              <dt className="eyebrow text-mute">Contact</dt>
              <dd className="mt-2">
                <TrackedLink href={whatsappLink(generalEnquiryMessage())} external event="whatsapp_cta_click" props={{ placement: "about" }} className="link-underline">
                  WhatsApp +254 792 656 824
                </TrackedLink>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-mute">Removal requests</dt>
              <dd className="mt-2 text-mute">If you represent a featured business and would like a concept updated or removed, message us and we will act promptly.</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="container-wide border-t border-line py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 className="display-3 lg:col-span-5">How a concept is made</h2>
          <ol className="space-y-8 lg:col-span-6 lg:col-start-7">
            {[
              ["Research", "We confirm the business exists, where it operates and what it offers, using public sources. Anything we cannot verify is left out."],
              ["Structure", "We decide what the website needs to do — bookings, a menu, a property list, an enquiry — and build the page around that."],
              ["Art direction", "Each category has its own visual system; each business gets its own palette, type pairing and layout within it."],
              ["Build", "Concepts run on the same responsive, data-driven system we use for client work, so a concept can become a real site quickly."],
            ].map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line pt-6">
                <span className="text-xs text-mute-2">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-16 flex flex-wrap gap-4">
          <Link href="/explore" className="btn-ink">
            Explore concepts
          </Link>
          <Link href="/contact" className="btn-outline">
            Talk to Kinetix Africa
          </Link>
        </div>
      </section>
    </PlatformShell>
  );
}
