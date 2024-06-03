import type { components } from "@/shared/api/v1.schema"

export type ApiSchema<T extends keyof components["schemas"]> = components["schemas"][T]

type KeyofResponses = Exclude<keyof components["responses"], "BadRequest">

export type ApiResponse<T extends KeyofResponses> = components["responses"][T] extends {
  content: { "application/json": unknown }
}
  ? components["responses"][T]["content"]["application/json"]
  : never

export type ApiQuery<T extends keyof components["parameters"]> =
  components["parameters"][T] extends {
    content: { "application/json": unknown }
  }
    ? components["parameters"][T]
    : never
