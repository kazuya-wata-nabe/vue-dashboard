import type { ApiSchema } from "@/shared/api/response"

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
