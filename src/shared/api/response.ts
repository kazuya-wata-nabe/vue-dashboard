import { type components } from "@/shared/api/v1.schema"

export type Success<T extends keyof components["schemas"]> = components["schemas"][T]
export type Failure<T extends keyof components["schemas"]> = {
  [P in keyof T]: {
    message: string[]
  }
}
