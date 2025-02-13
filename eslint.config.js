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
      "implicit-arrow-linebreak": "off",
      "object-property-newline": "off",
      "@typescript-eslint/naming-convention": "off",
      "lines-around-comment": "off",
      "no-await-in-loop": "off",
      "import/exports-last": "off",
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  {
    ignores: [
      "**/project-template/template/vue/**",
      "**/project-template/template/react/**"
    ]
  }
];
