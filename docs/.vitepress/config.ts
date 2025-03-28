import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "画面一覧",
  description: "サンプルです",
  lang: "ja-JP",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-search#algolia-search
    search: {
      provider: "local",
    },
    aside: false,
    outline: {
      level: "deep",
      label: "目次",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "画面遷移図", link: "/画面遷移図.drawio.svg", target: "_blank" },
      { text: "Tips", link: "/Tips/", target: "_blank" },
      { component: "CustomDoc" },
    ],
    sidebar: [
      {
        text: "認証いらないやつ",
        items: [
          {
            items: [
              { text: "トップ", link: "/認証不要/トップ/" },
              { text: "ログイン", link: "/認証不要/ログイン/" },
              { text: "蔵書検索（簡易）", link: "/認証不要/蔵書検索（簡易）/" },
            ],
          },
        ],
      },
      {
        text: "認証いるやつ",
        items: [
          {
            items: [
              { text: "共通部の説明", link: "/認証要/_共通部の説明/" },
              { text: "ホーム", link: "/認証要/ホーム/" },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: "twitter", link: "https://www.sorich.jp/" }],
  },
})
