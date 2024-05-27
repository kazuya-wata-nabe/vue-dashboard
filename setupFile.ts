// Storybook's preview file location
import globalStorybookConfig from ".storybook/preview"
import { setProjectAnnotations } from "@storybook/vue3"
import "@testing-library/jest-dom/vitest"

setProjectAnnotations(globalStorybookConfig)
