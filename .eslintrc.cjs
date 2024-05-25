/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  plugins: ["prefer-arrow-functions"],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: ["src/assets", "*.config.ts", "*.json"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "prettier/prettier": "warn",
    "prefer-arrow-functions/prefer-arrow-functions": ["error"],
  },
  overrides: [
    {
      files: ["**/*.test.ts", " **/*.stories.ts"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
    {
      files: [" **/*.stories.ts"],
      rules: {
        "prettier/prettier": "off",
      },
    },
  ],
}
