import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-3 text-ivory", className)}
      aria-label="UC.MICHAELS IMPERIAL LUXURY, home"
    >
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center border border-champagne/50 text-[11px] font-medium tracking-[0.22em] text-champagne"
      >
        UM
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-sans text-[11px] font-medium tracking-[0.28em]">
          UC.MICHAELS
        </span>
        {!compact ? (
          <span className="mt-1 font-display text-sm tracking-[0.18em] text-champagne">
            Imperial Luxury
          </span>
        ) : null}
      </span>
    </Link>
  );
}
