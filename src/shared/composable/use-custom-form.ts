import { toTypedSchema } from "@vee-validate/zod"
import {
  useForm,
  type BaseFieldProps,
  type FormContext,
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

type DefineFieldReturn<T extends GenericObject> = [
  Ref<PathValue<T, Path<T>>>,
  Ref<BaseFieldProps & { id: string; errorMessage: string | undefined }>,
]
type UserForm<T extends GenericObject> = Pick<
  FormContext<T>,
  "resetForm" | "setErrors" | "validate" | "handleSubmit" | "setValues" | "isSubmitting"
> & {
  defineField: (path: Path<T>) => DefineFieldReturn<T>
}

export const useCustomForm = <T extends GenericObject>(schema: ZodSchema): UserForm<T> => {
  const {
    defineField: _defineField,
    validate,
    setValues,
    setErrors,
    resetForm,
    handleSubmit,
    isSubmitting,
    errors,
  } = useForm<T>({
    validationSchema: toTypedSchema(schema),
  })

  const defineField = (path: Path<T>): DefineFieldReturn<T> => {
    const [model, attrs] = _defineField(path, {
      props: () => ({
        id: toKebabCase(path),
        errorMessage: errors.value[path],
      }),
    })

    return [model, attrs]
  }

  return {
    defineField,
    resetForm,
    setValues,
    validate,
    setErrors,
    isSubmitting,
    handleSubmit,
  }
}
