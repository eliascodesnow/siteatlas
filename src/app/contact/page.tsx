import type { Metadata } from "next";
import Link from "next/link";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { TrackedLink } from "@/components/platform/TrackedLink";
import { KINETIX_WHATSAPP_DISPLAY, generalEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Talk to Kinetix Africa",
  description: "Get a website for your business. Kinetix Africa responds on WhatsApp.",
  alternates: { canonical: "/contact" },
};

const STARTERS = [
  { label: "I run a restaurant or café", msg: "Hi Kinetix Africa, I run a restaurant/café and I'd like to talk about a website with a menu and reservations." },
  { label: "I run a salon or barbershop", msg: "Hi Kinetix Africa, I run a salon/barbershop and I'd like a website with services and bookings." },
  { label: "I run a hotel, lodge or rental", msg: "Hi Kinetix Africa, I run a hotel/lodge and I'd like to discuss a website with rooms and booking enquiries." },
  { label: "I sell products", msg: "Hi Kinetix Africa, I sell products and I'd like to talk about an online shop." },
  { label: "I offer professional services", msg: "Hi Kinetix Africa, I offer professional services and I'd like a credible website with clear enquiry paths." },
  { label: "Something else", msg: generalEnquiryMessage() },
];

export default function ContactPage() {
  return (
    <PlatformShell>
      <section className="container-wide grid gap-12 pt-12 sm:pt-16 lg:grid-cols-12 lg:pt-24">
        <div className="lg:col-span-7">
          <p className="eyebrow text-mute">Contact</p>
          <h1 className="display-2 mt-4">Talk to Kinetix Africa.</h1>
          <p className="mt-6 max-w-lg text-mute sm:text-lg">
            The fastest way to reach us is WhatsApp. Tell us what your business does and, if you like, which SiteAtlas concept caught your eye.
          </p>
          <TrackedLink href={whatsappLink(generalEnquiryMessage())} external event="whatsapp_cta_click" props={{ placement: "contact_primary" }} className="btn-ink mt-10">
            Talk to Kinetix Africa on WhatsApp
          </TrackedLink>
          <p className="mt-3 text-xs text-mute">{KINETIX_WHATSAPP_DISPLAY}</p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="eyebrow text-mute">Start with a line</p>
          <ul className="mt-4 border-t border-line">
            {STARTERS.map((s) => (
              <li key={s.label} className="border-b border-line">
                <TrackedLink href={whatsappLink(s.msg)} external event="whatsapp_cta_click" props={{ placement: "contact_starter", starter: s.label }} className="group flex items-center justify-between py-4 text-sm">
                  <span>{s.label}</span>
                  <span className="text-mute transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="container-wide py-20 lg:py-28">
        <p className="text-sm text-mute">
          Not ready yet? <Link href="/explore" className="link-underline text-ink">Browse the concepts</Link> and come back when one feels like your business.
        </p>
      </section>
    </PlatformShell>
  );
}
