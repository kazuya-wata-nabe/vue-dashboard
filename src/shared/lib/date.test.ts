import { describe, expect, test } from "vitest"
import { isValid } from "./date"

describe("parseの入力形式", () => {
  test("2021-01-03は有効", () => {
    const value = "2021-01-03"
    const actual = isValid(value)
    expect(actual).toBeTruthy()
  })

  test("2021/01/03は無効", () => {
    const value = "2021/01/03"
    const actual = isValid(value)
    expect(actual).toBeFalsy()
  })

  test("2021_01_03は無効", () => {
    const value = "2021_01_03"
    const actual = isValid(value)
    expect(actual).toBeFalsy()
  })

  test("2021.01.03は無効", () => {
    const value = "2021.01.03"
    const actual = isValid(value)
    expect(actual).toBeFalsy()
  })
})
