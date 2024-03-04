import { makeSchema, optional } from "../__shared__/schema-helper"

export const loginSchema = makeSchema({
  id: optional.string(),
  password: optional.string(),
})
