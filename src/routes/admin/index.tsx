import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/lib/catalog";
import {
  getAllListings,
  seedListingsIfEmpty,
  upsertListing,
  deleteListing,
} from "@/lib/listings-db";
import { COLLECTION_SLUGS, OFFER_LABEL, type OfferType } from "@/lib/catalog";
import { uploadImage } from "@/lib/upload";

// Simple password gate for admin (set ADMIN_PASSWORD in env, default "ucadmin")
const ADMIN_PASSWORD =
  (typeof process !== "undefined" && process.env.ADMIN_PASSWORD) || "ucadmin";

const fetchListings = createServerFn({ method: "GET" }).handler(async () => {
  await seedListingsIfEmpty();
  return getAllListings();
});

const saveListing = createServerFn({ method: "POST" })
  .validator((data: Listing & { password?: string }) => data)
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    const { password: _, ...listing } = data;
    await upsertListing(listing);
    return { ok: true };
  });

const removeListing = createServerFn({ method: "POST" })
  .validator((data: { id: string; password?: string }) => data)
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    await deleteListing(data.id);
    return { ok: true };
  });

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
  loader: async () => {
    const listings = await fetchListings();
    return { listings };
  },
});

function emptyListing(): Listing {
  return {
    id: `new-${Date.now()}`,
    collection: "residences",
    title: "",
    subtitle: "",
    location: "",
    offer: "sale",
    price: "",
    priceNote: "",
    image: "/images/apt-banana.jpg",
    specs: [
      { label: "Beds", value: "" },
      { label: "Baths", value: "" },
    ],
    description: "",
    featured: false,
  };
}

