import type { paths } from "./v1.schema"
import createClient, { type Middleware } from "openapi-fetch"

const baseUrl: string = import.meta.env.API_BASE_URL ?? ""

const accessToken: string | undefined = undefined

const authMiddleware: Middleware = {
  onRequest: async (req) => {
    const token = localStorage.getItem("token")
    if (token) {
      req.headers.set("Authorization", `Bearer ${accessToken}`)
    }

    return req
  },
}

const instance = createClient<paths>({ baseUrl })
instance.use(authMiddleware)

export const client = {
  GET: instance.GET,
  POST: instance.POST,
  PUT: instance.PUT,
  DELETE: instance.DELETE,
} as const
