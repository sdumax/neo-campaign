import { Pool } from "pg";
import { fetchYouTubeChannelData } from "./youtube";

const globalForPg = globalThis as unknown as {
  pgPool: Pool | undefined;
};

function getPool(): Pool {
  if (!globalForPg.pgPool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required to connect to database");
    }
    globalForPg.pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return globalForPg.pgPool;
}

const pool = new Proxy({} as Pool, {
  get(_target, prop: keyof Pool) {
    const p = getPool();
    const value = p[prop];
    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(p);
    }
    return value;
  },
});

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

/* ==========================================================================
   Partner Creators & Brand Collaborations
   ========================================================================== */

export type DBCollaborationBrand = {
  id: number;
  name: string;
  logo: string | null;
  createdAt: Date;
};

export type DBPartnerCreator = {
  id: number;
  name: string;
  email: string | null;
  handle: string;
  avatar: string;
  bannerText: string | null;
  bannerBg: string | null;
  bannerImage: string | null;
  subscribers: string;
  videosCount: string;
  bio: string;
  channelUrl: string;
  isActive: boolean;
  sortOrder: number;
  lastSyncedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  collaborations: Array<{ id: number; name: string; logo?: string }>;
  recentVideos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    views: string;
    publishedAt: string;
    url: string;
  }>;
};

export async function getCollaborationBrands(): Promise<DBCollaborationBrand[]> {
  try {
    const result = await pool.query<{
      id: number;
      name: string;
      logo: string | null;
      created_at: Date;
    }>(
      `SELECT id, name, logo, created_at FROM collaboration_brands ORDER BY name ASC`
    );

    return result.rows.map((r) => ({
      id: r.id,
      name: r.name,
      logo: r.logo,
      createdAt: r.created_at,
    }));
  } catch (error) {
    console.error("Error fetching collaboration brands:", error);
    return [];
  }
}

export async function createCollaborationBrand(data: {
  name: string;
  logo?: string;
}): Promise<DBCollaborationBrand | null> {
  try {
    const result = await pool.query<{
      id: number;
      name: string;
      logo: string | null;
      created_at: Date;
    }>(
      `INSERT INTO collaboration_brands (name, logo)
       VALUES ($1, $2)
       ON CONFLICT (name) DO UPDATE SET logo = COALESCE(EXCLUDED.logo, collaboration_brands.logo)
       RETURNING id, name, logo, created_at`,
      [data.name.trim(), data.logo || null]
    );

    const r = result.rows[0];
    return {
      id: r.id,
      name: r.name,
      logo: r.logo,
      createdAt: r.created_at,
    };
  } catch (error) {
    console.error("Error creating collaboration brand:", error);
    return null;
  }
}

export async function createCollaborationBrandsBulk(
  items: Array<{ name: string; logo?: string }>
): Promise<DBCollaborationBrand[]> {
  if (!items || items.length === 0) return [];
  const results: DBCollaborationBrand[] = [];

  for (const item of items) {
    if (!item.name || !item.name.trim()) continue;
    const result = await pool.query<{
      id: number;
      name: string;
      logo: string | null;
      created_at: Date;
    }>(
      `INSERT INTO collaboration_brands (name, logo)
       VALUES ($1, $2)
       ON CONFLICT (name) DO UPDATE SET logo = COALESCE(EXCLUDED.logo, collaboration_brands.logo)
       RETURNING id, name, logo, created_at`,
      [item.name.trim(), item.logo || null]
    );

    if (result.rows.length > 0) {
      const r = result.rows[0];
      results.push({
        id: r.id,
        name: r.name,
        logo: r.logo,
        createdAt: r.created_at,
      });
    }
  }

  return results;
}

let partnersSchemaEnsured = false;
async function ensurePartnersSchema() {
  if (partnersSchemaEnsured) return;
  try {
    await pool.query(`
      ALTER TABLE partner_creators ADD COLUMN IF NOT EXISTS email TEXT;
      ALTER TABLE partner_creators ALTER COLUMN email DROP NOT NULL;
      ALTER TABLE partner_creators ALTER COLUMN email DROP DEFAULT;
      ALTER TABLE partner_creators ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
    `);
    partnersSchemaEnsured = true;
  } catch {
    // Ignore schema check errors during build
  }
}

