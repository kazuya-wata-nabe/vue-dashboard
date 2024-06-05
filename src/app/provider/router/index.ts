import { createMemoryHistory, createRouter, createWebHistory } from "vue-router"
import { routes } from "./routes"

const baseUrl = import.meta.env.BASE_URL

const createWebHistoryRouter = () => {
  return createRouter({
    history: createWebHistory(baseUrl),
    routes,
  })
}

const createMemoryRouter = () => {
  return createRouter({
    history: createMemoryHistory(baseUrl),
    routes,
  })
}

const isTest = import.meta.env.NODE_ENV === "test" || import.meta.env.STORYBOOK === "true"

export const router = isTest ? createMemoryRouter() : createWebHistoryRouter()
