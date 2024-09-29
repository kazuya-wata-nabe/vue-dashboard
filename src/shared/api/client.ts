import createClient from "openapi-fetch"
import type { paths } from "@/shared/api/v1.schema"

/**
 * @see {@link https://openapi-ts.pages.dev/openapi-fetch}
 */
const baseUrl: string = import.meta.env.API_BASE_URL ?? ""

const instance = createClient<paths>({ baseUrl })

export const clientMiddleware = {
  USE: instance.use,
  EJECT: instance.eject,
} as const

export const client = {
  GET: instance.GET,
  POST: instance.POST,
  PUT: instance.PUT,
  DELETE: instance.DELETE,
} as const
