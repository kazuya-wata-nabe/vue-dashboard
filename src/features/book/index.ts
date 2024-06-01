import type { ApiResponse } from "@/shared/api/response"
import { isAfter } from "@/shared/lib/date"
import { dateFormatter } from "@/shared/lib/formatter"

export type Book = ApiResponse<"BookSuccess">[number] & {
  isOverReturnDate: boolean
}

export const createBook =
  (date: string) =>
  (res: ApiResponse<"BookSuccess">[number]): Book => {
    return {
      id: res.id,
      title: res.title,
      borrowDate: dateFormatter(res.borrowDate, "/"),
      returnDate: dateFormatter(res.returnDate, "/"),
      isOverReturnDate: isAfter(date, res.returnDate),
    }
  }
