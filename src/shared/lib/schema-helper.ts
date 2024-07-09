import z, { type ZodString, type ZodRawShape, type ZodTypeAny } from "zod"

export { type TypeOf as ToSchema } from "zod"

type StringValidate = "email" | ["max", number] | ["min", number]

const messages = {
  max: (n: number) => `${n}文字以内で入力してください`,
  min: (n: number) => `${n}文字以上で入力してください`,
  email: "メール形式で入力してください",
} as const

const registerStringValidate = (value: ZodString, rule: StringValidate) => {
  if (Array.isArray(rule) && (rule[0] === "max" || rule[0] === "min")) {
    const [key, n] = rule
    return value[key](n, messages[key](n))
  }

  return value[rule](messages[rule])
}

const register = (initValue: ZodString, rules: StringValidate[]) => {
  let value = initValue
  for (const rule of rules ?? []) {
    value = registerStringValidate(value, rule)
  }
  return value
}

const requiredString = (...rules: StringValidate[]) => {
  const initValue = z.string({ required_error: "必須項目です" }).min(1, "必須項目です")
  return register(initValue, rules)
}

const optionalString = (...rules: StringValidate[]) => {
  const initValue = z.string({ required_error: "" })
  return register(initValue, rules).optional()
}

const requiredArray = <T extends ZodTypeAny>(schema: T) => {
  return z.array(schema).min(1, "必須項目です")
}

const optionalArray = <T extends ZodTypeAny>(schema: T) => {
  return z.array(schema).optional()
}

export const required = {
  string: requiredString,
  array: requiredArray,
}

export const optional = {
  string: optionalString,
  array: optionalArray,
}

export const createSchema = <T extends ZodRawShape>(shape: T) => z.object(shape)
