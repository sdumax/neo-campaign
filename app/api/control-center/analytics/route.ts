import { NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(await getAnalyticsSummary());
  } catch (e) {
    console.error("Analytics query failed:", e);
    return NextResponse.json({
      total: { pageviews: 0, clicks: 0 },
      last7Days: { pageviews: 0, clicks: 0 },
      last30Days: { pageviews: 0 },
      byPage: [],
      byAction: [],
      recent: [],
    });
  }
}
