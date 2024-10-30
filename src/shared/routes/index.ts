import type { RouteRecordSingleView, RouteRecordSingleViewWithChildren } from "vue-router"

export type NonAuthRequiredRoutes = "login"
export type AuthRequiredRoutes = "home" | "chat" | "book-list" | "book-add" | "book-edit"

export type RouteNames = NonAuthRequiredRoutes | AuthRequiredRoutes

export type Route<RouteName extends RouteNames> =
  | (RouteRecordSingleView & { name: RouteName })
  | RouteRecordSingleViewWithChildren
