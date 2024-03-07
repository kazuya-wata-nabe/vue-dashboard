import { AuthRepositoryOnMemory } from "@/views/login/infra/on-memory"
import type { RouteRecordRaw } from "vue-router"

const Login = () => import("@/views/login/LoginView.vue")

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    props: { repository: new AuthRepositoryOnMemory() },
    component: Login,
  },
]

export const nonAuthRequired = routes.map((route) => {
  route.meta = { layout: "Public" }
  return route
})
