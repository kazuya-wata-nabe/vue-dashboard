import type { Brand } from "@/views/__shared__/brand"
import { DateUtils } from "@/views/__shared__/date-utils"
import { DateYMD } from "@/views/__shared__/date-wrapper"

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

const BorrowDate = (value: string) => DateYMD.valueOf(value)
const ReturnDate = (value: string) => DateYMD.valueOf(value)

export type Book = {
  id: BookId
  title: Title
  borrowDate: DateYMD
  returnDate: DateYMD
}

export type BookViewModel = {
  id: string
  title: string
  borrowDate: string
  returnDate: string
  isOverReturnDate: boolean
}

export const makeBookViewModelFromBook = (book: Book, today: string): BookViewModel => {
  return {
    id: book.id,
    title: book.title,
    borrowDate: book.borrowDate.toString(),
    returnDate: book.returnDate.toString(),
    isOverReturnDate: DateUtils.isAfter(today, book.returnDate.value),
  }
}

type Params = {
  id: string
  title: string
  borrowDate: string
  returnDate: string
}

export const Book = (params: Params): Book => {
  return {
    id: BookId(params.id),
    title: Title(params.title),
    borrowDate: BorrowDate(params.borrowDate),
    returnDate: ReturnDate(params.returnDate),
  }
}
