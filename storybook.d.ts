import { ScreenshotParameters } from "storycap-testrun"

declare module "@storybook/vue3" {
  interface Parameters {
    screenshot?: ScreenshotParameters
  }
}
