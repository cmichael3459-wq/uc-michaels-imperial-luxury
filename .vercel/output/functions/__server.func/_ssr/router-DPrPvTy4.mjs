import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useRouter, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert, r as Menu, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DPrPvTy4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function BrandMark({ className, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: cn("group flex items-center gap-3 text-ivory", className),
		"aria-label": "UC.MICHAELS IMPERIAL LUXURY, home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: "grid size-10 shrink-0 place-items-center border border-champagne/50 text-[11px] font-medium tracking-[0.22em] text-champagne",
			children: "UM"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-w-0 flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-sans text-[11px] font-medium tracking-[0.28em]",
				children: "UC.MICHAELS"
			}), !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 font-display text-sm tracking-[0.18em] text-champagne",
				children: "Imperial Luxury"
			}) : null]
		})]
	});
}
var OFFER_LABEL = {
	sale: "Sale",
	rent: "Rent",
	"short-let": "Short let",
	swap: "Swap"
};
var COLLECTIONS = [
	{
		slug: "residences",
		label: "Residences",
		kicker: "Sale · Rent · Short let",
		headline: "Apartments held to a private standard.",
		lede: "Penthouses, duplexes, and villas across Lagos — for purchase, annual rent, or short let. Viewings are arranged privately.",
		image: "/images/apt-banana.jpg",
		offers: [
			"sale",
			"rent",
			"short-let"
		]
	},
	{
		slug: "automobiles",
		label: "Automobiles",
		kicker: "Sale · Rent · Swap",
		headline: "Cars sourced, prepared, and placed.",
		lede: "Sale, chauffeur-ready rentals, and discreet swaps. Every car is inspected before it is offered.",
		image: "/images/car-g63.jpg",
		offers: [
			"sale",
			"rent",
			"swap"
		]
	},
	{
		slug: "timepieces",
		label: "Timepieces",
		kicker: "Sale",
		headline: "Watches, authenticated and ready.",
		lede: "Current stock turns quickly. Enquire for papers, condition, and a private viewing on WhatsApp.",
		image: "/images/hero.jpg",
		offers: ["sale"]
	},
	{
		slug: "jewelry",
		label: "Jewelry",
		kicker: "Sale",
		headline: "Pieces for the vault and the evening.",
		lede: "Gold, diamonds, and coloured stones. Each piece is photographed and described before it leaves the desk.",
		image: "/images/apt-ikoyi.jpg",
		offers: ["sale"]
	},
	{
		slug: "fragrance",
		label: "Fragrance",
		kicker: "Sale",
		headline: "Niche and house scents, in stock.",
		lede: "A rotating cabinet of luxury perfume — original, sealed, and dispatched after confirmation on WhatsApp.",
		image: "/images/apt-villa.jpg",
		offers: ["sale"]
	}
];
var LISTINGS = [
	{
		id: "banana-penthouse",
		collection: "residences",
		title: "Banana Island waterfront penthouse",
		subtitle: "Four bedrooms · private lift",
		location: "Banana Island, Ikoyi",
		offer: "sale",
		price: "₦1.85bn",
		priceNote: "Title documented · viewing by appointment",
		image: "/images/apt-banana.jpg",
		featured: true,
		specs: [
			{
				label: "Beds",
				value: "4"
			},
			{
				label: "Baths",
				value: "5"
			},
			{
				label: "Parking",
				value: "3"
			},
			{
				label: "Type",
				value: "Penthouse"
			}
		],
		description: "A full-floor waterfront penthouse with a piano salon, pale stone floors, and an uninterrupted view of the lagoon. Staff quarters, a private lift, and a covered terrace. Offered for sale to a single principal."
	},
	{
		id: "ikoyi-duplex",
		collection: "residences",
		title: "Parkview double-height duplex",
		subtitle: "Five bedrooms · gated street",
		location: "Parkview, Ikoyi",
		offer: "rent",
		price: "₦48m",
		priceNote: "Per annum · two-year term preferred",
		image: "/images/apt-ikoyi.jpg",
		featured: true,
		specs: [
			{
				label: "Beds",
				value: "5"
			},
			{
				label: "Baths",
				value: "6"
			},
			{
				label: "Parking",
				value: "4"
			},
			{
				label: "Type",
				value: "Duplex"
			}
		],
		description: "A double-height living hall, floating stair, and a quiet garden at the rear. Fitted kitchen, generator, and borehole. Available for annual rent to a family or corporate principal."
	},
	{
		id: "vi-shortlet",
		collection: "residences",
		title: "Victoria Island sky suite",
		subtitle: "Three bedrooms · hotel service",
		location: "Victoria Island",
		offer: "short-let",
		price: "₦350,000",
		priceNote: "Per night · three-night minimum",
		image: "/images/apt-vi.jpg",
		featured: true,
		specs: [
			{
				label: "Beds",
				value: "3"
			},
			{
				label: "Baths",
				value: "3"
			},
			{
				label: "Guests",
				value: "6"
			},
			{
				label: "Type",
				value: "Short let"
			}
		],
		description: "A quiet short-let with hotel linen, a king suite, and a skyline at dusk. Housekeeping on request, secure parking, and 24-hour access. Suited to executives and private stays."
	},
	{
		id: "lekki-terrace",
		collection: "residences",
		title: "Lekki Phase 1 terrace house",
		subtitle: "Four bedrooms · fitted",
		location: "Lekki Phase 1",
		offer: "sale",
		price: "₦420m",
		image: "/images/apt-lekki.jpg",
		specs: [
			{
				label: "Beds",
				value: "4"
			},
			{
				label: "Baths",
				value: "5"
			},
			{
				label: "Parking",
				value: "2"
			},
			{
				label: "Type",
				value: "Terrace"
			}
		],
		description: "A dark-stone terrace on a quiet inner street, warm at dusk, with a landscaped forecourt. Fitted wardrobes, a family kitchen, and a roof terrace. Clean title, ready for occupation."
	},
	{
		id: "eko-atlantic",
		collection: "residences",
		title: "Eko Atlantic glass residence",
		subtitle: "Three bedrooms · ocean line",
		location: "Eko Atlantic City",
		offer: "short-let",
		price: "₦280,000",
		priceNote: "Per night · weekly rate on request",
		image: "/images/apt-eko.jpg",
		specs: [
			{
				label: "Beds",
				value: "3"
			},
			{
				label: "Baths",
				value: "3"
			},
			{
				label: "Guests",
				value: "5"
			},
			{
				label: "Type",
				value: "Apartment"
			}
		],
		description: "A high-floor apartment on the ocean line: oak, pale concrete, and a long dining table facing the water. Concierge building, gym, and secure parking. Offered as a short let."
	},
	{
		id: "magodo-villa",
		collection: "residences",
		title: "Magodo pool villa",
		subtitle: "Six bedrooms · private pool",
		location: "Magodo GRA",
		offer: "rent",
		price: "₦22m",
		priceNote: "Per annum",
		image: "/images/apt-villa.jpg",
		specs: [
			{
				label: "Beds",
				value: "6"
			},
			{
				label: "Baths",
				value: "7"
			},
			{
				label: "Parking",
				value: "5"
			},
			{
				label: "Type",
				value: "Villa"
			}
		],
		description: "A family villa with a still private pool, tropical planting, and a stone terrace. Boys’ quarters, a large kitchen, and a generator house. Offered for annual rent."
	},
	{
		id: "g63-amg",
		collection: "automobiles",
		title: "Mercedes-AMG G 63",
		subtitle: "Matte black · 2023",
		location: "Lagos",
		offer: "sale",
		price: "₦285m",
		priceNote: "Duty paid · full service history",
		image: "/images/car-g63.jpg",
		featured: true,
		specs: [
			{
				label: "Year",
				value: "2023"
			},
			{
				label: "Colour",
				value: "Matte black"
			},
			{
				label: "Km",
				value: "14,200"
			},
			{
				label: "Drive",
				value: "Automatic"
			}
		],
		description: "A matte-black G 63, duty paid, with a clean interior and a documented service book. Private inspection in Lagos. Trade-ins considered on WhatsApp."
	},
	{
		id: "range-rover",
		collection: "automobiles",
		title: "Range Rover Autobiography",
		subtitle: "Champagne · chauffeur ready",
		location: "Lagos",
		offer: "rent",
		price: "₦1.2m",
		priceNote: "Per day · with driver on request",
		image: "/images/car-rr.jpg",
		featured: true,
		specs: [
			{
				label: "Year",
				value: "2024"
			},
			{
				label: "Colour",
				value: "Champagne"
			},
			{
				label: "Seats",
				value: "5"
			},
			{
				label: "Drive",
				value: "Automatic"
			}
		],
		description: "A champagne Autobiography for airport runs, weddings, and private weeks in the city. Self-drive or with a chauffeur. Weekly and monthly rates on enquiry."
	},
	{
		id: "porsche-911",
		collection: "automobiles",
		title: "Porsche 911 Carrera",
		subtitle: "Midnight blue · swap considered",
		location: "Lagos",
		offer: "swap",
		price: "₦195m",
		priceNote: "Sale or swap against a G-Wagen / Range Rover",
		image: "/images/car-porsche.jpg",
		featured: true,
		specs: [
			{
				label: "Year",
				value: "2022"
			},
			{
				label: "Colour",
				value: "Midnight blue"
			},
			{
				label: "Km",
				value: "9,800"
			},
			{
				label: "Drive",
				value: "PDK"
			}
		],
		description: "A low-kilometre 911 in midnight blue. Offered for sale, or as a swap against a late G-Wagen or Range Rover of comparable standing. Inspection by appointment."
	},
	{
		id: "datejust-41",
		collection: "timepieces",
		title: "Rolex Datejust 41",
		subtitle: "Steel and champagne gold",
		offer: "sale",
		price: "₦18.5m",
		priceNote: "Box and papers",
		image: "/images/hero.jpg",
		featured: true,
		specs: [
			{
				label: "Case",
				value: "41mm"
			},
			{
				label: "Metal",
				value: "Oystersteel & gold"
			},
			{
				label: "Dial",
				value: "Champagne"
			},
			{
				label: "Condition",
				value: "Unworn"
			}
		],
		description: "Datejust 41 with a champagne dial, fluted bezel, and Jubilee bracelet. Unworn, complete with inner box, outer box, and papers. Private viewing in Lagos."
	},
	{
		id: "seamaster",
		collection: "timepieces",
		title: "Omega Seamaster Diver 300M",
		subtitle: "Blue ceramic bezel",
		offer: "sale",
		price: "₦6.8m",
		image: "/images/apt-eko.jpg",
		specs: [
			{
				label: "Case",
				value: "42mm"
			},
			{
				label: "Metal",
				value: "Steel"
			},
			{
				label: "Dial",
				value: "Blue"
			},
			{
				label: "Condition",
				value: "Mint"
			}
		],
		description: "A blue Seamaster Diver 300M, mint, with box and papers. Authenticated before it is offered. Same-day viewing available on WhatsApp."
	},
	{
		id: "santos",
		collection: "timepieces",
		title: "Cartier Santos de Cartier",
		subtitle: "Medium · steel",
		offer: "sale",
		price: "₦12.4m",
		image: "/images/apt-ikoyi.jpg",
		specs: [
			{
				label: "Case",
				value: "Medium"
			},
			{
				label: "Metal",
				value: "Steel"
			},
			{
				label: "Dial",
				value: "Silver"
			},
			{
				label: "Condition",
				value: "Excellent"
			}
		],
		description: "Santos de Cartier, medium, silver dial, steel bracelet with the quick-switch leather. Excellent condition, full set. A quiet daily piece."
	},
	{
		id: "royal-oak",
		collection: "timepieces",
		title: "Audemars Piguet Royal Oak",
		subtitle: "Selfwinding · 41mm",
		offer: "sale",
		price: "₦78m",
		priceNote: "On request · serious enquiries",
		image: "/images/hero.jpg",
		specs: [
			{
				label: "Case",
				value: "41mm"
			},
			{
				label: "Metal",
				value: "Steel"
			},
			{
				label: "Dial",
				value: "Blue tapisserie"
			},
			{
				label: "Condition",
				value: "Excellent"
			}
		],
		description: "A steel Royal Oak 41, blue tapisserie, full set. Held for a private client conversation — not a walk-up sale. Enquire with proof of funds on WhatsApp."
	},
	{
		id: "tennis-necklace",
		collection: "jewelry",
		title: "Diamond tennis necklace",
		subtitle: "Round brilliant · 18k white gold",
		offer: "sale",
		price: "₦24m",
		image: "/images/apt-banana.jpg",
		featured: true,
		specs: [
			{
				label: "Metal",
				value: "18k white gold"
			},
			{
				label: "Stones",
				value: "Diamonds"
			},
			{
				label: "Length",
				value: "42cm"
			},
			{
				label: "Cert",
				value: "Available"
			}
		],
		description: "A continuous line of round brilliants on 18k white gold. Certificate on file. Tried on by appointment; not posted before payment is confirmed."
	},
	{
		id: "cuban-bracelet",
		collection: "jewelry",
		title: "Cuban link bracelet",
		subtitle: "Solid 18k yellow gold",
		offer: "sale",
		price: "₦9.6m",
		image: "/images/apt-lekki.jpg",
		specs: [
			{
				label: "Metal",
				value: "18k yellow gold"
			},
			{
				label: "Weight",
				value: "86g"
			},
			{
				label: "Width",
				value: "10mm"
			},
			{
				label: "Clasp",
				value: "Box"
			}
		],
		description: "A solid 18k Cuban link, 86 grams, box clasp with figure-eight. Weighed in front of the buyer. Other weights available on request."
	},
	{
		id: "emerald-earrings",
		collection: "jewelry",
		title: "Emerald and diamond earrings",
		subtitle: "Drop · 18k yellow gold",
		offer: "sale",
		price: "₦7.2m",
		image: "/images/apt-ikoyi.jpg",
		specs: [
			{
				label: "Metal",
				value: "18k yellow gold"
			},
			{
				label: "Stones",
				value: "Emerald, diamond"
			},
			{
				label: "Style",
				value: "Drop"
			},
			{
				label: "Backs",
				value: "Omega"
			}
		],
		description: "Colombian-colour emerald drops with a diamond halo, omega backs. A pair for evening. Private viewing with a loupe on request."
	},
	{
		id: "solitaire",
		collection: "jewelry",
		title: "Solitaire ring",
		subtitle: "Round brilliant · platinum",
		offer: "sale",
		price: "₦31m",
		priceNote: "Certificate included",
		image: "/images/apt-banana.jpg",
		specs: [
			{
				label: "Metal",
				value: "Platinum"
			},
			{
				label: "Centre",
				value: "2.01ct"
			},
			{
				label: "Colour",
				value: "F"
			},
			{
				label: "Clarity",
				value: "VS1"
			}
		],
		description: "A 2.01 carat round brilliant, F/VS1, platinum four-claw. Laboratory certificate travels with the ring. Resizing arranged after sale."
	},
	{
		id: "oud-wood",
		collection: "fragrance",
		title: "Tom Ford Oud Wood",
		subtitle: "Eau de parfum · 100ml",
		offer: "sale",
		price: "₦420,000",
		image: "/images/apt-villa.jpg",
		specs: [
			{
				label: "Size",
				value: "100ml"
			},
			{
				label: "Type",
				value: "Eau de parfum"
			},
			{
				label: "Notes",
				value: "Oud, rosewood, sandalwood"
			},
			{
				label: "Seal",
				value: "Factory"
			}
		],
		description: "Factory-sealed Oud Wood 100ml. Dispatched after WhatsApp confirmation, or collected at a private hand-over in Lagos."
	},
	{
		id: "baccarat",
		collection: "fragrance",
		title: "Maison Francis Kurkdjian Baccarat Rouge 540",
		subtitle: "Eau de parfum · 70ml",
		offer: "sale",
		price: "₦780,000",
		image: "/images/apt-vi.jpg",
		featured: true,
		specs: [
			{
				label: "Size",
				value: "70ml"
			},
			{
				label: "Type",
				value: "Eau de parfum"
			},
			{
				label: "Notes",
				value: "Saffron, amberwood, cedar"
			},
			{
				label: "Seal",
				value: "Factory"
			}
		],
		description: "Baccarat Rouge 540, 70ml, sealed. One of the pieces that leaves the cabinet the same day it is listed. Enquire to hold."
	},
	{
		id: "aventus",
		collection: "fragrance",
		title: "Creed Aventus",
		subtitle: "Eau de parfum · 100ml",
		offer: "sale",
		price: "₦650,000",
		image: "/images/hero.jpg",
		specs: [
			{
				label: "Size",
				value: "100ml"
			},
			{
				label: "Type",
				value: "Eau de parfum"
			},
			{
				label: "Notes",
				value: "Pineapple, birch, musk"
			},
			{
				label: "Seal",
				value: "Factory"
			}
		],
		description: "Aventus 100ml, batch photographed on request. Original, sealed, and not a tester. Lagos hand-over or dispatch."
	},
	{
		id: "layton",
		collection: "fragrance",
		title: "Parfums de Marly Layton",
		subtitle: "Eau de parfum · 125ml",
		offer: "sale",
		price: "₦390,000",
		image: "/images/apt-villa.jpg",
		specs: [
			{
				label: "Size",
				value: "125ml"
			},
			{
				label: "Type",
				value: "Eau de parfum"
			},
			{
				label: "Notes",
				value: "Apple, vanilla, cardamom"
			},
			{
				label: "Seal",
				value: "Factory"
			}
		],
		description: "Layton 125ml, sealed. A cabinet staple. Ask for the current batch photo before you pay."
	}
];
function getCollection(slug) {
	return COLLECTIONS.find((c) => c.slug === slug);
}
function listingsFor(slug, offer) {
	return LISTINGS.filter((item) => {
		if (item.collection !== slug) return false;
		if (!offer || offer === "all") return true;
		return item.offer === offer;
	});
}
function getListing(id) {
	return LISTINGS.find((item) => item.id === id);
}
function featuredListings() {
	return LISTINGS.filter((item) => item.featured);
}
function relatedListings(listing, limit = 3) {
	return LISTINGS.filter((item) => item.collection === listing.collection && item.id !== listing.id).slice(0, limit);
}
var SITE = {
	name: "UC.MICHAELS IMPERIAL LUXURY",
	shortName: "UC.MICHAELS",
	tagline: "Private access to exceptional living.",
	city: "Lagos",
	hours: "Daily, 9:00–21:00 WAT",
	phones: [{
		display: "0814 533 7125",
		tel: "+2348145337125",
		raw: "08145337125"
	}, {
		display: "0813 269 2045",
		tel: "+2348132692045",
		raw: "08132692045"
	}],
	whatsapp: {
		e164: "2348145337125",
		display: "0814 533 7125"
	},
	tiktokNote: "New pieces are published on TikTok. Enquire on WhatsApp to reserve."
};
function whatsappHref(message) {
	const base = `https://wa.me/${SITE.whatsapp.e164}`;
	if (!message) return base;
	return `${base}?text=${encodeURIComponent(message)}`;
}
function defaultEnquiry(piece) {
	if (piece) return `Hello UC.MICHAELS, I am enquiring about ${piece}. Please share availability and next steps.`;
	return "Hello UC.MICHAELS, I would like to enquire about a piece in the collection.";
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line bg-ink-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xs text-sm leading-relaxed text-stone",
						children: "A private desk for residences, automobiles, timepieces, jewelry, and fragrance. Online first — TikTok and WhatsApp. No walk-in office."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.18em] text-stone uppercase",
					children: "Collections"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-col gap-2",
					children: COLLECTIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/collection/$slug",
						params: { slug: c.slug },
						className: "text-sm text-ivory-dim transition-colors hover:text-ivory",
						children: c.label
					}) }, c.slug))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.18em] text-stone uppercase",
					children: "The desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 flex flex-col gap-2 text-sm text-ivory-dim",
					children: [
						SITE.phones.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:${p.tel}`,
							className: "hover:text-ivory",
							children: p.display
						}) }, p.tel)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: whatsappHref(defaultEnquiry()),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hover:text-ivory",
							children: ["WhatsApp ", SITE.whatsapp.display]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "pt-2 text-stone",
							children: SITE.hours
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-stone",
							children: [SITE.city, " · by appointment"]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto max-w-6xl px-4 py-5 text-xs text-stone sm:px-6",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					SITE.name,
					". Inventory is indicative and subject to prior sale."
				]
			})
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-medium tracking-wide transition-[opacity,transform,background-color,color,border-color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-ivory text-ink hover:bg-ivory-dim",
			outline: "border border-line-strong bg-transparent text-ivory hover:border-ivory/40 hover:bg-ivory/5",
			ghost: "text-ivory hover:bg-ivory/6",
			champagne: "bg-champagne text-ink hover:opacity-90",
			link: "text-champagne underline-offset-4 hover:underline px-0"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 px-3.5 text-xs",
			lg: "h-12 px-6",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var NAV = COLLECTIONS.map((c) => ({
	to: "/collection/$slug",
	params: { slug: c.slug },
	label: c.label
}));
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { compact: true }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-6 lg:flex",
					"aria-label": "Primary",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						params: item.params,
						className: "text-[12px] font-medium tracking-[0.16em] text-ivory-dim uppercase transition-colors duration-150 hover:text-ivory",
						activeProps: { className: "text-champagne" },
						children: item.label
					}, item.params.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: whatsappHref(defaultEnquiry()),
							target: "_blank",
							rel: "noopener noreferrer",
							children: "Enquire"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						className: "lg:hidden",
						"aria-label": open ? "Close menu" : "Open menu",
						"aria-expanded": open,
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("border-t border-line bg-ink lg:hidden", open ? "block" : "hidden"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mx-auto flex max-w-6xl flex-col px-4 py-4",
				"aria-label": "Mobile",
				children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					params: item.params,
					className: "flex min-h-11 items-center border-b border-line font-display text-2xl text-ivory",
					onClick: () => setOpen(false),
					children: item.label
				}, item.params.slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/enquire",
					className: "flex min-h-11 items-center font-display text-2xl text-champagne",
					onClick: () => setOpen(false),
					children: "Enquire"
				})]
			})
		})]
	});
}
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-ink text-ivory",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
var styles_default = "/assets/styles-B0GT3wrd.css";
var APP_NAME = SITE.name;
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "UC.MICHAELS IMPERIAL LUXURY — private sale, rent and short let of luxury apartments; sale, rent and swap of luxury cars; watches, jewelry and fragrance. Lagos, via WhatsApp and TikTok."
			},
			{
				name: "theme-color",
				content: "#0c0b0a"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap"
			}
		]
	}),
	notFoundComponent: NotFound,
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-ink text-ivory",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-[60dvh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.22em] text-champagne uppercase",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl text-ivory",
				children: "This piece is not listed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-stone",
				children: "It may have sold, or the link is incorrect. The desk can still source it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Return home"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/enquire",
						children: "Enquire"
					})
				})]
			})
		]
	}) });
}
var $$splitComponentImporter$3 = () => import("./routes-BsW4pLe7.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./enquire-mq3WmPpT.mjs");
var Route$2 = createFileRoute("/enquire")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./collection._slug-AzX4ObYg.mjs");
var Route$1 = createFileRoute("/collection/$slug")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./listing._id-2MnBx8h2.mjs");
var Route = createFileRoute("/listing/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	EnquireRoute: Route$2.update({
		id: "/enquire",
		path: "/enquire",
		getParentRoute: () => Route$4
	}),
	CollectionSlugRoute: Route$1.update({
		id: "/collection/$slug",
		path: "/collection/$slug",
		getParentRoute: () => Route$4
	}),
	ListingIdRoute: Route.update({
		id: "/listing/$id",
		path: "/listing/$id",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Button as a, whatsappHref as c, featuredListings as d, getCollection as f, cn as g, relatedListings as h, SiteShell as i, COLLECTIONS as l, listingsFor as m, Route as n, SITE as o, getListing as p, Route$1 as r, defaultEnquiry as s, router_exports as t, OFFER_LABEL as u };
