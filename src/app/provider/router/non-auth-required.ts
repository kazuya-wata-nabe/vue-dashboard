import type { RouteRecordRaw } from "vue-router"
import PublicLayout from "@/shared/components/layout/public/public-layout.vue"

const LoginView = () => import("@/views/login/index.vue")

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
]

export const nonAuthRequired = routes.map((route) => {
  route.meta = { ...route.meta, layout: PublicLayout }
  return route
})
