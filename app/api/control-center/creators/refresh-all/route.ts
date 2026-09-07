import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { syncAllPartnerCreatorsFromYouTube } from "@/lib/db";

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncAllPartnerCreatorsFromYouTube();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Error refreshing all partner creators:", error);
    return NextResponse.json(
      { error: "Failed to refresh creators" },
      { status: 500 }
    );
  }
}
