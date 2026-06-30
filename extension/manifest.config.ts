import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "LoreLens",
  version: "0.1.0",
  description: "Offline browser dictionary for immersive reading.",

  permissions: [],

  host_permissions: [
    "<all_urls>"
  ],

  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.ts"]
    }
  ]
});