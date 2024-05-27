import type { RouteRecordRaw } from "vue-router"
import PublicLayout from "@/shared/components/layout/public/public-layout.vue"

const Login = () => import("@/views/login/login-view.vue")

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
]

export const nonAuthRequired = routes.map((route) => {
  route.meta = { ...route.meta, layout: PublicLayout }
  return route
})
