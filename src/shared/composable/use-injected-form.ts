import { useField, type GenericObject } from "vee-validate"
import type { ZodSchema } from "zod"

export const useInjectedForm = <T extends GenericObject>(filed: ZodSchema) => {
  const defineField = <U extends keyof T>(key: U) => {
    const { value } = useField<T[U]>(() => `${filed}.${key.toString()}`, {})
    return [value, {}] as const
  }

  return {
    defineField,
  }
}
