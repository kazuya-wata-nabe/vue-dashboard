import { createMemoryHistory, createRouter, createWebHistory } from "vue-router"
import { authRequired } from "@/app/provider/router/auth-required"
import { nonAuthRequired } from "@/app/provider/router/non-auth-required"

const baseUrl = import.meta.env.BASE_URL
const routes = [...nonAuthRequired, ...authRequired]

export const createWebHistoryRouter = () => {
  return createRouter({
    history: createWebHistory(baseUrl),
    routes,
  })
}

export const createMemoryRouter = () => {
  return createRouter({
    history: createMemoryHistory(baseUrl),
    routes,
  })
}
