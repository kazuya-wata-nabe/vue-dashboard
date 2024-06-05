import type { Ref } from "vue"
import {
  useForm,
  type BaseFieldProps,
  type FormContext,
  type GenericObject,
  type Path,
  type PathValue,
} from "vee-validate"
import type { ZodSchema } from "zod"
import { toTypedSchema } from "@vee-validate/zod"

type DefineFieldReturn<T extends GenericObject> = [
  Ref<PathValue<T, Path<T>>>,
  Ref<BaseFieldProps & { errorMessage: string | undefined }>,
]

type UserForm<T extends GenericObject> = Pick<
  FormContext<T>,
  "resetForm" | "setErrors" | "validate" | "handleSubmit" | "setValues" | "isSubmitting"
> & {
  defineField: (path: Path<T>, handlers?: Handlers) => DefineFieldReturn<T>
}

type Handlers = {
  onChange: ({ target }: { target: { value: string } }) => void
}

/**
 * vee-validateをラップした関数
 * defineFieldの第２引数にerrorMessageを追加してv-bindで
 * propsに設定できるようにした
 * exportするAPIはPJにあわせてカスタムしてください
 */
export const useCustomForm = <T extends GenericObject>(schema: ZodSchema<T>): UserForm<T> => {
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

  const defineField = (path: Path<T>, handler?: Handlers): DefineFieldReturn<T> => {
    const [model, attrs] = _defineField(path, {
      props: () => ({
        errorMessage: errors.value[path],
        ...handler,
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
