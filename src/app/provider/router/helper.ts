import type { RouteLocationNormalized } from "vue-router"

export const strOrEmpty = (route: RouteLocationNormalized, key: string) => {
  const value = route.query[key]
  if (typeof value === "string") {
    return value
  }
  return ""
}

export const parsePathId = (route: RouteLocationNormalized): string | "" => {
  const value = (route.query["id"] ?? "").toString()
  if (Number.isNaN(value)) {
    return ""
  }
  return value
}
