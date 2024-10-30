import { createSchema, required, type ToSchema } from "@/shared/lib/schema-helper"

export const loginSchema = createSchema({
  email: required.string(),
  password: required.string(),
})

export type LoginSchema = ToSchema<typeof loginSchema>
