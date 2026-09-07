CREATE TABLE IF NOT EXISTS collaboration_brands (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    logo TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS partner_creators (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    handle TEXT NOT NULL,
    avatar TEXT NOT NULL,
    banner_text TEXT,
    banner_bg TEXT,
    banner_image TEXT,
    subscribers TEXT NOT NULL DEFAULT '0',
    videos_count TEXT NOT NULL DEFAULT '0',
    bio TEXT NOT NULL,
    channel_url TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS creator_brand_collaborations (
    creator_id INT NOT NULL REFERENCES partner_creators(id) ON DELETE CASCADE,
    brand_id INT NOT NULL REFERENCES collaboration_brands(id) ON DELETE CASCADE,
    PRIMARY KEY (creator_id, brand_id)
);

CREATE TABLE IF NOT EXISTS creator_recent_videos (
    id SERIAL PRIMARY KEY,
    creator_id INT NOT NULL REFERENCES partner_creators(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    views TEXT NOT NULL,
    published_at TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS partner_creators_active_sort_idx ON partner_creators (is_active, sort_order);
