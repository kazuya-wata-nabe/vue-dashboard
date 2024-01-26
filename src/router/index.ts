import { createRouter, createWebHistory } from 'vue-router'
import { routeWithoutAuth } from './without-auth'
import { routeWithAuth } from './with-auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routeWithoutAuth,
    ...routeWithAuth,
  ]
})

export default router
