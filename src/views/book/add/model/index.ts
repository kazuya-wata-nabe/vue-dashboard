import { client } from "@/shared/api/client"
import { createSchema, required, type ToSchema } from "@/shared/lib/schema-helper"

export const schema = createSchema({
  title: required.string(["max", 50]),
  borrowDate: required.string(),
  returnDate: required.string(),
})

export type BookWriteModel = ToSchema<typeof schema>

export const postBook = async (form: BookWriteModel) => {
  client.POST("/books", {
    body: {
      title: form.title,
      borrowDate: form.borrowDate,
      returnDate: form.returnDate,
    },
  })
}
