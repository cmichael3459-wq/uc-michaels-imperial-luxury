import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button, c as whatsappHref, g as cn, l as COLLECTIONS, s as defaultEnquiry } from "./router-DPrPvTy4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquire-form-DG4760qx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("h-11 w-full border border-line bg-ink-2 px-3.5 text-sm text-ivory placeholder:text-stone", "transition-[border-color,box-shadow] duration-150 ease-out", "focus-visible:border-champagne/50 focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-champagne)]", "disabled:opacity-40", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-[11px] font-medium uppercase tracking-[0.16em] text-stone", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-32 w-full border border-line bg-ink-2 px-3.5 py-3 text-sm text-ivory placeholder:text-stone", "transition-[border-color,box-shadow] duration-150 ease-out", "focus-visible:border-champagne/50 focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-champagne)]", "disabled:opacity-40", className),
		...props
	});
}
var INTERESTS = [
	{
		value: "",
		label: "Select a collection"
	},
	...COLLECTIONS.map((c) => ({
		value: c.label,
		label: c.label
	})),
	{
		value: "Other",
		label: "Something else"
	}
];
function EnquireForm({ presetPiece, presetCollection }) {
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [interest, setInterest] = (0, import_react.useState)(presetCollection ?? "");
	const [message, setMessage] = (0, import_react.useState)(presetPiece ? defaultEnquiry(presetPiece) : "");
	function onSubmit(event) {
		event.preventDefault();
		const lines = [
			`Hello UC.MICHAELS, my name is ${name.trim() || "a private client"}.`,
			phone.trim() ? `My number is ${phone.trim()}.` : null,
			interest ? `I am interested in ${interest}.` : null,
			message.trim() || defaultEnquiry(presetPiece)
		].filter(Boolean);
		window.open(whatsappHref(lines.join(" ")), "_blank", "noopener,noreferrer");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "enquire-name",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "enquire-name",
						name: "name",
						autoComplete: "name",
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Your name"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "enquire-phone",
						children: "Phone"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "enquire-phone",
						name: "phone",
						type: "tel",
						autoComplete: "tel",
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						placeholder: "0800 000 0000"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "enquire-interest",
					children: "Collection"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					id: "enquire-interest",
					name: "interest",
					value: interest,
					onChange: (e) => setInterest(e.target.value),
					className: "h-11 w-full border border-line bg-ink-2 px-3.5 text-sm text-ivory focus-visible:border-champagne/50 focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-champagne)]",
					children: INTERESTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item.value,
						children: item.label
					}, item.label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "enquire-message",
					children: "Message"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "enquire-message",
					name: "message",
					value: message,
					onChange: (e) => setMessage(e.target.value),
					placeholder: "The piece, dates, or budget you have in mind."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full sm:w-auto",
				children: "Continue on WhatsApp"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-stone",
				children: "The form opens WhatsApp with your message. Nothing is stored on this site."
			})
		]
	});
}
//#endregion
export { EnquireForm as t };
