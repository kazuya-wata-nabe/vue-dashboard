import type { Book } from "./book"

export interface BookListQueryService {
  fetch(): Promise<Book[]>
}
