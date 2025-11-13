import { defineConfig, mergeConfig } from "vitest/config"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import vitestConfig from "./vitest.config"

export default mergeConfig(
  vitestConfig,
  defineConfig({
    plugins: [
      storybookTest({
        configDir: ".storybook",
      }),
    ],
    test: {
      name: "storybook",
      browser: {
        enabled: false,
        headless: true,
      },
      environment: "happy-dom",
      include: ["**/*.stories.ts"],
      setupFiles: ["./setup-file.storybook.ts"],
    },
  }),
)
