import z, { type ZodRawShape } from "zod"

export const required = {
  string: () => z.string({ required_error: "必須項目です" }),
}

export const optional = {
  string: () => z.string({ required_error: "" }),
}

export const makeSchema = <T extends ZodRawShape>(shape: T) => z.object(shape)
