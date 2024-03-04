import * as zod from "zod"

export const schema = zod.object({
  title: zod.string(),
  borrowDate: zod.string(),
  returnDate: zod.string(),
})

export type BookWriteModel = {
  title: string
  borrowDate: Date
  returnDate: Date
}
