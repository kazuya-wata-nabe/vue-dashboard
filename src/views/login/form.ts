import { createSchema, required } from "@/shared/lib/schema-helper"
import { type ToSchema } from "@/shared/lib/schema-helper/wrapper"

export const loginSchema = createSchema({
  id: required.string(),
  password: required.string(),
})

export type LoginSchema = ToSchema<typeof loginSchema>
