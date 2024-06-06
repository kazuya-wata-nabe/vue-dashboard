import { schema, type BookWriteModel } from "@/features/book"
import { client } from "@/shared/api/client"
import { useCustomForm } from "@/shared/composable/use-custom-form"

export const useInteract = () => {
  const { handleSubmit, isSubmitting, defineField, resetForm } =
    useCustomForm<BookWriteModel>(schema)

  const onClickSubmit = handleSubmit(async (body) => {
    const { error } = await client.POST("/books", { body })
    alert(JSON.stringify(error, undefined, 2))
  })

  const onClickReset = () => resetForm()

  return {
    isSubmitting,
    defineField,
    onClickSubmit,
    onClickReset,
  }
}
