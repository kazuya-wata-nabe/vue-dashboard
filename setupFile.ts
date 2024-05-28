import globalStorybookConfig from ".storybook/preview"
import { setProjectAnnotations } from "@storybook/vue3"
import "@testing-library/jest-dom/vitest"
import { afterAll, afterEach, beforeAll } from "vitest"
import { server } from "@/shared/mocks/server"

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

setProjectAnnotations(globalStorybookConfig)
