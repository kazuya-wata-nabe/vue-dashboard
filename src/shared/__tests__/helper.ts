import { createApp, type App } from "vue"
import { useRouter } from "vue-router"
import { HttpHandler, HttpResponse, delay, http } from "msw"
import { spyOn } from "@storybook/test"
import { router } from "@/app/provider/router"
import { type paths } from "@/shared/api/v1.schema"
import type { RouteNames } from "@/shared/routes"

type HttpMethod = "get" | "post"
type HttpStatus = "200" | "201" | "204" | "400" | "401" | "404" | "500"

type Responses<Status extends HttpStatus> = {
  responses: { [S in Status]: { content: { "application/json": unknown } } }
}

type PathsWithMethod<Method extends HttpMethod> = {
  [Path in keyof paths]: paths[Path] extends {
    [K in Method]: unknown
  }
    ? Path
    : never
}[keyof paths]

type ResponseType<
  Path extends keyof paths,
  Method extends HttpMethod,
  Status extends HttpStatus,
> = paths[Path] extends {
  [M in Method]: Responses<Status>
}
  ? paths[Path][Method]["responses"][Status]["content"]["application/json"]
  : never

const InitStatus = { get: "200", post: "201" } as const

export const DELAY = (() => {
  const ms = (n: number) => (import.meta.env.NODE_ENV === "test" ? n : 0)
  return {
    500: ms(500),
    1000: ms(1000),
  }
})()

type Delay = keyof typeof DELAY

const mockApiFactory =
  <Method extends HttpMethod>(method: Method) =>
  <Path extends PathsWithMethod<Method>, Status extends HttpStatus = (typeof InitStatus)[Method]>(
    path: Path,
    response: ResponseType<Path, Method, Status>,
    option: { status?: Status; delay?: Delay } = {},
  ) => {
    return http[method](path, async () => {
      const status = option?.status ?? InitStatus[method]
      await delay(option?.delay ? DELAY[option.delay] : undefined)
      return HttpResponse.json(response ?? [], { status: Number.parseInt(status) })
    })
  }
/**
 * @example
 * ```ts
 * // 正常系
 * mockApi.GET("/books", [])
 * // 異常系
 * mockApi.GET("/books", [], {status: "400"})
 * ```
 */
export const mockApi = {
  GET: mockApiFactory("get"),
  POST: mockApiFactory("post"),
}

/**
 * storybookでは実際の画面遷移は発生しないので、
 * router.pushした結果、現在のroute.name, params, queryが期待値であるか検証するための仕掛け
 * 参考: https://qiita.com/katsumata_yusuke/items/792fa743b322de70a7a7
 */
export const mockRouteTransition =
  ({ current }: { current: RouteNames }) =>
  () => ({
    setup: () => {
      const { currentRoute, push } = useRouter()
      push({ name: current })
      return { currentRoute }
    },
    template: `
      <div style="position: fixed; background: white;">
        <div data-testid="currentRoute">currentRoute: {{ currentRoute.name }}</div>
        <div data-testid="currentParams">currentParams: {{ currentRoute.params }}</div>
        <div data-testid="currentQuery">currentQuery: {{ currentRoute.query }}</div>
      </div>
      <story />
    `,
  })

type Meta = {
  parameters?: { msw: { handlers: unknown[] } }
}

export const registerMockApi = (handlers: HttpHandler[]) => ({
  msw: { handlers },
})

export const extendMockApi = (meta: Meta, ...handlers: unknown[]) => ({
  msw: { handlers: [...handlers, ...(meta.parameters?.msw.handlers ?? [])] },
})

export const mockDate = (date: `${string}-${string}-${string}`) => () => ({
  setup: (args: unknown) => {
    const now = new Date(date).getTime()
    spyOn(global.Date, "now").mockReturnValue(now)
    return { args }
  },
  template: `<story v-bind="args" />`,
})

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
  app.use(router)
  app.mount(document.createElement("div"))
  return [result, app]
}
