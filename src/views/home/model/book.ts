import type { Brand } from "@/views/__shared__/brand"
import { DateFormatter } from "@/views/__shared__/date-formatter"

type BookId = Brand<string, "BookId">
type Title = Brand<string, "Title">

type BorrowDate = Brand<string, "BorrowDate">
type ReturnDate = Brand<string, "ReturnDate">

const BookId = (value: string) => value as BookId

const MAX_LENGTH = 255
const Title = (value: string) => {
  if (value.length > MAX_LENGTH) {
    throw new Error(`titleは${MAX_LENGTH}以下にしてください`)
  }
  return value as Title
}

const BorrowDate = (value: Date) => DateFormatter.format(value) as BorrowDate
const ReturnDate = (value: Date) => DateFormatter.format(value) as ReturnDate

export type Book = {
  id: BookId
  title: Title
  borrowDate: BorrowDate
  returnDate: ReturnDate
}

type Params = {
  id: string
  title: string
  borrowDate: Date
  returnDate: Date
}

export const Book = (params: Params) => {
  return {
    id: BookId(params.id),
    title: Title(params.title),
    borrowDate: BorrowDate(params.borrowDate),
    returnDate: ReturnDate(params.returnDate),
  }
}
