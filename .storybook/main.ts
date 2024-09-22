import type { StorybookConfig } from "@storybook/vue3-vite"

const config: StorybookConfig = {
  stories: [".storybook/*.mdx", "../src/**/*.mdx", "../src/**/*.stories.@(ts)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      docgen: "vue-component-meta",
    },
  },
}
export default config
