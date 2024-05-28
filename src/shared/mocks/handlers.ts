import { createOpenApiHttp } from "openapi-msw"
import type { paths } from "@/shared/api/v1.schema"

const http = createOpenApiHttp<paths>()

export const handlers = [
  http.get("/books", ({ response }) => {
    return response(200).json([])
  }),
]
