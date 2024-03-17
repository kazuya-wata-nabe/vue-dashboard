/**
 * @enum
 * |value|description|
 * |--|--|
 * |ADMIN|管理者|
 * |COMMON|一般ユーザ|
 */
export const ROLE = {
  ADMIN: "ADMIN",
  COMMON: "COMMON",
} as const

export type Role = (typeof ROLE)[keyof typeof ROLE]
