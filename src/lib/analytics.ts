"use client";

/**
 * Analytics-ready event layer.
 * Events are pushed to `window.dataLayer` (for GA4/GTM if configured later)
 * and beaconed to /api/events for first-party logging. No personal data.
 */
export type AnalyticsEvent =
  | "concept_view"
  | "category_view"
  | "location_view"
  | "search"
  | "filter_apply"
  | "whatsapp_cta_click"
  | "business_cta_click"
  | "outbound_click"
  | "related_concept_click";

type Props = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(name: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  const clean: Record<string, string | number | boolean | null> = {};
  for (const [k, v] of Object.entries(props)) if (v !== undefined) clean[k] = v;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...clean });

  const body = JSON.stringify({ name, properties: clean, path: window.location.pathname });
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/events", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true });
    }
  } catch {
    /* analytics must never break the UI */
  }
}
