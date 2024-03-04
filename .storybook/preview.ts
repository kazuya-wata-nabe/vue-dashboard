import type { Preview } from "@storybook/vue3"

import "../src/assets/main.css"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [() => ({ template: `<div id="id"><story /></div>` })],
}

export default preview
