import vue from "@vitejs/plugin-vue"
import { fileURLToPath } from "node:url"
import { mergeConfig } from "vitest/config"
import viteConfig from "./vite.config"

export default mergeConfig(viteConfig, {
  plugins: [vue()],
  assetInclude: ["/sb-preview/runtime.js"],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../src", import.meta.url)),
    },
  },
})
