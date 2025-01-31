// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress"
import DefaultTheme from "vitepress/theme"
import CustomDoc from "./custom-doc.vue"
import "./style.css"

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    // ...
    app.component("CustomDoc", CustomDoc)
  },
} satisfies Theme
