import { createRouter, createWebHistory } from "vue-router"
import { authRequired } from "@/app/provider/router/auth-required"
import { nonAuthRequired } from "@/app/provider/router/non-auth-required"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...nonAuthRequired, ...authRequired],
})

export default router
