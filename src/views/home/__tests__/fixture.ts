import type { ApiResponse } from "@/shared/api/response"

export const dummyBooks1: ApiResponse<"BookSuccess"> = [
  {
    id: 2,
    title: "hogehoge",
    borrowDate: "2021-01-01",
    returnDate: "2021-03-10",
  },
]

export const dummyBooks2 = [
  {
    id: 2,
    title: "piyopiyo",
    borrowDate: "2021-01-01",
    returnDate: "2021-03-10",
  },
]
