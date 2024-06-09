import { createApp } from "vue"
import "vuetify/styles"
import App from "@/app/App.vue"
import "@/app/assets/main.css"
import { router } from "@/app/provider/router"
import { createAuthContext } from "@/features/auth"
import { LocalStorage } from "./provider/auth/infra/local-storage"
import { vuetify } from "./vuetify"

const storage = new LocalStorage()
const auth = createAuthContext(storage)

export const app = createApp(App).use(router).use(auth).use(vuetify)
