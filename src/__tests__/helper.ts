import type { Parameters } from "@storybook/vue3"
import { HttpResponse, http } from "msw"
import { createOpenApiHttp } from "openapi-msw"
import { createApp, type App } from "vue"
import { useRouter } from "vue-router"
import { router } from "@/app/provider/router"
import { type paths } from "@/shared/api/v1.schema"
import type { AuthRoute, NonAuthRoute } from "@/shared/routes"

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

const mockApiFactory =
  <Method extends HttpMethod>(method: Method) =>
  <Path extends PathsWithMethod<Method>, Status extends HttpStatus = (typeof InitStatus)[Method]>(
    path: Path,
    response: ResponseType<Path, Method, Status>,
    option?: { status: Status },
  ) => {
    return http[method](path, () => {
      const status = option?.status ?? InitStatus[method]
      return HttpResponse.json(response ?? [], { status: parseInt(status) })
    })
  }
/**
 * @example
 * ```ts
 * // 正常系
 * mockApi.get("/books", [])
 * // 異常系
 * mockApi.get("/books", [], 400)
 * // パスクエリ判定
 * mockApi.CUSTOM.get("/books", ({ query, response }) =>
 *   query.get("title") === "hoge" ? response(200).json([]) : response(400).json([])
 * )
 * // パスパラメータ判定
 * mockApi.CUSTOM.get("/books/{id}", ({ params, response }) => {
 *   params.id === "1" ? response(200).json([]) : response(400).json([])
 * ```
 */
export const mockApi = {
  GET: mockApiFactory("get"),
  POST: mockApiFactory("post"),
  CUSTOM: createOpenApiHttp<paths>(),
}

/**
 * storybookでは実際の画面遷移は発生しないので、
 * router.pushした結果、現在のroute.name, params, queryが期待値であるか検証するための仕掛け
 * 参考: https://qiita.com/katsumata_yusuke/items/792fa743b322de70a7a7
 */
export const mockRouteTransition =
  ({ current }: { current: NonAuthRoute | AuthRoute }) =>
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
  app.use(router)
  app.mount(document.createElement("div"))
  return [result, app]
}
