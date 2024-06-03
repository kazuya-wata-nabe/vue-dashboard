import type { ApiResponse } from "@/shared/api/response"
import { isAfter, today } from "@/shared/lib/date"
import { dateFormatter } from "@/shared/lib/formatter"
import { createSchema, required, type ToSchema } from "@/shared/lib/schema-helper"

export type Book = ApiResponse<"BookSuccess">[number] & {
  isOverReturnDate: boolean
}

export const createBook =
  (date: string | undefined) =>
  (res: ApiResponse<"BookSuccess">[number]): Book => {
    return {
      id: res.id,
      title: res.title,
      borrowDate: dateFormatter(res.borrowDate, "/"),
      returnDate: dateFormatter(res.returnDate, "/"),
      isOverReturnDate: isAfter(date ?? today(), res.returnDate),
    }
  }

export const schema = createSchema({
  title: required.string(["max", 50]),
  borrowDate: required.string(),
  returnDate: required.string(),
})

export type BookWriteModel = ToSchema<typeof schema>
