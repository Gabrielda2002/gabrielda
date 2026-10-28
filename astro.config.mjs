// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "node:url";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  site: process.env.SITE_URL || "https://example.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
