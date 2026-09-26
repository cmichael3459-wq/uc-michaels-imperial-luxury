-- Listings table for editable property / product cards
CREATE TABLE IF NOT EXISTS listings (
  id            TEXT PRIMARY KEY,
  collection    TEXT NOT NULL,
  title         TEXT NOT NULL,
  subtitle      TEXT NOT NULL DEFAULT '',
  location      TEXT,
  offer         TEXT NOT NULL,
  price         TEXT NOT NULL,
  price_note    TEXT,
  image         TEXT NOT NULL,
  specs         JSONB NOT NULL DEFAULT '[]',
  description   TEXT NOT NULL DEFAULT '',
  featured      BOOLEAN NOT NULL DEFAULT false,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS listings_collection_idx ON listings (collection);
CREATE INDEX IF NOT EXISTS listings_featured_idx ON listings (featured);

-- Collections metadata (optional, can stay in code)
CREATE TABLE IF NOT EXISTS collections (
  slug          TEXT PRIMARY KEY,
  label         TEXT NOT NULL,
  kicker        TEXT NOT NULL DEFAULT '',
  headline      TEXT NOT NULL DEFAULT '',
  lede          TEXT NOT NULL DEFAULT '',
  image         TEXT NOT NULL DEFAULT '',
  offers        JSONB NOT NULL DEFAULT '[]',
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
