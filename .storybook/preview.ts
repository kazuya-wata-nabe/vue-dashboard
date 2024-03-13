import { setup, type Preview } from "@storybook/vue3"
import { MainLayout } from "../src/components/layout"
import AppProvider from "../src/provider/app/AppProvider.vue"
import AuthProvider from "../src/provider/auth/AuthProvider.vue"

import "../src/assets/main.css"
import router from "../src/router"

setup((app) => {
  app.component("MainLayout", MainLayout)
  app.use(router)
})

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
      components: { AppProvider, AuthProvider },
      template: `
        <div id="app">
          <AppProvider>
            <AuthProvider>
              <story />
            </AuthProvider>
        </div>`,
    }),
  ],
}

export default preview
