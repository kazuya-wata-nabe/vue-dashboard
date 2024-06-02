import { createApp } from "vue"
import App from "@/app/App.vue"
import "@/app/assets/main.css"
import { LocalStorage } from "@/app/provider/auth/infra/local-storage"
import { router } from "@/app/provider/router"
import { provideAuth } from "@/features/auth"

const storage = new LocalStorage()
const auth = provideAuth(storage)

export const app = createApp(App).use(router).use(auth)
