import z, { type ZodString, type ZodRawShape, type ZodTypeAny } from "zod"

type OmitField = "refine" | "superRefine"
export type ToSchema<T extends Omit<z.ZodTypeAny, OmitField>> = z.TypeOf<
  T & { [O in OmitField]: z.ZodTypeAny[O] }
>

export type ZodSchema<T extends { [x: string]: unknown }> = Omit<z.ZodSchema<T>, OmitField>
export type WithRefine<T extends { [x: string]: unknown }> = z.ZodSchema<T>

type StringValidate = "email" | ["max", number] | ["min", number]
const messages = {
  email: "メール形式で入力してください",
  max: (n: number) => `${n}文字以内で入力してください`,
  min: (n: number) => `${n}文字以上で入力してください`,
} as const

const registerStringValidate = (value: ZodString, rule: StringValidate) => {
  const lengthValidate = rule[0] === "max" || rule[0] === "min"
  if (Array.isArray(rule) && lengthValidate) {
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
  return z.array(schema, { required_error: "必須項目です" }).min(1, "必須項目です")
}

const optionalArray = <T extends ZodTypeAny>(schema: T) => {
  return z.array(schema, { required_error: "" }).optional()
}

export const required = {
  string: requiredString,
  array: requiredArray,
}

export const optional = {
  string: optionalString,
  array: optionalArray,
}

type ZObjCustom<T extends ZodRawShape> = Omit<z.ZodObject<T>, OmitField>
export const createSchema = <T extends ZodRawShape>(shape: T): ZObjCustom<T> => z.object(shape)
