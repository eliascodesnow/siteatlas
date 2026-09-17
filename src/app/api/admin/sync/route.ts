import { NextResponse } from "next/server";
import { syncSeed } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const token = process.env.ADMIN_SYNC_TOKEN;
  const provided = request.headers.get("x-sync-token");
  if (!token || provided !== token) return NextResponse.json({ ok: false }, { status: 401 });
  const count = await syncSeed();
  return NextResponse.json({ ok: true, synced: count });
}
