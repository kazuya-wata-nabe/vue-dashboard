import { isAfter } from "date-fns"
import { describe, expect, it } from "vitest"
import { isValid } from "./date"

describe("parseの入力形式", () => {
  it("2021-01-03は有効", () => {
    const value = "2021-01-03"
    const actual = isValid(value)
    expect(actual).toBeTruthy()
  })

  it("2021/01/03は無効", () => {
    const value = "2021/01/03"
    const actual = isValid(value)
    expect(actual).toBeFalsy()
  })

  it("2021_01_03は無効", () => {
    const value = "2021_01_03"
    const actual = isValid(value)
    expect(actual).toBeFalsy()
  })

  it("2021.01.03は無効", () => {
    const value = "2021.01.03"
    const actual = isValid(value)
    expect(actual).toBeFalsy()
  })
})

describe("is after", () => {
  it("a: 2021-01-03, b: 2021-01-02", () => {
    const a = "2021-01-03"
    const b = "2021-01-02"
    const actual = isAfter(a, b)
    expect(actual).toBeTruthy()
  })
})
