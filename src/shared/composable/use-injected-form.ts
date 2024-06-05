import { useField, type GenericObject } from "vee-validate"
import type { ZodSchema } from "zod"

/**
 * 親コンポーネントで定義したschemaを子コンポーネントで参照するための関数
 * 使うシーンはあんまりないはず
 */
export const useInjectedForm = <T extends GenericObject>(filed: ZodSchema) => {
  const defineField = <U extends keyof T>(key: U) => {
    const { value } = useField<T[U]>(() => `${filed}.${key.toString()}`, {})
    return [value, {}] as const
  }

  return {
    defineField,
  }
}
