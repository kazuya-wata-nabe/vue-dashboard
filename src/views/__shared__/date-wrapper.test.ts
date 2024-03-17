import { describe, expect, test } from "vitest"
import { DateYMD } from "./date-wrapper"

describe("isBefore", () => {
  test("2021/03/01, 2021/03/02はtrue", () => {
    const a = DateYMD.valueOf("2021-03-01")
    const b = DateYMD.valueOf("2021-03-02")

    expect(a.isBefore(b)).toBeTruthy()
  })
  test("2021/03/01, 2021/03/01はfalse", () => {
    const a = DateYMD.valueOf("2021-03-01")
    const b = DateYMD.valueOf("2021-03-01")

    expect(a.isBefore(b)).toBeFalsy()
  })
  test("2021/03/01, 2021/02/28はfalse", () => {
    const a = DateYMD.valueOf("2021-03-01")
    const b = DateYMD.valueOf("2021-02-28")

    expect(a.isBefore(b)).toBeFalsy()
  })
})
