import { createApp } from "vue"
import App from "@/app/App.vue"
import "@/app/assets/main.css"
import { createWebHistoryRouter } from "@/app/provider/router"

const router = createWebHistoryRouter()
export const app = createApp(App).use(router)
