import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { COLLECTIONS } from "@/lib/catalog";
import { whatsappHref, defaultEnquiry } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = COLLECTIONS.map((c) => ({
  to: "/collection/$slug" as const,
  params: { slug: c.slug },
  label: c.label,
}));

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <BrandMark compact />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.params.slug}
              to={item.to}
              params={item.params}
              className="text-[12px] font-medium tracking-[0.16em] text-ivory-dim uppercase transition-colors duration-150 hover:text-ivory"
              activeProps={{ className: "text-champagne" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <a
              href={whatsappHref(defaultEnquiry())}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire
            </a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "border-t border-line bg-ink lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col px-4 py-4"
          aria-label="Mobile"
        >
          {NAV.map((item) => (
            <Link
              key={item.params.slug}
              to={item.to}
              params={item.params}
              className="flex min-h-11 items-center border-b border-line font-display text-2xl text-ivory"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/enquire"
            className="flex min-h-11 items-center font-display text-2xl text-champagne"
            onClick={() => setOpen(false)}
          >
            Enquire
          </Link>
        </nav>
      </div>
    </header>
  );
}
