import type { RouteRecordRaw } from "vue-router"
import PublicLayout from "@/shared/components/layout/public/public-layout.vue"
import type { NonAuthRoute, RouteRecord } from "@/shared/routes"

const LoginView = () => import("@/views/login/index.vue")

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
] as const satisfies RouteRecord<NonAuthRoute>[]

export const nonAuthRequired = routes.map((route: RouteRecordRaw) => {
  route.meta = { ...route.meta, layout: PublicLayout }
  return route
})
