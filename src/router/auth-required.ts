import { BookRepositoryOnMemory } from "@/views/home/infra/on-memory"

const HomeView = () => import("@/views/home/HomeView.vue")

export const authRequired = [
  {
    path: "/",
    name: "home",
    props: { repository: new BookRepositoryOnMemory() },
    component: HomeView,
  },
]
