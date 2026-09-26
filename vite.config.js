import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { party } from "./src/config.js";

export default defineConfig({
  base: "/festatiluca/",
  plugins: [
    react(),
    {
      name: "party-metadata",
      transformIndexHtml(html) {
        const escape = (value) =>
          String(value)
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");
        return html
          .replaceAll(
            "__PARTY_TITLE__",
            escape(`${party.names} · ${party.dateLabel}`),
          )
          .replaceAll("__PARTY_DESCRIPTION__", escape(party.description))
          .replaceAll("__SITE_URL__", escape(party.siteUrl));
      },
    },
  ],
  test: { environment: "jsdom", setupFiles: "./src/test/setup.js" },
});
