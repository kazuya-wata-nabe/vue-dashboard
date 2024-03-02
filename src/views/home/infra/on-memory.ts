import { DateFormatter } from "@/views/__shared__/date-formatter"
import { Book, type BookRepository } from "../model"

const d = DateFormatter.parse
export class BookRepositoryOnMemory implements BookRepository {
  async fetch() {
    return [
      Book({
        id: "abc-1",
        title:
          "hogehogeaaaaaaaaahogehogeaaaaaaaaahogehogeaaaaaaaaahogehogeaaaaaaaaahogehogeaaaaaaaaa",
        borrowDate: d("2020-01-01"),
        returnDate: d("2020-02-01"),
      }),
      Book({
        id: "abc-2",
        title: "fugafuga",
        borrowDate: d("2021-01-01"),
        returnDate: d("2021-03-10"),
      }),
    ]
  }
}
