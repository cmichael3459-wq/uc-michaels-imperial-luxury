import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ListingCard } from "@/components/listing-card";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import {
  getCollection,
  listingsFor,
  OFFER_LABEL,
  type OfferType,
} from "@/lib/catalog";
import { defaultEnquiry, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/collection/$slug")({
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const collection = getCollection(slug);
  if (!collection) {
    throw notFound();
  }

  const [offer, setOffer] = useState<OfferType | "all">("all");
  const items = useMemo(
    () => listingsFor(collection.slug, offer),
    [collection.slug, offer],
  );

  const filters: Array<OfferType | "all"> = ["all", ...collection.offers];

  return (
    <SiteShell>
      <main>
        <section className="relative min-h-[52dvh] overflow-hidden">
          <img
            src={collection.image}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
          <div className="relative mx-auto flex min-h-[52dvh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6">
            <p className="text-[11px] font-medium tracking-[0.22em] text-champagne uppercase">
              {collection.kicker}
            </p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-ivory sm:text-6xl">
              {collection.label}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ivory-dim">
              {collection.lede}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {collection.offers.length > 1 ? (
            <div
              className="mb-8 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter by offer"
            >
              {filters.map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={offer === key}
                  onClick={() => setOffer(key)}
                  className={cn(
                    "h-10 min-w-11 border px-4 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors duration-150",
                    offer === key
                      ? "border-ivory bg-ivory text-ink"
                      : "border-line text-ivory-dim hover:border-line-strong hover:text-ivory",
                  )}
                >
                  {key === "all" ? "All" : OFFER_LABEL[key]}
                </button>
              ))}
            </div>
          ) : null}

          {items.length === 0 ? (
            <div className="border border-line bg-ink-2 px-6 py-16 text-center">
              <p className="font-display text-2xl text-ivory">
                Nothing in this filter.
              </p>
              <p className="mt-2 text-sm text-stone">
                Ask the desk — stock moves off TikTok before it is listed here.
              </p>
              <Button asChild className="mt-6">
                <a
                  href={whatsappHref(defaultEnquiry(collection.label))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire on WhatsApp
                </a>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          )}

          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-stone">
              Looking for a piece that is not listed? The desk sources to order.
            </p>
            <Button asChild variant="outline">
              <Link to="/enquire">Write an enquiry</Link>
            </Button>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
