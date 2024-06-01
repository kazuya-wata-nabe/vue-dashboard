import type { ApiResponse } from "@/shared/api/response"
import { isAfter } from "@/shared/lib/date"

export type Book = {
  id: number
  title: string
  borrowDate: string
  returnDate: string
  isOverReturnDate: boolean
}

export const createBook =
  (date: string) =>
  (res: ApiResponse<"BookSuccess">[number]): Book => {
    return {
      id: res.id,
      title: res.title,
      borrowDate: res.borrowDate,
      returnDate: res.returnDate,
      isOverReturnDate: isAfter(date, res.returnDate),
    }
  }
