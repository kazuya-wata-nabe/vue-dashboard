import { createSchema, optional, type ToSchema } from "@/shared/lib/schema-helper"

export const schema = createSchema({
  date: optional.string(),
})

export type Schema = ToSchema<typeof schema>
