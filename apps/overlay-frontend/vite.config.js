import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from "path";

export default defineConfig({
  plugins: [preact(), cssInjectedByJsPlugin()],
  css: {
    postcss: "./postcss.config.js",
  },
  define: {
    "process.env": {},
  },
  build: {
    lib: {
      entry: "./src/main.jsx",
      name: "FeedbackWidget",
      fileName: "feedback-widget",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
