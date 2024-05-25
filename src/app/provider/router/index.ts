import { authRequired } from "./auth-required"
import { loadLayout } from "./middleware"
import { nonAuthRequired } from "./non-auth-required"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...nonAuthRequired, ...authRequired],
})

// https://medium.com/@sakensaten1409/vue-3-layout-system-smart-layouts-for-vuejs-80ae700e48a6
router.beforeEach(loadLayout)

export default router
