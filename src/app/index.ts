import { createApp } from "vue"
import App from "@/app/App.vue"
import "@/app/assets/main.css"
import router from "@/app/provider/router"

export const app = createApp(App).use(router)
