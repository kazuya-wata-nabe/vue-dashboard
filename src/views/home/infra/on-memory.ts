import { Book, type BookListQueryService } from "../model"

export class BookQueryServiceOnMemory implements BookListQueryService {
  async fetch() {
    await new Promise((resolve) => setTimeout(resolve, 1 * 1000))
    return [
      Book({
        id: "abc-1",
        title: "hogehoge",
        borrowDate: "2021-01-01",
        returnDate: "2021-03-10",
      }),
      Book({
        id: "abc-2",
        title: "fugafuga",
        borrowDate: "2021-01-01",
        returnDate: "2021-03-09",
      }),
    ]
  }
}
