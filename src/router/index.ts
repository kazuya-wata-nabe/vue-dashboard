import { createRouter, createWebHistory } from 'vue-router'
import { nonAuthRequired } from './non-auth-required'
import { authRequired } from './auth-required'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...nonAuthRequired,
    ...authRequired,
  ]
})

export default router
