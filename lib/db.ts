import { Pool } from "pg";

const globalForPg = globalThis as unknown as {
  pgPool: Pool | undefined;
};

function createPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  return new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

const pool = globalForPg.pgPool ?? createPool();

if (process.env.NODE_ENV !== "production") globalForPg.pgPool = pool;

type BrandRow = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  website: string;
  budget: string;
  message: string | null;
  status: string;
  created_at: Date;
};

type CreatorRow = {
  id: number;
  name: string;
  email: string;
  social_media: string;
  message: string | null;
  status: string;
  created_at: Date;
};

type PageEventRow = {
  id: number;
  event: string;
  page: string;
  meta: string | null;
  ip: string | null;
  created_at: Date;
};

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

function mapBrand(row: BrandRow): Brand {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    website: row.website,
    budget: row.budget,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

function mapCreator(row: CreatorRow): Creator {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    socialMedia: row.social_media,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function insertBrand(data: {
  name: string;
  email: string;
  company?: string;
  website: string;
  budget: string;
  message?: string;
}): Promise<Brand> {
  const result = await pool.query<BrandRow>(
    `INSERT INTO brands (name, email, company, website, budget, message)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, email, company, website, budget, message, status, created_at`,
    [
      data.name,
      data.email,
      data.company ?? null,
      data.website,
      data.budget,
      data.message ?? null,
    ]
  );

  return mapBrand(result.rows[0]);
}

export async function insertCreator(data: {
  name: string;
  email: string;
  socialMedia: string;
  message?: string;
}): Promise<Creator> {
  const result = await pool.query<CreatorRow>(
    `INSERT INTO creators (name, email, social_media, message)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, social_media, message, status, created_at`,
    [data.name, data.email, data.socialMedia, data.message ?? null]
  );

  return mapCreator(result.rows[0]);
}

export async function getBrands(
  limit: number = 20,
  offset: number = 0
): Promise<Brand[]> {
  const result = await pool.query<BrandRow>(
    `SELECT id, name, email, company, website, budget, message, status, created_at
     FROM brands
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return result.rows.map(mapBrand);
}

export async function getCreators(
  limit: number = 20,
  offset: number = 0
): Promise<Creator[]> {
  const result = await pool.query<CreatorRow>(
    `SELECT id, name, email, social_media, message, status, created_at
     FROM creators
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return result.rows.map(mapCreator);
}

export async function getBrandCount(): Promise<number> {
  const result = await pool.query<{ count: string }>("SELECT COUNT(*) FROM brands");
  return Number(result.rows[0].count);
}

export async function getCreatorCount(): Promise<number> {
  const result = await pool.query<{ count: string }>("SELECT COUNT(*) FROM creators");
  return Number(result.rows[0].count);
}

export async function getStats() {
  const [
    totalBrands,
    totalCreators,
    newBrands,
    newCreators,
    contactedBrands,
    contactedCreators,
    convertedBrands,
    convertedCreators,
    recentBrands,
    recentCreators,
  ] = await Promise.all([
    getBrandCount(),
    getCreatorCount(),
    countByStatus("brands", "new"),
    countByStatus("creators", "new"),
    countByStatus("brands", "contacted"),
    countByStatus("creators", "contacted"),
    countByStatus("brands", "converted"),
    countByStatus("creators", "converted"),
    getBrands(5),
    getCreators(5),
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

async function countByStatus(table: "brands" | "creators", status: string) {
  const result = await pool.query<{ count: string }>(
    `SELECT COUNT(*) FROM ${table} WHERE status = $1`,
    [status]
  );
  return Number(result.rows[0].count);
}

export async function insertPageEvent(data: {
  event: string;
  page: string;
  meta?: string;
  ip?: string;
}) {
  const result = await pool.query<PageEventRow>(
    `INSERT INTO page_events (event, page, meta, ip)
     VALUES ($1, $2, $3, $4)
     RETURNING id, event, page, meta, ip, created_at`,
    [data.event, data.page, data.meta ?? null, data.ip ?? null]
  );

  return result.rows[0];
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
    countEvents({ event: "pageview" }),
    countEvents({ event: "click" }),
    countEvents({ event: "pageview", since: sevenDaysAgo }),
    countEvents({ event: "pageview", since: thirtyDaysAgo }),
    countEvents({ event: "click", since: sevenDaysAgo }),
    pool.query<{ page: string; count: string }>(
      `SELECT page, COUNT(*) AS count
       FROM page_events
       WHERE event = 'pageview'
       GROUP BY page
       ORDER BY count DESC`
    ),
    pool.query<{ meta: string | null; count: string }>(
      `SELECT meta, COUNT(*) AS count
       FROM page_events
       WHERE event = 'click' AND meta IS NOT NULL
       GROUP BY meta
       ORDER BY count DESC
       LIMIT 10`
    ),
    pool.query<PageEventRow>(
      `SELECT id, event, page, meta, ip, created_at
       FROM page_events
       ORDER BY created_at DESC
       LIMIT 20`
    ),
  ]);

  return {
    total: { pageviews: totalPageviews, clicks: totalClicks },
    last7Days: { pageviews: pageviewsLast7Days, clicks: clicksLast7Days },
    last30Days: { pageviews: pageviewsLast30Days },
    byPage: clicksByPage.rows.map((r) => ({
      page: r.page,
      count: Number(r.count),
    })),
    byAction: clicksByMeta.rows.map((r) => ({
      action: r.meta ?? "unknown",
      count: Number(r.count),
    })),
    recent: recentEvents.rows.map((e) => ({
      id: e.id,
      event: e.event,
      page: e.page,
      meta: e.meta,
      ip: e.ip,
      createdAt: e.created_at.toISOString(),
    })),
  };
}

async function countEvents({ event, since }: { event: string; since?: Date }) {
  const result = await pool.query<{ count: string }>(
    `SELECT COUNT(*) FROM page_events
     WHERE event = $1 AND ($2::timestamp IS NULL OR created_at >= $2)`,
    [event, since ?? null]
  );

  return Number(result.rows[0].count);
}
