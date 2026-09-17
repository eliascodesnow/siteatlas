import { NextResponse } from "next/server";
import { syncSeed } from "@/lib/seed";

/**
 * Re-syncs the seed catalogue into the database (upsert by slug).
 * Protected by ADMIN_SYNC_TOKEN when set; otherwise only available outside production.
 */
export async function POST(request: Request) {
  const token = process.env.ADMIN_SYNC_TOKEN;
  const provided = request.headers.get("x-sync-token");
  if (token ? provided !== token : process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const count = await syncSeed();
  return NextResponse.json({ ok: true, synced: count });
}
