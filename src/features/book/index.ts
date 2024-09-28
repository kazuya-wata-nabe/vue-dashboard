import type { ApiResponse } from "@/shared/api/response"
import { format, isAfter, today } from "@/shared/lib/date"
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
      borrowDate: format(res.borrowDate, "/"),
      returnDate: format(res.returnDate, "/"),
      isOverReturnDate: isAfter(date ?? today(), res.returnDate),
    }
  }

export const schema = createSchema(
  {
    title: required.string(["max", 50]),
    borrowDate: required.string(),
    returnDate: required.string(),
  },
  [["borrowDate"], (value) => value.borrowDate === value.returnDate, "NG"],
)

export type BookWriteModel = ToSchema<typeof schema>
