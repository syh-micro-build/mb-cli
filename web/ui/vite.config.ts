import vue from "@vitejs/plugin-vue";

import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  server: {
    open: true
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  plugins: [vue()]
});
