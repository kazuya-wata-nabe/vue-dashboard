import { afterAll, afterEach, beforeAll } from "vitest"
import { setProjectAnnotations } from "@storybook/vue3-vite"
import "@testing-library/jest-dom/vitest"
import { server } from "@/app/mocks/server"
import * as globalStorybookConfig from "./.storybook/preview"

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

setProjectAnnotations(globalStorybookConfig)
