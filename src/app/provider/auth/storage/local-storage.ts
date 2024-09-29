import type { AuthStorage } from "@/features/auth"
import type { JWT } from "@/features/auth/model"

const KEY_AUTH = "auth"

export const LocalStorage = (): Readonly<AuthStorage> => ({
  load: async (): Promise<JWT | undefined> => {
    const value = localStorage.getItem(KEY_AUTH) ?? ""
    return value ? JSON.parse(value) : undefined
  },
  save: async () => {
    localStorage.setItem(KEY_AUTH, "ok")
  },
  remove: async () => {
    localStorage.removeItem(KEY_AUTH)
  },
})
