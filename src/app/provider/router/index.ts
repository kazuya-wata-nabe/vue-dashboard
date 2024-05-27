import { authRequired } from "./auth-required"
import { nonAuthRequired } from "./non-auth-required"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...nonAuthRequired, ...authRequired],
})

export default router
