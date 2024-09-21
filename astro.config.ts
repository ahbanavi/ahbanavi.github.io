import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { targetBlank } from "./plugins/targetBlank";
import { rehypeBidi } from "./plugins/rehypeBidi";
import remarkCallout from "@r4ai/remark-callout";

const domain = process.env.WEB_DOMAIN || "ydst.tech";

export default defineConfig({
  site: "https://" + domain,
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    rehypePlugins: [[targetBlank, { domain: domain }], rehypeBidi],
    remarkPlugins: [remarkCallout],
  },
});
