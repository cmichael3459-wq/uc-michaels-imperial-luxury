//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-GyTpIkbh.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/enquire",
			"/collection/$slug",
			"/listing/$id"
		],
		preloads: ["/assets/index-Ytc7RVuv.js", "/assets/site-shell-Cst_5ojQ.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-Ytc7RVuv.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-ClELi-aw.js", "/assets/listing-card-C9oMsKVn.js"]
	},
	"/enquire": {
		filePath: "/workspace/src/routes/enquire.tsx",
		children: void 0,
		preloads: ["/assets/enquire-BzxBByaX.js", "/assets/enquire-form-DDv_REOg.js"]
	},
	"/collection/$slug": {
		filePath: "/workspace/src/routes/collection.$slug.tsx",
		children: void 0,
		preloads: ["/assets/collection._slug-BpBEBqdQ.js", "/assets/listing-card-C9oMsKVn.js"]
	},
	"/listing/$id": {
		filePath: "/workspace/src/routes/listing.$id.tsx",
		children: void 0,
		preloads: [
			"/assets/listing._id-DXpbsC4A.js",
			"/assets/listing-card-C9oMsKVn.js",
			"/assets/enquire-form-DDv_REOg.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
