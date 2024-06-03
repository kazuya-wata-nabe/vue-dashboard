import type { Component } from "vue"
import "vue-router"
import { parsePathId, strOrEmpty, type GetRouteNames, type Route } from "@/router/helper"
import MainLayout from "@/shared/components/layout/main/main-layout.vue"
import PublicLayout from "@/shared/components/layout/public/public-layout.vue"
import { BookAdd } from "@/views/book/add"
import * as BookList from "@/views/book/list"
import * as Home from "@/views/home"
import { LoginView } from "@/views/login"

declare module "vue-router" {
  interface RouteMeta {
    layout: Component
    requiresAuth?: true
  }
}

export type RouteNames = GetRouteNames<typeof routesNonAuthRequired | typeof routesAuthRequired>

const routesNonAuthRequired = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
] as const satisfies Route[]

const nonAuthRequired = routesNonAuthRequired.map((route: Route) => {
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
        component: BookAdd,
      },
      {
        path: ":id",
        name: "book-edit",
        component: BookAdd,
        props: (route) => ({
          id: parsePathId(route),
        }),
      },
    ],
  },
] as const satisfies Route[]

const authRequired = routesAuthRequired.map((route: Route) => {
  route.meta = { ...route.meta, layout: MainLayout, auth: true }
  return route
})

export const routes = [...nonAuthRequired, ...authRequired]
