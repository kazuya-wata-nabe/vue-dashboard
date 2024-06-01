import { inject, provide, type InjectionKey } from "vue"
import type { ApiSchema } from "@/shared/api/response"

type Data = ApiSchema<"Authenticated">
export type AuthContext = {
  save: (data: Data) => Promise<void>
  logout: () => Promise<void>
}

export type AuthStorage = {
  load: () => Promise<boolean>
  save: (data: Data) => Promise<void>
  remove: () => Promise<void>
}

const key = Symbol() as InjectionKey<AuthContext>

export const provideAuth = (storage: AuthStorage) => {
  const save = (data: Data) => storage.save(data)
  provide(key, { save, logout: () => storage.remove() })
}

export const useAuth = () => {
  const context = inject(key)
  if (context === undefined) {
    throw new Error("inject failed")
  }
  return context
}

export type UserRole = ApiSchema<"UserRole">

/**
 * @enum
 * |value|description|
 * |--|--|
 * |ADMIN|管理者|
 * |COMMON|一般|
 */
const USER_ROLE = {
  ADMIN: "管理者",
  COMMON: "一般",
} as const satisfies Record<UserRole, string>

export const isAdmin = (userRole: UserRole) => userRole === "ADMIN"
export const isCommon = (userRole: UserRole) => userRole === "COMMON"

export const toLabel = (value: UserRole) => USER_ROLE[value]