export async function getAllAdminCreators(): Promise<DBPartnerCreator[]> {
  try {
    await ensurePartnersSchema();
    const creatorsResult = await pool.query<{
      id: number;
      name: string;
      email: string | null;
      handle: string;
      avatar: string;
      banner_text: string | null;
      banner_bg: string | null;
      banner_image: string | null;
      subscribers: string;
      videos_count: string;
      bio: string;
      channel_url: string;
      is_active: boolean;
      sort_order: number;
      last_synced_at: Date | null;
      created_at: Date;
      updated_at: Date;
    }>(
      `SELECT id, name, email, handle, avatar, banner_text, banner_bg, banner_image,
              subscribers, videos_count, bio, channel_url, is_active, sort_order,
              last_synced_at, created_at, updated_at
       FROM partner_creators
       ORDER BY sort_order ASC, created_at DESC`
    );

    const creators: DBPartnerCreator[] = [];

    for (const c of creatorsResult.rows) {
      const brandsResult = await pool.query<{
        id: number;
        name: string;
        logo: string | null;
      }>(
        `SELECT b.id, b.name, b.logo
         FROM collaboration_brands b
         JOIN creator_brand_collaborations cbc ON b.id = cbc.brand_id
         WHERE cbc.creator_id = $1
         ORDER BY b.name ASC`,
        [c.id]
      );

      const videosResult = await pool.query<{
        id: number;
        title: string;
        thumbnail: string;
        views: string;
        published_at: string;
        url: string;
      }>(
        `SELECT id, title, thumbnail, views, published_at, url
         FROM creator_recent_videos
         WHERE creator_id = $1
         ORDER BY id ASC`,
        [c.id]
      );

      creators.push({
        id: c.id,
        name: c.name,
        email: c.email || null,
        handle: c.handle,
        avatar: c.avatar,
        bannerText: c.banner_text,
        bannerBg: c.banner_bg,
        bannerImage: c.banner_image,
        subscribers: c.subscribers,
        videosCount: c.videos_count,
        bio: c.bio,
        channelUrl: c.channel_url,
        isActive: c.is_active,
        sortOrder: c.sort_order,
        lastSyncedAt: c.last_synced_at,
        createdAt: c.created_at,
        updatedAt: c.updated_at,
        collaborations: brandsResult.rows.map((b) => ({
          id: b.id,
          name: b.name,
          logo: b.logo || undefined,
        })),
        recentVideos: videosResult.rows.map((v) => ({
          id: String(v.id),
          title: v.title,
          thumbnail: v.thumbnail,
          views: v.views,
          publishedAt: v.published_at,
          url: v.url,
        })),
      });
    }

    return creators;
  } catch (error) {
    console.error("Error in getAllAdminCreators:", error);
    return [];
  }
}

export async function getPublicPartnerCreators() {
  try {
    const creators = await getAllAdminCreators();
    const active = creators.filter((c) => c.isActive);
    if (active.length > 0) {
      // Configurable Stale-While-Revalidate check (default 3 days for at least twice a week)
      const syncIntervalDays = Number(process.env.YOUTUBE_SYNC_INTERVAL_DAYS) || 3;
      const SYNC_INTERVAL_MS = syncIntervalDays * 24 * 60 * 60 * 1000;
      const now = Date.now();
      const hasOutdatedCreator = active.some((c) => {
        if (!c.lastSyncedAt) return true;
        return now - new Date(c.lastSyncedAt).getTime() > SYNC_INTERVAL_MS;
      });

      if (hasOutdatedCreator) {
        // Trigger asynchronous background refresh without blocking user response
        syncAllPartnerCreatorsFromYouTube().catch((err) =>
          console.error("Background SWR YouTube sync error:", err)
        );
      }

      return active.map((c) => ({
        id: String(c.id),
        name: c.name,
        email: c.email || undefined,
        handle: c.handle,
        avatar: c.avatar,
        bannerText: c.bannerText || undefined,
        bannerBg: c.bannerBg || undefined,
        bannerImage: c.bannerImage || undefined,
        subscribers: c.subscribers,
        videosCount: c.videosCount,
        bio: c.bio,
        channelUrl: c.channelUrl,
        collaborations: c.collaborations.map((col) => ({
          name: col.name,
          logo: col.logo,
        })),
        recentVideos: c.recentVideos,
      }));
    }
    return null;
  } catch (error) {
    console.error("Error in getPublicPartnerCreators:", error);
    return null;
  }
}

