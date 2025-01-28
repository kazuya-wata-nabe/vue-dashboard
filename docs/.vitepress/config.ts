import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Documents",
  description: "This is sample",
  lang: "ja-JP",
  themeConfig: {
    outline: {
      level: "deep",
      label: "目次",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "認証いらないやつ",
        items: [
          { text: "ログイン", link: "/login/" }, //
        ],
      },
      {
        text: "認証いるやつ",
        items: [
          { text: "書籍画面", link: "/home/" }, //
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
})
