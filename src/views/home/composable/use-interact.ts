import { onMounted, ref } from "vue"
import { createBook, type Book } from "@/entities/book"
import { client } from "@/shared/api/client"
import { today } from "@/shared/lib/date"

export const useInteract = () => {
  const books = ref<Book[]>([])

  onMounted(async () => {
    const { data, error } = await client.GET("/books")
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
