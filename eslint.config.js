import EsLint from "mb-eslint-config";

export default [
  ...EsLint,
  {
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "padding-line-between-statements": "off",
      "eol-last": "off",
      "no-console": "off",
      "object-curly-newline": "off",
      indent: ["error", 2],
      "prefer-template": "off",
      quotes: "off",
      "function-paren-newline": "off",
      "dot-location": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "implicit-arrow-linebreak": "off",
      "object-property-newline": "off",
      "@typescript-eslint/naming-convention": "off",
      "lines-around-comment": "off"
    }
  }
];
