/**
 * Server-side listings data access.
 * Reads/writes the `listings` table. Falls back to static catalog when the
 * table is empty or the DB is unavailable.
 */
import { getSql } from "./db";
import {
  LISTINGS as STATIC_LISTINGS,
  COLLECTIONS as STATIC_COLLECTIONS,
  type Listing,
  type CollectionSlug,
  type OfferType,
  type CollectionMeta,
} from "./catalog";

type ListingRow = {
  id: string;
  collection: string;
  title: string;
  subtitle: string;
  location: string | null;
  offer: string;
  price: string;
  price_note: string | null;
  image: string;
  specs: { label: string; value: string }[] | string;
  description: string;
  featured: boolean;
  sort_order: number;
};

function rowToListing(row: ListingRow): Listing {
  const specs =
    typeof row.specs === "string" ? JSON.parse(row.specs) : row.specs ?? [];
  return {
    id: row.id,
    collection: row.collection as CollectionSlug,
    title: row.title,
    subtitle: row.subtitle ?? "",
    location: row.location ?? undefined,
    offer: row.offer as OfferType,
    price: row.price,
    priceNote: row.price_note ?? undefined,
    image: row.image,
    specs,
    description: row.description ?? "",
    featured: Boolean(row.featured),
  };
}

/** Load all listings from DB. Returns null if table empty / error → use static. */
export async function loadListingsFromDb(): Promise<Listing[] | null> {
  try {
    const sql = await getSql();
    const rows = await sql<ListingRow>`
      SELECT id, collection, title, subtitle, location, offer, price,
             price_note, image, specs, description, featured, sort_order
      FROM listings
      ORDER BY sort_order ASC, title ASC
    `;
    if (!rows || rows.length === 0) return null;
    return rows.map(rowToListing);
  } catch {
    return null;
  }
}

export async function getAllListings(): Promise<Listing[]> {
  const fromDb = await loadListingsFromDb();
  return fromDb ?? STATIC_LISTINGS;
}

export async function getListingById(id: string): Promise<Listing | undefined> {
  try {
    const sql = await getSql();
    const rows = await sql<ListingRow>`
      SELECT id, collection, title, subtitle, location, offer, price,
             price_note, image, specs, description, featured, sort_order
      FROM listings WHERE id = ${id} LIMIT 1
    `;
    if (rows?.[0]) return rowToListing(rows[0]);
  } catch {
    /* fall through */
  }
  return STATIC_LISTINGS.find((l) => l.id === id);
}

export async function getListingsForCollection(
  slug: CollectionSlug,
  offer?: OfferType | "all",
): Promise<Listing[]> {
  const all = await getAllListings();
  return all.filter((item) => {
    if (item.collection !== slug) return false;
    if (!offer || offer === "all") return true;
    return item.offer === offer;
  });
}

export async function upsertListing(listing: Listing): Promise<void> {
  const sql = await getSql();
  const specsJson = JSON.stringify(listing.specs ?? []);
  await sql`
    INSERT INTO listings (
      id, collection, title, subtitle, location, offer, price,
      price_note, image, specs, description, featured, updated_at
    ) VALUES (
      ${listing.id},
      ${listing.collection},
      ${listing.title},
      ${listing.subtitle ?? ""},
      ${listing.location ?? null},
      ${listing.offer},
      ${listing.price},
      ${listing.priceNote ?? null},
      ${listing.image},
      ${specsJson}::jsonb,
      ${listing.description ?? ""},
      ${listing.featured ?? false},
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      collection  = EXCLUDED.collection,
      title       = EXCLUDED.title,
      subtitle    = EXCLUDED.subtitle,
      location    = EXCLUDED.location,
      offer       = EXCLUDED.offer,
      price       = EXCLUDED.price,
      price_note  = EXCLUDED.price_note,
      image       = EXCLUDED.image,
      specs       = EXCLUDED.specs,
      description = EXCLUDED.description,
      featured    = EXCLUDED.featured,
      updated_at  = NOW()
  `;
}

export async function deleteListing(id: string): Promise<void> {
  const sql = await getSql();
  await sql`DELETE FROM listings WHERE id = ${id}`;
}

/** Seed the listings table from the static catalog if it is empty. */
export async function seedListingsIfEmpty(): Promise<{ seeded: boolean; count: number }> {
  try {
    const sql = await getSql();
    const existing = await sql<{ count: number }>`SELECT COUNT(*)::int AS count FROM listings`;
    const count = existing?.[0]?.count ?? 0;
    if (count > 0) return { seeded: false, count };

    for (let i = 0; i < STATIC_LISTINGS.length; i++) {
      const l = STATIC_LISTINGS[i];
      await sql`
        INSERT INTO listings (
          id, collection, title, subtitle, location, offer, price,
          price_note, image, specs, description, featured, sort_order
        ) VALUES (
          ${l.id},
          ${l.collection},
          ${l.title},
          ${l.subtitle ?? ""},
          ${l.location ?? null},
          ${l.offer},
          ${l.price},
          ${l.priceNote ?? null},
          ${l.image},
          ${JSON.stringify(l.specs ?? [])}::jsonb,
          ${l.description ?? ""},
          ${l.featured ?? false},
          ${i}
        )
        ON CONFLICT (id) DO NOTHING
      `;
    }
    return { seeded: true, count: STATIC_LISTINGS.length };
  } catch (err) {
    console.error("[seedListingsIfEmpty]", err);
    return { seeded: false, count: 0 };
  }
}

export { STATIC_COLLECTIONS };
