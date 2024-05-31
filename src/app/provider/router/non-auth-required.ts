import type { RouteRecordRaw } from "vue-router"
import PublicLayout from "@/shared/components/layout/public/public-layout.vue"

const LoginView = () => import("@/views/login/index.vue")

const routes = [
  {
    path: "/login" as const,
    name: "login" as const,
    component: LoginView,
  },
] as const satisfies RouteRecordRaw[]

export const nonAuthRequired = routes.map((route: RouteRecordRaw) => {
  route.meta = { ...route.meta, layout: PublicLayout }
  return route
})

export type NonAuthRouteNames = (typeof routes)[number]["name"]