function AdminPage() {
  const { listings: initial } = Route.useLoaderData();
  const [listings, setListings] = useState<Listing[]>(initial);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [editing, setEditing] = useState<Listing | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
const [uploading, setUploading] = useState(false);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      setStatus("");
    } else {
      setStatus("Wrong password");
    }
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setStatus("");
    try {
      await saveListing({ data: { ...editing, password } });
      const refreshed = await fetchListings();
      setListings(refreshed);
      setEditing(null);
      setStatus("Saved");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this listing?")) return;
    setSaving(true);
    try {
      await removeListing({ data: { id, password } });
      const refreshed = await fetchListings();
      setListings(refreshed);
      setEditing(null);
      setStatus("Deleted");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  if (!unlocked) {
    return (
      <SiteShell>
        <main className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center px-4">
          <h1 className="font-display text-3xl text-ivory">Admin</h1>
          <p className="mt-2 text-sm text-stone">
            Enter the admin password to edit listings.
          </p>
          <form onSubmit={unlock} className="mt-8 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-line bg-ink-2 px-4 py-3 text-ivory outline-none focus:border-ivory"
              autoFocus
            />
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </form>
          {status && <p className="mt-4 text-sm text-red-400">{status}</p>}
          <p className="mt-8 text-xs text-stone">
            Default password is <code className="text-champagne">ucadmin</code>.
            Set <code className="text-champagne">ADMIN_PASSWORD</code> in your
            environment to change it.
          </p>
        </main>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-ivory">Listings Admin</h1>
            <p className="mt-1 text-sm text-stone">
              Edit text, prices, images and descriptions. Changes go live
              immediately.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setEditing(emptyListing())}
            >
              + New listing
            </Button>
            <Button asChild variant="outline">
              <Link to="/">View site</Link>
            </Button>
          </div>
        </div>

        {status && (
          <p className="mt-4 text-sm text-champagne">{status}</p>
        )}

        {editing ? (
          <div className="mt-8 border border-line bg-ink-2 p-6">
            <h2 className="font-display text-xl text-ivory">
              {editing.id.startsWith("new-") ? "New listing" : "Edit listing"}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-xs tracking-wider text-stone uppercase">
                ID (url slug)
                <input
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 text-ivory"
                  value={editing.id}
                  onChange={(e) =>
                    setEditing({ ...editing, id: e.target.value })
                  }
                  disabled={!editing.id.startsWith("new-")}
                />
              </label>
              <label className="block text-xs tracking-wider text-stone uppercase">
                Collection
                <select
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 text-ivory"
                  value={editing.collection}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      collection: e.target.value as Listing["collection"],
                    })
                  }
                >
                  {COLLECTION_SLUGS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs tracking-wider text-stone uppercase sm:col-span-2">
                Title
                <input
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 text-ivory"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                />
              </label>
              <label className="block text-xs tracking-wider text-stone uppercase">
                Subtitle
                <input
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 text-ivory"
                  value={editing.subtitle}
                  onChange={(e) =>
                    setEditing({ ...editing, subtitle: e.target.value })
                  }
                />
              </label>
              <label className="block text-xs tracking-wider text-stone uppercase">
                Location
                <input
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 text-ivory"
                  value={editing.location ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, location: e.target.value })
                  }
                />
              </label>
              <label className="block text-xs tracking-wider text-stone uppercase">
                Offer
                <select
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 text-ivory"
                  value={editing.offer}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      offer: e.target.value as OfferType,
                    })
                  }
                >
                  {Object.entries(OFFER_LABEL).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs tracking-wider text-stone uppercase">
                Price
                <input
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 text-ivory"
                  value={editing.price}
                  onChange={(e) =>
                    setEditing({ ...editing, price: e.target.value })
                  }
                />
              </label>
              <label className="block text-xs tracking-wider text-stone uppercase sm:col-span-2">
                Price note
                <input
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 text-ivory"
                  value={editing.priceNote ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, priceNote: e.target.value })
                  }
                />
              </label>
              <label className="block text-xs tracking-wider text-stone uppercase sm:col-span-2">
                Image
                <div className="mt-1 flex items-center gap-3">
                  {editing.image && (
                    <img
                      src={editing.image}
                      alt=""
                      className="h-16 w-16 border border-line object-cover"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    className="w-full border border-line bg-ink px-3 py-2 text-ivory"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploading(true);
                      try {
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("password", password);
                        const result = await uploadImage({ data: formData });
                        setEditing((prev) =>
                          prev ? { ...prev, image: result.url } : prev,
                        );
                      } catch (err) {
                        setStatus(
                          err instanceof Error ? err.message : "Upload failed",
                        );
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                  {uploading && (
                    <span className="text-xs text-stone">Uploading…</span>
                  )}
                </div>
              </label>
              <label className="block text-xs tracking-wider text-stone uppercase sm:col-span-2">
                Description
                <textarea
                  rows={4}
                  className="mt-1 w-full border border-line bg-ink px-3 py-2 text-ivory"
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                />
              </label>
              <label className="flex items-center gap-2 text-sm text-ivory">
                <input
                  type="checkbox"
                  checked={!!editing.featured}
                  onChange={(e) =>
                    setEditing({ ...editing, featured: e.target.checked })
                  }
                />
                Featured
              </label>
            </div>

            <div className="mt-6">
              <p className="text-xs tracking-wider text-stone uppercase">
                Specs
              </p>
              {(editing.specs ?? []).map((spec, i) => (
                <div key={i} className="mt-2 flex gap-2">
                  <input
                    placeholder="Label"
                    className="w-1/3 border border-line bg-ink px-3 py-2 text-ivory"
                    value={spec.label}
                    onChange={(e) => {
                      const specs = [...(editing.specs ?? [])];
                      specs[i] = { ...specs[i], label: e.target.value };
                      setEditing({ ...editing, specs });
                    }}
                  />
                  <input
                    placeholder="Value"
                    className="flex-1 border border-line bg-ink px-3 py-2 text-ivory"
                    value={spec.value}
                    onChange={(e) => {
                      const specs = [...(editing.specs ?? [])];
                      specs[i] = { ...specs[i], value: e.target.value };
                      setEditing({ ...editing, specs });
                    }}
                  />
                  <button
                    type="button"
                    className="border border-line px-3 text-stone hover:text-ivory"
                    onClick={() => {
                      const specs = (editing.specs ?? []).filter(
                        (_, j) => j !== i,
                      );
                      setEditing({ ...editing, specs });
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 text-xs text-champagne hover:underline"
                onClick={() =>
                  setEditing({
                    ...editing,
                    specs: [...(editing.specs ?? []), { label: "", value: "" }],
                  })
                }
              >
                + Add spec
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditing(null)}
                disabled={saving}
              >
                Cancel
              </Button>
              {!editing.id.startsWith("new-") && (
                <Button
                  variant="outline"
                  className="text-red-400"
                  onClick={() => handleDelete(editing.id)}
                  disabled={saving}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs tracking-wider text-stone uppercase">
                  <th className="py-3 pr-4">Title</th>
                  <th className="py-3 pr-4">Collection</th>
                  <th className="py-3 pr-4">Offer</th>
                  <th className="py-3 pr-4">Price</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l.id} className="border-b border-line/50">
                    <td className="py-3 pr-4 text-ivory">{l.title}</td>
                    <td className="py-3 pr-4 text-stone">{l.collection}</td>
                    <td className="py-3 pr-4 text-stone">
                      {OFFER_LABEL[l.offer]}
                    </td>
                    <td className="py-3 pr-4 text-champagne">{l.price}</td>
                    <td className="py-3">
                      <button
                        type="button"
                        className="text-xs text-champagne hover:underline"
                        onClick={() => setEditing({ ...l })}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </SiteShell>
  );
  }
