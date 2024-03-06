import { inject, provide, type InjectionKey } from "vue"
import type { AuthStorage } from "./model/storage"

type AuthContext = {
  save: () => Promise<void>
  logout: () => Promise<void>
}
const key = Symbol() as InjectionKey<AuthContext>

export const provideAuth = (storage: AuthStorage) => {
  provide(key, { save: () => storage.save(), logout: () => storage.remove() })
}

export const useAuth = () => {
  const context = inject(key)
  if (context === undefined) {
    throw new Error("inject failed")
  }
  return context
}
