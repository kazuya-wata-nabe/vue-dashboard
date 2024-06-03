import z, { ZodString, type ZodTypeAny } from "zod"
import { isAfter, isSame } from "@/shared/lib/date"

export { type TypeOf as ToSchema } from "zod"

type StringValidate = "email" | ["max", number] | ["min", number]

const messages = {
  max: (n: number) => `${n}文字以内で入力してください`,
  min: (n: number) => `${n}文字以上で入力してください`,
  email: "メール形式で入力してください",
}

const _register = (value: ZodString | ZodString, rule: StringValidate) => {
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

const register = (value: ZodString) => (args: StringValidate[]) => {
  return args.reduce((acc, rule) => _register(acc, rule), value)
}

export const required = {
  string: (...args: StringValidate[]) =>
    register(z.string({ required_error: "必須項目です" }).min(1, "必須項目です"))(args),
  array: <T extends ZodTypeAny>(schema: T) =>
    z.array(schema, { required_error: "必須項目です" }).min(1, "必須項目です").default([]),
}

export const optional = {
  string: (...args: StringValidate[]) =>
    register(z.string({ required_error: "" }))(args).optional(),
  array: (schema: z.ZodTypeAny) => z.array(schema).default([]).optional(),
}

export const createSchema = <T extends z.ZodRawShape>(shape: T) => z.object(shape)

type NewOld<T extends string> = {
  [P in `new${T}` | `old${T}`]: string
}
type FromTo<T extends string> = {
  [P in `${T}From` | `${T}To`]: string
}

export const refines = () => ({
  confirm: <T extends string>(key: T, label: string) => ({
    fn: (schema: NewOld<T>) => {
      const newValue = schema[`new${key}`]
      const oldValue = schema[`old${key}`]
      if (newValue && oldValue) {
        return newValue === oldValue
      }
      return true
    },
    message: {
      path: [`new${key}`, `old${key}`],
      message: `${label}が一致しません`,
    },
  }),
  fromTo: <T extends string>(key: T) => ({
    fn: (schema: FromTo<T>) => {
      const from = schema[`${key}From`]
      const to = schema[`${key}From`]
      if (from && to) {
        return isAfter(from, to) && isSame(from, to, "day")
      }
      return true
    },
    message: {
      path: [`${key}From`, `${key}To`],
      message: "invalid from to",
    },
  }),
})
