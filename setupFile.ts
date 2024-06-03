import { afterAll, afterEach, beforeAll } from "vitest"
import { setProjectAnnotations } from "@storybook/vue3"
import "@testing-library/jest-dom/vitest"
import { server } from "@/shared/__tests__/server"
import globalStorybookConfig from ".storybook/preview"

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

setProjectAnnotations(globalStorybookConfig)
