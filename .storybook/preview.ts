import { initialize, mswLoader } from "msw-storybook-addon"
import { setup, type Preview } from "@storybook/vue3"
import "@/app/assets/main.css"
import { handlers } from "@/app/mocks/handlers"
import { router } from "@/app/provider/router"

const url = location.hostname.endsWith("github.io")
  ? "/vue-dashboard/storybook-static/mockServiceWorker.js"
  : ""

console.debug("STORYBOOK_STATIC: ", import.meta.env.STORYBOOK_STATIC)
console.debug("location: ", location.hostname.endsWith("github.io"))

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
