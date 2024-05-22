/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "plugin:storybook/recommended",
    "neverthrow",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "neverthrow/must-use-result": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "prettier/prettier": "warn",
  },
}
