import type { RouteRecordRaw } from "vue-router"
import MainLayout from "@/shared/components/layout/main/main-layout.vue"

const Home = () => import("@/views/home/home-view.vue")
const BookList = () => import("@/views/book/list/index.vue")
const BookAdd = () => import("@/views/book/add/index.vue")

const routes: RouteRecordRaw[] = [
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
]

export const authRequired = routes.map((route) => {
  route.meta = { ...route.meta, layout: MainLayout, requiresAuth: true }
  return route
})
