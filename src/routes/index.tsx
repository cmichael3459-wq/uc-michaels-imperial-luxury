import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ListingCard } from "@/components/listing-card";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { COLLECTIONS, featuredListings } from "@/lib/catalog";
import { SITE, defaultEnquiry, whatsappHref } from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "Browse the collection here, or watch new pieces as they are published on TikTok.",
  },
  {
    n: "02",
    title: "Enquire",
    body: "WhatsApp the desk with the piece, dates, or budget. Both lines are answered daily.",
  },
  {
    n: "03",
    title: "View",
    body: "A private inspection is arranged to your schedule — residence, car, or salon piece.",
  },
  {
    n: "04",
    title: "Close",
    body: "Sale, rent, short let, or swap, handled end to end. No walk-in office; every viewing is by appointment.",
  },
];

function Home() {
  const featured = featuredListings();

  return (
    <SiteShell>
      <main>
        <section className="relative min-h-[88dvh] overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
          <div className="relative mx-auto flex min-h-[88dvh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
            <p className="rise-in text-[11px] font-medium tracking-[0.28em] text-champagne uppercase">
              Private desk · Lagos
            </p>
            <h1 className="rise-in rise-in-1 mt-4 max-w-3xl font-display text-[2.75rem] leading-[1.05] text-ivory sm:text-6xl md:text-7xl">
              Imperial living,
              <br />
              on demand.
            </h1>
            <p className="rise-in rise-in-2 mt-5 max-w-xl text-base leading-relaxed text-ivory-dim sm:text-lg">
              Residences, automobiles, and objets — sourced, staged, and placed
              through WhatsApp and TikTok.
            </p>
            <div className="rise-in rise-in-3 mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#collections">View the collection</a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={whatsappHref(defaultEnquiry())}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-y border-line">
          <div className="mx-auto grid max-w-6xl divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { k: "Residences", v: "Sale, rent, short let" },
              { k: "Automobiles", v: "Sale, rent, swap" },
              { k: "Objets", v: "Watches, jewelry, fragrance" },
            ].map((row) => (
              <div key={row.k} className="px-4 py-6 sm:px-8">
                <p className="font-display text-2xl text-ivory">{row.k}</p>
                <p className="mt-1 text-sm text-stone">{row.v}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="collections" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-[11px] font-medium tracking-[0.22em] text-champagne uppercase">
            The house
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-ivory sm:text-5xl">
            Five collections, one desk.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {COLLECTIONS.map((c, i) => (
              <Link
                key={c.slug}
                to="/collection/$slug"
                params={{ slug: c.slug }}
                className={`group relative min-h-72 overflow-hidden ${i === 0 ? "md:col-span-2 md:min-h-96" : ""}`}
              >
                <img
                  src={c.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-[11px] tracking-[0.2em] text-champagne uppercase">
                    {c.kicker}
                  </p>
                  <p className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
                    {c.label}
                  </p>
                  <p className="mt-2 max-w-lg text-sm text-ivory-dim">{c.lede}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.16em] text-ivory uppercase">
                    Enter
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-ink-2">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium tracking-[0.22em] text-champagne uppercase">
                  Selected
                </p>
                <h2 className="mt-3 font-display text-4xl text-ivory">
                  Currently held.
                </h2>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/enquire">Ask for something else</Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => (
                <ListingCard key={item.id} listing={item} priority={i < 3} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-[11px] font-medium tracking-[0.22em] text-champagne uppercase">
            How the desk works
          </p>
          <h2 className="mt-3 max-w-xl font-display text-4xl text-ivory">
            Online first. Private throughout.
          </h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <li key={step.n} className="border-t border-line pt-5">
                <p className="text-[11px] tracking-[0.2em] text-champagne">
                  {step.n}
                </p>
                <h3 className="mt-3 font-display text-2xl text-ivory">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-line bg-ink-2">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] text-champagne uppercase">
                The desk
              </p>
              <h2 className="mt-3 font-display text-4xl text-ivory">
                Two lines. One conversation.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
                {SITE.tiktokNote} There is no physical showroom — every viewing
                is arranged.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {SITE.phones.map((p) => (
                  <li key={p.tel}>
                    <a
                      href={`tel:${p.tel}`}
                      className="font-display text-3xl text-ivory transition-colors hover:text-champagne"
                    >
                      {p.display}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-stone">
                {SITE.hours} · {SITE.city}
              </p>
            </div>
            <div className="flex flex-col justify-end gap-3">
              <Button asChild size="lg">
                <a
                  href={whatsappHref(defaultEnquiry())}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp the desk
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/enquire">Write an enquiry</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
