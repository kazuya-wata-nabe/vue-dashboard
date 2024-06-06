import { createOpenApiHttp } from "openapi-msw"
import type { paths } from "@/shared/api/v1.schema"

const http = createOpenApiHttp<paths>()

/**
 * mswで返すレスポンスを登録する変数
 * 手動でメンテしてください
 * json形式のopenapiがある、かつopenapiにexampleを定義してある場合は
 * mswのレスポンスにexamplesを使うことが可能です（手動で設定してください）
 *
 * レスポンスのバリデーションが欲しい場合は、ここでがんばらず
 * storybookでやってください
 *
 * 初回にざっとpathを定義したい場合は
 * [msw-auto-mock](https://github.com/zoubingwu/msw-auto-mock)使ってください
 *
 * openapi-mswを使っているのでレスポンスが
 * openapiに定義している型と違う場合はエラーになります
 * @example
 * // ok
 * http.get("/me", ({ response }) => {
 *   return response(200).json({ role: "ADMIN" })
 * })
 * // ng
 * http.get("/me", ({ response }) => {
 *   return response(200).json({ role: "HOGE" })
 * })
 */
export const handlers = [
  http.get("/books", ({ response }) => {
    return response(200).json([])
  }),

  http.get("/me", ({ response }) => {
    return response(200).json({ role: "ADMIN" })
  }),

  http.post("/login", async ({ request, response }) => {
    const body = await request.json()
    if (body?.email === "test@example.com" && body?.password === "passw0rd") {
      return response(201).json({ accessToken: "ok" })
    }
    return response(400).json([])
  }),
]
