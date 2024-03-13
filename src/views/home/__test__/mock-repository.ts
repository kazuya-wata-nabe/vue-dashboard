import { DateFormatter } from "@/views/__shared__/date-formatter"
import { Book, type BookListQueryService } from "../model"

const d = DateFormatter.parse
export class MockQueryService implements BookListQueryService {
  async fetch(): Promise<Book[]> {
    return [
      Book({
        id: "abc-2",
        title: "fugafuga",
        borrowDate: d("2021-01-01"),
        returnDate: d("2021-03-10"),
      }),
    ]
  }
}

export const fixture = [
  Book({
    id: "abc-2",
    title: "piyopiyo",
    borrowDate: d("2021-01-01"),
    returnDate: d("2021-03-10"),
  }),
]
export const fixture2 = [
  Book({
    id: "abc-2",
    title: "fugafuga",
    borrowDate: d("2021-01-01"),
    returnDate: d("2021-03-10"),
  }),
]
