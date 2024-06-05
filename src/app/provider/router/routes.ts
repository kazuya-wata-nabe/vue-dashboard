import type { Component } from "vue"
import type { RouteRecordRaw } from "vue-router"
import type { AuthRequiredRoutes, NonAuthRequiredRoutes, Route } from "@/shared/routes"
import { MainLayout, PublicLayout } from "@/views/_layout"
import * as BookAdd from "@/views/book/add"
import * as BookList from "@/views/book/list"
import * as Home from "@/views/home"
import * as Login from "@/views/login"
import { parsePathId, strOrEmpty } from "./helper"

declare module "vue-router" {
  interface RouteMeta {
    layout: Component
    requiresAuth?: true
  }
}

/**
 * \<RouterLink :to={name}>のnameのtypoを予防する仕掛けです
 * - nameは src/shared/routes/index.ts に定義済みのものしか設定できません
 * - 面倒になったらsatisfiesを変更してください
 * ```diff
 * - satisfies Route<NonAuthRequiredRoutes>[]
 * + satisfies RouteRecordRaw[]
 * ```
 */
const routesNonAuthRequired = [
  {
    path: "/login",
    name: "login",
    component: Login.Component,
  },
] as const satisfies Route<NonAuthRequiredRoutes>[]

const nonAuthRequired = routesNonAuthRequired.map((route: RouteRecordRaw) => {
  route.meta = { ...route.meta, layout: PublicLayout }
  return route
})

const routesAuthRequired = [
  {
    path: "/",
    name: "home",
    component: Home.Component,
    props: (route): Home.Props => ({
      date: strOrEmpty(route, "date"),
    }),
  },
  {
    path: "/book",
    children: [
      {
        path: "",
        name: "book-list",
        component: BookList.Component,
        props: (route): BookList.Props => ({
          date: strOrEmpty(route, "date"),
        }),
      },
      {
        path: "add",
        name: "book-add",
        component: BookAdd.Component,
      },
      {
        path: ":id",
        name: "book-edit",
        component: BookAdd.Component,
        props: (route) => ({
          id: parsePathId(route),
        }),
      },
    ],
  },
] as const satisfies Route<AuthRequiredRoutes>[]

const authRequired = routesAuthRequired.map((route: RouteRecordRaw) => {
  route.meta = { ...route.meta, layout: MainLayout, auth: true }
  return route
})

export const routes = [...nonAuthRequired, ...authRequired]
