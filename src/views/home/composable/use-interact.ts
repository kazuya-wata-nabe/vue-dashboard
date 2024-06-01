import { onMounted, ref } from "vue"
import { createBook, type Book } from "@/features/book"
import { client } from "@/shared/api/client"

export const useInteract = (date: () => string) => {
  const books = ref<Book[]>()

  onMounted(async () => {
    const { data, error } = await client.GET("/books")
    if (error) {
      console.debug(error)
    } else {
      books.value = data.map(createBook(date()))
    }
  })

  return {
    books,
  }
}
