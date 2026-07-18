import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalPageviews,
      totalClicks,
      pageviewsLast7Days,
      pageviewsLast30Days,
      clicksLast7Days,
      clicksByPage,
      clicksByMeta,
      recentEvents,
    ] = await Promise.all([
      db.pageEvent.count({ where: { event: "pageview" } }),
      db.pageEvent.count({ where: { event: "click" } }),
      db.pageEvent.count({
        where: { event: "pageview", createdAt: { gte: sevenDaysAgo } },
      }),
      db.pageEvent.count({
        where: { event: "pageview", createdAt: { gte: thirtyDaysAgo } },
      }),
      db.pageEvent.count({
        where: { event: "click", createdAt: { gte: sevenDaysAgo } },
      }),
      db.pageEvent.groupBy({
        by: ["page"],
        where: { event: "pageview" },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),
      db.pageEvent.groupBy({
        by: ["meta"],
        where: { event: "click", meta: { not: null } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 10,
      }),
      db.pageEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
    ]);

    return NextResponse.json({
      total: { pageviews: totalPageviews, clicks: totalClicks },
      last7Days: { pageviews: pageviewsLast7Days, clicks: clicksLast7Days },
      last30Days: { pageviews: pageviewsLast30Days },
      byPage: clicksByPage.map((r) => ({
        page: r.page,
        count: r._count.id,
      })),
      byAction: clicksByMeta.map((r) => ({
        action: r.meta ?? "unknown",
        count: r._count.id,
      })),
      recent: recentEvents.map((e) => ({
        ...e,
        createdAt: e.createdAt.toISOString(),
      })),
    });
  } catch (e) {
    console.error("Analytics query failed:", e);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
