import { schema, type BookWriteModel } from "@/features/book"
import { client } from "@/shared/api/client"
import { useCustomForm } from "@/shared/composable/use-custom-form"

export const useInteract = () => {
  const { handleSubmit, isSubmitting, defineField, resetForm } =
    useCustomForm<BookWriteModel>(schema)

  const onClickSubmit = handleSubmit(async (body) => {
    const { error } = await client.PUT("/books/{id}", {
      params: { path: { id: "1" } },
      body,
    })
    if (error) {
      alert(JSON.stringify(error, null, 2))
    }
  })

  const onClickReset = () => resetForm()

  /** TODO: implements */
  // const onClickDelete = () => {
  //   throw new Error("not implements")
  // }

  return {
    isSubmitting,
    defineField,
    onClickSubmit,
    onClickReset,
  }
}
