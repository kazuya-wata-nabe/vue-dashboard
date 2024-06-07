import { initialize, mswLoader } from "msw-storybook-addon"
import { setup, type Preview } from "@storybook/vue3"
import "@/app/assets/main.css"
import { handlers } from "@/app/mocks/handlers"
import { router } from "@/app/provider/router"

const url = location.hostname.endsWith("github.io") ? "/mockServiceWorker.js" : ""

initialize(
  {
    onUnhandledRequest: "bypass",
    serviceWorker: { url },
  },
  handlers,
)

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
