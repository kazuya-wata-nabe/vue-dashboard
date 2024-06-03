import type {
  RouteLocationNormalized,
  RouteRecordSingleView,
  RouteRecordSingleViewWithChildren,
} from "vue-router"

export type Route = (RouteRecordSingleView & { name: string }) | RouteRecordSingleViewWithChildren

type RouteName<T extends Route> = T extends {
  name: string
}
  ? T["name"]
  : T extends { children: Route[] }
    ? RouteName<T["children"][number]>
    : never

export type GetRouteNames<T extends Route[]> = RouteName<T[number]>

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
