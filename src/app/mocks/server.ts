import { setupServer } from "msw/node"
import { handlers } from "./handlers"

/** @see {@link https://mswjs.io/docs/integrations/node} */
export const server = setupServer(...handlers)
