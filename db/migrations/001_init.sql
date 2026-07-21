CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    website TEXT NOT NULL,
    budget TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS creators (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    social_media TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_events (
    id SERIAL PRIMARY KEY,
    event TEXT NOT NULL,
    page TEXT NOT NULL,
    meta TEXT,
    ip TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS page_events_event_created_at_idx ON page_events (event, created_at);
CREATE INDEX IF NOT EXISTS page_events_page_idx ON page_events (page);
CREATE INDEX IF NOT EXISTS page_events_meta_idx ON page_events (meta);
