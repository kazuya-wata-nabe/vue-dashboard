import { setupWorker } from "msw/browser"
import { handlers } from "src/__mocks__/handlers"

export const worker = setupWorker(...handlers)
