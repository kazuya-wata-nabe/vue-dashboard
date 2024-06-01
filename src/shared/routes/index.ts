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

const withProps =
  <RouteKey extends "params" | "query">(routeKey: RouteKey) =>
  <T extends object>(...keys: (keyof T)[]) =>
  (route: RouteLocationNormalized): Record<keyof T, string> => {
    return keys.reduce(
      (acc, key) => {
        const _value = route[routeKey][key.toString()]
        const value = typeof _value === "string" ? _value : ""
        return { ...acc, [key]: value }
      },
      {} as Record<keyof T, string>,
    )
  }

export const propsWithId = withProps("params")("id")
export const withQuery = withProps("query")

export type NonAuthRoute = "login"

export type AuthRoute = "home" | "book-list" | "book-add" | "book-edit"
