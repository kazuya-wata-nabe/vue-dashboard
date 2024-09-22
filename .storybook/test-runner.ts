import { screenshot } from "storycap-testrun"
import type { TestRunnerConfig } from "@storybook/test-runner"

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    if (!process.env.SCREEN_SHOT) return
    await screenshot(page, context, {
      /* some options */
    })
  },
}

export default config
