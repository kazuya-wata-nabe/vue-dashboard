import { createBook, type Book } from "@/features/book"
import { client } from "@/shared/api/client"
import { isValid } from "@/shared/lib/date"
import { onMounted, ref } from "vue"

export const useInteract = (date: () => string | undefined) => {
  const books = ref<Book[]>()

  onMounted(async () => {
    const d = date() ?? ""
    const { data = [] } = await client.GET("/books", {
      params: {
        query: {
          "date-from": isValid(d) ? d : undefined,
        },
      },
    })
    books.value = data.map(createBook(date()))
  })

  return {
    books,
  }
}
