import * as zod from "zod"

const required = {
  string: () => zod.string({ required_error: "必須項目です" }),
}

export const schema = zod.object({
  title: required.string().max(1, "aaaa"),
  borrowDate: required.string(),
  returnDate: required.string(),
})

export type BookWriteModel = {
  title: string
  borrowDate: Date
  returnDate: Date
}
