/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

const WARNING = Boolean(process.env.STRICT_LINT) === true ? "error" : "warn"

module.exports = {
  root: true,
  plugins: ["prefer-arrow-functions", "no-relative-import-paths"],
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
    "@typescript-eslint/no-unused-vars": WARNING,
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "prettier/prettier": WARNING,
    "prefer-arrow-functions/prefer-arrow-functions": ["error"],
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      {
        allowSameFolder: false,
        rootDir: "src",
        prefix: "@",
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.test.ts", " **/*.stories.ts"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-relative-import-paths/no-relative-import-paths": "off",
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
