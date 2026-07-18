import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export type Brand = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  website: string;
  budget: string;
  message: string | null;
  status: string;
  createdAt: Date;
};

export type Creator = {
  id: number;
  name: string;
  email: string;
  socialMedia: string;
  message: string | null;
  status: string;
  createdAt: Date;
};

export async function insertBrand(data: {
  name: string;
  email: string;
  company?: string;
  website: string;
  budget: string;
  message?: string;
}): Promise<Brand> {
  return db.brand.create({ data }) as Promise<Brand>;
}

export async function insertCreator(data: {
  name: string;
  email: string;
  socialMedia: string;
  message?: string;
}): Promise<Creator> {
  return db.creator.create({ data }) as Promise<Creator>;
}

export async function getBrands(
  limit: number = 20,
  offset: number = 0
): Promise<Brand[]> {
  return db.brand.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
  }) as Promise<Brand[]>;
}

export async function getCreators(
  limit: number = 20,
  offset: number = 0
): Promise<Creator[]> {
  return db.creator.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
  }) as Promise<Creator[]>;
}

export async function getBrandCount(): Promise<number> {
  return db.brand.count();
}

export async function getCreatorCount(): Promise<number> {
  return db.creator.count();
}

export async function getStats() {
  const [totalBrands, totalCreators, newBrands, newCreators, contactedBrands, contactedCreators, convertedBrands, convertedCreators, recentBrands, recentCreators] =
    await Promise.all([
      db.brand.count(),
      db.creator.count(),
      db.brand.count({ where: { status: "new" } }),
      db.creator.count({ where: { status: "new" } }),
      db.brand.count({ where: { status: "contacted" } }),
      db.creator.count({ where: { status: "contacted" } }),
      db.brand.count({ where: { status: "converted" } }),
      db.creator.count({ where: { status: "converted" } }),
      db.brand.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      db.creator.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return {
    total: { brands: totalBrands, creators: totalCreators },
    byStatus: {
      new: newBrands + newCreators,
      contacted: contactedBrands + contactedCreators,
      converted: convertedBrands + convertedCreators,
    },
    recent: [...recentBrands, ...recentCreators]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5),
  };
}

export async function insertPageEvent(data: {
  event: string;
  page: string;
  meta?: string;
  ip?: string;
}) {
  return db.pageEvent.create({ data });
}

export async function getAnalyticsSummary() {
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

  return {
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
  };
}
