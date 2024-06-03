import App from "@/app/App.vue"
import "@/app/assets/main.css"
import { LocalStorage } from "@/app/provider/auth/infra/local-storage"
import { provideAuth } from "@/features/auth"
import { router } from "@/router"
import { createApp } from "vue"

const storage = new LocalStorage()
const auth = provideAuth(storage)

export const app = createApp(App).use(router).use(auth)
