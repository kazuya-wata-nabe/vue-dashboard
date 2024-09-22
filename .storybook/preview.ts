import { initialize, mswLoader } from "msw-storybook-addon"
import { setup, type Preview } from "@storybook/vue3"
import "@/app/assets/main.css"
import { handlers } from "@/app/mocks/handlers"
import { router } from "@/app/provider/router"
import DocumentationTemplate from "./document-template.mdx"

initialize(
  {
    onUnhandledRequest: "bypass",
    serviceWorker: { url: "mockServiceWorker.js" },
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
    docs: {
      page: DocumentationTemplate,
    },
  },
  decorators: [() => ({ template: `<div id="app"><story /></div>` })],
}

export default preview
