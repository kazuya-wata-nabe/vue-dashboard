import type { BookRepository, BookWriteModel } from "../model"
/** @protected */
export class BookRepositoryOnMemory implements BookRepository {
  async save(book: BookWriteModel) {
    await new Promise((resolve) => setTimeout(resolve, 1 * 1000))

    console.debug(JSON.stringify(book, null, 2))
  }
}