export async function createPartnerCreator(data: {
  name: string;
  email?: string | null;
  handle: string;
  avatar: string;
  bannerText?: string;
  bannerBg?: string;
  bannerImage?: string;
  subscribers?: string;
  videosCount?: string;
  bio: string;
  channelUrl: string;
  isActive?: boolean;
  sortOrder?: number;
  brandIds?: number[];
  recentVideos?: Array<{
    title: string;
    thumbnail: string;
    views: string;
    publishedAt: string;
    url: string;
  }>;
}): Promise<number | null> {
  await ensurePartnersSchema();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const creatorResult = await client.query<{ id: number }>(
      `INSERT INTO partner_creators
        (name, email, handle, avatar, banner_text, banner_bg, banner_image,
         subscribers, videos_count, bio, channel_url, is_active, sort_order, last_synced_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP)
       RETURNING id`,
      [
        data.name,
        data.email ? data.email.trim() : null,
        data.handle,
        data.avatar,
        data.bannerText || null,
        data.bannerBg || null,
        data.bannerImage || null,
        data.subscribers || "0",
        data.videosCount || "0",
        data.bio,
        data.channelUrl,
        data.isActive !== undefined ? data.isActive : true,
        data.sortOrder || 0,
      ]
    );

    const creatorId = creatorResult.rows[0].id;

    if (data.brandIds && data.brandIds.length > 0) {
      for (const brandId of data.brandIds) {
        await client.query(
          `INSERT INTO creator_brand_collaborations (creator_id, brand_id)
           VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [creatorId, brandId]
        );
      }
    }

    if (data.recentVideos && data.recentVideos.length > 0) {
      for (const video of data.recentVideos) {
        await client.query(
          `INSERT INTO creator_recent_videos
            (creator_id, title, thumbnail, views, published_at, url)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            creatorId,
            video.title,
            video.thumbnail,
            video.views,
            video.publishedAt,
            video.url,
          ]
        );
      }
    }

    await client.query("COMMIT");
    return creatorId;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating partner creator:", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function updatePartnerCreator(
  id: number,
  data: {
    name?: string;
    email?: string;
    handle?: string;
    avatar?: string;
    bannerText?: string;
    bannerBg?: string;
    bannerImage?: string;
    subscribers?: string;
    videosCount?: string;
    bio?: string;
    channelUrl?: string;
    isActive?: boolean;
    sortOrder?: number;
    brandIds?: number[];
    recentVideos?: Array<{
      title: string;
      thumbnail: string;
      views: string;
      publishedAt: string;
      url: string;
    }>;
  }
) {
  await ensurePartnersSchema();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `UPDATE partner_creators
       SET name = COALESCE($1, name),
           email = CASE WHEN $2::boolean THEN $3 ELSE email END,
           handle = COALESCE($4, handle),
           avatar = COALESCE($5, avatar),
           banner_text = COALESCE($6, banner_text),
           banner_bg = COALESCE($7, banner_bg),
           banner_image = COALESCE($8, banner_image),
           subscribers = COALESCE($9, subscribers),
           videos_count = COALESCE($10, videos_count),
           bio = COALESCE($11, bio),
           channel_url = COALESCE($12, channel_url),
           is_active = COALESCE($13, is_active),
           sort_order = COALESCE($14, sort_order),
           last_synced_at = CURRENT_TIMESTAMP,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $15`,
      [
        data.name ?? null,
        data.email !== undefined,
        data.email ? data.email.trim() : null,
        data.handle ?? null,
        data.avatar ?? null,
        data.bannerText ?? null,
        data.bannerBg ?? null,
        data.bannerImage ?? null,
        data.subscribers ?? null,
        data.videosCount ?? null,
        data.bio ?? null,
        data.channelUrl ?? null,
        data.isActive !== undefined ? data.isActive : null,
        data.sortOrder !== undefined ? data.sortOrder : null,
        id,
      ]
    );

    if (data.brandIds !== undefined) {
      await client.query(
        `DELETE FROM creator_brand_collaborations WHERE creator_id = $1`,
        [id]
      );
      for (const brandId of data.brandIds) {
        await client.query(
          `INSERT INTO creator_brand_collaborations (creator_id, brand_id)
           VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [id, brandId]
        );
      }
    }

    if (data.recentVideos !== undefined) {
      await client.query(
        `DELETE FROM creator_recent_videos WHERE creator_id = $1`,
        [id]
      );
      for (const video of data.recentVideos) {
        await client.query(
          `INSERT INTO creator_recent_videos
            (creator_id, title, thumbnail, views, published_at, url)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            id,
            video.title,
            video.thumbnail,
            video.views,
            video.publishedAt,
            video.url,
          ]
        );
      }
    }

    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating partner creator:", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function syncPartnerCreatorFromYouTube(id: number): Promise<boolean> {
  const client = await pool.connect();
  try {
    const creatorRes = await client.query<{
      id: number;
      handle: string;
      channel_url: string;
    }>(
      `SELECT id, handle, channel_url FROM partner_creators WHERE id = $1`,
      [id]
    );

    if (creatorRes.rows.length === 0) return false;
    const c = creatorRes.rows[0];
    const target = c.handle || c.channel_url;
    if (!target) return false;

    const ytData = await fetchYouTubeChannelData(target);
    if (!ytData) return false;

    await client.query("BEGIN");

    await client.query(
      `UPDATE partner_creators
       SET subscribers = $1,
           videos_count = $2,
           avatar = COALESCE($3, avatar),
           banner_image = COALESCE($4, banner_image),
           channel_url = COALESCE($5, channel_url),
           last_synced_at = CURRENT_TIMESTAMP,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6`,
      [
        ytData.subscribers,
        ytData.videosCount,
        ytData.avatar || null,
        ytData.bannerImage || null,
        ytData.customUrl || null,
        id,
      ]
    );

    if (ytData.recentVideos && ytData.recentVideos.length > 0) {
      await client.query(
        `DELETE FROM creator_recent_videos WHERE creator_id = $1`,
        [id]
      );
      for (const video of ytData.recentVideos) {
        await client.query(
          `INSERT INTO creator_recent_videos
            (creator_id, title, thumbnail, views, published_at, url)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            id,
            video.title,
            video.thumbnail,
            video.views,
            video.publishedAt,
            video.url,
          ]
        );
      }
    }

    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error syncing creator ${id} from YouTube:`, error);
    return false;
  } finally {
    client.release();
  }
}

export async function syncAllPartnerCreatorsFromYouTube(): Promise<{
  synced: number;
  total: number;
  errors: string[];
}> {
  try {
    const res = await pool.query<{ id: number; name: string }>(
      `SELECT id, name FROM partner_creators WHERE is_active = true ORDER BY sort_order ASC`
    );

    let synced = 0;
    const errors: string[] = [];

    for (const row of res.rows) {
      const success = await syncPartnerCreatorFromYouTube(row.id);
      if (success) {
        synced++;
      } else {
        errors.push(`Failed to sync ${row.name}`);
      }
    }

    return { synced, total: res.rows.length, errors };
  } catch (error) {
    console.error("Error syncing all creators from YouTube:", error);
    return { synced: 0, total: 0, errors: ["Database query failed"] };
  }
}

export async function deletePartnerCreator(id: number) {
  try {
    await pool.query(`DELETE FROM partner_creators WHERE id = $1`, [id]);
    return true;
  } catch (error) {
    console.error("Error deleting partner creator:", error);
    throw error;
  }
}


