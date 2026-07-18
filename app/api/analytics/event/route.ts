import { NextResponse } from "next/server";
import { insertPageEvent } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, page, meta } = body;

    if (!event || !page) {
      return NextResponse.json({ error: "Missing event or page" }, { status: 400 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      null;

    await insertPageEvent({
      event,
      page,
      meta: meta ?? undefined,
      ip: ip ?? undefined,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
