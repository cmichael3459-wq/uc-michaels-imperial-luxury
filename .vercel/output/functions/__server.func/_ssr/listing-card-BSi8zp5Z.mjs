import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { g as cn, u as OFFER_LABEL } from "./router-DPrPvTy4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listing-card-BSi8zp5Z.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em]", {
	variants: { variant: {
		default: "border-line text-ivory-dim",
		champagne: "border-champagne/40 text-champagne",
		solid: "border-transparent bg-ivory/10 text-ivory"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function ListingCard({ listing, className, priority = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/listing/$id",
		params: { id: listing.id },
		className: cn("group flex flex-col bg-ink-2 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[3/2] overflow-hidden bg-ink-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: listing.image,
				alt: "",
				className: "size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]",
				loading: priority ? "eager" : "lazy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "champagne",
				className: "absolute top-3 left-3 bg-ink/70 backdrop-blur-[2px]",
				children: OFFER_LABEL[listing.offer]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl leading-snug text-ivory",
					children: listing.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-stone",
					children: listing.subtitle
				}),
				listing.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-stone/80",
					children: listing.location
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-auto pt-3 font-sans text-sm font-medium tracking-wide text-champagne",
					children: [listing.price, listing.priceNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-[11px] font-normal tracking-normal text-stone",
						children: listing.priceNote
					}) : null]
				})
			]
		})]
	});
}
//#endregion
export { ListingCard as n, Badge as t };
