import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths"
import preferArrowFunctions from "eslint-plugin-prefer-arrow-functions"
import eslintPluginStorybook from "eslint-plugin-storybook"
import eslintPluginUnicorn from "eslint-plugin-unicorn"
import pluginVue from "eslint-plugin-vue"
import vuejsA11y from "eslint-plugin-vuejs-accessibility"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { includeIgnoreFile } from "@eslint/compat"
import vitest from "@vitest/eslint-plugin"
import eslintConfigPrettier from "@vue/eslint-config-prettier"
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting"
import vueTsEslintConfig from "@vue/eslint-config-typescript"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")

const WARN = process.env.STRICT_LINT === "true" ? "error" : "warn"

export default [
  includeIgnoreFile(gitignorePath),
  {
    ignores: ["src/assets", "**/*.config.ts", "**/*.json", "**/*.js"],
  },
  eslintPluginUnicorn.configs["flat/recommended"],
  eslintConfigPrettier,
  skipFormatting,
  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),
  ...eslintPluginStorybook.configs["flat/recommended"],
  {
    plugins: {
      "prefer-arrow-functions": preferArrowFunctions,
      "no-relative-import-paths": noRelativeImportPaths,
      "vuejs-accessibility": vuejsA11y,
    },

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
    },

    rules: {
      eqeqeq: "error",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": WARN,
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "prettier/prettier": WARN,
      "prefer-arrow-functions/prefer-arrow-functions": ["error"],

      "vuejs-accessibility/label-has-for": [
        "error",
        {
          required: {
            every: ["id"],
          },
        },
      ],

      "unicorn/prefer-top-level-await": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/switch-case-braces": "off",

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

      "no-redeclare": WARN,
    },
  },
  {
    files: ["**/*.stories.ts"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  {
    files: ["**/*.test.ts"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "@typescript-eslint/no-non-null-assertion": "off",
      "vitest/consistent-test-it": ["error", { fn: "it" }],
      "vitest/max-nested-describe": ["error", { max: 2 }],
    },
  },
]
