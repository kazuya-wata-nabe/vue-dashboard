import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Documents",
  description: "This is sample",
  lang: "ja-JP",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-search#algolia-search
    search: {
      provider: "local",
    },
    outline: {
      level: "deep",
      label: "目次",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "画面遷移図", link: "/画面遷移図" },
      // { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "認証いらないやつ",
        items: [
          { text: "トップ", link: "/認証不要/トップ/" },
          { text: "ログイン", link: "/認証不要/ログイン/" },
          { text: "蔵書検索（簡易）", link: "/認証不要/蔵書検索（簡易）/" },
        ],
      },
      {
        text: "認証いるやつ",
        items: [{ text: "ホーム", link: "/認証要/ホーム/" }],
      },
    ],

    // socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
})
