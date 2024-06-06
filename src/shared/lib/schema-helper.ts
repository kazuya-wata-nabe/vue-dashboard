import z, { ZodString, type ZodTypeAny } from "zod"

export { type TypeOf as ToSchema } from "zod"

type StringValidate = "email" | ["max", number] | ["min", number]

const messages = {
  max: (n: number) => `${n}文字以内で入力してください`,
  min: (n: number) => `${n}文字以上で入力してください`,
  email: "メール形式で入力してください",
}

const _registerString = (value: ZodString, rule: StringValidate) => {
  if (Array.isArray(rule) && rule[0] === "max") {
    const [, n] = rule
    return value.max(n, messages.max(n))
  }
  if (Array.isArray(rule) && rule[0] === "min") {
    const [, n] = rule
    return value.min(n, messages.min(n))
  }

  return value[rule](messages[rule])
}

const registerString = (value: ZodString) => (rules: StringValidate[]) => {
  return rules.reduce((acc, rule) => _registerString(acc, rule), value)
}

export const required = {
  string: (...args: StringValidate[]) => {
    const value = z.string({ required_error: "必須項目です" }).min(1, "必須項目です")
    return registerString(value)(args)
  },
  array: <T extends ZodTypeAny>(schema: T) => {
    return z.array(schema, { required_error: "必須項目です" }).min(1, "必須項目です").default([])
  },
}

export const optional = {
  string: (...args: StringValidate[]) => {
    const value = z.string({ required_error: "" })
    return registerString(value)(args).optional()
  },
  array: (schema: z.ZodTypeAny) => {
    return z.array(schema).default([]).optional()
  },
}

export const createSchema = <T extends z.ZodRawShape>(shape: T) => z.object(shape)
