// Storybook's preview file location
import { setProjectAnnotations } from "@storybook/vue3"
import "@testing-library/jest-dom/vitest"
import globalStorybookConfig from "./.storybook/preview"

setProjectAnnotations(globalStorybookConfig)
