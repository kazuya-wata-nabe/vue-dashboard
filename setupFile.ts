// Storybook's preview file location
import "@testing-library/jest-dom/vitest";
import globalStorybookConfig from "./.storybook/preview";

import { setProjectAnnotations } from "@storybook/vue3";

setProjectAnnotations(globalStorybookConfig)
