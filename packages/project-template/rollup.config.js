import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "./src/index.ts",
  output: [
    {
      file: "dist/index.mjs",
      format: "es",
      sourcemap: true
    }
  ],
  external: ["fs", "path", "child_process", "util", "execa", "ora"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json"
    })
  ]
});
