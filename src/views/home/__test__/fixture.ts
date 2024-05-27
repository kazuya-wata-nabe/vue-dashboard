import type { ApiSchema } from "@/shared/api/response"

export const fixture1: ApiSchema<"Book">[] = [
  {
    id: 2,
    title: "fugafuga",
    borrowDate: "2021-01-01",
    returnDate: "2021-03-10",
  },
]

export const fixture2 = [
  {
    id: 2,
    title: "piyopiyo",
    borrowDate: "2021-01-01",
    returnDate: "2021-03-10",
  },
]
