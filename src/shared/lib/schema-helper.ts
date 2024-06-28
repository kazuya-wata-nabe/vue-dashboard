import z, { ZodString } from "zod"

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

const string =
  (mode: "required" | "optional") =>
  (...rules: StringValidate[]) => {
    const value =
      mode === "required"
        ? z.string({ required_error: "必須項目です" }).min(1, "必須項目です")
        : z.string({ required_error: "" })

    return (rules ?? []).reduce((acc, rule) => registerStringValidate(acc, rule), value)
  }

const array = (mode: "required" | "optional") => (schema: z.ZodTypeAny) => {
  const value =
    mode === "required"
      ? z.array(schema).min(1, "必須項目です").default([])
      : z.array(schema).default([]).optional()

  return value
}

export const required = {
  string: string("required"),
  array: array("required"),
}

export const optional = {
  string: string("optional"),
  array: array("optional"),
}

export const createSchema = <T extends z.ZodRawShape>(shape: T) => z.object(shape)
