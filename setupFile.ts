import { server } from "@/__tests__/server"
import { setProjectAnnotations } from "@storybook/vue3"
import "@testing-library/jest-dom/vitest"
import { afterAll, afterEach, beforeAll } from "vitest"
import globalStorybookConfig from ".storybook/preview"

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

setProjectAnnotations(globalStorybookConfig)
