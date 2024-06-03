import { handlers } from "@/app/mocks/handlers"
import { setupServer } from "msw/node"

export const server = setupServer(...handlers)
