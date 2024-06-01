import type { RouteRecordRaw } from "vue-router"
import MainLayout from "@/shared/components/layout/main/main-layout.vue"
import { propsWithId, type AuthRoute, type RouteRecord } from "@/shared/routes"

const Home = () => import("@/views/home/index.vue")
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
      {
        path: ":id",
        name: "book-edit",
        props: propsWithId,
        component: BookAdd,
      },
    ],
  },
] as const satisfies RouteRecord<AuthRoute>[]

export const authRequired = routes.map((route: RouteRecordRaw) => {
  route.meta = { ...route.meta, layout: MainLayout, requiresAuth: true }
  return route
})
