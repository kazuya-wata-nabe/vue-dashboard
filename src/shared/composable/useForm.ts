import { toTypedSchema } from "@vee-validate/zod"
import {
  useForm as _useForm,
  type BaseFieldProps,
  type GenericObject,
  type Path,
  type PathValue,
} from "vee-validate"
import type { ZodSchema } from "zod"
import type { Ref } from "vue"

const toKebabCase = (str: string) => {
  return str
    .replace(/^ *?[A-Z]/, (allStr) => allStr.toLowerCase())
    .replace(/_/g, "-")
    .replace(/ *?[A-Z]/g, (allStr) => "-" + allStr.replace(/ /g, "").toLowerCase())
}

type Return<T extends GenericObject> = ReturnType<typeof _useForm<T>>
type UserForm<T extends GenericObject> = {
  resetForm: Return<T>["resetForm"]
  setValues: Return<T>["setValues"]
  validate: Return<T>["validate"]
  setErrors: Return<T>["setErrors"]
  defineField: (
    path: Path<T>,
  ) => readonly [
    Ref<PathValue<T, Path<T>>>,
    Ref<BaseFieldProps & { id: string; errorMessage: string | undefined }>,
  ]
  handleSubmit: Return<T>["handleSubmit"]
}

export const useForm = <T extends GenericObject>(schema: ZodSchema): UserForm<T> => {
  const {
    defineField: _defineField,
    validate,
    setValues,
    setErrors,
    resetForm,
    handleSubmit,
    errors,
  } = _useForm<T>({
    validationSchema: toTypedSchema(schema),
  })

  const defineField: UserForm<T>["defineField"] = (path: Path<T>) => {
    const [model, attrs] = _defineField(path, {
      props: () => ({
        id: toKebabCase(path),
        errorMessage: errors.value[path],
      }),
    })

    return [model, attrs] as const
  }

  return {
    defineField,
    resetForm,
    setValues,
    validate,
    setErrors,
    handleSubmit,
  }
}
