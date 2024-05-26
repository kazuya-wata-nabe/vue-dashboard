import { onMounted, ref } from "vue"
import { createBook, type Book } from "@/domain/book"
import { fetchBookList } from "@/domain/book/api"
import { today } from "@/shared/lib/date"

export const useInteract = () => {
  const books = ref<Book[]>([])

  onMounted(async () => {
    const { failure, res } = await fetchBookList()
    if (failure) {
      console.debug(res)
    } else {
      books.value = res.map(createBook(today()))
    }
  })

  return {
    books,
  }
}
