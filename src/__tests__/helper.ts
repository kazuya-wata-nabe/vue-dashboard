/**
 * テストのためのユーティリティを集めたモジュール
 */
import type { Parameters } from "@storybook/vue3"
import { createOpenApiHttp } from "openapi-msw"
import { createApp, getCurrentInstance, type App } from "vue"
import { useRouter } from "vue-router"
import { createMemoryRouter } from "@/app/provider/router"
import { type paths } from "@/shared/api/v1.schema"

const http = createOpenApiHttp<paths>()

export const mockApi = http

export const mockRouter = () => ({
  setup: () => {
    const app = getCurrentInstance()?.appContext.app
    if (app) {
      const router = createMemoryRouter()
      app.use(router)
      return { app, currentRoute: router.currentRoute }
    }
    throw new Error("app is undefined")
  },
  template: `
    <div stle="position:fixed;">
      <div data-testid="currentRoute">currentRoute: {{ currentRoute.name }}</div>
      <div data-testid="currentParams">currentParams: {{ currentRoute.params }}</div>
      <div data-testid="currentQuery">currentQuery: {{ currentRoute.query }}</div>
    </div>
    <story />
  `,
})

/**
 * storybookでは実際の画面遷移は発生しないので、
 * router.pushした結果取得した現在のroute.name, queryが期待値であるか検証するための仕掛け
 * 参考: https://qiita.com/katsumata_yusuke/items/792fa743b322de70a7a7
 */
export const mockRouteTransition = () => ({
  setup: () => {
    const { currentRoute } = useRouter()
    return { currentRoute }
  },
  template: `
    <div stle="position:fixed;">
      <div data-testid="currentRoute">currentRoute: {{ currentRoute.name }}</div>
      <div data-testid="currentParams">currentParams: {{ currentRoute.params }}</div>
      <div data-testid="currentQuery">currentQuery: {{ currentRoute.query }}</div>
    </div>
    <story />
  `,
})

type Meta = {
  parameters?: Parameters
}
export const extendMockApi = (meta: Meta, ...handlers: unknown[]) => [
  ...handlers,
  ...(meta.parameters?.msw.handlers ?? []),
]

export const withSetup = <T extends Record<string, unknown>>(
  composable: () => T,
): [T, App<Element>] => {
  const result = Object.create({})
  const app = createApp({
    setup: () => {
      Object.assign(result, composable())
      return () => {}
    },
  })
  app.use(createMemoryRouter())
  app.mount(document.createElement("div"))
  return [result, app]
}
