import { BookQueryServiceOnMemory } from "@/views/home/infra/on-memory"
import type { RouteRecordRaw } from "vue-router"
import { BookRepositoryOnMemory } from "../views/book/infra"

const HomeView = () => import("@/views/home/HomeView.vue")
const BookView = () => import("@/views/book/BookView.vue")

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    props: { queryService: new BookQueryServiceOnMemory() },
    component: HomeView,
  },
  {
    path: "/book",
    name: "book",
    props: { repository: new BookRepositoryOnMemory() },
    component: BookView,
  },
]

export const authRequired = routes.map((route) => {
  route.meta = { layout: "Main" }
  return route
})
