import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"
import { wsHandlers } from "./ws-handlers"

/** @see {@link https://mswjs.io/docs/integrations/browser} */
export const worker = setupWorker(...handlers, ...wsHandlers)
