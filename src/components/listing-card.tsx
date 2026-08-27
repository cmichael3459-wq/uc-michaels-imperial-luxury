import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { OFFER_LABEL, type Listing } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function ListingCard({
  listing,
  className,
  priority = false,
}: {
  listing: Listing;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      to="/listing/$id"
      params={{ id: listing.id }}
      className={cn(
        "group flex flex-col bg-ink-2 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)]",
        className,
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-ink-3">
        <img
          src={listing.image}
          alt=""
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          loading={priority ? "eager" : "lazy"}
        />
        <Badge
          variant="champagne"
          className="absolute top-3 left-3 bg-ink/70 backdrop-blur-[2px]"
        >
          {OFFER_LABEL[listing.offer]}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-display text-xl leading-snug text-ivory">
          {listing.title}
        </p>
        <p className="text-sm text-stone">{listing.subtitle}</p>
        {listing.location ? (
          <p className="text-xs tracking-wide text-stone/80">{listing.location}</p>
        ) : null}
        <p className="mt-auto pt-3 font-sans text-sm font-medium tracking-wide text-champagne">
          {listing.price}
          {listing.priceNote ? (
            <span className="mt-1 block text-[11px] font-normal tracking-normal text-stone">
              {listing.priceNote}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
