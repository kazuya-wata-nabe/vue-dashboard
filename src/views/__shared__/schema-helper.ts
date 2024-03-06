import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import z from "zod"

export const required = {
  string: () => z.string({ required_error: "必須項目です" }),
}

export const optional = {
  string: () => z.string({ required_error: "" }),
}

export const makeSchema = <T extends z.ZodRawShape>(shape: T) => z.object(shape)

export const useCustomForm = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
  const { defineField, errors, handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  })

  return {
    defineField,
    isSubmitting,
    errors,
    handleSubmit,
  }
}
