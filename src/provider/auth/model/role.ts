export const ROLE = {
  admin: "ADMIN",
  common: "COMMON",
} as const

export type Role = (typeof ROLE)[keyof typeof ROLE]
