import type { BookWriteModel } from "./book"

export interface BookRepository {
  save(book: BookWriteModel): Promise<void>
}
