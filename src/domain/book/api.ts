import { client } from "@/shared/api/client/client"
import { type Failure, type Success } from "@/shared/api/response"

type BookSuccess = Success<"Book">
type BookFailure = Failure<"Book">
export const fetchBookList = async () => {
  const result = await client.GET<BookSuccess[], BookFailure>("/books")
  return result
}
