import { BookQueryServiceOnMemory } from "@/views/home/infra/on-memory"
import { BookRepositoryOnMemory } from "../views/book/infra"

const HomeView = () => import("@/views/home/HomeView.vue")
const BookView = () => import("@/views/book/BookView.vue")

export const authRequired = [
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
