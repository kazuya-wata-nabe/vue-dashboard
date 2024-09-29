import { inject, type App, type InjectionKey } from "vue"
import type { Middleware } from "openapi-fetch"
import type { ApiSchema } from "@/shared/api/response"
import { isExpired, type JWT, type Refresh } from "./model"

type Data = ApiSchema<"Authenticated">

export type AuthContext = {
  isAuthenticated: () => Promise<JWT | undefined>
  save: (data: Data) => Promise<void>
  logout: () => Promise<void>
}

export type AuthStorage = {
  load: () => Promise<JWT | undefined>
  save: (data: Data) => Promise<void>
  remove: () => Promise<void>
}

const key = Symbol() as InjectionKey<AuthContext>

export const createAuthContext = (storage: AuthStorage) => ({
  install: (app: App) => {
    app.provide(key, {
      isAuthenticated: async () => storage.load(),
      save: (data: Data) => storage.save(data),
      logout: () => storage.remove(),
    })
  },
})

export const useAuthenticated = () => {
  const context = inject(key)
  if (context === undefined) {
    throw new Error("inject failed")
  }
  return {
    isAuthenticated: async () => await context.isAuthenticated(),
  }
}

export const useAuth = () => {
  const context = inject(key)
  if (context === undefined) {
    throw new Error("inject failed")
  }
  return {
    save: (data: Data) => context.save(data),
    logout: () => context.logout(),
  }
}

export const authMiddleware = (jwt: JWT | undefined, refresh: Refresh): Middleware => ({
  onRequest: async (req) => {
    const newJwt = jwt && isExpired(jwt) ? await refresh(jwt) : jwt

    if (newJwt?.accessToken) {
      req.headers.set("Authorization", `Bearer ${newJwt.accessToken}`)
    }

    return req
  },
})
