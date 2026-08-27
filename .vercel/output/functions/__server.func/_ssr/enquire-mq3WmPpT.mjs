import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button, c as whatsappHref, i as SiteShell, o as SITE, s as defaultEnquiry } from "./router-DPrPvTy4.mjs";
import { t as EnquireForm } from "./enquire-form-DG4760qx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquire-mq3WmPpT.js
var import_jsx_runtime = require_jsx_runtime();
function EnquirePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.22em] text-champagne uppercase",
				children: "The desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl leading-tight text-ivory",
				children: "Enquire privately."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-base leading-relaxed text-ivory-dim",
				children: "Residences, automobiles, timepieces, jewelry, and fragrance. Tell us the piece — or the brief — and we will answer on WhatsApp."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-10 flex flex-col gap-4 border-t border-line pt-8",
				children: [SITE.phones.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `tel:${p.tel}`,
					className: "font-display text-3xl text-ivory hover:text-champagne",
					children: p.display
				}) }, p.tel)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "text-sm text-stone",
					children: [
						SITE.hours,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						SITE.city,
						" · no walk-in office · by appointment"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: whatsappHref(defaultEnquiry()),
					target: "_blank",
					rel: "noopener noreferrer",
					children: "Open WhatsApp now"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-sm text-sm leading-relaxed text-stone",
				children: SITE.tiktokNote
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border border-line bg-ink-2 p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-ivory",
					children: "Send a note"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 mb-8 text-sm text-stone",
					children: "We never store this form. It only prepares a WhatsApp message."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquireForm, {})
			]
		})]
	}) });
}
//#endregion
export { EnquirePage as component };
