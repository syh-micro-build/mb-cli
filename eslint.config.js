import EsLint from "mb-eslint-config";

export default [
  ...EsLint,
  {
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "padding-line-between-statements": "off",
      "eol-last": "off",
      "no-console": "off"
    }
  }
];
