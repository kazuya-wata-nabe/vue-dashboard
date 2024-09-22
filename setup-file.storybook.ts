import { beforeAll } from "vitest"
import { setProjectAnnotations } from "@storybook/vue3"
import "@testing-library/jest-dom/vitest"
import * as projectAnnotations from "./.storybook/preview.vitest"

const project = setProjectAnnotations([projectAnnotations])

beforeAll(project.beforeAll)
