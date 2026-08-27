import { createFileRoute } from "@tanstack/react-router";
import { EnquireForm } from "@/components/enquire-form";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { SITE, defaultEnquiry, whatsappHref } from "@/lib/site";

export const Route = createFileRoute("/enquire")({ component: EnquirePage });

function EnquirePage() {
  return (
    <SiteShell>
      <main className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="text-[11px] font-medium tracking-[0.22em] text-champagne uppercase">
            The desk
          </p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-ivory">
            Enquire privately.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ivory-dim">
            Residences, automobiles, timepieces, jewelry, and fragrance. Tell us
            the piece — or the brief — and we will answer on WhatsApp.
          </p>
          <ul className="mt-10 flex flex-col gap-4 border-t border-line pt-8">
            {SITE.phones.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className="font-display text-3xl text-ivory hover:text-champagne"
                >
                  {p.display}
                </a>
              </li>
            ))}
            <li className="text-sm text-stone">
              {SITE.hours}
              <br />
              {SITE.city} · no walk-in office · by appointment
            </li>
          </ul>
          <Button asChild className="mt-8">
            <a
              href={whatsappHref(defaultEnquiry())}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp now
            </a>
          </Button>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone">
            {SITE.tiktokNote}
          </p>
        </div>
        <div className="border border-line bg-ink-2 p-6 sm:p-8">
          <h2 className="font-display text-2xl text-ivory">Send a note</h2>
          <p className="mt-2 mb-8 text-sm text-stone">
            We never store this form. It only prepares a WhatsApp message.
          </p>
          <EnquireForm />
        </div>
      </main>
    </SiteShell>
  );
}
