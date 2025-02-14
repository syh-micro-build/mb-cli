import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "./bin/cli.ts",
  output: [
    {
      file: "dist/index.mjs",
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json"
    }),
    json()
  ]
});
