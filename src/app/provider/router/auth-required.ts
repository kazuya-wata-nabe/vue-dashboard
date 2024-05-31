import type { RouteRecordRaw } from "vue-router"
import MainLayout from "@/shared/components/layout/main/main-layout.vue"

const Home = () => import("@/views/home/home-view.vue")
const BookList = () => import("@/views/book/list/index.vue")
const BookAdd = () => import("@/views/book/add/index.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/book",
    children: [
      {
        path: "",
        name: "book-list",
        component: BookList,
      },
      {
        path: "add",
        name: "book-add",
        component: BookAdd,
      },
    ],
  },
] as const satisfies RouteRecordRaw[]

export const authRequired = routes.map((route: RouteRecordRaw) => {
  route.meta = { ...route.meta, layout: MainLayout, requiresAuth: true }
  return route
})

type GetRouteName<T extends RouteRecordRaw> = T extends { name: string }
  ? T["name"]
  : T extends { children: RouteRecordRaw[] }
    ? T["children"][number]["name"]
    : never

export type AuthRouteNames = GetRouteName<(typeof routes)[number]>
