import type { ApiResponse } from "@/shared/api/response"

export interface BookRepository {
  list: ApiResponse<"Book">
}
