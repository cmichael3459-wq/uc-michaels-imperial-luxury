import { R as notFound, _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button, c as whatsappHref, h as relatedListings, i as SiteShell, l as COLLECTIONS, n as Route, o as SITE, p as getListing, s as defaultEnquiry, u as OFFER_LABEL } from "./router-DPrPvTy4.mjs";
import { n as ListingCard, t as Badge } from "./listing-card-BSi8zp5Z.mjs";
import { t as EnquireForm } from "./enquire-form-DG4760qx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listing._id-2MnBx8h2.js
var import_jsx_runtime = require_jsx_runtime();
function ListingPage() {
	const { id } = Route.useParams();
	const listing = getListing(id);
	if (!listing) throw notFound();
	const collection = COLLECTIONS.find((c) => c.slug === listing.collection);
	const related = relatedListings(listing);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] tracking-[0.18em] text-stone uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-ivory",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: " / "
					}),
					collection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/collection/$slug",
						params: { slug: collection.slug },
						className: "hover:text-ivory",
						children: collection.label
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden bg-ink-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: listing.image,
						alt: listing.title,
						className: "aspect-[3/2] w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "champagne",
						children: OFFER_LABEL[listing.offer]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-4xl leading-tight text-ivory sm:text-5xl",
						children: listing.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base text-ivory-dim",
						children: listing.subtitle
					}),
					listing.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-stone",
						children: listing.location
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-display text-3xl text-champagne",
						children: listing.price
					}),
					listing.priceNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-stone",
						children: listing.priceNote
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-8 grid grid-cols-2 gap-px bg-line",
						children: listing.specs.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-ink px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[10px] tracking-[0.16em] text-stone uppercase",
								children: spec.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm text-ivory",
								children: spec.value
							})]
						}, spec.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-sm leading-relaxed text-ivory-dim",
						children: listing.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: whatsappHref(defaultEnquiry(listing.title)),
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Enquire on WhatsApp"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${SITE.phones[0].tel}`,
								children: ["Call ", SITE.phones[0].display]
							})
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-ivory",
					children: "Write to the desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-stone",
					children: "Name, number, and a line on what you need. We open WhatsApp with the message ready."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquireForm, {
					presetPiece: listing.title,
					presetCollection: collection?.label
				})]
			}),
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-ivory",
					children: "Also in this collection"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing: item }, item.id))
				})]
			}) : null
		]
	}) });
}
//#endregion
export { ListingPage as component };
