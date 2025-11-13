import type { StorybookConfig } from "@storybook/vue3-vite"

const config: StorybookConfig = {
  stories: [".storybook/*.mdx", "../src/**/*.mdx", "../src/**/*.stories.@(ts)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      docgen: "vue-component-meta",
    },
  },
}
export default config
