import "@testing-library/jest-dom/vitest"
// Storybook's preview file location
import { setProjectAnnotations } from "@storybook/vue3"
import globalStorybookConfig from "./.storybook/preview"

setProjectAnnotations(globalStorybookConfig)
