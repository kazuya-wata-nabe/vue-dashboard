import { defineWorkspace } from "vitest/config"
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin"
import { storybookVuePlugin } from "@storybook/vue3-vite/vite-plugin"

export default defineWorkspace([
  "vitest.config.ts",
  {
    extends: "vite.config.ts",
    plugins: [storybookTest(), storybookVuePlugin()],
    test: {
      name: "storybook",
      browser: {
        enabled: false,
        headless: true,
        name: "chromium",
        provider: "playwright",
      },
      environment: "happy-dom",
      include: ["**/*.stories.ts"],
      setupFiles: ["./setup-file.storybook.ts"],
    },
  },
])
