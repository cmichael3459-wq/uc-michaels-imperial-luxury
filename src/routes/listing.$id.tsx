import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { EnquireForm } from "@/components/enquire-form";
import { ListingCard } from "@/components/listing-card";
import { SiteShell } from "@/components/layout/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  COLLECTIONS,
  getListing,
  OFFER_LABEL,
  relatedListings,
} from "@/lib/catalog";
import { defaultEnquiry, SITE, whatsappHref } from "@/lib/site";

export const Route = createFileRoute("/listing/$id")({
  component: ListingPage,
});

function ListingPage() {
  const { id } = Route.useParams();
  const listing = getListing(id);
  if (!listing) {
    throw notFound();
  }

  const collection = COLLECTIONS.find((c) => c.slug === listing.collection);
  const related = relatedListings(listing);

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-[11px] tracking-[0.18em] text-stone uppercase">
          <Link to="/" className="hover:text-ivory">
            Home
          </Link>
          <span aria-hidden="true"> / </span>
          {collection ? (
            <Link
              to="/collection/$slug"
              params={{ slug: collection.slug }}
              className="hover:text-ivory"
            >
              {collection.label}
            </Link>
          ) : null}
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden bg-ink-2">
            <img
              src={listing.image}
              alt={listing.title}
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
          <div>
            <Badge variant="champagne">{OFFER_LABEL[listing.offer]}</Badge>
            <h1 className="mt-4 font-display text-4xl leading-tight text-ivory sm:text-5xl">
              {listing.title}
            </h1>
            <p className="mt-3 text-base text-ivory-dim">{listing.subtitle}</p>
            {listing.location ? (
              <p className="mt-1 text-sm text-stone">{listing.location}</p>
            ) : null}
            <p className="mt-6 font-display text-3xl text-champagne">
              {listing.price}
            </p>
            {listing.priceNote ? (
              <p className="mt-1 text-sm text-stone">{listing.priceNote}</p>
            ) : null}

            <dl className="mt-8 grid grid-cols-2 gap-px bg-line">
              {listing.specs.map((spec) => (
                <div key={spec.label} className="bg-ink px-4 py-3">
                  <dt className="text-[10px] tracking-[0.16em] text-stone uppercase">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-sm text-ivory">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-sm leading-relaxed text-ivory-dim">
              {listing.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild>
                <a
                  href={whatsappHref(defaultEnquiry(listing.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${SITE.phones[0].tel}`}>
                  Call {SITE.phones[0].display}
                </a>
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-ivory">
              Write to the desk
            </h2>
            <p className="mt-2 text-sm text-stone">
              Name, number, and a line on what you need. We open WhatsApp with
              the message ready.
            </p>
          </div>
          <EnquireForm
            presetPiece={listing.title}
            presetCollection={collection?.label}
          />
        </section>

        {related.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-display text-3xl text-ivory">
              Also in this collection
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </SiteShell>
  );
}
