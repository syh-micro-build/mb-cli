import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "./bin/cli.ts",
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true
    }
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json"
    })
  ]
});
