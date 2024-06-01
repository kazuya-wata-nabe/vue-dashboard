import type { RouteRecordSingleView, RouteRecordSingleViewWithChildren } from "vue-router"
import type { RouteLocationNormalized } from "vue-router"

type RouteNames = NonAuthRoute | AuthRoute

type Route<T extends RouteNames> = RouteRecordSingleView & { name: T }

export type RouteRecord<T extends RouteNames> =
  | Route<T>
  | (Omit<RouteRecordSingleViewWithChildren, "component"> & { children: Route<T>[] })

export type WithId = {
  id: string
}

export const propsWithId = (route: RouteLocationNormalized): WithId => {
  const id = typeof route.params.id
  if (typeof id === "string") {
    return { id }
  }
  return { id: "" }
}

export type NonAuthRoute = "login"

export type AuthRoute = "home" | "book-list" | "book-add" | "book-edit"
