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
    ? T["children"][number]["name"]
    : never

export type GetRouteNames<T extends Route[]> = RouteName<T[number]>

type _GetProps<T extends Route> = T extends {
  name: string
  props: unknown
}
  ? { [Name in T["name"]]: { props: T["props"] } }
  : T extends { children: Route[] }
    ? _GetProps<T["children"][number]>
    : never

export type GetProps<T extends Route[]> = _GetProps<T[number]>

export type WithId = {
  id: string
}

export const strOrEmpty = (route: RouteLocationNormalized, key: string) => {
  const value = route.query[key]
  if (typeof value === "string") {
    return value
  }
  return ""
}
