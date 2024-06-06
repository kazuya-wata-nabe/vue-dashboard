/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

const WARNING = Boolean(process.env.STRICT_LINT) === true ? "error" : "warn"

module.exports = {
  root: true,
  plugins: ["prefer-arrow-functions", "no-relative-import-paths", "strict-dependencies"],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "plugin:unicorn/recommended",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: ["src/assets", "*.config.ts", "*.json"],
  rules: {
    eqeqeq: "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": WARNING,
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "prettier/prettier": WARNING,
    "prefer-arrow-functions/prefer-arrow-functions": ["error"],
    /** @see {@link https://github.com/sindresorhus/eslint-plugin-unicorn} */
    "unicorn/prefer-top-level-await": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/switch-case-braces": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
        ignore: ["App.vue"],
      },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      {
        allowSameFolder: true,
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
