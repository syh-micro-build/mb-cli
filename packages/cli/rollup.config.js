import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: {
    index: "./bin/cli.ts",
    create: "./lib/create.ts"
  },
  output: [
    {
      dir: "dist",
      chunkFileNames: "dist/[name].mjs",
      format: "es",
      sourcemap: true,
      banner: "#!/usr/bin/env node"
    }
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json"
    }),
    json()
  ]
});
