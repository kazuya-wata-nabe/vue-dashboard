import { type Preview } from "@storybook/vue3"
import AppProvider from "../src/provider/app/AppProvider.vue"
import AuthProvider from "../src/provider/auth/AuthProvider.vue"
import router from "../src/router"

import { getCurrentInstance } from "vue"
import "../src/assets/main.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    () => ({
      setup() {
        const { app } = getCurrentInstance()!.appContext
        app.use(router)
      },
      components: { AppProvider, AuthProvider },
      template: `
        <div id="app">
          <AppProvider>
            <AuthProvider>
              <story />
            </AuthProvider>
          </AppProvider>
        </div>`,
    }),
  ],
}

export default preview
