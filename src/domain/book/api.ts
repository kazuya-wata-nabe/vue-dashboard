import { client } from "@/shared/api/client"

export const fetchBookList = async () => {
  const result = await client.GET("/books", {
    params: {
      query: undefined,
    },
  })
  return result
}
