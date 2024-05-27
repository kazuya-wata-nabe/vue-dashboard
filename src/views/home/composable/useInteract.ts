import { onMounted, ref } from "vue"
import { createBook, type Book } from "@/domain/book"
import { fetchBookList } from "@/domain/book/api"
import { today } from "@/shared/lib/date"

export const useInteract = () => {
  const books = ref<Book[]>([])

  onMounted(async () => {
    const { data, error } = await fetchBookList()
    if (error) {
      console.debug(error)
    } else {
      books.value = data.map(createBook(today()))
    }
  })

  return {
    books,
  }
}
