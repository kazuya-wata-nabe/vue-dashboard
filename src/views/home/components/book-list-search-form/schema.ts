import { createSchema, optional } from "@/shared/lib/schema-helper"

export const schema = createSchema({
  /** name */
  name: optional.string(),
})
