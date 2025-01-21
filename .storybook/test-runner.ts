import { screenshot } from "storycap-testrun"
import type { TestRunnerConfig } from "@storybook/test-runner"

const config: TestRunnerConfig = {
  postVisit: async (page, context) => {
    if (!process.env.SCREEN_SHOT) return
    await screenshot(page, context, {
      flakiness: {
        metrics: {
          retries: 3000,
        },
        retake: {
          interval: 500,
          retries: 20,
        },
      },
    })
  },
}

export default config
