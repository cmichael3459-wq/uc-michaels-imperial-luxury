import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { R as notFound, _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button, c as whatsappHref, f as getCollection, g as cn, i as SiteShell, m as listingsFor, r as Route$1, s as defaultEnquiry, u as OFFER_LABEL } from "./router-DPrPvTy4.mjs";
import { n as ListingCard } from "./listing-card-BSi8zp5Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collection._slug-AzX4ObYg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CollectionPage() {
	const { slug } = Route$1.useParams();
	const collection = getCollection(slug);
	if (!collection) throw notFound();
	const [offer, setOffer] = (0, import_react.useState)("all");
	const items = (0, import_react.useMemo)(() => listingsFor(collection.slug, offer), [collection.slug, offer]);
	const filters = ["all", ...collection.offers];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-[52dvh] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: collection.image,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-[52dvh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium tracking-[0.22em] text-champagne uppercase",
						children: collection.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl leading-tight text-ivory sm:text-6xl",
						children: collection.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-base leading-relaxed text-ivory-dim",
						children: collection.lede
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			collection.offers.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8 flex flex-wrap gap-2",
				role: "tablist",
				"aria-label": "Filter by offer",
				children: filters.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": offer === key,
					onClick: () => setOffer(key),
					className: cn("h-10 min-w-11 border px-4 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors duration-150", offer === key ? "border-ivory bg-ivory text-ink" : "border-line text-ivory-dim hover:border-line-strong hover:text-ivory"),
					children: key === "all" ? "All" : OFFER_LABEL[key]
				}, key))
			}) : null,
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line bg-ink-2 px-6 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-ivory",
						children: "Nothing in this filter."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-stone",
						children: "Ask the desk — stock moves off TikTok before it is listed here."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: whatsappHref(defaultEnquiry(collection.label)),
							target: "_blank",
							rel: "noopener noreferrer",
							children: "Enquire on WhatsApp"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing: item }, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-sm text-stone",
					children: "Looking for a piece that is not listed? The desk sources to order."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/enquire",
						children: "Write an enquiry"
					})
				})]
			})
		]
	})] }) });
}
//#endregion
export { CollectionPage as component };
