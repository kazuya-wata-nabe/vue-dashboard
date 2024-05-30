import { setup, type Preview } from "@storybook/vue3"
import { initialize, mswLoader } from "msw-storybook-addon"
import "@/app/assets/main.css"
import { createMemoryRouter } from "@/app/provider/router"
import { handlers } from "@/shared/mocks/handlers"

initialize({ onUnhandledRequest: "bypass" }, handlers)

const router = createMemoryRouter()
setup((app) => {
  app.use(router)
})

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [() => ({ template: `<div id="app"><story /></div>` })],
}

export default preview
