import { describe, expect, test } from "vitest"
import { DateUtils } from "./date-utils"

describe("isBefore", () => {
  test("2021/03/01, 2021/03/02はtrue", () => {
    const a = DateUtils.parse("2021/03/01")
    const b = DateUtils.parse("2021-03-02")

    expect(DateUtils.isBefore(a, b)).toBeTruthy()
  })
  test("2021/03/01, 2021/03/01はfalse", () => {
    const a = DateUtils.parse("2021-03-01")
    const b = DateUtils.parse("2021-03-01")

    expect(DateUtils.isBefore(a, b)).toBeFalsy()
  })
  test("2021/03/01, 2021/02/28はfalse", () => {
    const a = DateUtils.parse("2021-03-01")
    const b = DateUtils.parse("2021-02-28")

    expect(DateUtils.isBefore(a, b)).toBeFalsy()
  })
  test("2021/03/01, 2021-03-01は同じ日時", () => {
    const a = DateUtils.parse("2021-03-01")
    const b = DateUtils.parse("2021/03/01")

    expect(a.toISOString()).toBe(b.toISOString())
  })
})
