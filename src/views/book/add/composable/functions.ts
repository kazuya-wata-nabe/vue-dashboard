import type { ApiSchema } from "@/shared/api/response"

export const handleSubmitError = (e: ApiSchema<"BadRequestError">[]) => {
  alert(JSON.stringify(e, undefined, 2))
}
