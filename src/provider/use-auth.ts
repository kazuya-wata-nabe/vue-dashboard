import { inject, provide, type InjectionKey } from "vue"
import type { AuthStorage } from "./interface"

type AuthContext = {
  save(): Promise<void>
}
const key = Symbol() as InjectionKey<AuthContext>

export const provideAuth = (storage: AuthStorage) => {
  provide(key, { save: storage.save })
}

export const useAuth = () => {
  const context = inject(key)
  if (context === undefined) {
    throw new Error("inject failed")
  }
  return context
}
