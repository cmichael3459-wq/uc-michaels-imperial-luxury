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

    // Google site verification
    {
      name: "google-site-verification",
      content: "RCMrTxum3KP_WIUh-Y7RHggYgsrLsapLkzfFeHWNyuE",
    },

    {
      title:
        "UC.MICHAELS IMPERIAL LUXURY | Residences, Cars, Watches & More — Lagos, Delta",
    },
    {
      name: "description",
      content:
        "Private sale, rent and short let of luxury apartments in Lagos and Delta. Sale, rent and swap of luxury cars. Authenticated watches, jewelry and fragrance. Viewings by appointment only.",
    },
    { name: "theme-color", content: "#0c0b0a" },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "UC.MICHAELS IMPERIAL LUXURY" },
    { name: "geo.region", content: "NG-LA, NG-DT" },
    { name: "geo.placename", content: "Lagos, Delta" },

    // Open Graph
    { property: "og:type", content: "website" },
    {
      property: "og:title",
      content: "UC.MICHAELS IMPERIAL LUXURY | Lagos, Delta",
    },
    {
      property: "og:description",
      content:
        "Luxury residences, automobiles, timepieces, jewelry and fragrance. Private viewings only.",
    },
    {
      property: "og:url",
      content: "https://uc-michaels-imperial-luxury.vercel.app/",
    },
    { property: "og:site_name", content: "UC.MICHAELS IMPERIAL LUXURY" },
    { property: "og:locale", content: "en_NG" },
    {
      property: "og:image",
      content: "https://uc-michaels-imperial-luxury.vercel.app/images/hero.jpg",
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Twitter / X card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "UC.MICHAELS IMPERIAL LUXURY | Lagos, Delta",
    },
    {
      name: "twitter:description",
      content:
        "Private luxury residences, cars, watches and more. Viewings by appointment.",
    },
    {
      name: "twitter:image",
      content: "https://uc-michaels-imperial-luxury.vercel.app/images/hero.jpg",
    },
  ],
  links: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "stylesheet", href: appCss },
  ],
}),
