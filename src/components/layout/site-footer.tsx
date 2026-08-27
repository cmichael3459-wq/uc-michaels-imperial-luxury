import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand-mark";
import { COLLECTIONS } from "@/lib/catalog";
import { SITE, whatsappHref, defaultEnquiry } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <BrandMark />
          <p className="max-w-xs text-sm leading-relaxed text-stone">
            A private desk for residences, automobiles, timepieces, jewelry, and
            fragrance. Online first — TikTok and WhatsApp. No walk-in office.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-stone uppercase">
            Collections
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {COLLECTIONS.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/collection/$slug"
                  params={{ slug: c.slug }}
                  className="text-sm text-ivory-dim transition-colors hover:text-ivory"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-stone uppercase">
            The desk
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-ivory-dim">
            {SITE.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="hover:text-ivory">
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={whatsappHref(defaultEnquiry())}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory"
              >
                WhatsApp {SITE.whatsapp.display}
              </a>
            </li>
            <li className="pt-2 text-stone">{SITE.hours}</li>
            <li className="text-stone">{SITE.city} · by appointment</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-stone sm:px-6">
          © {new Date().getFullYear()} {SITE.name}. Inventory is indicative and
          subject to prior sale.
        </p>
      </div>
    </footer>
  );
}
