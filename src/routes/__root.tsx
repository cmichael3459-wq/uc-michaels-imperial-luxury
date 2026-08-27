import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import appCss from "../styles.css?url";

const APP_NAME = SITE.name;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "UC.MICHAELS IMPERIAL LUXURY — private sale, rent and short let of luxury apartments; sale, rent and swap of luxury cars; watches, jewelry and fragrance. Lagos, via WhatsApp and TikTok.",
      },
      { name: "theme-color", content: "#0c0b0a" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-ink text-ivory">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});

function NotFound() {
  return (
    <SiteShell>
      <main className="mx-auto flex min-h-[60dvh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
        <p className="text-[11px] tracking-[0.22em] text-champagne uppercase">
          404
        </p>
        <h1 className="mt-3 font-display text-5xl text-ivory">
          This piece is not listed.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
          It may have sold, or the link is incorrect. The desk can still source
          it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/">Return home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/enquire">Enquire</Link>
          </Button>
        </div>
      </main>
    </SiteShell>
  );
}
