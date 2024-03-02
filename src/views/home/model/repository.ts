import type { Book } from "./book"

export interface BookRepository {
  fetch(): Promise<Book[]>
}
