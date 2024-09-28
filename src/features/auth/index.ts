import { inject, type App, type InjectionKey } from "vue"
import type { ApiSchema } from "@/shared/api/response"

type Data = ApiSchema<"Authenticated">

export type AuthContext = {
  isAuthenticated: () => Promise<boolean>
  save: (data: Data) => Promise<void>
  logout: () => Promise<void>
}

export type AuthStorage = {
  load: () => Promise<string>
  save: (data: Data) => Promise<void>
  remove: () => Promise<void>
}

const key = Symbol() as InjectionKey<AuthContext>

export const createAuthContext = (storage: AuthStorage) => ({
  install: (app: App) => {
    app.provide(key, {
      save: (data: Data) => storage.save(data),
      isAuthenticated: async () => !!(await storage.load()),
      logout: () => storage.remove(),
    })
  },
})

export const useAuthenticated = () => {
  const context = inject(key)
  if (context === undefined) {
    throw new Error("inject failed")
  }
  return { isAuthenticated: async () => await context.isAuthenticated() }
}

export const useAuth = () => {
  const context = inject(key)
  if (context === undefined) {
    throw new Error("inject failed")
  }
  return context
}
