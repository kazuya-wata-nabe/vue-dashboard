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
  (book: ApiResponse<"Book">): Book => {
    return {
      id: book.id,
      title: book.title,
      borrowDate: book.borrowDate,
      returnDate: book.returnDate,
      isOverReturnDate: isAfter(book.returnDate, date),
    }
  }
