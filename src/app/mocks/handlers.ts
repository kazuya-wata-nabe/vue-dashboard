import type { paths } from "@/shared/api/v1.schema"
import { createOpenApiHttp } from "openapi-msw"

const http = createOpenApiHttp<paths>()

export const handlers = [
  http.get("/books", ({ response }) => {
    return response(200).json([])
  }),
  http.get("/me", ({ response }) => {
    return response(200).json({ role: "ADMIN" })
  }),
  http.post("/login", async ({ request, response }) => {
    const body = await request.json()
    if (body?.email === "test@example.com" && body?.password === "passw0rd") {
      return response(201).json({ "access-token": "ok" })
    }
    return response(400).json([])
  }),
]
