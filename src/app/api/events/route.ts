import { NextResponse } from "next/server";
import { db } from "@/db";
import { analyticsEvents } from "@/db/schema";

export const dynamic = "force-dynamic";

const ALLOWED = new Set(["concept_view", "category_view", "location_view", "search", "filter_apply", "whatsapp_cta_click", "business_cta_click", "outbound_click", "related_concept_click"]);
const MAX_BODY_BYTES = 8_192;

export async function POST(request: Request) {
  try {
    const length = Number(request.headers.get("content-length") ?? 0);
    if (length > MAX_BODY_BYTES) return NextResponse.json({ ok: false }, { status: 413 });
    const payload = (await request.json()) as { name?: string; properties?: Record<string, string | number | boolean | null>; path?: string };
    if (!payload.name || !ALLOWED.has(payload.name)) return NextResponse.json({ ok: false }, { status: 400 });
    const properties: Record<string, string | number | boolean | null> = {};
    for (const [k, v] of Object.entries(payload.properties ?? {}).slice(0, 12)) {
      if (typeof v === "string") properties[k.slice(0, 80)] = v.slice(0, 200);
      else if (typeof v === "number" && Number.isFinite(v) || typeof v === "boolean" || v === null) properties[k.slice(0, 80)] = v;
    }
    await db.insert(analyticsEvents).values({ name: payload.name, properties, path: typeof payload.path === "string" ? payload.path.slice(0, 300) : null });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
