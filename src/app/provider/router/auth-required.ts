import type { RouteRecordRaw } from "vue-router"
import { BookRepositoryOnMemory } from "@/views/book/infra"
import { BookQueryServiceOnMemory } from "@/views/home/infra/on-memory"

const Home = () => import("@/views/home/home-view.vue")
const BookList = () => import("@/views/book/list/index.vue")
const BookAdd = () => import("@/views/book/add/index.vue")

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    props: { queryService: new BookQueryServiceOnMemory() },
    component: Home,
  },
  {
    path: "/book",
    props: { repository: new BookRepositoryOnMemory() },
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
  route.meta = { layout: "main" }
  return route
})
