import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

const needCheckFiles = [
  "packages/docs/src/**/*.ts",
  "packages/docs/src/**/*.tsx",
  "packages/docs/src/**/*.js",
  "packages/component/src/**/*.ts",
  "packages/component/src/**/*.tsx",
  "packages/component/src/**/*.js",
];

/** @type {Array<import("eslint").Linter.FlatConfig>} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    ...pluginJs.configs.recommended,
    files: needCheckFiles,
  },
  ...tseslint.configs.recommended?.map((i) => ({
    ...i,
    files: needCheckFiles,
  })),
  { ...pluginReactConfig, files: needCheckFiles },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-useless-escape": "off",
      "no-console": "error",
    },
  },
];
