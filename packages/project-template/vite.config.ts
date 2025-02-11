import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": "/src"
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "index",
      fileName: format => `index.${format}.js`,
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "lodash-es",
        "simple-git",
        "path",
        "fs/promises",
        "fs",
        "async_hooks",
        /node:.*/
      ],
      output: {
        format: "cjs",
        banner: "#!/usr/bin/env node",
        entryFileNames: "[name].js"
      }
    },
    target: "node14",
    ssr: true,
    sourcemap: true
  }
});
